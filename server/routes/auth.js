const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
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

  res.json({ token, user });
});

module.exports = router;
