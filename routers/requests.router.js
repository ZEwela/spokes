const { deleteRequestByRequestID, patchRequestByRequestId } = require("../controllers/requests.controllers");

const requestsRouter = require("express").Router();

requestsRouter.route("/:request_id").delete(deleteRequestByRequestID)

requestsRouter.route("/:request_id").patch(patchRequestByRequestId)

module.exports = requestsRouter