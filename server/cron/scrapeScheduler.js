const cron = require('node-cron');
const pool = require('../db/db');
const scrapeProduct = require('../scraper/scrapeProduct');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();


// ⏱️ Run every 30 seconds
cron.schedule('*/30 * * * * *', async () => {
  console.log('🔁 Cron job running at', new Date().toLocaleTimeString());

  try {
    const products = await pool.query('SELECT * FROM products');
    console.log(`📦 Found ${products.rowCount} product(s) to check`);

    for (let product of products.rows) {
      console.log(`🔍 Scraping price for: ${product.name}`);
      const { price } = await scrapeProduct(product.url);

      if (!price || isNaN(price)) {
        console.log(`⚠️ Failed to fetch valid price for ${product.name}`);
        continue;
      }

      if (price < product.current_price) {
        console.log(`✅ Price dropped for ${product.name}: ${product.current_price} → ${price}`);

        await pool.query(
          'UPDATE products SET current_price = $1, last_checked = NOW() WHERE id = $2',
          [price, product.id]
        );

        await pool.query(
          'INSERT INTO price_history (product_id, price) VALUES ($1, $2)',
          [product.id, price]
        );

        await sendEmail({ ...product, current_price: price });
        console.log(`📧 Email sent for ${product.name}`);
      } else {
        console.log(`ℹ️ No price drop for ${product.name}. Current: ${product.current_price}, Latest: ${price}`);
      }
    }
  } catch (err) {
    console.error('❌ Cron job failed with error:', err);
  }

  console.log('✅ Job completed at', new Date().toLocaleTimeString());
});
