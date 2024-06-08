const request = require("supertest");
const app = require("../../server");
const userModel = require("../models/userModel");
const sequelize = require("../configs/database");
const bcrypt = require("bcryptjs");

jest.mock("../models/userModel.js");

describe("POST authentication", () => {
  // Clear mock calls before all test
  beforeAll(async () => {
    await userModel.create.mockClear();
    await userModel.findOne.mockClear();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("POST should register a new user", async () => {
    const mockNewUser = {
      image: "",
      firstName: "WMSU-ESU",
      lastName: "Document Tracker",
      middleInitial: "A",
      email: "jmseroy@gmail.com",
      birthDate: "10/10/1990",
      contactNumber: "09123456789",
      designation: "Intructor",
      esuCampus: "WMSU-ESU PAGADIAN CAMPUS",
      officeName: "",
      role: "faculty",
      password: "password",
      confirmPassword: "password",
    };

    userModel.create.mockResolvedValue(mockNewUser);

    const response = await request(app)
      .post("/auth/register")
      .send(mockNewUser)
      .expect(201);

    expect(response.body).toEqual({
      status: "success",
      message: `Verification OTP sent to ${mockNewUser.email}`,
    });

    // Check if userModel.create was called once
    expect(userModel.create).toHaveBeenCalledTimes(1);
  }, 10000); // Increase timeout to 20

  it("POST it should login a verified or approved user", async () => {
    const mockUser = {
      email: "wmsuesudocumenttracker@gmail.com",
      password: await bcrypt.hash("password", 10),
      status: "verified",
      role: "admin",
    };

    // Mock the method to find the user
    userModel.findOne.mockResolvedValue(mockUser);

    const loginUser = {
      email: "wmsuesudocumenttracker@gmail.com",
      password: "password",
    };

    const response = await request(app)
      .post("/auth/login")
      .send(loginUser)
      .expect(200);

    expect(response.body).toEqual({
      status: "success",
      message: `Verification OTP sent to ${loginUser.email}`,
    });

    expect(userModel.findOne).toHaveBeenCalledTimes(2); // Check if findOnce was called
  }, 10000);
});
