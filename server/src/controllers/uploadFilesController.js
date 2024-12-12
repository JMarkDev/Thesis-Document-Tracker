const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// const multer = require('multer');
const path = require("path");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFilesController = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "No files uploaded or invalid file types." });
    }

    const uploadedFiles = [];

    // Loop through all files and upload to Cloudinary
    for (const file of files) {
      const filePath = path.join(__dirname, `../../uploads/${file.filename}`);

      // Check if the file exists before uploading
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: `File not found: ${filePath}` });
      }

      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: file.mimetype.startsWith("image/") ? "image" : "raw",
        folder: "files",
      });

      uploadedFiles.push({
        fileName: file.originalname,
        url: result.secure_url,
      });

      // Optionally, delete the file from local storage
      fs.unlinkSync(filePath);
    }

    res.status(200).json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({
      message: "Error uploading files",
      error: error.message,
    });
  }
};

module.exports = { uploadFilesController };
