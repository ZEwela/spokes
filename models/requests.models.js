const db = require("../db/connection");

exports.removeRequestByRequestID = (request_id) => {
  return db
    .query(
      `DELETE FROM requests
    WHERE request_id = $1
    RETURNING *;`,
      [request_id]
    )
    .then(({ rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Request ID not found" });
      }
    });
};

exports.updateRequestByRequestId = (request_id, status) => {
  return db.query(
    `UPDATE requests 
    SET status = $1 
    WHERE request_id = $2
    RETURNING *;`, [status, request_id]
  )
  .then(({rows}) => {
    if(!rows[0]) {
      return Promise.reject({ status: 404, msg: "Request ID not found"})
    }
    return rows[0]
  })
}