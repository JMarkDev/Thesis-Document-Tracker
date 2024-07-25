const userModel = require("../models/userModel");
const officeModel = require("../models/officeModel");
const otpController = require("../controllers/otpController");
const bcrypt = require("bcryptjs");
const saltsRounds = 10;
const { createdAt } = require("../utils/formattedTime");
const { Sequelize, Op } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const statusList = require("../constants/statusList");
const rolesList = require("../constants/rolesList");

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
    if (!officeName) {
      return res.status(400).json({ message: "Office name is required" });
    }
    const officeExist = await officeModel.findOne({
      where: {
        officeName: officeName,
      },
    });

    if (officeExist) {
      return res.status(400).json({ message: "Office name already exists" });
    }

    const verifyUser = await userModel.findOne({
      where: {
        email,
        status: statusList.verified,
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

      // Create office entry in officeModel
      const office = await officeModel.create({
        officeName: officeName,
        createdAt: createdAt,
      });

      await userModel.create({
        image: newFileName ? `/uploads/${newFileName}` : null,
        firstName,
        lastName,
        middleInitial,
        email,
        birthDate,
        contactNumber,
        designation,
        esuCampus: null,
        role,
        password: hashPassword,
        status: statusList.pending,
        createdAt: createdAt,
        officeId: office.id, // Associate the new office with the user
      });

      return res.status(201).json({
        status: "success",
        message: `Verification OTP sent to ${email}`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Add office error in server" });
  }
};

const getAllOffice = async (req, res) => {
  try {
    const users = await userModel.findAll({
      where: {
        status: statusList.verified,
        [Sequelize.Op.or]: [
          { role: rolesList.admin },
          { role: rolesList.office },
        ],
        // role: rolesList.office,
      },

      include: [
        {
          model: officeModel,
          required: true, // Ensures only users with associated office data are include
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchOffice = async (req, res) => {
  const { name } = req.params;

  try {
    const users = await userModel.findAll({
      where: {
        status: statusList.verified,
        [Op.or]: [{ role: rolesList.admin }, { role: rolesList.office }],
        [Op.or]: [
          { firstName: { [Op.like]: `${name}%` } },
          { lastName: { [Op.like]: `${name}%` } },
          { "$office.officeName$": { [Op.like]: `${name}%` } }, // Added to search in the associated officeName
        ],
      },
      include: [
        {
          model: officeModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOffice,
  getAllOffice,
  searchOffice,
};
