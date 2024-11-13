const date = require("date-and-time");
const delayModel = require("../models/delayModel");
const sequelize = require("../configs/database");

const setDocumentDelay = async (req, res) => {
  const { id } = req.params;
  const { delay } = req.body;

  try {
    const postDelay = await delayModel.update(
      {
        days_before_delay: delay,
      },
      { where: { id } }
    );

    return res.status(201).json({
      status: "success",
      message: "Delay has been set successfully",
      postDelay,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const setAutoLogout = async (req, res) => {
  const { id } = req.params;
  const { auto_logout_minutes } = req.body;

  try {
    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD HH:mm:ss", true); // true for UTC time;

    const autoLogout = await delayModel.update(
      {
        auto_logout_minutes: auto_logout_minutes,
        updatedAt: sequelize.literal(`'${formattedDate}'`),
      },
      { where: { id: id } }
    );

    return res.status(200).json({
      autoLogout,
      status: "success",
      message: "Auto logout has been set successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getDocumentDelay = async (req, res) => {
  const { id } = req.params;
  try {
    const delay = await delayModel.findOne({
      where: {
        id,
      },
    });
    return res.status(200).json(delay);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  setDocumentDelay,
  setAutoLogout,
  getDocumentDelay,
};
