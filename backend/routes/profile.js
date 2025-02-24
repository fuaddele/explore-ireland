const express = require("express");
const upload = require("../multer");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getProfile);

router.put("/", authMiddleware, upload.single("profilePic"), updateProfile);
module.exports = router;
