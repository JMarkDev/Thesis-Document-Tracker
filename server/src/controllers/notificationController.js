const notificationModel = require("../models/notificationModel");
const { createdAt } = require("../utils/formattedTime");


const addNotification = async(req, res) => {
  const { content, user_id} = req.body

  try {
    const newNotification = await notificationModel.create({
      content,
      user_id,
      is_read: 0,
      createdAt: createdAt
    })

    return res.status(201).json(newNotification)
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}

const updateNotification = async (req, res) => {
  const {id} = req.params

  try {
    const updateNotification = await notificationModel.update({
      is_read: 1,
      updatedAt: createdAt
    }, {
      where: {
        id: id
      }
    })

    return res.status(200).json(updateNotification)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

const getNotificationById = async (req, res) => {
  const {user_id} = req.params

  try {
    const getNotifications = await notificationModel.findAll({
      where: {
        user_id: user_id
      }
    })

    return res.status(200).json(getNotifications)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

module.exports = {
  getNotificationById,
  addNotification,
  updateNotification
};
