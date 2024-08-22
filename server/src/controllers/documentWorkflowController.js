const documentRouteModel = require("../models/documentRouteModel");
const { Op } = require("sequelize");

const getAllDocumentRoutes = async (req, res) => {
  try {
    const documentRoutes = await documentRouteModel.findAll();
    return res.status(200).json(documentRoutes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchWorkflow = async (req, res) => {
  const { name } = req.params;

  try {
    const workflow = await documentRouteModel.findAll({
      where: {
        document_type: { [Op.like]: `${name}%` },
      },
    });

    return res.status(200).json(workflow);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteWorkflow = async (req, res) => {
  const { id } = req.params;

  try {
    const workflow = await documentRouteModel.destroy({
      where: {
        id: id,
      },
    });

    return res
      .status(200)
      .json({ workflow, status: "success", message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDocumentRoutes,
  searchWorkflow,
  deleteWorkflow,
};
