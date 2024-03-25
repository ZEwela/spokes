const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");

beforeAll(() => seed(data));
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

describe("GET /api/filters", () => {
  test("GET:200 responds with filters data", () => {
    return request(app)
      .get("/api/filters")
      .expect(200)
      .then((res) => {});
  });
});

describe("GET /api/filters/type", () => {
  test("responds with correct filter type", async () => {
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

describe("/users", () => {
  describe("GET requests", () => {
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
    describe("errors", () => {
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
