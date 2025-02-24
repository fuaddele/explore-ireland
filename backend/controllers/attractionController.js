// controllers/attractionController.js
const Attraction = require("../models/Attraction");

// Add a new featured attraction
exports.addAttraction = async (req, res) => {
  const { attractionName, description, rating, stars } = req.body;

  try {
    const review = new Review({
      user: req.user, // User ID from the token
      attractionName,
      description,
      rating,
      stars,
    });

    await review.save();
    res.status(201).json({ msg: "Review added successfully", review });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all featured attractions
exports.getAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.json(attractions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get attraction details by ID
exports.getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) {
      return res.status(404).json({ msg: "Attraction not found" });
    }
    res.json(attraction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
