const mysql = require("mysql");
module.exports = async (req, res) => {
  let q = req.query;
  if (q.username && q.token && q.title && q.url && q.labels) {
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
            if (tokens.includes(q.token) && Boolean(results[0].admin)) {
              connection.query(
                `INSERT INTO sites (title, url, labels) VALUES (${connection.escape(
                  decodeURIComponent(q.title)
                )}, ${connection.escape(
                  decodeURIComponent(q.url)
                )}, ${connection.escape(decodeURIComponent(q.labels))})`,
                (err) => {
                  if (!err) {
                    res.status(200).send(200);
                  } else {
                    console.error(err);
                    res.status(500).send(500);
                  }
                }
              );
            } else {
              console.error("Admin", results[0]);
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
