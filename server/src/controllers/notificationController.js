const notificationModel = require("../models/notificationModel");

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.findAll();
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNotifications,
};
