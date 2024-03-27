const seed = require("./seed");
const db = require("../connection");
const data = require("../data/test-data/index.js")

const runSeed = () => {
  return seed(data).then(() => db.end());
}

runSeed();