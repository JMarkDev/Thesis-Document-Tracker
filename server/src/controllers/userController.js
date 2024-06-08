const userModel = require("../models/userModel");
const { createdAt } = require("../utils/formattedTime");

const getAllUser = async (req, res) => {
  try {
    const verifiedUser = await userModel.findAll({
      where: {
        status: "verified",
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

module.exports = {
  getAllUser,
  approveFaculty,
};
