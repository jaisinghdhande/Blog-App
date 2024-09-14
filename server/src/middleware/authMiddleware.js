const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

module.exports.authMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized",
    });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }
    req.userInfo = info;
    next();
  });
};
