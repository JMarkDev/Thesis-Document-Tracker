const request = require("supertest");
const app = require("../../server");
const otpController = require("../controllers/otpController");
const userModel = require("../models/userModel");
const otpModel = require("../models/otpModel");
const sequelize = require("../configs/database");
// const sequelize = require("../configs/database");

jest.mock("../models/userModel.js");

describe("POST /auth/register", () => {
  // Clear mock calls before all test
  beforeAll(async () => {
    await userModel.create.mockClear();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("POST should register a new user", async () => {
    const mockNewUser = {
      image: "image",
      firstName: "Jark",
      lastName: "Soy",
      middleInitial: "M",
      email: "jy@gmail.com",
      designation: "Intructor",
      esuCampus: "WMSU-ESU PAGADIAN CAMPUS",
      officeName: "",
      role: "faculty",
      password: "password",
      status: "pending",
    };

    userModel.create.mockResolvedValue(mockNewUser);

    const response = await request(app)
      .post("/auth/register")
      .send(mockNewUser)
      .expect(201);

    expect(response.body).toEqual({
      status: "success",
      message: `Verification OTP send to ${mockNewUser.email}`,
    });

    // Check if userModel.create was called once
    expect(userModel.create).toHaveBeenCalledTimes(1);

    // expect(userModel.create).toHaveBeenCalledWith(mockNewUser);
    // Check if userModel.create was called with the correct data
  });
});
