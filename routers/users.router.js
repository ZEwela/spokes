const { getUsers, getUsersById } = require("../controllers/users.controllers");

const usersRouter = require('express').Router();

usersRouter.route("/").get(getUsers);

usersRouter.route("/:user_id").get(getUsersById);

module.exports = usersRouter
