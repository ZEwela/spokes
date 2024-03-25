const db = require("../connection");
const format = require("pg-format");
const { putDataInArray, convertTimestampToDate } = require("./utils");

function seed({
  userData,
  ageFilters,
  difficultyFilters,
  distanceFilters,
  typeFilters,
  requestsData
}) {
  return db
    .query("DROP TABLE IF EXISTS requests;")
    .then(() => db.query("DROP TABLE IF EXISTS filters;"))
    .then(() => db.query("DROP TABLE IF EXISTS users;"))
    .then(() => createUsers())
    .then(() => createFilters())
    .then(() => createRequests())
    .then(() => insertUsersData(userData))
    .then(() => insertAgeFilters(ageFilters))
    .then(() => insertDifficultyFilters(difficultyFilters))
    .then(() => insertDistanceFilters(distanceFilters))
    .then(() => insertTypeFilters(typeFilters))
    .then(() => insertRequestsData(requestsData))
}

function createUsers() {
  return db.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        age VARCHAR NOT NULL,
        bio VARCHAR,
        region VARCHAR NOT NULL,
        city VARCHAR NOT NULL,
        type_of_biking VARCHAR NOT NULL,
        difficulty VARCHAR NOT NULL,
        distance VARCHAR,
        rating INT,
        avatar_url VARCHAR NOT NULL);`);
}

function insertUsersData(usersToInsert) {
  const userInsertStr = format(
    `INSERT INTO users
        (username, email, age, bio, region, city, type_of_biking, difficulty, distance, rating, avatar_url)
        VALUES %L
        RETURNING *;`,
    putDataInArray(usersToInsert)
  );
  return db.query(userInsertStr);
}

function createFilters() {
  return db.query(`
  CREATE TABLE filters (
    age VARCHAR,
    type VARCHAR,
    difficulty VARCHAR,
    distance VARCHAR
  );`);
}

function createRequests() {
    return db.query(`CREATE TABLE requests (
    request_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(user_id) NOT NULL,
    receiver_id INT REFERENCES users(user_id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR NOT NULL
    );`)  
}

function insertRequestsData(requestsToInsert) {
  const formattedRequestsData = requestsToInsert.map(convertTimestampToDate);
    const requestsInsertStr = format(
        `INSERT INTO requests
        (sender_id, receiver_id, status, created_at) 
        VALUES %L
        RETURNING *;`, 
        putDataInArray(formattedRequestsData)
        )
    return db.query(requestsInsertStr)
}

function insertAgeFilters(filters) {
  const insertStr = format(
    `INSERT INTO filters (age) VALUES %L RETURNING *;`,
    filters.map((filter) => [filter.age])
  );
  return db.query(insertStr);
}

function insertDifficultyFilters(filters) {
  const insertStr = format(
    `INSERT INTO filters (difficulty) VALUES %L RETURNING *;`,
    filters.map((filter) => [filter.difficulty])
  );
  return db.query(insertStr);
}

function insertDistanceFilters(filters) {
  const insertStr = format(
    `INSERT INTO filters (distance) VALUES %L RETURNING *;`,
    filters.map((filter) => [filter.distance])
  );
  return db.query(insertStr);
}

function insertTypeFilters(filters) {
  const insertStr = format(
    `INSERT INTO filters (type) VALUES %L RETURNING *;`,
    filters.map((filter) => [filter.type])
  );
  return db.query(insertStr);
}

module.exports = seed;
