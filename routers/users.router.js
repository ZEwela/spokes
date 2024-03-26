const {
  getUsers,
  getUsersById,
  getRequestsByUserId,
  postRequestByUserId,
  createUser,
  patchUserRating,
  deleteRequestByUseID,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(createUser);

usersRouter.route("/:user_id").get(getUsersById);

usersRouter
  .route("/:user_id/requests")
  .get(getRequestsByUserId)
  .post(postRequestByUserId)

usersRouter.route("/:user_id/rating").patch(patchUserRating);

module.exports = usersRouter;
