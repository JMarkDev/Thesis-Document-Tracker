const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/get-all-user", userController.getAllUser);
router.put("/approved-faculty/:id", userController.approveFaculty);

module.exports = router;
