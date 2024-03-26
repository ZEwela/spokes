const db = require("../db/connection");

exports.selectUsers = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return rows;
  });
};

exports.selectSingleUser = (user_id) => {
  return db
    .query(`SELECT * FROM users WHERE user_id = $1;`, [user_id])
    .then(({ rows }) => {
      const user = rows[0];

      if (!user) {
        return Promise.reject({
          status: 404,
          msg: "User Not Found!",
        });
      }
      return user;
    });
};

exports.selectRequestsByUserId = (
  user_id,
  status = "pending",
  order = "desc",
  type = "all"
) => {
  const statusLookUp = ["accepted", "rejected", "pending"];
  const orderLookUp = ["asc", "desc"];
  const typeLookUp = ["all", "received", "sent"];

  const queryValues = [user_id];

  if (
    !typeLookUp.includes(type) ||
    !statusLookUp.includes(status) ||
    !orderLookUp.includes(order)
  ) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  }

  let queryReceivedStr = `SELECT
        *
        FROM users 
        LEFT JOIN requests 
        ON users.user_id = requests.sender_id
        WHERE receiver_id = $1`;

  if (status) {
    queryReceivedStr += ` AND status = $2`;
    queryValues.push(status);
  }

  if (type === "all") {
    queryReceivedStr += " UNION";
  }
  let querySentStr = ` SELECT
        *
        FROM users 
        LEFT JOIN requests 
        ON users.user_id = requests.receiver_id
        WHERE sender_id = $1`;

  if (status) {
    querySentStr += ` AND status = $2`;
  }

  let queryStr = "";
  if (type === "all") {
    queryStr += queryReceivedStr + querySentStr;
  } else if (type === "sent") {
    queryStr = querySentStr;
  } else {
    queryStr = queryReceivedStr;
  }

  queryStr += ` ORDER BY created_at ${order} ;`;

  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows;
  });
};

exports.updateUser = async (userId, updateData) => {
  try {
    await this.selectSingleUser(userId);

    const requiredFields = [
      "username",
      "email",
      "age",
      "bio",
      "region",
      "city",
      "type_of_biking",
      "difficulty",
      "distance",
      "avatar_url",
    ];

    const isMissingFields = requiredFields.some(
      (field) => !(field in updateData) || updateData[field] === undefined
    );

    if (isMissingFields) {
      return Promise.reject({
        status: 400,
        msg: "Bad Request: Missing required update data fields.",
      });
    }

    const { rows } = await db.query(
      `UPDATE users SET 
                username = $1, 
                email = $2, 
                age = $3, 
                bio = $4, 
                region = $5, 
                city = $6, 
                type_of_biking = $7, 
                difficulty = $8, 
                distance = $9, 
                avatar_url = $10
              WHERE user_id = $11 RETURNING *;`,
      [
        updateData.username,
        updateData.email,
        updateData.age,
        updateData.bio,
        updateData.region,
        updateData.city,
        updateData.type_of_biking,
        updateData.difficulty,
        updateData.distance,
        updateData.avatar_url,
        userId,
      ]
    );

    return rows[0];
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.error(
        "Update error:",
        error.msg || "Unexpected error during update."
      );
    }

    throw error;
  }
};
