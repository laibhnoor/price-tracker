const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('.pdp-price', { timeout: 10000 });

    const result = await page.evaluate(() => {
      const name = document.querySelector('h1')?.innerText || 'No name';
      const priceText = document.querySelector('.pdp-price')?.innerText || 'Rs. 0';
      const imageElement = document.querySelector('.gallery-preview-panel__image');
      const imageUrl = imageElement?.src || imageElement?.getAttribute('data-src') || '';

      const price = Number(priceText.replace(/[^0-9]/g, ''));
      return { name, price, imageUrl };
    });

    return result;
  } catch (error) {
    console.error('Error scraping product:', error);
    return null;
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = scrapeProduct;
