const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  // The title of the review
  title: {
    type: String,
    required: true,
    maxlength: 255, // Optional: You can add any length limit if needed
  },

  // The content or description of the review
  content: {
    type: String,
    required: true,
  },

  // Rating field (assuming a scale of 1 to 5)
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  // Stars field (optional, can be used if you want a second field for rating)
  stars: {
    type: Number,
    min: 1,
    max: 5,
  },

  // Optional field to store the date the review was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Review model
module.exports = mongoose.model("Review", ReviewSchema);
