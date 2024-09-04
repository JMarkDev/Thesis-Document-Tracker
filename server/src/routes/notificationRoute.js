const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.get("/all", notificationController.getAllNotifications);
router.get("/user_id/:user_id", notificationController.getNotificationById);

module.exports = router;
