const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get("/all", documentController.getAllDocuments);
router.get("/id/:id", documentController.getDocumentById);
router.get("/search/:name", documentController.searchDocuments);
router.get(
  "/filter/field/:filterField/value/:filterValue",
  documentController.filterDocuments
);

// SORTING USING QUICK SORT ALGORITHM
//http://localhost:3001/document/sort?sortBy=createdAt
router.get("/sort", documentController.sortDocuments);

module.exports = router;
