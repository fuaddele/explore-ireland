// backend/models/faq.js
const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  faq: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;
