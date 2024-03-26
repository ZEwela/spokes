const seed = require("./seed");
const db = require("../connection");
const data = require("../data/test-data/index.js")


seed(data).then(() => {
  return db.end();
});
