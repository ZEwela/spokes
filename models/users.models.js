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

exports.insertUser = (username, email, password) => {
    return db.query(
        `INSERT INTO users (username, email, password) 
         VALUES ($1, $2, $3) RETURNING *;`,
         [username, email, password]
    ).then(({ rows }) => rows[0]);
};