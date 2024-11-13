const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const otpController = require("../controllers/otpController");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const {
  registerValidationRules,
  validateForm,
  updateProfileValidation,
} = require("../middlewares/formValidation");

// req.query
//http://localhost:3001/users/get-user?email=jmseroy@gmail.com
router.get("/get-user", userController.getUserByEmail);
router.get("/get-user-by-id/:id", userController.getUserById);
router.get("/get-all-user", userController.getAllUser);
router.put(
  "/approved-faculty/id/:id/email/:email",
  userController.approveFaculty
);
router.get("/get-user-by-role", userController.getUserByRole);
router.delete("/delete/id/:id", userController.deleteUser);
router.get("/search/:name/:role", userController.searchUser);
router.get(
  "/search-faculty/:name/role/:role/esuCampus/:esuCampus",
  userController.searchFaculty
);
router.get(
  "/filter-faculty/:esuCampus/role/:role",
  userController.filterFacultyByCampus
);
router.post("/update-email", userController.updateEmail);
router.put("/update-email/verify-otp/:id", otpController.verifyChangeEmail);
router.put(
  "/update-user-data/id/:id",
  upload.single("image"),
  registerValidationRules(),
  validateForm,
  userController.updateUserData
);

router.put(
  "/update-password/:id",
  // validateForgotPassword(),
  // validateForm,
  userController.updatePassword
);
router.put(
  "/update-profile/id/:id",
  upload.single("image"),
  updateProfileValidation(),
  validateForm,
  userController.updateProfile
);

module.exports = router;
