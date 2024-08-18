const documentHistoryModel = require("../models/documentHistoryModel");
const { createdAt } = require("../utils/formattedTime");
const { Sequelize } = require("sequelize");

const addDocumentHistory = async ({
  document_id,
  action,
  recipient_office,
  recipient_user,
}) => {
  try {
    const newHistory = await documentHistoryModel.create({
      document_id: document_id,
      action: action,
      recipient_office: recipient_office,
      recipient_user: recipient_user,
      createdAt: createdAt,
    });
    return newHistory;
  } catch (error) {
    throw error;
  }
};
