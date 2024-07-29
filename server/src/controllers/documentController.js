const { Sequelize, Op } = require("sequelize");
const documentModel = require("../models/documentModel");
const documentHistoryModel = require("../models/documentHistoryModel");

const getAllDocuments = async (req, res) => {
  try {
    const documents = await documentModel.findAll({
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDocumentById = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await documentModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(document);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchDocuments = async (req, res) => {
  const { name } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        [Sequelize.Op.or]: [
          { document_name: { [Op.like]: `${name}%` } },
          { uploaded_by: { [Op.like]: `${name}%` } },
        ],
        // document_name: { [Op.like]: `${name}%` },
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const filterDocumentsByEsu = async (req, res) => {
  const { esuCampus } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        esuCampus: esuCampus,
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const filterDocumentsByType = async (req, res) => {
  const { type } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        document_type: type,
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const filterDocumentsByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        status: status,
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDocuments,
  searchDocuments,
  filterDocumentsByEsu,
  filterDocumentsByType,
  filterDocumentsByStatus,
  getDocumentById,
};
