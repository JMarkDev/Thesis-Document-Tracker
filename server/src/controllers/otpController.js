const { sendOTP } = require("../utils/sendOTP");
const otpModel = require("../models/otpModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createdAt } = require("../utils/formattedTime");
const { sendNotification } = require("../utils/emailNotifications");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { setTokens } = require("../helpers/tokenHelpers");
const rolesList = require("../constants/rolesList");
const statusList = require("../constants/statusList");
const notificationModel = require("../models/notificationModel");
const { newFacultyNotification } = require("./notificationController");

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
    const {
      role: userRole,
      status,
      firstName,
      lastName,
      middleInitial,
      esuCampus,
      id,
    } = userData;

    // console.log(firstName, lastName, middleInitial, esuCampus);
    // const admin = await userModel.findAll({
    //   where: {
    //     [Sequelize.Op.or]: [
    //       { role: rolesList.admin },
    //       { role: rolesList.admin_staff },
    //       // { role: rolesList.campus_admin },
    //     ],
    //     status: statusList.verified,
    //   },
    // });
    // console.log(admin);

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

    if (new Date(expiresAt).getTime() < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new OTP" });
    }

    const registeredUser = await userModel.findOne({
      where: {
        email: email,
        [Sequelize.Op.or]: [
          { status: statusList.verified },
          { status: statusList.approved },
        ],
      },
    });

    // initialize access token
    let accessToken = null;

    if (!registeredUser) {
      // Update user status if not already registered
      await userModel.update(
        {
          status: statusList.verified,
          updatedAt: createdAt,
        },
        { where: { email: email } }
      );

      await sendNotification({
        email: email,
        subject: "WMSU-ESU Document Tracker Registration Successful",
        message: `${
          userRole === rolesList.faculty
            ? "Thank you for registering. Your account has been successfully created. Please wait for the registrar, campus admin or Dean Office to approve your account."
            : "Thank you for registering. Your account has been successfully created."
        }`,
      });

      if (userRole === rolesList.faculty) {
        await newFacultyNotification({
          firstName: firstName,
          lastName: lastName,
          middleInitial: middleInitial,
          esuCampus: esuCampus,
          faculty_id: id,
        });
      }
    } else {
      //  generate tokens
      const tokens = setTokens(res, { email, userRole });
      accessToken = tokens.accessToken;
    }

    // Delete the OTP after successful verification
    await otpModel.destroy({ where: { email: email } });

    return res.status(200).json({
      status: "success",
      message: registeredUser
        ? "Login Successful."
        : "Registration Successful.",
      role: userRole,
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message, Error: "Error verify OTP" });
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

const verifyChangeEmail = async (req, res) => {
  const { id } = req.params;
  const { email, otp } = req.body;

  try {
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

    await userModel.update(
      {
        email: email,
        updatedAt: createdAt,
      },
      { where: { id: id } }
    );
    // Delete the OTP after successful verification
    await otpModel.destroy({ where: { email: email } });

    return res.status(200).json({
      status: "success",
      message: "Email successfully changed",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postOTP,
  verifyOTP,
  resendOTP,
  verifyChangeEmail,
};
