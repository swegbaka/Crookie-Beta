const nodemailer = require("nodemailer");
const { loadEmailConfig } = require("./config/environment");

const sendemail = async (options) => {
  // Email is optional at startup; validate it when a reset email is requested.
  const { from, ...transportOptions } = loadEmailConfig();
  const transporter = nodemailer.createTransport(transportOptions);

  await transporter.sendMail({
    from,
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};

module.exports = sendemail;
