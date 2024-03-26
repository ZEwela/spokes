const { selectUsers, selectSingleUser, selectRequestsByUserId, insertRequest } = require("../models/users.models")

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

exports.getRequestsByUserId = (req, res, next) => {
    const { user_id } = req.params;
    const { status, order, type } = req.query;

    const promises = [selectSingleUser(user_id), selectRequestsByUserId(user_id, status, order, type)]
    Promise.all(promises).then((resolvePromises) => {
        res.status(200).send({requests: resolvePromises[1]})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}

exports.postRequestByUserId = (req, res, next) => {
    const { user_id } = req.params;
    const body = req.body;


    insertRequest(body)
    .then((request) => {
      res.status(201).send({ request });
    })
    .catch((err) => {
        console.log(err)
      next(err);
    });
}