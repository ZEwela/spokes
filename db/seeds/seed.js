const db = require('../connection');
const format = require('pg-format');
const { putDataInArray } = require('./utils');

function seed({userData}) {
    return db
        .query("DROP TABLE IF EXISTS users;")
        .then(() => {
            return createUsers();
        })
        .then(() => {
            return insertUsersData(userData);
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

function insertUsersData(usersToInsert) {
    const userInsertStr = format(
        `INSERT INTO users
        (username, email, age, bio, region, city, type_of_biking, difficulty, distance, rating, avatar_url)
        VALUES %L
        RETURNING *;`,
        putDataInArray(usersToInsert)
    )
    return db.query(userInsertStr)
}

module.exports = seed;