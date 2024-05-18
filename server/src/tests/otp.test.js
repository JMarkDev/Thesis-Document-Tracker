const request = require("supertest");
const app = require("../../server");
const { sendOTP } = require("../utils/sendOTP");

describe("Send OTP to email", () => {
  test("It should send OTP to email", async () => {
    request(app);
    await sendOTP({
      email: "jmseroy@gmail.com",
      subject: "WMSU-ESU Document Tracker Registration",
      message: "Verify your email with the code below.",
      duration: 5,
    });
  });
});
