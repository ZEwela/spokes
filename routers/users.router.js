const { getUsers, getUsersById, createUser } = require("../controllers/users.controllers");

const usersRouter = require('express').Router();

usersRouter.route("/").get(getUsers).post(createUser);

usersRouter.route("/:user_id").get(getUsersById);

module.exports = usersRouter
