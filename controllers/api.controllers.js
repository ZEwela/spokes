const difficulty = require("../db/data/test-data/difficulty");
const { readEndpoints, readFilters } = require("../models/api.models");

exports.getEndpoints = (req, res, next) => {
  readEndpoints().then((endpoints) => {
    res.status(200).send({ endpoints });
  });
};

exports.getFilters = (req, res, next) => {
  readFilters()
    .then((filters) => {
      filters = filters[0].data;
      res.status(200).send({ filters });
    })
    .catch((error) => {
      console.error("Failed to fetch filters:", error);
      res.status(500).send({ error: "Internal Server Error" });
    });
};

exports.getFilterTypes = (req, res, next) => {
  const type = req.params.type;
  if (type === "type") {
    readFilters().then((filters) => {
      filters = filters[0].data.type;
      res.status(200).send({ filters });
    });
  } else if (type === "difficulty") {
    readFilters().then((filters) => {
      filters = filters[0].data.difficulty;
      res.status(200).send({ filters });
    });
  } else if (type === "age") {
    readFilters().then((filters) => {
      filters = filters[0].data.age;
      res.status(200).send({ filters });
    });
  } else if (type === "distance") {
    readFilters().then((filters) => {
      filters = filters[0].data.distance;
      res.status(200).send({ filters });
    });
  } else {
    res.status(404).send({ msg: "404 filter does not exist" });
  }
};
