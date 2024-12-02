const esuCampus_desination = require("../controllers/esuCampus&DesignationController");
const express = require("express");
const router = express.Router();

router.get("/designations", esuCampus_desination.getDesignations);
router.get("/designations/:id", esuCampus_desination.getDesignationById);
router.post("/designations", esuCampus_desination.createDesignation);
router.delete("/designations/:id", esuCampus_desination.deleteDesignation);
router.put("/designations/:id", esuCampus_desination.updateDesignation);

router.get("/esuCampus", esuCampus_desination.getEsuCampuses);
router.get("/esuCampus/:id", esuCampus_desination.getEsuCampusById);
router.post("/esuCampus", esuCampus_desination.createEsuCampus);
router.delete("/esuCampus/:id", esuCampus_desination.deleteEsuCampus);
router.put("/esuCampus/:id", esuCampus_desination.updateEsuCampus);

module.exports = router;
