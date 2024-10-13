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

    const officeExist = await userModel.findOne({
      where: {
        status: statusList.verified,
        role: rolesList.office,
      },
      include: [
        {
          model: officeModel,
          where: { officeName },
          required: true,
        },
      ],
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
    }

    const pendingUser = await userModel.findOne({
      where: {
        email,
        status: statusList.pending,
      },
      include: officeModel,
    });

    if (pendingUser && pendingUser.officeId) {
      await officeModel.destroy({
        where: { id: pendingUser.officeId },
      });

      await userModel.destroy({
        where: {
          email,
          status: statusList.pending,
        },
      });
    }

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Add office error in server" });
  }
};

const addOfficeStaff = async (req, res) => {
  const {
    image,
    firstName,
    lastName,
    middleInitial,
    email,
    birthDate,
    contactNumber,
    designation,
    officeId, // This identifies which office the staff belongs to
    password,
  } = req.body;

  try {
    // Basic validation
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    // Check if a user with the same email already exists
    const verifyUser = await userModel.findOne({
      where: { email, status: statusList.verified },
    });

    if (verifyUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const pendingUser = await userModel.findOne({
      where: { email, status: statusList.pending },
    });

    // Clean up previous pending user if exists
    if (pendingUser && pendingUser.officeId) {
      await userModel.destroy({
        where: { id: pendingUser.id },
      });
    }

    // send OTP to email for verification (optional)
    await otpController.postOTP(email);

    // Upload image if provided
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

    // Create a new office staff user associated with the office
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
      role: rolesList.office_staff, // Ensure the role is office_staff
      password: hashPassword,
      status: statusList.pending,
      createdAt: createdAt,
      officeId: officeId, // Associate the staff with the existing office
    });

    return res.status(201).json({
      status: "success",
      message: `Office staff added successfully and verification OTP sent to ${email}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Error adding office staff" });
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

const getAllStaffById = async (req, res) => {
  const { officeId } = req.params;
  try {
    const users = await userModel.findAll({
      where: {
        status: statusList.verified,
        role: rolesList.office_staff,
        officeId,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteStaff = async (req, res) => {
  const { email } = req.params;
  try {
    await userModel.destroy({
      where: { email },
    });
    return res.status(200).json({ message: "Staff deleted successfully" });
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

const updateOffice = async (req, res) => {
  const { id } = req.params;
  const {
    image,
    firstName,
    lastName,
    middleInitial,
    birthDate,
    contactNumber,
    designation,
    officeName,
    password,
  } = req.body;

  try {
    if (!officeName) {
      return res.status(400).json({ message: "Office name is required" });
    }

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

    await userModel.update(
      {
        image: newFileName ? `/uploads/${newFileName}` : image,
        firstName: firstName,
        lastName: lastName,
        middleInitial: middleInitial,
        birthDate: birthDate,
        contactNumber: contactNumber,
        designation: designation,
        password: hashPassword,
        updatedAt: createdAt,
      },
      {
        where: { id },
      }
    );

    // Fetch the officeId from the userModel
    const user = await userModel.findOne({ where: { id } });

    if (!user || !user.officeId) {
      return res.status(404).json({ message: "Office not found" });
    }

    await officeModel.update(
      {
        officeName: officeName,
        updatedAt: createdAt,
      },
      {
        where: { id: user.officeId },
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Office updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const updateStaff = async (req, res) => {
  const { email } = req.params;
  const {
    image,
    firstName,
    lastName,
    middleInitial,
    birthDate,
    contactNumber,
    designation,
    password,
  } = req.body;

  try {
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

    await userModel.update(
      {
        image: newFileName ? `/uploads/${newFileName}` : image,
        firstName: firstName,
        lastName: lastName,
        middleInitial: middleInitial,
        birthDate: birthDate,
        contactNumber: contactNumber,
        designation: designation,
        password: hashPassword,
        updatedAt: createdAt,
      },
      {
        where: { email },
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Staff updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getRegistrar = async (req, res) => {
  const { esuCampus } = req.params;
  try {
    const registrar = await userModel.findOne({
      where: {
        esuCampus,
        status: statusList.verified,
        role: rolesList.registrar,
      },
    });
    return res.status(200).json(registrar);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOffice,
  addOfficeStaff,
  updateOffice,
  getAllOffice,
  searchOffice,
  getRegistrar,
  getAllStaffById,
  deleteStaff,
  updateStaff,
};
