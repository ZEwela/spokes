const {
  getUsers,
  getUsersById,
  getRequestsByUserId,
  updateUserById,
  postRequestByUserId,
  createUser,
  patchUserRating,
  deleteUser,
  getAllUsersForLoggedInUser,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers).post(createUser);

usersRouter
  .route("/:user_id")
  .get(getUsersById)
  .patch(updateUserById)
  .delete(deleteUser);

usersRouter.route("/:user_id/recommendation").get(getAllUsersForLoggedInUser);

usersRouter
  .route("/:user_id/requests")
  .get(getRequestsByUserId)
  .post(postRequestByUserId);

usersRouter.route("/:user_id/rating").patch(patchUserRating);

module.exports = usersRouter;
