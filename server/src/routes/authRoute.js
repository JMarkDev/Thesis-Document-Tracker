const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const authController = require("../controllers/authController");
const otpController = require("../controllers/otpController");
const {
  loginValidationRules,
  registerValidationRules,
  validateForm,
} = require("../middlewares/formValidation");

router.post(
  "/register",
  upload.single("image"),
  registerValidationRules(),
  validateForm,
  authController.handleRegister
);
router.post(
  "/login",
  loginValidationRules(),
  validateForm,
  authController.handleLogin
);
router.post("/verify-otp", otpController.verifyOTP);
router.post("/logout", authController.handleLogout);

module.exports = router;
