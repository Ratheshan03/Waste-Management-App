const mongoose = require("mongoose");

const ContributionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  media: {
    data: Buffer,
    contentType: String,
  },
  contactNumber: { type: String, required: true },
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  detectedWaste: [
    {
      name: String,
      confidence: Number,
      x1: Number,
      y1: Number,
      x2: Number,
      y2: Number,
    },
  ],
  detectedImage: {
    data: Buffer,
    contentType: String,
  },
});

// Create index on the location field for faster geospatial queries
ContributionSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Contribution", ContributionSchema);
