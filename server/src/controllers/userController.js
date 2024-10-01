const { Sequelize, Op } = require("sequelize");
const userModel = require("../models/userModel");
const officeModel = require("../models/officeModel");
const { createdAt } = require("../utils/formattedTime");
const { sendNotification } = require("../utils/emailNotifications");
const statusList = require("../constants/statusList");
const rolesList = require("../constants/rolesList");
const otpController = require("./otpController");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const saltsRounds = 10;

const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await userModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ Error: "Get user by email error in server" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({
      where: {
        id: id,
        [Sequelize.Op.or]: [
          { status: statusList.verified },
          { status: statusList.approved },
        ],
      },
      include: [
        {
          model: officeModel,
          required: false,
        },
      ],
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const verifiedUser = await userModel.findAll({
      where: {
        [Sequelize.Op.or]: [
          { status: statusList.verified },
          { status: statusList.approved },
        ],
      },
    });
    return res.status(200).json(verifiedUser);
  } catch (error) {
    return res.status(500).json({ Error: "Get all users error in server" });
  }
};

const approveFaculty = async (req, res) => {
  const { id, email } = req.params;

  try {
    await userModel.update(
      {
        status: statusList.approved,
        updatedAt: createdAt,
      },
      {
        where: {
          id: id,
        },
      }
    );

    await sendNotification({
      email: email,
      subject: "WMSU-ESU Document Tracker Account",
      message:
        "Your account has been approved successfully. You can now log in and start uploading your documents",
    });

    return res.status(200).json({
      status: "success",
      message: "Account approved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Approved faculty error in server" });
  }
};

const getUserByRole = async (req, res) => {
  const { role } = req.query;

  try {
    const user = await userModel.findAll({
      where: {
        role: role,
        [Sequelize.Op.or]: [
          { status: statusList.verified },
          { status: statusList.approved },
        ],
      },
      include: [
        {
          model: officeModel,
          required: false,
        },
      ],
    });
    if (!user) {
      return res.status(400).json({
        message: "No user found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ Error: "Get user by role error in server" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    } else {
      const officeId = user.officeId;
      await user.destroy();

      // Delete the associated office if the user is an office
      if (officeId) {
        const office = await officeModel.findByPk(officeId);
        await office.destroy();
      }
      return res.status(200).json({
        status: "success",
        message: "Deleted successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({ Error: "Delete user error in server" });
  }
};

const searchUser = async (req, res) => {
  const { name, role } = req.params;

  try {
    const searchCriteria = {
      where: {
        [Sequelize.Op.or]: [
          { status: statusList.verified },
          { status: statusList.approved },
        ],
        role: role,
        [Op.or]: [
          { firstName: { [Op.like]: `${name}%` } },
          { lastName: { [Op.like]: `${name}%` } },
        ],
      },
    };
    const users = await userModel.findAll(searchCriteria);
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Search user error in server" });
  }
};

const filterFacultyByCampus = async (req, res) => {
  const { esuCampus } = req.params;
  try {
    const users = await userModel.findAll({
      where: {
        role: rolesList.faculty,
        esuCampus: esuCampus,
        [Sequelize.Op.or]: [
          { status: statusList.verified },
          { status: statusList.approved },
        ],
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ Error: "Filter faculty by esu campus error in server" });
  }
};

const updateEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const existUser = await userModel.findOne({
      where: {
        email: email,
      },
    });

    if (!email.trim()) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (existUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    await otpController.postOTP(email);
    return res.status(200).json({
      status: "success",
      message: `Verification OTP sent to ${email}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateUserData = async (req, res) => {
  const { id } = req.params;
  const {
    image,
    firstName,
    lastName,
    middleInitial,
    birthDate,
    contactNumber,
    designation,
    esuCampus,
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

    console.log(newFileName, "newFileName");

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
        esuCampus: esuCampus,
        password: hashPassword,
        updatedAt: createdAt,
      },
      {
        where: { id },
      }
    );

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password, new_password, confirm_password } = req.body;

  try {
    const user = await userModel.findByPk(id);

    if (!password) {
      return res.status(404).json({ message: "Password is required" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (new_password.length < 8) {
      return res
        .status(400)
        .json({ message: "New password must be at least 8 characters" });
    }

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashPassword = await bcrypt.hash(new_password, saltsRounds);

    await userModel.update(
      {
        password: hashPassword,
        updatedAt: createdAt,
      },
      {
        where: { id },
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUserByEmail,
  getUserById,
  getAllUser,
  approveFaculty,
  getUserByRole,
  deleteUser,
  searchUser,
  filterFacultyByCampus,
  updateEmail,
  updateUserData,
  updatePassword,
};
