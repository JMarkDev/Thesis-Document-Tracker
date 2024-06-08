const request = require("supertest");
const server = require("../../server");
const { sendOTP } = require("../utils/sendOTP");
const { generatedOTP } = require("../utils/generatedOTP");

describe("Send OTP to email", () => {
  it("should send OTP to email", async () => {
    request(server);
    await sendOTP({
      email: "wmsuesudocumenttracker@gmail.com",
      subject: "WMSU-ESU Document Tracker Verification Code",
      message: "Verify your email with the code below.",
      duration: 5,
    });
  });

  it("should generate OTP", async () => {
    const otp = await generatedOTP();
    expect(otp).toMatch(/^[0-9]{4}$/);
  });
});
