const userModel = require("../models/userModel");
const otpController = require("../controllers/otpController");
const bcrypt = require("bcryptjs");
const saltsRounds = 10;
const sequelize = require("../configs/database");
// const { createdAt } = require("../utils/formattedTime");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const rolesList = require("../constants/rolesList");
const statusList = require("../constants/statusList");
const date = require("date-and-time");

const handleRegister = async (req, res) => {
  const {
    image,
    firstName,
    lastName,
    middleInitial,
    email,
    birthDate,
    contactNumber,
    designation,
    esuCampus,
    employmentStatus,
    role,
    officeId,
    password,
    status,
  } = req.body;
  try {
    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD HH:mm:ss", true); // true for UTC time;

    const verifyUser = await userModel.findOne({
      where: {
        email,
        [Sequelize.Op.or]: [
          { status: statusList.verified },
          { status: statusList.approved },
        ],
      },
    });

    if (verifyUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      await userModel.destroy({
        where: {
          email: email,
          status: statusList.pending,
        },
      });

      // send OTP to email
      await otpController.postOTP(email);

      // upload image
      let newFileName = null;
      if (req.file) {
        let filetype = req.file.mimetype.split("/")[1];
        newFileName = req.file.filename + "." + filetype;
        fs.rename(
          `./uploads/${req.file.filename}`,
          `./uploads/${newFileName}`,
          async (err) => {
            if (err) throw err;
            console.log("uploaded successfully");
          }
        );
      }

      const hashPassword = await bcrypt.hash(password, saltsRounds);

      await userModel.create({
        image: newFileName ? `/uploads/${newFileName}` : null,
        firstName,
        lastName,
        middleInitial,
        email,
        birthDate,
        contactNumber,
        designation,
        esuCampus,
        employmentStatus: employmentStatus ? employmentStatus : null,
        role,
        officeId: officeId ? officeId : null,
        password: hashPassword,
        status: status ? status : statusList.pending,
        createdAt: sequelize.literal(`'${formattedDate}'`),
      });

      return res.status(201).json({
        status: "success",
        message: `Verification OTP sent to ${email}`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Register error in server" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      where: {
        email: email,
        [Sequelize.Op.or]: [
          { status: statusList.verified },
          { status: statusList.approved },
        ],
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //Check if the user is a faculty and their account is approved
    if (
      user.role === rolesList.faculty &&
      user.status === statusList.verified
    ) {
      return res.status(400).json({
        message:
          "Please wait for the Registrar, Campus Admin, or Dean Office to approve your account.",
      });
    }

    if (
      (user.role === rolesList.campus_admin &&
        user.status === statusList.verified) ||
      (user.role === rolesList.registrar && user.status === statusList.verified)
    ) {
      return res.status(400).json({
        message: "Please wait for the Dean Office to approve your account.",
      });
    }

    // if (
    //   user.role === rolesList.registrar &&
    //   user.status === statusList.verified
    // ) {
    //   return res.status(400).json({
    //     message: "Please wait for the Dean Office to approve your account.",
    //   });
    // }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      await otpController.postOTP(email);
      return res.status(200).json({
        status: "success",
        message: `Verification OTP sent to ${email}`,
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Login error in server" });
  }
};

const handleLogout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ status: "success", message: "Logout successful" });
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
};
