const { getUsers, getUsersById, getRequestsByUserId, createUser } = require("../controllers/users.controllers");

const usersRouter = require('express').Router();

usersRouter.route("/").get(getUsers).post(createUser);

usersRouter.route("/:user_id").get(getUsersById);

usersRouter.route("/:user_id/requests").get(getRequestsByUserId);

module.exports = usersRouter
