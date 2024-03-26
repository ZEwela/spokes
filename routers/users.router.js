const {
  getUsers,
  getUsersById,
  getRequestsByUserId,
  updateUserById,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);

usersRouter.route("/:user_id").get(getUsersById).patch(updateUserById);

usersRouter.route("/:user_id/requests").get(getRequestsByUserId);

module.exports = usersRouter;
