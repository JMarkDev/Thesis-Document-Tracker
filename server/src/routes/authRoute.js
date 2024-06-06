const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const otpController = require("../controllers/otpController");

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);
router.post("/verify-otp", otpController.verifyOTP);
router.post("/logout", authController.handleLogout);

module.exports = router;
