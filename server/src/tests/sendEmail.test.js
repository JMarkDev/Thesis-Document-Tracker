const nodemailer = require("nodemailer");
const { sendEmail, closeTransporter } = require("../utils/sendEmail");
const { sendNofication } = require("../utils/emailNotifications");

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

describe("Send email to user", () => {
  it("should send an email", async () => {
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

  it("should send notification to email after success registration", async () => {
    // request(server);
    await sendNofication({
      email: "jmseroy@gmail.com",
      subject: "WMSU-ESU Document Tracker Registration Successful",
      message:
        "Thank you for registering. Your account has been successfully created.",
    });
  });
});
