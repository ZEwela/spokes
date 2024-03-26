const { getFilters, getFilterTypes } = require("../controllers/filters.controllers");

const filtersRouter = require("express").Router();

filtersRouter.route("/").get(getFilters);

filtersRouter.route("/:type").get(getFilterTypes);

module.exports = filtersRouter