
const { getUsers, getUsersById, getRequestsByUserId, postRequestByUserId, createUser, patchUserRating } = require("../controllers/users.controllers");


const usersRouter = require('express').Router();

usersRouter.route("/").get(getUsers).post(createUser);

usersRouter.route("/:user_id").get(getUsersById);

usersRouter.route("/:user_id/requests").get(getRequestsByUserId);

usersRouter.route("/:user_id/rating").patch(patchUserRating)

usersRouter.route("/:user_id/requests").post(postRequestByUserId);



module.exports = usersRouter
