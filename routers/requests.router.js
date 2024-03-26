const { deleteRequestByRequestID } = require("../controllers/requests.controllers");

const requestsRouter = require("express").Router();

requestsRouter.route("/:request_id").delete(deleteRequestByRequestID)

module.exports = requestsRouter