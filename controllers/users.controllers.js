const { selectUsers, selectSingleUser, selectRequestsByUserId, insertRequest, insertUser, updateUserRating ,updateUser, deleteUserById} = require("../models/users.models")

exports.getUsers = (req, res, next) => {
  const {location} = req.query
  selectUsers(location).then((users) => {
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

exports.patchUserRating = (req, res, next) => {
  const { user_id } = req.params;
  const {
    body: { new_rating },
  } = req;
  selectSingleUser(user_id)
    .then(({ rating, rating_count }) => {
      const updatedRating =
        (rating * rating_count + new_rating) / (rating_count + 1);
      const roundedRating = updatedRating.toPrecision(2);
     return updateUserRating(roundedRating, user_id);
    })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err)
    });
};


exports.createUser = (req, res, next) => {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        bio: req.body.bio,
        region: req.body.region,
        city: req.body.city,
        type_of_biking: req.body.type_of_biking,
        difficulty: req.body.difficulty,
        distance: req.body.distance,
        rating: req.body.rating || '0', 
        avatar_url: req.body.avatar_url
    };
    if (newUser.username.length > 18) {
        return res.status(400).json({ msg: "Username must be 18 characters or less" })
    }
    insertUser(newUser)
    .then(user => {
        res.status(201).json({ user });
    })
    .catch(next);
};

exports.postRequestByUserId = (req, res, next) => {
    const body = req.body;

    const promises = [selectSingleUser(body.receiver_id), insertRequest(body)]
    
    Promise.all(promises)
    .then((promisesResolution) => {
      res.status(201).send({ request: promisesResolution[1] });
    })
    .catch((err) => {
      next(err);
    });
}

exports.deleteUser = (req, res, next) => {
    const { user_id } = req.params;
    deleteUserById(user_id)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        next(err);
      });
};
