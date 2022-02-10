const mysql = require("mysql");
const cryptoRandomString = require("crypto-random-string");
module.exports = async (req, res) => {
  let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  });
  connection.connect((err) => {
    if (err) {
      res.status(502).send(502);
      return;
    }
    console.log("Connected as ID", connection.threadId);
    connection.query(
      `SELECT * FROM users WHERE password = ${connection.escape(
        req.query.password
      )} AND name = ${connection.escape(req.query.username)}`,
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(502).send(502);
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
            )} WHERE name = ${connection.escape(req.query.username)}`
          );
          res.status(200).json({
            token: newToken,
          });
        } else {
          res.status(400).send(400);
        }
      }
    );
  });
};
