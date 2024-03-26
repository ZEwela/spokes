const { removeRequestByRequestID } = require("../models/requests.models")

exports.deleteRequestByRequestID = (req, res, next) => {
    const {request_id} = req.params
    removeRequestByRequestID(request_id)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
}