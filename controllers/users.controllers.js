const {
  selectUsers,
  selectSingleUser,
  selectRequestsByUserId,
  updateUser,
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

exports.updateUserById = async (req, res, next) => {
  const { user_id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await updateUser(user_id, updateData);
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};
