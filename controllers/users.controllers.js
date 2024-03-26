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
        next(err)
    })
}

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