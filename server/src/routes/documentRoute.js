const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const delayController = require("../controllers/delayController");
const {
  validateForm,
  uploadDocumentValidation,
} = require("../middlewares/formValidation");
// Configure multer
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../uploads");
    console.log("Upload path:", uploadPath); // Log the upload path
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// allow only specific file types (CSV, PDF, PPT, DOC and images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/csv",
    "image/jpeg", // JPEG images
    "image/png", // PNG images
    "image/gif", // GIF images
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file type");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/all", documentController.getAllDocuments);
router.get(
  "/all-documents-by-user-id/:user_id",
  documentController.getAllDocumentsByUserId
);
router.post(
  "/upload",
  upload.array("files", 10),
  uploadDocumentValidation(),
  validateForm,
  documentController.uploadDocument
);
router.get(
  "/tracking-number/:tracking_number",
  documentController.getDocumentByTrackingNum
);
router.get("/id/:id", documentController.getDocumentById);
router.get("/search/:name", documentController.searchDocuments);
router.get(
  "/filter/field/:filterField/value/:filterValue",
  documentController.filterDocuments
);

// SORTING USING QUICK SORT ALGORITHM
//http://localhost:3001/document/sort?sortBy=createdAt
router.get("/sort", documentController.sortDocuments);
router.get("/submitted-by-user/sort", documentController.sortDocumentsByUser);

// Documents submitted by user
router.get(
  "/get-all-documents-by-user-id/:user_id",
  documentController.getAllDocumentsByUserId
);
router.get(
  "/search/:name/:user_id",
  documentController.searchDocumentsByUserId
);
// router.get(
//   "/filter/status/:status/user_id/:user_id",
//   documentController.filterUserDocuments
// );

router.put("/delay/id/:id", delayController.setDocumentDelay);
router.put("/auto-logout/id/:id", delayController.setAutoLogout);
router.get("/get-delay/:id", delayController.getDocumentDelay);

router.post("/receive-document", documentController.receiveDocuments);
router.get("/filter-all-documents", documentController.filterAllDocuments);

module.exports = router;
