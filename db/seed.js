const db = require('./index');
const format = require('pg-format');

function seed() {
    return db
        .query("DROP TABLE IF EXISTS users;")
        .then(() => {
            return createUsers();
        })
}

function createUsers() {
    return db.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        age INT NOT NULL,
        bio VARCHAR,
        region VARCHAR NOT NULL,
        city VARCHAR NOT NULL,
        type_of_biking VARCHAR NOT NULL,
        difficulty VARCHAR NOT NULL,
        distance INT,
        rating INT,
        avatar_url VARCHAR NOT NULL);`
    )
}

module.exports = seed;