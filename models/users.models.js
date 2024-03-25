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