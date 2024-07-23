const userModel = require("../models/userModel");
const officeModel = require("../models/officeModel");
const otpController = require("../controllers/otpController");
const bcrypt = require("bcryptjs");
const saltsRounds = 10;
const { createdAt } = require("../utils/formattedTime");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");

const addOffice = async (req, res) => {
  const {
    image,
    firstName,
    lastName,
    middleInitial,
    email,
    birthDate,
    contactNumber,
    designation,
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

    const verifyUser = await userModel.findOne({
      where: {
        email,
        status: "verified",
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
        officeName,
        role,
        password: hashPassword,
        status: "pending",
        createdAt: createdAt,
      });

      // Create office entry in officeModel
      await officeModel.create({
        officeName: officeName,
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

const getAllOffice = async (req, res) => {
  try {
    const users = await userModel.findAll({
      where: {
        status: "verified",
      },
      include: officeModel,
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOffice,
  getAllOffice,
};
