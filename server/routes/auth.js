// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// --- Configure Cloudinary ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Configure Multer ---
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @route   POST /signup
 * @desc    Register new user (with optional profile image upload)
 */
router.post("/signup", upload.single("profile_image"), async (req, res) => {
  const { full_name, email, password } = req.body;
  const file = req.file;

  try {
    // Check if email already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let imageUrl = null;

    // If a profile image was uploaded, send to Cloudinary
    if (file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        }).end(file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user to DB
    const newUserQuery = await pool.query(
      `INSERT INTO users (full_name, email, password, profile_image_url)
       VALUES ($1, $2, $3, $4) 
       RETURNING id, full_name, email, created_at, profile_image_url`,
      [full_name, email, hashedPassword, imageUrl]
    );

    const newUser = newUserQuery.rows[0];

    // Create JWT token
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

/**
 * @route   POST /login
 * @desc    Authenticate user and return token
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userQuery.rows[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

    const userForClient = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      profile_image_url: user.profile_image_url,
    };

    res.json({ user: userForClient, token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
