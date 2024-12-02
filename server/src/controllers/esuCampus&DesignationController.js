const designationModel = require("../models/designationModel");
const esuCampusModel = require("../models/esuCampusModel");

const getDesignations = async (req, res) => {
  try {
    const designations = await designationModel.findAll();
    return res.status(200).json(designations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDesignationById = async (req, res) => {
  const { id } = req.params;
  try {
    const designation = await designationModel.findOne({
      where: { id: id },
    });
    return res.status(200).json(designation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createDesignation = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Designation is required" });
    }
    const newDesignation = await designationModel.create({ name: name });
    return res.status(201).json({
      status: "success",
      message: "Designation created",
      data: newDesignation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateDesignation = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const designation = await designationModel.findOne({
      where: { id: id },
    });
    if (designation) {
      designation.name = name;
      await designation.save();
      return res.status(200).json({
        status: "success",
        message: "Designation updated",
        data: designation,
      });
    }
    return res.status(404).json({ message: "Designation not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteDesignation = async (req, res) => {
  const { id } = req.params;
  try {
    const designation = await designationModel.findOne({
      where: { id: id },
    });
    if (designation) {
      await designation.destroy();
      return res
        .status(200)
        .json({ status: "success", message: "Designation deleted" });
    }
    return res.status(404).json({ message: "Designation not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEsuCampuses = async (req, res) => {
  try {
    const esuCampuses = await esuCampusModel.findAll();
    return res.status(200).json(esuCampuses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEsuCampusById = async (req, res) => {
  const { id } = req.params;
  try {
    const esuCampus = await esuCampusModel.findOne({
      where: { id: id },
    });
    return res.status(200).json(esuCampus);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createEsuCampus = async (req, res) => {
  const { name } = req.body;
  try {
    const newEsuCampus = await esuCampusModel.create({ name: name });
    return res.status(201).json({
      status: "success",
      message: "WMSU-ESU Campus created",
      data: newEsuCampus,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEsuCampus = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const esuCampus = await esuCampusModel.findOne({
      where: { id: id },
    });
    if (esuCampus) {
      esuCampus.name = name;
      await esuCampus.save();
      return res.status(200).json({
        status: "success",
        message: "WMSU-ESU Campus updated",
        data: esuCampus,
      });
    }
    return res.status(404).json({ message: "EsuCampus not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEsuCampus = async (req, res) => {
  const { id } = req.params;
  try {
    const esuCampus = await esuCampusModel.findOne({
      where: { id: id },
    });
    if (esuCampus) {
      await esuCampus.destroy();
      return res
        .status(200)
        .json({ status: "success", message: "WMSU-ESU Campus deleted" });
    }
    return res.status(404).json({ message: "EsuCampus not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDesignations,
  getDesignationById,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  getEsuCampuses,
  getEsuCampusById,
  createEsuCampus,
  updateEsuCampus,
  deleteEsuCampus,
};
