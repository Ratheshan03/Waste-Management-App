const mongoose = require("mongoose");

const ContributionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("Contribution", ContributionSchema);
