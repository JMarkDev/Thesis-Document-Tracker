const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const {
  validateForm,
  uploadDocumentValidation,
} = require("../middlewares/formValidation");

router.get("/all", documentController.getAllDocuments);
router.post(
  "/upload",
  uploadDocumentValidation(),
  validateForm,
  documentController.uploadDocument
);
router.get(
  "/tracking-number/:tracking_number",
  documentController.getDocumentByTrackingNum
);
router.get("/id/:id", documentController.getDocumentById);
router.get("/search/:name", documentController.searchDocuments);
router.get(
  "/filter/field/:filterField/value/:filterValue",
  documentController.filterDocuments
);

// SORTING USING QUICK SORT ALGORITHM
//http://localhost:3001/document/sort?sortBy=createdAt
router.get("/sort", documentController.sortDocuments);
router.get("/submitted-by-user/sort", documentController.sortDocumentsByUser);

// Documents submitted by user
router.get(
  "/get-all-documents-by-user-id/:user_id",
  documentController.getAllDocumentsByUserId
);
router.get(
  "/search/:name/:user_id",
  documentController.searchDocumentsByUserId
);
router.get(
  "/filter/status/:status/user_id/:user_id",
  documentController.filterUserDocuments
);

router.post("/receive-document", documentController.receiveDocuments);

module.exports = router;
