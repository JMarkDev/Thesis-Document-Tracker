const notificationModel = require("../models/notificationModel");
const { createdAt } = require("../utils/formattedTime");
const date = require("date-and-time");
const sequelize = require("../configs/database");
const { Sequelize } = require("sequelize");
const userModel = require("../models/userModel");
const rolesList = require("../constants/rolesList");
const statusList = require("../constants/statusList");

const addNotification = async ({ document_id, content, user_id }) => {
  try {
    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD HH:mm:ss");

    const newNotification = await notificationModel.create({
      document_id,
      content,
      user_id,
      is_read: 0,
      createdAt: sequelize.literal(`'${formattedDate}'`),
    });

    return newNotification; // Return the created notification
  } catch (err) {
    throw new Error(err.message); // Throw an error if something goes wrong
  }
};

const newFacultyNotification = async ({
  firstName,
  lastName,
  middleInitial,
  esuCampus,
  faculty_id,
}) => {
  try {
    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD HH:mm:ss", true); // true for UTC time;

    const admin = await userModel.findAll({
      where: {
        [Sequelize.Op.or]: [
          { role: rolesList.admin },
          { role: rolesList.admin_staff },
        ],
        status: statusList.verified,
      },
    });

    const registrarAndCampusAdmin = await userModel.findAll({
      where: {
        [Sequelize.Op.or]: [
          { role: rolesList.registrar },
          { role: rolesList.campus_admin },
        ],
        esuCampus: esuCampus,
        status: statusList.approved,
      },
    });

    let recipients = [];
    if (faculty_id === rolesList.faculty) {
      recipients = [...admin, ...registrarAndCampusAdmin];
    } else {
      recipients = [...admin];
    }

    await Promise.all(
      recipients.map(async (recipient) => {
        await notificationModel.create({
          document_id: null,
          user_id: recipient.id,
          faculty_id: faculty_id,
          content: `New faculty account has been registered. Please review and approve the account of ${firstName} ${middleInitial}. ${lastName}.`,
          is_read: 0,
          createdAt: sequelize.literal(`'${formattedDate}'`),
        });
      })
    );
    return recipients;
  } catch (error) {
    console.log(error);
    throw new Error(error.message); // Throw an error if something goes wrong
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
  newFacultyNotification,
};
