const mysql = require("mysql");
const cryptoRandomString = require("crypto-random-string");
module.exports = async (req, res) => {
  let q = req.query;
  if (q.username && q.password) {
    let connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });
    connection.connect((err) => {
      if (err) {
        res.status(500).send(500);
        return;
      }
      console.log("Connected as ID", connection.threadId);
      connection.query(
        `SELECT * FROM users WHERE password = ${connection.escape(
          q.password
        )} AND name = ${connection.escape(q.username)}`,
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send(500);
            return;
          }
          if (results.length > 0) {
            let tokens = results[0].tokens;
            if (tokens.split(",").length > 15) {
              console.log("Purging user tokens");
              tokens = "";
            }
            const newToken = cryptoRandomString(32);
            tokens += newToken + ",";
            connection.query(
              `UPDATE users SET tokens = ${connection.escape(
                tokens
              )} WHERE name = ${connection.escape(q.username)}`
            );
            res.status(200).json({
              token: newToken,
              isAdmin: Boolean(results[0].admin),
            });
          } else {
            res.status(401).send(401);
          }
        }
      );
    });
  } else {
    res.status(400).send(400);
  }
};
