const express = require("express");
const router = express.Router();
const officeController = require("../controllers/officeController");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const {
  registerValidationRules,
  validateForm,
} = require("../middlewares/formValidation");

router.post(
  "/add",
  upload.single("image"),
  registerValidationRules(),
  validateForm,
  officeController.addOffice
);
router.get("/all", officeController.getAllOffice);
router.get("/search/:name", officeController.searchOffice);

module.exports = router;
