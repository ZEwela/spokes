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
