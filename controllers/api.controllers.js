const difficulty = require("../db/data/test-data/difficulty");
const { readEndpoints, readFilters } = require("../models/api.models");

exports.getEndpoints = (req, res, next) => {
  readEndpoints().then((endpoints) => {
    res.status(200).send({ endpoints });
  });
};


