const { sendOTP } = require("../utils/sendOTP");
const otpModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createdAt } = require("../utils/formattedTime");
const { sendNofication } = require("../utils/emailNotifications");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const postOTP = async (email) => {
  try {
    const createdOTP = await sendOTP({
      email: email,
      subject: "WMSU-ESU Document Tracker Verification Code",
      message: "Verify your email with the code below.",
      duration: 5,
    });

    return createdOTP;
  } catch (error) {
    console.error(error);
    throw new Error("Error postOPT AND sending OTP");
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const userData = await userModel.findOne({ where: { email: email } });
    const matchedOTPRecord = await otpModel.findOne({
      where: { email: email },
    });

    const { expiresAt, otp: storedOTP } = matchedOTPRecord;

    // Check if the OTP matches
    const matchOTP = await bcrypt.compare(otp, storedOTP);

    if (!matchedOTPRecord || !matchOTP) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again." });
    }

    if (expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Pleae request a new OTP." });
    }

    const registeredUser = await userModel.findOne({
      where: {
        email: email,
        [Sequelize.Op.or]: [{ status: "verified" }, { status: "approved" }],
      },
    });

    if (!registeredUser) {
      // Update user status if not already registered
      await userModel.update(
        {
          status: "verified",
          updatedAt: createdAt,
        },
        { where: { email: email } }
      );

      await sendNofication({
        email: email,
        subject: "WMSU-ESU Document Tracker Registration Successful",
        message:
          "Thank you for registering. Your account has been successfully created.",
      });
    }
    // Register user and generate tokens
    const { id: userId, email: userEmail, role: userRole } = userData;

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN, {
      expiresIn: "30m",
    });

    // Set secure HTTP-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    }); // 30 minutes
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    }); // 30 minutes

    // Delete the OTP after successful verification
    await otpModel.destroy({ where: { email: email } });

    return res.status(200).json({
      status: "success",
      message: registeredUser
        ? "Login Successful."
        : "Registration Successful.",
      role: userRole,
      userId,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Error verify OTP" });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    await otpModel.destroy({
      where: {
        email: email,
      },
    });

    const createdOTP = await sendOTP({
      email: email,
      subject: "WMSU-ESU Document Tracker Verification Code",
      message: "Verify your email with the code below.",
      duration: 5,
    });

    return res.status(200).json({
      status: "success",
      message: `Successfully resent OTP to ${email}`,
      createdOTP,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Error resending OTP" });
  }
};

module.exports = {
  postOTP,
  verifyOTP,
  resendOTP,
};
