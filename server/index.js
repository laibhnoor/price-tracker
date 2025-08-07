const express = require("express");
const cors = require("cors");
const pool = require("./db/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (for testing server is running)
app.get("/", (req, res) => {
  res.send("🚀 Price Tracker Backend is Running");
});

// Load the cron job (this starts scraping every 30s)
require("./cron/scrapeScheduler");

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
