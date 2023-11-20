const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transport.sendMail({
    from: 'christiantiovanto@gmail.com',
    to: options.to,
    subject: options.subject,
    text: options.message,
  });
};

module.exports = sendMail;
