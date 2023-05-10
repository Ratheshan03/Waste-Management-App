const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const Contribution = require("../models/Contribution");
const { isAuthenticated } = require("../middlewares/auth.js");
const base64Img = require("base64-img");

const upload = multer();

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

    // Run waste detection on the uploaded image
    const base64Image = req.file.buffer.toString("base64");
    console.log("Received image:", base64Image.slice(0, 100) + "...");
    console.log("Received location:", location);

    try {
      const response = await axios.post("http://localhost:5000/detect_waste", {
        base64_image: base64Image, // Changed 'image' to 'base64_image'
      });

      const { waste_detected, wastes_array, output_image } = response.data;

      if (!waste_detected) {
        return res
          .status(400)
          .json({ message: "No waste detected in the image", wastes_array });
      }

      /// Save the detected image to the server
      const imgPath = base64Img.imgSync(
        "data:image/jpeg;base64," + output_image,
        "output",
        "detected_image"
      );
      const imgBuffer = fs.readFileSync(imgPath);
      fs.unlinkSync(imgPath);

      const newContribution = new Contribution({
        fullName,
        description,
        location: {
          type: "Point",
          coordinates: [location.lat, location.lng],
        },
        media,
        contactNumber,
        contributor: user._id,
        detectedWaste: wastes_array,
        detectedImage: {
          data: imgBuffer,
          contentType: "image/jpeg",
        },
      });

      await newContribution.save();
      res.status(201).json({ message: "Contribution submitted successfully" });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Error submitting contribution", error });
    }
  }
);

router.get("/user-contributions", isAuthenticated, async (req, res) => {
  try {
    const { user } = req;
    const contributions = await Contribution.find({ contributor: user._id });

    // Convert binary data to base64 strings
    const contributionsWithBase64Images = contributions.map((contribution) => {
      const base64Image = Buffer.from(contribution.detectedImage.data).toString(
        "base64"
      );
      return {
        ...contribution._doc, // Spread the rest of the contribution properties
        detectedImage: {
          ...contribution.detectedImage, // Spread the rest of the detectedImage properties
          data: base64Image, // Replace data with base64Image
        },
      };
    });

    res.status(200).json(contributionsWithBase64Images);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Error fetching user's contributions" });
  }
});

router.get("/all-contributions", async (req, res) => {
  try {
    const contributions = await Contribution.find({});

    // Convert binary data to base64 strings
    const contributionsWithBase64Images = contributions.map((contribution) => {
      const base64Image = Buffer.from(contribution.detectedImage.data).toString(
        "base64"
      );
      return {
        ...contribution._doc, // Spread the rest of the contribution properties
        detectedImage: {
          ...contribution.detectedImage, // Spread the rest of the detectedImage properties
          data: base64Image, // Replace data with base64Image
        },
      };
    });

    res.status(200).json(contributionsWithBase64Images);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Error fetching contributions" });
  }
});

// Update contribution status
router.put("/update-status/:id", async (req, res) => {
  const { status } = req.body; // Get the new status from the request body

  try {
    // Find the contribution by ID and update its status
    const contribution = await Contribution.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated document
    );

    if (!contribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }

    res.status(200).json(contribution);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Error updating contribution status" });
  }
});

module.exports = router;
