const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
require("jest-sorted");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api", () => {
  test("GET 200: responds with an object describing all available endpoints on the API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        for (let routes in endpoints) {
          const route = endpoints[routes];
          for (let endpoint in route) {
            expect(route[endpoint]).toHaveProperty("description");
            expect(route[endpoint]).toHaveProperty("queries");
            expect(route[endpoint]).toHaveProperty("exampleResponse");
            if (/(POST) | (PATCH) | (DELETE) /.test(endpoint)) {
              expect(route[endpoint]).toHaveProperty("body");
            }
          }
        }
      });
  });
});

describe("/api/filters", () => {
  describe("GET /api/filters", () => {
    test("GET:200 responds with filters data", () => {
      return request(app)
        .get("/api/filters")
        .expect(200)
        .then((res) => {});
    });
  });
  describe("GET /api/filters/type", () => {
    test("responds with correct filter type", () => {
      return request(app)
        .get("/api/filters/type")
        .expect(200)
        .then((res) => {
          expect(res.body.filters).toHaveLength(3);
        });
    });
    test("responds with correct filter type", async () => {
      return request(app)
        .get("/api/filters/difficulty")
        .expect(200)
        .then((res) => {
          expect(res.body.filters).toHaveLength(4);
        });
    });
    test("responds with correct filter type", async () => {
      return request(app)
        .get("/api/filters/age")
        .expect(200)
        .then((res) => {
          expect(res.body.filters).toHaveLength(4);
        });
    });
    test("responds with correct filter type", async () => {
      return request(app)
        .get("/api/filters/distance")
        .expect(200)
        .then((res) => {
          expect(res.body.filters).toHaveLength(4);
        });
    });
  });
  describe("error test for filter that doesn't exist", () => {
    test("responds with error message", async () => {
      return request(app).get("/api/filters/panda").expect(404);
    });
  });
});

describe("/api/users", () => {
  describe("GET /api/users", () => {
    test("GET 200: responds with an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).toHaveLength(6);
          users.forEach((user) => {
            expect(user).toMatchObject({
              user_id: expect.any(Number),
              username: expect.any(String),
              email: expect.any(String),
              age: expect.any(String),
              bio: expect.any(String),
              region: expect.any(String),
              city: expect.any(String),
              type_of_biking: expect.any(String),
              difficulty: expect.any(String),
              distance: expect.any(String),
              rating: expect.any(Number),
              avatar_url: expect.any(String),
            });
          });
        });
    });
    describe('location query', () => {
      test('GET 200: responds with an array of users matching the given location', () => {
        return request(app)
        .get("/api/users?location=manchester")
        .expect(200)
        .then(({body: {users}}) => {
          users.forEach((user) => {
            expect(user.location).toBe('Manchester');
          })
        })
      });
    });
  });
});

describe("/api/users/:user_id", () => {
  describe("GET /api/users/:user_id", () => {
    test("GET 200: responds with a single user", () => {
      return request(app)
        .get("/api/users/1")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toMatchObject({
            user_id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            age: expect.any(String),
            bio: expect.any(String),
            region: expect.any(String),
            city: expect.any(String),
            type_of_biking: expect.any(String),
            difficulty: expect.any(String),
            distance: expect.any(String),
            rating: expect.any(Number),
            avatar_url: expect.any(String),
          });
        });
    });
    test("GET 400: responds with appropriate error message when given an invalid path", () => {
      return request(app)
        .get("/api/users/invalidid")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });
    test("GET 404: responds with appropriate error message when passed a valid but non existent id", () => {
      return request(app)
        .get("/api/users/0")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User Not Found!");
        });
    });
  })
  describe("POST /api/users/:user_id", () => {
    test("POST 201: creates a new user and responds with the created user", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "testuser",
          email: "testuser@example.com",
          age: "26 - 39",
          bio: "Test user bio",
          region: "Test Region",
          city: "Test City",
          type_of_biking: "Road",
          difficulty: "Intermediate",
          distance: "Test Distance",
          avatar_url: "https://example.com/avatar.jpg",
        })
        .expect(201)
        .then(({ body: { user } }) => {
          expect(user).toMatchObject({
            username: "testuser",
            email: "testuser@example.com",
            age: "26 - 39",
            bio: "Test user bio",
            region: "Test Region",
            city: "test city",
            type_of_biking: "Road",
            difficulty: "Intermediate",
            distance: "Test Distance",
            rating: 0,
            avatar_url: "https://example.com/avatar.jpg",
          });
        });
    });
    test("POST 400: will error when inputting more than 18 character for username", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "testuserlongcharacterstoomany",
          email: "testuser@example.com",
          age: "26 - 39",
          bio: "Test user bio",
          region: "Test Region",
          city: "Test City",
          type_of_biking: "Road",
          difficulty: "Intermediate",
          distance: "Test Distance",
          avatar_url: "https://example.com/avatar.jpg",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Username must be 18 characters or less");
        });
    });
  })
})

