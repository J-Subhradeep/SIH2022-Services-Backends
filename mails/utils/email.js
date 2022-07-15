const path  = require('path');
require("dotenv").config({ path: path.join(__dirname, "../config.env") });
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: process.env.TRANSPORT_PORT,
  secure: false,
  encryption: process.env.TRANSPORT_ENCRYPTION,
  auth: {
    user: process.env.TRANSPORT_USER,
    pass: process.env.TRANSPORT_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});


module.exports = transporter;