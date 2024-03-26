const { getUsers, getUsersById, getRequestsByUserId, postRequestByUserId } = require("../controllers/users.controllers");

const usersRouter = require('express').Router();

usersRouter.route("/").get(getUsers);

usersRouter.route("/:user_id").get(getUsersById);

usersRouter.route("/:user_id/requests").get(getRequestsByUserId);

usersRouter.route("/:user_id/requests").post(postRequestByUserId);

module.exports = usersRouter
