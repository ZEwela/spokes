const {
  getEndpoints,
  getFilters,
  getFilterTypes,
} = require("../controllers/api.controllers");
const requestsRouter = require("./requests.router");

const usersRouter = require("./users.router");

const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints);
apiRouter.get("/filters", getFilters);
apiRouter.get("/filters/:type", getFilterTypes);

apiRouter.use("/users", usersRouter);
apiRouter.use("/requests", requestsRouter)

module.exports = apiRouter;
