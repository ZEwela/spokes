const {
  selectUsers,
  selectSingleUser,
  selectRequestsByUserId,
  updateUserRating,
} = require("../models/users.models");

exports.getUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getUsersById = (req, res, next) => {
  const { user_id } = req.params;
  selectSingleUser(user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getRequestsByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const { status, order, type } = req.query;

  const promises = [
    selectSingleUser(user_id),
    selectRequestsByUserId(user_id, status, order, type),
  ];
  Promise.all(promises)
    .then((resolvePromises) => {
      res.status(200).send({ requests: resolvePromises[1] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchUserRating = (req, res, next) => {
  const { user_id } = req.params;
  const {
    body: { new_rating },
  } = req;
  selectSingleUser(user_id)
    .then(({ rating, rating_count }) => {
      const updatedRating =
        (rating * rating_count + new_rating) / (rating_count + 1);
     return  updateUserRating(updatedRating, user_id);
    })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
