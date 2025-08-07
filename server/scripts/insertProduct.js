const pool = require('../db/db');
const scrapeProduct = require('../scraper/scrapeProduct');

const TEST_URL = 'https://www.daraz.pk/products/newmine-wireless-bluetooth-airpods-stereo-earbuds-for-all-cell-phones-transparent-tpu-protective-case-i517674505-s2451721711.html';

async function insertProduct() {
  try {
    const { name, price } = await scrapeProduct(TEST_URL);

    const result = await pool.query(
      'INSERT INTO products (name, url, current_price) VALUES ($1, $2, $3) RETURNING *',
      [name, TEST_URL, price]
    );

    console.log('✅ Product inserted:', result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to insert product:', err);
  } finally {
    pool.end();
  }
}

insertProduct();
