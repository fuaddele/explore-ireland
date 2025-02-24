// routes/attraction.js
const express = require("express");
const {
  addAttraction,
  getAttractions,
  getAttractionById,
} = require("../controllers/attractionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// POST /api/attractions - Add a new attraction (protected, requires token)
router.post("/", authMiddleware, addAttraction);

// GET /api/attractions - Get all featured attractions
router.get("/", getAttractions);

// GET /api/attractions/:id - Get specific attraction details
router.get("/:id", getAttractionById);

module.exports = router;
