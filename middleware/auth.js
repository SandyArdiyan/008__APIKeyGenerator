const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = function (req, res, next) {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ message: "Authorization token required" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.admin = decoded;
    next();

  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
