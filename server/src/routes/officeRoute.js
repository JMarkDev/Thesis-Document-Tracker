const express = require("express");
const router = express.Router();
const officeController = require("../controllers/officeController");

router.post("/add", officeController.addOffice);

module.exports = router;
