const express = require("express");
const router = express.Router();
const documentWorkflowController = require("../controllers/documentWorkflowController");

router.use("/all", documentWorkflowController.getAllDocumentRoutes);

module.exports = router;
