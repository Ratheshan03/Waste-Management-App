const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in isAuthenticated middleware:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { isAuthenticated };
