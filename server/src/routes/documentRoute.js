const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get("/all", documentController.getAllDocuments);

module.exports = router;
