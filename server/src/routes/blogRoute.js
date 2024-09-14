const express = require("express");
const router = express.Router();
const {
  getBlog,
  getBlogById,
  createBlog,
} = require("../controllers/blogController");
const { authMiddleware } = require("../middleware/authMiddleware");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", authMiddleware, getBlog);

router.get("/:id", authMiddleware, getBlogById);

router.post("/", authMiddleware, upload.single("files"), createBlog);

module.exports = router;
