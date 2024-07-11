const { Sequelize, where, Op } = require("sequelize");
const userModel = require("../models/userModel");
const { createdAt } = require("../utils/formattedTime");
const { sendNofication } = require("../utils/emailNotifications");

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

const getAllUser = async (req, res) => {
  try {
    const verifiedUser = await userModel.findAll({
      where: {
        [Sequelize.Op.or]: [{ status: "verified" }, { status: "approved" }],
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
        status: "approved",
        updatedAt: createdAt,
      },
      {
        where: {
          id: id,
        },
      }
    );

    await sendNofication({
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
        [Sequelize.Op.or]: [{ status: "verified" }, { status: "approved" }],
      },
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
      await user.destroy();
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
        [Sequelize.Op.or]: [{ status: "verified" }, { status: "approved" }],
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
  console.log("filter");

  try {
    const users = await userModel.findAll({
      where: {
        role: "faculty",
        esuCampus: esuCampus,
        [Sequelize.Op.or]: [{ status: "verified" }, { status: "approved" }],
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

module.exports = {
  getUserByEmail,
  getAllUser,
  approveFaculty,
  getUserByRole,
  deleteUser,
  searchUser,
  filterFacultyByCampus,
};
