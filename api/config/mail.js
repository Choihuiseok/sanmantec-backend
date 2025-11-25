const sgMail = require("@sendgrid/mail");

if (!process.env.SENDGRID_KEY || !process.env.SENDGRID_FROM) {
  console.error("❌ SENDGRID_KEY or SENDGRID_FROM is missing");
}

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports = {
  sendMail: async ({ to, subject, text, html }) => {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      text,
      html: html || text,
    };

    await sgMail.send(msg);
  },
};
