module.exports = async (req, res) => {
  if (req.query.password == process.env.EPICPWD) {
    let tokens = process.env.ALLOWED_TOKENS.split("|");
    res.status(200).json({
      token: tokens[Math.floor(Math.random() * tokens.length)],
    });
  } else {
    res.status(400).json({
      error: "Forbidden",
    });
  }
};
