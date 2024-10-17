const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/admin-card-data", analyticsController.getAdminCardData);
router.get("/data-by-year/:year", analyticsController.getDataByYear);
router.get("/data-by-campus", analyticsController.getDataByEsuCampus);
router.get("/document-type", analyticsController.getDocumentTypeData);
router.get("/document-reports/:year", analyticsController.getDocumentReports);
router.get(
  "/document-by-type/:type",
  analyticsController.getSumittedDocumentByType
);

module.exports = router;
