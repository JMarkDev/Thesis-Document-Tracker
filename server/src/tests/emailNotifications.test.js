const request = require("supertest");
const server = require("../../server");
const { sendNofication } = require("../utils/emailNotifications");

describe("Send notification to email", () => {
  it("should send notification to email after success registration", async () => {
    request(server);
    await sendNofication({
      email: "jmseroy@gmail.com",
      subject: "WMSU-ESU Document Tracker Registration Successful",
      message:
        "Thank you for registering. Your account has been successfully created.",
    });
  });
});
