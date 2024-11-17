const { Sequelize, Op } = require("sequelize");
const sequelize = require("../configs/database");
const documentModel = require("../models/documentModel");
const documentHistoryModel = require("../models/documentHistoryModel");
const documentStatus = require("../constants/documentStatus");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const date = require("date-and-time");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const updateDocument = async (req, res) => {
  const { id } = req.params;
  const { document_name, document_desc, uploaded_by, file_type } = req.body;

  try {
    const createdAt = new Date();
    const formattedDate = date.format(createdAt, "YYYY-MM-DD HH:mm:ss", true); // true for UTC time;

    // upload files to cloudinary
    const files = req.files;
    let uploadedFileUrls = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const filePath = path.join(__dirname, `../../uploads/${file.filename}`);
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: file.mimetype.startsWith("image/") ? "image" : "raw",
          folder: "files",
        });

        uploadedFileUrls.push(result.secure_url);
        fs.unlinkSync(filePath);
      }
    }

    await documentModel.update(
      {
        document_name,
        document_desc,
        file_type,
        files: uploadedFileUrls || null,
        status: documentStatus.incoming,
        updatedAt: sequelize.literal(`'${formattedDate}'`),
      },
      {
        where: {
          id,
        },
      }
    );

    const documentHistory = {
      document_id: id,
      action: "updated",
      recipient_office: uploaded_by,
      recipient_user: uploaded_by,
      createdAt: sequelize.literal(`'${formattedDate}'`),
    };

    // Insert the document history
    await documentHistoryModel.create(documentHistory);

    return res.status(200).json({
      status: "success",
      message: "Document updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateDocument,
};
