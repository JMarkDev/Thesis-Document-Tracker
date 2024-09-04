const express = require("express");
const router = express.Router();
const documentWorkflowController = require("../controllers/documentWorkflowController");

router.get("/all", documentWorkflowController.getAllDocumentRoutes);
router.get("/id/:id", documentWorkflowController.getRouteById);
router.put("/update/:id", documentWorkflowController.updateRoute);
router.get("/search/:name", documentWorkflowController.searchWorkflow);
router.delete("/delete/id/:id", documentWorkflowController.deleteWorkflow);

module.exports = router;
