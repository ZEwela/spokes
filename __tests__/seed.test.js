const db = require('../db/index');
const seed = require('../db/seed');
const data = require('');

beforeAll(() => seed());
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
    });
});