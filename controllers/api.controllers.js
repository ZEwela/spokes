const { readEndpoints, readFilters } = require("../models/api.models");

exports.getEndpoints = (req, res, next) => {
  readEndpoints().then((endpoints) => {
    res.status(200).send({ endpoints });
  });
};

exports.getFilters = (req, res, next) => {
  readFilters()
    .then((filters) => {
      console.log(filters);
      res.status(200).send({ filters });
    })
    .catch((error) => {
      console.error("Failed to fetch filters:", error);
      res.status(500).send({ error: "Internal Server Error" });
    });
};
