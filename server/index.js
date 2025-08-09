const express = require("express");
const cors = require("cors");
const pool = require("./db/db");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Price Tracker Backend is Running");
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", require("./routes/product")); 

// Start cron job
require("./cron/scrapeScheduler");

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
