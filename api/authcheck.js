const mysql = require("mysql");
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
      `SELECT * FROM users WHERE name = ${connection.escape(
        req.query.username
      )}`,
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(502).send(502);
          return;
        }
        if (results.length > 0) {
          let tokens = results[0].tokens.split(",");
          if (tokens.includes(req.query.token)) {
            res.status(200).send(200);
          } else {
            res.status(400).send(400);
          }
        } else {
          res.send(400).send(400);
        }
      }
    );
  });
};
