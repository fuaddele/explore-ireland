const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: null, // Default to null if no profile picture is provided
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
