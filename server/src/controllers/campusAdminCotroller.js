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

const AddCampusAdmin = async (req, res) => {
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
    role,
    officeId,
    password,
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
        role,
        officeId: officeId ? officeId : null,
        password: hashPassword,
        status: statusList.pending,
        createdAt: sequelize.literal(`'${formattedDate}'`),
      });

      return res.status(201).json({
        status: "success",
        message: `Verification OTP sent to ${email}`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { AddCampusAdmin };