describe("/api/users/:user_id/requests", () => {
  describe("GET /api/users/:user_id/requests", () => {
    test("GET 200: responds with an array of users and request details. By default, it includes all pending requests associated with the provided user_id, sorted by request creation time in descending order", () => {
      const user_id = 1;
      return request(app)
        .get(`/api/users/${user_id}/requests`)
        .expect(200)
        .then(({ body: { requests } }) => {
          expect(requests).toHaveLength(2);
          expect(requests).toBeSortedBy("created_at", { descending: true });
        });
    }),
    test("GET 200: responds with an empty array when user do not have any pending requests", () => {
      const user_id = 6;
      return request(app)
        .get(`/api/users/${user_id}/requests`)
        .expect(200)
        .then(({ body: { requests } }) => {
          expect(requests).toEqual([]);
        });
    });
    test("GET 200: responds with an array of objects sorted by created_at and ordered by provided order query", () => {
      const user_id = 1;
      // order: asc, desc
      const order = "asc";
      return request(app)
        .get(`/api/users/${user_id}/requests?order=${order}`)
        .expect(200)
        .then(({ body: { requests } }) => {
          expect(requests).toBeSortedBy("created_at", { descending: false });
        });
    });
    test("GET 200: responds with an array of objects filtered by request status", () => {
      const user_id = 4;
      // status: pending, rejected, accepted
      const status = "accepted";
      return request(app)
        .get(`/api/users/${user_id}/requests?status=${status}`)
        .expect(200)
        .then(({ body: { requests } }) => {
          requests.forEach((request) => {
            expect(request.status).toBe(status);
          });
        });
    });
    test("GET 200: responds with an array of objects filtered by type of request", () => {
      const user_id = 1;
      // type: received, sent, all
      const type = "received";
      // expectIdType: receiver_id, sender_id
      const expectIdType = "receiver_id";
      return request(app)
        .get(`/api/users/${user_id}/requests?type=${type}`)
        .expect(200)
        .then(({ body: { requests } }) => {
          requests.forEach((request) => {
            expect(request[expectIdType]).toBe(user_id);
          });
        });
    });
    describe("errors: ", () => {
      test("GET 404:  responds with appropriate error message when passed a valid but non existent id", () => {
        const user_id = 0;
        return request(app)
          .get(`/api/users/${user_id}/requests`)
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("User Not Found!");
          });
      }),
      test("GET 400: responds with appropriate error message when given an invalid user id", () => {
        const user_id = "invalid_id";
        return request(app)
          .get(`/api/users/${user_id}/requests`)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      }),
      test("GET 400: responds with appropriate error message when given an invalid status", () => {
        const user_id = 1;
        const status = "invalid_id";
        return request(app)
          .get(`/api/users/${user_id}/requests?status=${status}`)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      });
      test("GET 400: responds with appropriate error message when given an invalid type", () => {
        const user_id = 1;
        const type = "invalid_id";
        return request(app)
          .get(`/api/users/${user_id}/requests?type=${type}`)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      });
      test("GET 400: responds with appropriate error message when given an invalid order", () => {
        const user_id = 1;
        const order = "invalid_id";
        return request(app)
          .get(`/api/users/${user_id}/requests?order=${order}`)
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
  describe("POST /api/users/:user_id/requests", () => {
    test("POST 201: returns a new request and ignores unnecessary properties", () => {
      const newRequestBody = {
        sender_id: 2,
        receiver_id: 5,
        to_ignore: "ignore me pls",
      };

      return request(app)
        .post(`/api/users/${newRequestBody.sender_id}/requests`)
        .send(newRequestBody)
        .expect(201)
        .then(({ body: { request } }) => {
          expect(request).toMatchObject({
            request_id: expect.any(Number),
            sender_id: expect.any(Number),
            receiver_id: expect.any(Number),
            created_at: expect.any(String),
            status: "pending",
          });
          expect(request).not.toHaveProperty("to_ignore");
        });
    });
    test("POST 404: returns an error when the receiver_id doesn't exist in the database", () => {
      const newRequestBody = {
        sender_id: 2,
        receiver_id: 0,
      };

      return request(app)
        .post(`/api/users/${newRequestBody.sender_id}/requests`)
        .send(newRequestBody)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User Not Found!");
        });
    });
  });
});

describe("/api/requests", () => {
  describe("DELETE /api/requests/:request_id", () => {
    test("DELETE 204: deletes request and responds with status and no content", () => {
      return request(app).delete("/api/requests/1").expect(204);
    });
    test("DELETE 404: responds with appropriate status and error code for a request ID that does not exist", () => {
      return request(app)
        .delete("/api/requests/9999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Request ID not found");
        });
    });
    test("DELETE 400: responds with appropriate status and error code for invalid request ID", () => {
      return request(app)
        .delete("/api/requests/forklift")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });
  });
  describe("PATCH /api/requests/:request_id", () => {
    test("PATCH 200: updates request status", () => {
      const request_id = 1;
      const newBody = {
        status: "accepted",
      };

      return request(app)
        .patch(`/api/requests/${request_id}`)
        .send(newBody)
        .expect(200)
        .then(({ body: { request } }) => {
          expect(request.status).toBe("accepted");
        });
    });
    test("PATCH 400: request id is invalid", () => {
      const request_id = "invalidid";
      const newBody = {
        status: "accepted",
      };

      return request(app)
        .patch(`/api/requests/${request_id}`)
        .send(newBody)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });
    test("PATCH 404: request id is valid but non existent", () => {
      const request_id = 0;
      const newBody = {
        status: "accepted",
      };

      return request(app)
        .patch(`/api/requests/${request_id}`)
        .send(newBody)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Request ID not found");
        });
    });
  });
});

