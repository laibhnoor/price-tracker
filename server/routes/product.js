const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const pool = require("../db/db");
const scrapeProduct = require("../scraper/scrapeProduct");

// @route   POST api/products
// @desc    Track a new product by scraping info from URL
// @access  Private
router.post("/", auth, async (req, res) => {
  const { url } = req.body;
  const userId = req.user.id;

  try {
    const { name: productName, price: productPrice, imageUrl } = await scrapeProduct(url);

    if (!productName || !productPrice) {
      return res.status(400).json({ msg: "Failed to scrape product data." });
    }

    const newProduct = await pool.query(
      `INSERT INTO products (user_id, url, name, current_price, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, url, productName, productPrice, imageUrl]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    if (err.code === "23505") {
      return res.status(400).json({ msg: "This product URL is already being tracked." });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/products
// @desc    Get all products tracked by the logged-in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products WHERE user_id = $1 ORDER BY id DESC",
      [req.user.id]
    );
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a tracked product (only if it belongs to the logged-in user)
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const deleteOp = await pool.query(
      "DELETE FROM products WHERE id = $1 AND user_id = $2",
      [productId, userId]
    );

    if (deleteOp.rowCount === 0) {
      return res.status(404).json({ msg: "Product not found or user not authorized." });
    }

    res.json({ msg: "Product removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
