const nodemailer = require("nodemailer");
const { sendEmail, closeTransporter } = require("../utils/sendEmail");

// Mock the nodemailer createTransport method
jest.mock("nodemailer", () => {
  const mockSendMail = jest.fn();
  const mockVerify = jest.fn((callback) => callback(null, true));

  return {
    createTransport: jest.fn(() => ({
      sendMail: mockSendMail,
      verify: mockVerify,
      close: jest.fn(),
    })),
  };
});

afterAll(() => {
  closeTransporter(); // Ensure the transporter is closed after all tests
});

test("should send an email", async () => {
  const mailOptions = {
    from: "example@gmail.com",
    to: "recipient@example.com",
    subject: "Test Email",
    text: "This is a test email",
  };

  await expect(sendEmail(mailOptions)).resolves.not.toThrow();
  expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(
    mailOptions
  );
});
