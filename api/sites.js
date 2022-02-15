const mysql = require("mysql");
module.exports = async (req, res) => {
  let q = req.query;
  if (q.username && q.token) {
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
        `SELECT * FROM users WHERE name = ${connection.escape(q.username)}`,
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send(500);
            return;
          }
          if (results.length > 0) {
            let tokens = results[0].tokens;
            if (tokens.includes(q.token)) {
              connection.query(`SELECT * FROM sites`, (err, sites) => {
                let resArray = sites.map((v) => Object.assign({}, v));
                resArray.forEach((site) => {
                  site.labels = site.labels.split(",");
                  site.labels.pop();
                });
                res.status(200).json({
                  all: resArray,
                });
              });
            } else {
              res.status(401).send(401);
            }
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
