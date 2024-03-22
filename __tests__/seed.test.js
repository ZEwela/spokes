const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');

beforeAll(() => seed(data));
afterAll(() => db.end());

describe('seed', () => {
    describe('users table', () => {
        test('create users table', () => {
            return db
                .query(
                    `SELECT EXISTS (
                        SELECT FROM 
                        information_schema.tables
                        WHERE 
                        table_name = 'users'
                    );`
                )
                .then(({ rows: [{exists}] }) => {
                    expect(exists).toBe(true);
                })
        });
        test("users table has user_id column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'user_id';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("user_id");
            });
        });
        test("users table has username column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'username';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("username");
            });
        });
        test("users table has email column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'email';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("email");
            });
        });
        test("users table has age column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'age';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("age");
            });
        });
        test("users table has bio column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'bio';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("bio");
            });
        });
        test("users table has region column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'region';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("region");
            });
        });
        test("users table has city column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'city';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("city");
            });
        });
        test("users table has type_of_biking column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'type_of_biking';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("type_of_biking");
            });
        });
        test("users table has difficulty column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'difficulty';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("difficulty");
            });
        });
        test("users table has distance column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'distance';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("distance");
            });
        });
        test("users table has rating column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'rating';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("rating");
            });
        });
        test("users table has avatar_url column", () => {
            return db
              .query(
                `SELECT column_name, data_type, column_default
                            FROM information_schema.columns
                            WHERE table_name = 'users'
                            AND column_name = 'avatar_url';`
                )
                .then(({ rows: [column] }) => {
                expect(column.column_name).toBe("avatar_url");
            });
        });
    });
    describe('data insertion', () => {
        test("users data has been inserted correctly", () => {
            return db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
              expect(users).toHaveLength(6);
              users.forEach((user) => {
                expect(user).toHaveProperty("user_id");
                expect(user).toHaveProperty("username");
                expect(user).toHaveProperty("email");
                expect(user).toHaveProperty("age");
                expect(user).toHaveProperty("bio");
                expect(user).toHaveProperty("region");
                expect(user).toHaveProperty("city");
                expect(user).toHaveProperty("type_of_biking");
                expect(user).toHaveProperty("rating");
                expect(user).toHaveProperty("avatar_url");
                expect(user).toHaveProperty("distance");
                expect(user).toHaveProperty("difficulty"); 
              });
            });
        });
    });
});