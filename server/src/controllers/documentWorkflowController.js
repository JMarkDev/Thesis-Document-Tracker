const documentRouteModel = require("../models/documentRouteModel");

const getAllDocumentRoutes = async (req, res) => {
  try {
    const documentRoutes = await documentRouteModel.findAll();
    return res.status(200).json({ documentRoutes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDocumentRoutes,
};
