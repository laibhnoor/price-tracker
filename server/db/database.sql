-- database.sql

-- Users (optional, for later personalization)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL
);

-- Products being tracked
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  current_price NUMERIC NOT NULL,
  last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Price history log
CREATE TABLE IF NOT EXISTS price_history (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  price NUMERIC NOT NULL,
  checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wishlist: Which user is tracking which product (optional for now)
CREATE TABLE IF NOT EXISTS wishlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE (user_id, product_id)
);

