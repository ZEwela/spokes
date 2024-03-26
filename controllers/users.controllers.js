const { selectUsers, selectSingleUser, insertUser } = require("../models/users.models")

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({users})
    })
}

exports.getUsersById = (req, res, next) => {
    const{ user_id }= req.params;
    selectSingleUser(user_id).then((user) => {
        res.status(200).send({user})
    })
    .catch((err) => {
        next(err)
    })
}

exports.createUser = (req, res, next) => {
    const { username, email, password } = req.body;

    insertUser(username, email, password)
        .then(function(newUser) {
            res.status(201).json({ user: newUser})
        })
        .catch(function(error) {
            next(error)
        });
};