
const { getEndpoints, getFilters } = require("../controllers/api.controllers");

const usersRouter = require('./users.router')

const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints);
apiRouter.get("/filters", getFilters);

module.exports = apiRouter;

apiRouter.use('/users', usersRouter)


