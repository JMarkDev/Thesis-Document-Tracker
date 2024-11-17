const { Sequelize, Op } = require("sequelize");
const sequelize = require("../configs/database");
const documentModel = require("../models/documentModel");
const documentHistoryModel = require("../models/documentHistoryModel");
const documentRecipientModel = require("../models/documentRecipientModel");
// const { createdAt } = require("../utils/formattedTime");
const documentStatus = require("../constants/documentStatus");
const userModel = require("../models/userModel");
const officeModel = require("../models/officeModel");
const rolesList = require("../constants/rolesList");
const statusList = require("../constants/statusList");
const { addNotification } = require("./notificationController");
const { sendNotification } = require("../utils/emailNotifications");
const delayModel = require("../models/delayModel");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// const multer = require('multer');
const path = require("path");
const fs = require("fs");
const date = require("date-and-time");

const receiveDocuments = async (req, res) => {
  const {
    document_id,
    office_name,
    user_id,
    action,
    recipient_user,
    recipient_office,
    document_name,
    next_route,
    comments,
    faculty_received,
  } = req.body;

  try {
    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD HH:mm:ss", true); // true for UTC time;

    const document = await documentModel.findOne({
      where: {
        id: document_id,
      },
    });
    if (faculty_received === "forwarded") {
      await documentRecipientModel.update(
        {
          status: documentStatus.forwarded,
          forwarded_at: sequelize.literal(`'${formattedDate}'`),
          received_at: sequelize.literal(`'${formattedDate}'`),
          updatedAt: sequelize.literal(`'${formattedDate}'`),
        },
        {
          where: {
            document_id: document_id,
            user_id: user_id,
          },
        }
      );
    }

    if (action === "received") {
      await documentRecipientModel.update(
        {
          status: documentStatus.received,
          received_at: sequelize.literal(`'${formattedDate}'`),
          updatedAt: sequelize.literal(`'${formattedDate}'`),
        },
        {
          where: {
            document_id: document_id,
            user_id: user_id,
          },
        }
      );
      await documentModel.update(
        {
          status: documentStatus.incoming,
        },
        {
          where: { id: document_id },
        }
      );
      await documentRecipientModel.update(
        {
          // status: documentStatus.returned,
          returned_at: null,
        },
        {
          where: {
            document_id: document_id,
          },
        }
      );
    }

    if (action === "forwarded") {
      await documentRecipientModel.update(
        {
          status: documentStatus.forwarded,
          forwarded_at: sequelize.literal(`'${formattedDate}'`),
          updatedAt: sequelize.literal(`'${formattedDate}'`),
        },
        {
          where: {
            document_id: document_id,
            user_id: user_id,
          },
        }
      );

      await documentModel.update(
        {
          status: documentStatus.forwarded,
        },
        {
          where: { id: document_id },
        }
      );

      await documentRecipientModel.update(
        {
          // status: documentStatus.returned,
          returned_at: null,
        },
        {
          where: {
            document_id: document_id,
          },
        }
      );
    }

    if (action === "returned") {
      await documentRecipientModel.update(
        {
          status: documentStatus.returned,
          returned_at: sequelize.literal(`'${formattedDate}'`),
          received_at: null,
          forwarded_at: null,
          updatedAt: sequelize.literal(`'${formattedDate}'`),
        },
        {
          where: {
            document_id: document_id,
            user_id: user_id,
          },
        }
      );

      await documentRecipientModel.update(
        {
          status: documentStatus.returned,
          received_at: null,
        },
        {
          where: {
            document_id: document_id,
          },
        }
      );
      await documentModel.update(
        {
          status: documentStatus.returned,
        },
        {
          where: { id: document_id },
        }
      );
    }

    const documentHistory = {
      document_id,
      office_name,
      action,
      comments,
      recipient_office,
      recipient_user,
      createdAt: sequelize.literal(`'${formattedDate}'`),
    };

    await documentHistoryModel.create(documentHistory);
    let content = null;

    if (action === "forwarded") {
      content = `${document_name} has been successfully ${action} to "${next_route}" by ${recipient_user}.`;
    } else if (action === "received") {
      content = `${document_name} has been successfully ${action} by ${recipient_user} at "${recipient_office}".`;
    } else if (action === "returned") {
      content = `${document_name} has been successfully ${action} by ${recipient_user} on ${formattedDate}.`;
    } else if (action === "uploaded") {
      content = `${document_name} has been successfully uploaded by ${recipient_user}.`;
    } else {
      content = "No action has been performed.";
    }

    await addNotification({
      document_id: document_id,
      content: content,
      user_id: document?.user_id,
    });

    let message = null;
    const currentDate = new Date().toLocaleString(); // This includes both date and time

    if (action === "forwarded") {
      message = `The document "${document_name}" has been successfully ${action} to the "${next_route}" by ${recipient_user} on ${currentDate}.`;
    } else if (action === "received") {
      message = `The document "${document_name}" has been ${action} by ${recipient_user} at the "${recipient_office}" on ${currentDate}.`;
    } else if (action === "returned") {
      message = `The document "${document_name}" has been successfully ${action} by ${recipient_user} on ${currentDate}.`;
    } else if (action === "uploaded") {
      message = `Your document "${document_name}" has been successfully uploaded on ${currentDate}.`;
    } else {
      message = "No action has been performed.";
    }

    await sendNotification({
      email: document?.user_email,
      subject: `WMSU-ESU Document Tracker - Document ${action}`,
      message: message,
    });

    return res.status(200).json({
      status: "success",
      message: `Document ${action} successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  receiveDocuments,
};
