const { removeRequestByRequestID, updateRequestByRequestId } = require("../models/requests.models")

exports.deleteRequestByRequestID = (req, res, next) => {
    const {request_id} = req.params
    removeRequestByRequestID(request_id)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
}

exports.patchRequestByRequestId = (req, res, next) => {
    const {request_id} = req.params;
    const {status} = req.body;
    
    updateRequestByRequestId(request_id, status)
    .then((updatedRequest) => {
        res.status(200).send({request: updatedRequest})
    })
    .catch((err) => {
        next(err)
    })
}