const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get(
  "/tracking-number/:tracking_number",
  documentController.getDocumentByTrackingNum
);

module.exports = router;
