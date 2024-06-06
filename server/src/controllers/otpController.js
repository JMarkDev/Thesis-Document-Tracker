const { sendOTP } = require("../utils/sendOTP");
const otpModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const date = require("date-and-time");
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
    const userData = await otpModel.findOne({
      // attributes: ["id", "email", "role"],
      where: {
        email: email,
      },
    });

    const matchedOTPRecord = await otpModel.findOne({
      where: {
        email: email,
      },
    });

    const { expiresAt } = matchedOTPRecord;

    const verifyOTPresult = await otpModel.findOne({
      attributes: ["id", "otp"],
      where: {
        email: email,
      },
    });

    if (verifyOTPresult) {
      const matchOTP = await bcrypt.compare(otp, verifyOTPresult.otp);

      if (matchOTP && expiresAt > Date.now()) {
        // update user status
        await userModel.update(
          { status: "verified", updatedAt: new Date() },
          {
            where: {
              email: email,
            },
          }
        );

        // delete the otp after success verification
        await otpModel.destroy({
          where: {
            email: email,
          },
        });

        // register user
        const { id: userId, email: userEmail, role: userRole } = userData;

        const accessToken = jwt.sign(
          { email: email },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "30m",
          }
        );

        const refreshToken = jwt.sign(
          { email: email },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "30m",
          }
        );

        // Set a secure HTTP-only cookie
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 30 * 60 * 1000, // 30 minutes
        });

        // Set a secure HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 30 * 60 * 1000, // 30 minutes
        });

        return res.status(200).json({
          status: "success",
          message: "Registration Successful.",
          token: token,
          role: userRole,
          userId: userId,
        });
      } else if (expiresAt < Date.now() && matchOTP) {
        return res.status(400).json({
          status: "error",
          message: "OTP expired. Please request for a new OTP.",
        });
      } else {
        return res.status(200).json({
          message: "Invalid OTP. Please try again.",
        });
      }
    }
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
