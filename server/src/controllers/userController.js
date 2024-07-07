const { Sequelize } = require("sequelize");
const userModel = require("../models/userModel");
const { createdAt } = require("../utils/formattedTime");

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
  const { id } = req.params;

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

    return res.status(200).json({
      status: "success",
      message: "Account approved successfully",
    });
  } catch (error) {
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

module.exports = {
  getUserByEmail,
  getAllUser,
  approveFaculty,
  getUserByRole,
};
