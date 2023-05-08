const express = require("express");
const router = express.Router();
const multer = require("multer");
const Contribution = require("../models/Contribution");
const { isAuthenticated } = require("../middlewares/auth");

const upload = multer();

// Submit a contribution
router.post(
  "/submit",
  isAuthenticated,
  upload.single("media"),
  async (req, res) => {
    const { fullName, description, location, contactNumber } = req.body;
    const { user } = req;

    const media = req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : null;

    const newContribution = new Contribution({
      fullName,
      description,
      location: {
        type: "Point",
        coordinates: JSON.parse(location),
      },
      media,
      contactNumber,
      contributor: user._id,
    });

    try {
      await newContribution.save();
      res.status(201).json({ message: "Contribution submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error submitting contribution", error });
    }
  }
);

module.exports = router;
