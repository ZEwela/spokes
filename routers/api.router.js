const { getEndpoints, getFilters } = require("../controllers/api.controllers");

const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints);
apiRouter.get("/filters", getFilters);

module.exports = apiRouter;
