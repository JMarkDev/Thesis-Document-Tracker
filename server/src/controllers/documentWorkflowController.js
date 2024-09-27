const documentRouteModel = require("../models/documentRouteModel");
const { createdAt } = require("../utils/formattedTime");
const userModel = require("../models/userModel");
const officeModel = require("../models/officeModel");
const rolesList = require("../constants/rolesList");
const { Sequelize, Op } = require("sequelize");

const addWorflow = async (req, res) => {
  const { document_type, route } = req.body;

  try {
    const workflow = await documentRouteModel.create({
      document_type: document_type,
      route: route,
      createdAt: createdAt,
      updatedAt: createdAt,
    });

    return res
      .status(201)
      .json({ workflow, status: "success", message: "Added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllDocumentRoutes = async (req, res) => {
  try {
    const documentRoutes = await documentRouteModel.findAll();
    return res.status(200).json(documentRoutes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRouteById = async (req, res) => {
  const { id } = req.params;
  try {
    const route = await documentRouteModel.findOne({
      where: {
        id: id,
      },
    });

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    const parseRoute = {
      ...route.toJSON(),
      route:
        typeof route.route === "string" ? JSON.parse(route.route) : route.route,
    };

    return res.status(200).json(parseRoute);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateRoute = (req, res) => {
  const { id } = req.params;
  const { document_type, route } = req.body;

  documentRouteModel
    .update(
      {
        document_type: document_type,
        route: JSON.stringify(route),
        updatedAt: createdAt,
      },
      { where: { id: id } }
    )
    .then((route) => {
      return res
        .status(200)
        .json({ route, status: "success", message: "Updated successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
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

// const getAllRoute = async (req, res) => {
//   try {
//     const route = await userModel.findAll({
//       where: {
//         [Sequelize.Op.or]: [
//           { role: rolesList.office },
//           // { role: rolesList.registrar },
//           // { role: rolesList.campus_admin },
//         ],
//       },
//       include: [
//         {
//           model: officeModel,
//           required: false, // Ensures only users with associated office data are include
//         },
//       ],
//     });
//     return res.status(200).json(route);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  addWorflow,
  getAllDocumentRoutes,
  updateRoute,
  getRouteById,
  searchWorkflow,
  deleteWorkflow,
  // getAllRoute,
};
