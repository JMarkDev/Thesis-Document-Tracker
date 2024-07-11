const request = require("supertest");
const app = require("../../server");
const userModel = require("../models/userModel");
const sequelize = require("../configs/database");

jest.mock("../models/userModel.js");
// Mocking sendEmail transporter
jest.mock("../utils/sendEmail", () => {
  return {
    transporter: {
      verify: jest.fn((callback) => callback(null, true)),
    },
  };
});

describe("PUT /users/approved-faculty/:id", () => {
  // Clear mock calls before all test
  beforeAll(async () => {
    await userModel.update.mockClear();
  });

  afterAll(async () => {
    await sequelize.close();
    jest.clearAllMocks();
  });
  it.skip("should update faculty status into approved", async () => {
    const id = 3;
    const mockResponse = [1]; // Assuming Sequelize's update method returns an array with the number of affected rows

    userModel.update.mockResolvedValue(mockResponse);
    const response = await request(app)
      .put(`/users/approved-faculty/${id}`)
      .expect(200);

    expect(response.body).toEqual({
      status: "success",
      message: "Account approved successfully",
    });
  });

  it("should get user by email", async () => {
    const mockEmail = "jmseroy@gmail.com";

    userModel.findOne.mockResolvedValue(mockEmail);

    const response = await request(app).get(
      `/users/get-user?email=${mockEmail}`
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual(mockEmail);
  });

  it("should search user", async () => {
    const mockName = "josiel mark";

    userModel.findAll.mockResolvedValue(mockName);

    const response = await request(app).get(
      `/users/search/${mockName}/faculty`
    );
    expect(response.status).toBe(200);

    // console.log(response.body);
    expect(response.body).toEqual(mockName);
  });
});
