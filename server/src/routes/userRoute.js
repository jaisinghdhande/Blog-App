const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} = require("../controllers/userController");

const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/profile", authMiddleware, getProfile);

router.post("/logout", authMiddleware, logoutUser);

module.exports = router;
