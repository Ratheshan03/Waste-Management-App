const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Contribution = require("../models/Contribution.js"); // Add this line
const multer = require("multer");
const upload = multer();

// Register route
router.post("/register", upload.single("profilePicture"), async (req, res) => {
  const { email, password, role, organization } = req.body;
  const profilePicture = req.file
    ? {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    : null;

  // Add this validation check for required fields
  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // encryting the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    password: hashedPassword,
    role,
    organization,
    profilePicture,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    "your_jwt_secret",
    {
      expiresIn: "7d",
    }
  );

  // Convert user._id to string
  const userWithIdAsString = user.toObject();
  userWithIdAsString._id = user._id.toString();

  res.json({ token, user: userWithIdAsString });
});

// Get user by ID route
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add this route to your router
router.post("/save", async (req, res) => {
  try {
    const { userId, contributionId } = req.body;

    const user = await User.findById(userId);
    const contribution = await Contribution.findById(contributionId);

    if (!user || !contribution) {
      return res
        .status(404)
        .json({ message: "User or contribution not found" });
    }

    user.savedContributions.push(contribution);
    contribution.isSaved = true; // update the isSaved flag

    await user.save();
    await contribution.save();

    res.json({ message: "Contribution saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's own contributions
router.get("/contributions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const contributions = await Contribution.find({ contributor: userId });
    res.json(contributions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's saved contributions
router.get("/saved-contributions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("savedContributions");

    res.json(user.savedContributions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
