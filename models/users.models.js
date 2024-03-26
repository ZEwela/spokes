const db = require("../db/connection");

exports.selectUsers = () => {
    return db.query(`SELECT * FROM users;`).then(({rows}) => {
        return rows
    })
}

exports.selectSingleUser = (user_id) => {
    return db.query(`SELECT * FROM users WHERE user_id = $1;`, [user_id]).then(({rows}) => {
        const user = rows[0]
        
        if (!user) {
            return Promise.reject({
                status: 404,
                msg: 'User Not Found!'
            })
        }
        return user;
    })
}

exports.selectRequestsByUserId = (user_id, status='pending', order='desc', type="all") => {

    const statusLookUp = ['accepted', 'rejected', 'pending'];
    const orderLookUp = ['asc', 'desc'];
    const typeLookUp = ['all', 'received', 'sent'];

    const queryValues = [user_id]

    if (!typeLookUp.includes(type) || !statusLookUp.includes(status) || !orderLookUp.includes(order)) {
        return Promise.reject({
            status: 400,
            msg: 'Bad Request'
        })
    }
    
    let queryReceivedStr = `SELECT
        *
        FROM users 
        LEFT JOIN requests 
        ON users.user_id = requests.sender_id
        WHERE receiver_id = $1`;

    if (status) {
        queryReceivedStr += ` AND status = $2`
        queryValues.push(status)
    }

    if (type === "all") {
        queryReceivedStr += ' UNION'
    }
    let querySentStr = ` SELECT
        *
        FROM users 
        LEFT JOIN requests 
        ON users.user_id = requests.receiver_id
        WHERE sender_id = $1`

    if (status) {
        querySentStr += ` AND status = $2`
    }

    let queryStr = ''
    if (type === 'all') {
        queryStr += queryReceivedStr + querySentStr
    } else if ( type === 'sent') {
        queryStr = querySentStr
    } else {
        queryStr = queryReceivedStr
    }

    queryStr += ` ORDER BY created_at ${order} ;`

    return db.query(queryStr, queryValues).then(({rows}) => {
        return rows
    })
}

exports.updateUserRating = (updatedRating, user_id) => {
    return db.query(
        `UPDATE users
        SET
        rating = $1,
        rating_count = rating_count + 1
        WHERE user_id = $2
        RETURNING *;`,
        [updatedRating, user_id]
    )
    .then(({rows}) => {
        return rows[0];
    })
}