describe("/api/users/:user_id", () => {
  describe("DELETE /api/users/:user_id", () => {
    test("DELETE 204: deletes the user and returns no content", () => {
      return request(app)
        .delete("/api/users/1")
        .expect(204)
        .then(() => {
          return request(app)
            .get("/api/users/1")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("User Not Found!");
            });
        });
    });
    test("DELETE 404: responds with appropriate error message when the user does not exist", () => {
      return request(app)
        .delete("/api/users/999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User Not Found!");
        });
    });
    test("DELETE 400: responds with appropriate error message when given an invalid user ID", () => {
      return request(app)
        .delete("/api/users/invalid_id")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });
  });
  describe("PATCH /api/users/:user_id", () => {
    test("200: successfully updates the user and responds with the updated user data", async () => {
      const updateData = {
        username: "jonnyDough92",
        email: "yampreek@gmail.com",
        age: "18 - 25",
        bio: "New Bio.",
        region: "North West",
        city: "Manchester",
        type_of_biking: "Mountain",
        difficulty: "Expert",
        distance: "75 km and above",
        avatar_url:
          "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };
  
      const response = await request(app).patch("/api/users/1").send(updateData);
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toMatchObject(updateData);
    });
    test("404: returns an error when trying to update a non-existent user", async () => {
      const UserId = 9999;
      const updateData = {
        username: "jonnyDough92",
        email: "yampreek@gmail.com",
        age: "18 - 25",
        bio: "New Updated.",
        region: "North West",
        city: "Manchester",
        type_of_biking: "Mountain",
        difficulty: "Expert",
        distance: "75 km and above",
        avatar_url:
          "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };
  
      const response = await request(app)
        .patch(`/api/users/${UserId}`)
        .send(updateData);
      expect(response.statusCode).toBe(404);
      expect(response.body.msg).toBe("User Not Found!");
    });
    test("400: returns an error when given invalid data (missing data)", async () => {
      const UserId = "a";
      const updateData = {
        username: "jonnyDough92",
        email: "yampreek@gmail.com",
        age: "18 - 25",
        bio: "New Updated.",
        region: "North West",
        city: "Manchester",
        type_of_biking: "Mountain",
        difficulty: "Expert",
        distance: "75 km and above",
      };
  
      const response = await request(app)
        .patch(`/api/users/${UserId}`)
        .send(updateData);
      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe("Bad Request");
    });
  });
});

describe("/api/users/:user_id/rating", () => {
  test("PATCH 200: responds with correctly updated user rating for a user with 0 ratings", () => {
    return request(app)
      .patch("/api/users/2/rating")
      .send({ new_rating: 3 })
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toMatchObject({
          user_id: expect.any(Number),
          username: expect.any(String),
          email: expect.any(String),
          age: expect.any(String),
          bio: expect.any(String),
          region: expect.any(String),
          city: expect.any(String),
          type_of_biking: expect.any(String),
          difficulty: expect.any(String),
          distance: expect.any(String),
          rating: 3,
          rating_count: 1,
          avatar_url: expect.any(String),
        });
      });
  });
  test("PATCH 200: responds with correctly updated user rating for a user with existing ratings", () => {
    return request(app)
      .patch("/api/users/1/rating")
      .send({ new_rating: 2 })
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toMatchObject({
          user_id: expect.any(Number),
          username: expect.any(String),
          email: expect.any(String),
          age: expect.any(String),
          bio: expect.any(String),
          region: expect.any(String),
          city: expect.any(String),
          type_of_biking: expect.any(String),
          difficulty: expect.any(String),
          distance: expect.any(String),
          rating: 3,
          rating_count: 2,
          avatar_url: expect.any(String),
        });
      });
  });
  test("PATCH 404: responds with correct status and error message when rating a user that does not exist", () => {
    return request(app)
      .patch("/api/users/99999999/rating")
      .send({ new_rating: 2 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User Not Found!");
      });
  });
  test("PATCH 400: responds with correct status and error message when requesting invalid ID", () => {
    return request(app)
      .patch("/api/users/forklift/rating")
      .send({ new_rating: 1 })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request");
      });
  });
});

describe("routing errors", () => {
  test("GET 404: responds with appropriate error message", () => {
    return request(app)
      .get("/api/not-a-route")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found");
      });
  });
});
