const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'laibh123',
  host: 'localhost',
  port: 5432,           // ← This should be 5432
  database: 'price_tracker' // ← Replace with your actual DB name
});

module.exports = pool;
