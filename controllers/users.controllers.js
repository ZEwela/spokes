const { selectUsers, selectSingleUser } = require("../models/users.models")

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