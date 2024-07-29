const express = require("express");
const router = express.Router();
const documentWorkflowController = require("../controllers/documentWorkflowController");

router.get("/all", documentWorkflowController.getAllDocumentRoutes);
router.get("/search/:name", documentWorkflowController.searchWorkflow);

module.exports = router;
