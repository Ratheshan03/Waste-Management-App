const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/auth.js");
const contributionRoutes = require("./routes/contributions.js");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contributions", contributionRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from ScrapSaver BE!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
