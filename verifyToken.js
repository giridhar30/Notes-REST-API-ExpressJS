const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "access denied" });

  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_PVT_KEY);
    req.user = verifiedUser;
    if (verifiedUser.email !== "giriit30@gmail.com")
      return res.status(401).json({ error: "user not authorized" });
    next();
  } catch (err) {
    res.status(400).json({ error: "access denied" });
  }
};
