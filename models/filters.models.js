const db = require("../db/connection");

exports.readFilters = () => {
    return db
      .query(`SELECT * FROM filters;`)
      .then((result) => {
        return result.rows;
      })
      .catch((error) => {
        console.error("Error querying the database:", error);
        throw error;
      });
  };