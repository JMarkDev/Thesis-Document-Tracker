const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

router.post("/query", chatbotController.chatbotQuery);
// router.get(
//   "/track/:tracking_number",
//   chatbotController.trackLatestDocumentHistory
// );

// This route will handle the Dialogflow webhook POST request
router.post("/track", chatbotController.trackLatestDocumentHistory);

// This route can be used to fetch document history via the tracking number directly (if needed)
// router.get(
//   "/track/:tracking_number",
//   chatbotController.trackLatestDocumentHistory
// );

module.exports = router;
