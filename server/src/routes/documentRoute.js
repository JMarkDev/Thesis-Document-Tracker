const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get("/all", documentController.getAllDocuments);
router.get("/id/:id", documentController.getDocumentById);
router.get("/search/:name", documentController.searchDocuments);
router.get(
  "/filter-by-esu/:esuCampus",
  documentController.filterDocumentsByEsu
);
router.get("/filter-by-type/:type", documentController.filterDocumentsByType);
router.get(
  "/filter/by-status/:status",
  documentController.filterDocumentsByStatus
);

module.exports = router;
