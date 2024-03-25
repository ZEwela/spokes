const { log } = require("console");
const fs = require("fs/promises");
const db = require("../db/connection");

exports.readEndpoints = () => {
  return fs
    .readFile(`${__dirname}/../endpoints.json`, "utf-8")
    .then((endpoints) => {
      return JSON.parse(endpoints);
    });
};

exports.readFilters = () => {
  return db
    .query("SELECT * FROM filters;")
    .then((result) => result.rows)
    .catch((error) => {
      console.error("Error querying the database:", error);
      throw error;
    });
};
