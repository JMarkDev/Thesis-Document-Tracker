const notificationModel = require("../models/notificationModel");
const { createdAt } = require("../utils/formattedTime");

const addNotification = async ({ document_id, content, user_id }) => {
  try {
    const newNotification = await notificationModel.create({
      document_id,
      content,
      user_id,
      is_read: 0,
      createdAt: createdAt,
    });

    return newNotification; // Return the created notification
  } catch (err) {
    throw new Error(err.message); // Throw an error if something goes wrong
  }
};

const updateNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const updateNotification = await notificationModel.update(
      {
        is_read: 1,
        updatedAt: createdAt,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json(updateNotification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNotificationById = async (req, res) => {
  const { user_id } = req.params;

  try {
    const getNotifications = await notificationModel.findAll({
      where: {
        user_id: user_id,
      },
    });

    const sortByDate = getNotifications.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    return res.status(200).json(sortByDate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotificationById,
  addNotification,
  updateNotification,
};
