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
router.put(
  "/update/id/:id",
  upload.single("image"),
  registerValidationRules(),
  validateForm,
  officeController.updateOffice
);
router.get("/esu-registrar/:esuCampus", officeController.getRegistrar);
router.post(
  "/add-staff",
  upload.single("image"),
  registerValidationRules(),
  validateForm,
  officeController.addOfficeStaff
);
router.get("/staff-by-officeId/:officeId", officeController.getAllStaffById);
router.delete("/delete-staff/:email", officeController.deleteStaff);
router.put(
  "/update-staff/:email",
  upload.single("image"),
  registerValidationRules(),
  validateForm,
  officeController.updateStaff
);
router.get(
  "/staff/search/:name/officeId/:officeId",
  officeController.searchStaff
);
module.exports = router;
