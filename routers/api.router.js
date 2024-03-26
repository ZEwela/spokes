const { getEndpoints } = require("../controllers/api.controllers");
const filtersRouter = require("./filters.router");
const requestsRouter = require("./requests.router");
const usersRouter = require("./users.router");

const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints);

apiRouter.use("/users", usersRouter);
apiRouter.use("/requests", requestsRouter);
apiRouter.use("/filters", filtersRouter);

module.exports = apiRouter;
