const nodemailer = require('nodemailer');
require('dotenv').config();  // ⬅️ Add this line at the top

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendAlertEmail(product) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to:  process.env.EMAIL_USER,
    subject: `📉 Price Drop: ${product.name}`,
    text: `New price: Rs. ${product.current_price}\nLink: ${product.url}`
  });
}

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

module.exports = sendAlertEmail;
