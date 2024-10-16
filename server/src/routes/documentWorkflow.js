const express = require("express");
const router = express.Router();
const documentWorkflowController = require("../controllers/documentWorkflowController");

router.post("/add", documentWorkflowController.addWorkflow);
router.get("/all", documentWorkflowController.getAllDocumentRoutes);
router.get("/id/:id", documentWorkflowController.getRouteById);
router.put("/update/:id", documentWorkflowController.updateRoute);
router.get("/search/:name", documentWorkflowController.searchWorkflow);
router.delete("/delete/id/:id", documentWorkflowController.deleteWorkflow);
// router.get("/get-all-route", documentWorkflowController.getAllRoute);
router.post("/add-deadline/:id", documentWorkflowController.addDeadline);
router.put("/update-deadline/:id", documentWorkflowController.updateDeadline);
router.put("/delete-deadline/:id", documentWorkflowController.deleteDeadline);

module.exports = router;
