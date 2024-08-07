const nodemailer = require("nodemailer");
const { AUTH_EMAIL, AUTH_GENERATED_PASS } = process.env;

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_GENERATED_PASS,
  },
});

// test transporter
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
    console.log(success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendEmail,
  closeTransporter: () => transporter.close(), // Add this function to close the transporter
};
