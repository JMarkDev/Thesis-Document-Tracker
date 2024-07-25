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
    return res.status(200).json({ documents });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDocuments,
};
