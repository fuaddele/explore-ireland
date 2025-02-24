const mongoose = require("mongoose");

const AccommodationSchema = new mongoose.Schema({
  sector: {
    type: String,
  },
  propertyRegNumber: {
    type: String,
  },
  accountName: {
    type: String,
  },
  rating: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressCityTown: {
    type: String,
  },
  addressCounty: {
    type: String,
  },
  eircodePostalCode: {
    type: String,
  },
  latitude: {
    type: String,
    default: "",
  },
  longitude: {
    type: String,
    default: "",
  },
  owners: {
    type: String,
  },
  totalUnits: {
    type: Number,
  },
  proprietorDescription: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Accommodation", AccommodationSchema);
