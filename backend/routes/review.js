// routes/review.js
const express = require("express");
const { addReview, getAllReviews, updateReview, deleteReview } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// POST /api/reviews - Add a review
router.post("/", addReview);
router.get("/", getAllReviews);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
