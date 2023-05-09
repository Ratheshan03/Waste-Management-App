const express = require("express");
const router = express.Router();
const multer = require("multer");
const { exec } = require("child_process");
const Contribution = require("../models/Contribution");
const { isAuthenticated } = require("../middlewares/auth.js");

const upload = multer();

async function detectWaste(imageBuffer) {
  return new Promise((resolve, reject) => {
    const pythonProcess = exec(
      "python ./scripts/detect_waste.py",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing detect_waste.py: ${error}`);
          reject(error);
        } else {
          const lines = stdout.split("\n");
          const jsonLine = lines.find((line) => line.startsWith("{"));
          if (jsonLine) {
            try {
              const result = JSON.parse(jsonLine);
              resolve(result);
            } catch (error) {
              console.error("Error parsing JSON:", error);
              console.error("Unexpected stdout:", jsonLine);
              reject(error);
            }
          } else {
            console.error("No JSON found in stdout:", stdout);
            reject(new Error("No JSON found in stdout"));
          }
        }
      }
    );

    pythonProcess.stdin.write(imageBuffer);
    pythonProcess.stdin.end();
  });
}

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
    const wasteDetectionResult = await detectWaste(base64Image);
    const wasteDetected = wasteDetectionResult.waste_detected;
    const wastesArray = wasteDetectionResult.wastes_array;

    console.log("Waste detection results:", wastesArray);

    if (!wasteDetected) {
      return res
        .status(400)
        .json({ message: "No waste detected in the image" });
    }

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
