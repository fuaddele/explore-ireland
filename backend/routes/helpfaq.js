const express = require("express");
const { addHelp } = require("../controllers/helpFaqController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addHelp);

module.exports = router;
