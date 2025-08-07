const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // ✅ Wait for price element to load
  await page.waitForSelector('.pdp-price', { timeout: 10000 });

  const result = await page.evaluate(() => {
    const name = document.querySelector('h1')?.innerText || 'No name';

    const priceEl = document.querySelector('.pdp-price');
    const priceText = priceEl ? priceEl.innerText : 'Rs. 0';

    const price = Number(priceText.replace(/[^\d]/g, ''));
    return { name, price };
  });

  await browser.close();
  return result;
}

module.exports = scrapeProduct;
