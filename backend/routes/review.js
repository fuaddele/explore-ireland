// routes/review.js
const express = require("express");
const { addReview, getAllReviews } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// POST /api/reviews - Add a review
router.post("/", addReview);
router.get("/", getAllReviews);

module.exports = router;
