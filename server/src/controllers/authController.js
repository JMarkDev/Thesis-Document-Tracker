const userModel = require("../models/userModel");
const otpController = require("../controllers/otpController");
const bcrypt = require("bcryptjs");
const saltsRounds = 10;
const { createdAt } = require("../utils/formattedTime");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");

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
    officeName,
    role,
    password,
  } = req.body;
  try {
    const officeExist = await userModel.findOne({
      where: {
        officeName: officeName,
        role: "office",
        status: "verified",
      },
    });

    if (officeExist) {
      return res.status(400).json({ message: "Office name already exists" });
    }

    let esuCampusExist;
    if (role === "registrar") {
      esuCampusExist = await userModel.findOne({
        where: {
          esuCampus: esuCampus,
          role: "registrar",
          status: "verified",
        },
      });
    }

    if (esuCampusExist) {
      return res
        .status(400)
        .json({ message: "ESU Campus registrar already exist" });
    }

    let campusAdminExist;
    if (role === "campus_admin") {
      campusAdminExist = await userModel.findOne({
        where: {
          esuCampus: esuCampus,
          role: "campus_admin",
          status: "verified",
        },
      });
    }

    if (campusAdminExist) {
      return res.status(400).json({
        message: "ESU Campus Admin already exist",
      });
    }

    const verifyUser = await userModel.findOne({
      where: {
        email,
        [Sequelize.Op.or]: [{ status: "verified" }, { status: "approved" }],
      },
    });

    if (verifyUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      await userModel.destroy({
        where: {
          email: email,
          status: "pending",
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
        officeName,
        role,
        password: hashPassword,
        status: "pending",
        createdAt: createdAt,
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
        [Sequelize.Op.or]: [{ status: "verified" }, { status: "approved" }],
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //Check if the user is a faculty and their account is approved
    if (user.role === "faculty" && user.status === "verified") {
      return res.status(400).json({
        message: "Please wait for the registrar to approve your account.",
      });
    }

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
