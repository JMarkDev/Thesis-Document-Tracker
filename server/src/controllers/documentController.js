const { Sequelize, Op } = require("sequelize");
const documentModel = require("../models/documentModel");
const documentHistoryModel = require("../models/documentHistoryModel");
const documentRecipientModel = require("../models/documentRecipientModel");
const { createdAt } = require("../utils/formattedTime");
const documentStatus = require("../constants/documentStatus");
const userModel = require("../models/userModel");
const officeModel = require("../models/officeModel");
const rolesList = require("../constants/rolesList");
const statusList = require("../constants/statusList");
const { addNotification } = require("./notificationController");
const { sendNotification } = require("../utils/emailNotifications");

const uploadDocument = async (req, res) => {
  const {
    tracking_number,
    document_name,
    document_type,
    document_desc,
    file_type,
    files,
    uploaded_by,
    contact_number,
    esuCampus,
    user_id,
    user_email,
    route,
    action,
  } = req.body;

  try {
    const trackingNumExists = await documentModel.findOne({
      where: {
        tracking_number: tracking_number,
      },
    });

    if (trackingNumExists) {
      return res.status(400).json({
        status: "error",
        message:
          "Tracking number already exists. Please generate a new tracking number.",
      });
    }
    const user = await userModel.findOne({
      where: {
        id: user_id,
        [Sequelize.Op.or]: [
          { status: statusList.verified },
          { status: statusList.approved },
        ],
      },
      include: [
        {
          model: officeModel,
          required: false,
        },
      ],
    });

    let recipient;
    if (user) {
      if (user.office?.officeName) {
        recipient = user.office.officeName;
      } else if (user.esuCampus && user.role === rolesList.faculty) {
        recipient = `${user.esuCampus} FACULTY`;
      } else if (
        (user.esuCampus && user.role === rolesList.registrar) ||
        user.role === rolesList.campus_admin
      ) {
        recipient = `${esuCampus} REGISTRAR`;
      } else if (
        user.role === rolesList.office ||
        user.role === rolesList.admin ||
        user.role === rolesList.office_staff
      ) {
        recipient = user.office.officeName;
      }
    }

    const newDocuments = await documentModel.create({
      tracking_number,
      document_name,
      document_type,
      document_desc,
      file_type,
      files,
      uploaded_by,
      contact_number,
      esuCampus,
      status: documentStatus.incoming,
      user_id,
      user_email,
      createdAt: createdAt,
    });

    // Format the route data to match the required schema for document history
    const formattedRouteData = route?.map((office) => {
      let received_at = null;
      if (office.office_name === recipient) {
        received_at = createdAt;
      }
      return {
        document_id: newDocuments.id,
        user_id: office.user_id, // user ID from the route object
        office_name: office.office_name,
        status: documentStatus.incoming,
        received_at: received_at, // Default as null for now, you can update this later
        createdAt: createdAt,
        updatedAt: createdAt,
      };
    });

    const documentHistory = {
      document_id: newDocuments.id,
      action: "uploaded",
      recipient_office: recipient,
      recipient_user: uploaded_by,
      createdAt: createdAt,
    };

    await Promise.all(
      route.map((office) => {
        return addNotification({
          document_id: newDocuments.id,
          content: `${document_name} has been ${action} by ${uploaded_by}`,
          user_id: office.user_id,
        });
      })
    );

    await sendNotification({
      email: user_email,
      subject: `WMSU-ESU Document Tracker - Document ${action}`,
      message: `The document ${document_name} has been ${action} by ${uploaded_by} on ${new Date().toDateString()} at ${new Date().toLocaleTimeString()}`,
    });

    // Insert the formatted route data into documentHistoryModel
    await documentRecipientModel.bulkCreate(formattedRouteData);

    // Insert the document history
    await documentHistoryModel.create(documentHistory);

    return res.status(201).json({
      user,
      status: "success",
      message: "Document uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const documents = await documentModel.findAll({
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDocumentByTrackingNum = async (req, res) => {
  const { tracking_number } = req.params;

  try {
    if (!tracking_number) {
      return res.status(400).json({
        message: "Please enter a tracking number.",
      });
    }

    const document = await documentModel.findOne({
      where: {
        tracking_number: tracking_number,
      },
      include: [
        { model: documentHistoryModel, require: true },
        { model: documentRecipientModel, require: true },
      ],
    });

    if (!document) {
      return res.status(400).json({
        message: "Document not found. Please enter valid tracking number.",
      });
    }
    return res.status(200).json(document);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getDocumentById = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await documentModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(document);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllDocumentsByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchDocuments = async (req, res) => {
  const { name } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        [Sequelize.Op.or]: [
          { document_name: { [Op.like]: `${name}%` } },
          { uploaded_by: { [Op.like]: `${name}%` } },
        ],
        // document_name: { [Op.like]: `${name}%` },
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const filterDocuments = async (req, res) => {
  const { filterField, filterValue } = req.params;

  const validFields = ["esuCampus", "document_type", "status"];

  if (!validFields.includes(filterField)) {
    return res.status(400).json({ message: "Invalid filter field" });
  }

  try {
    const documents = await documentModel.findAll({
      where: {
        [filterField]: filterValue,
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const filterUserDocuments = async (req, res) => {
  const { status, user_id } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        status: status,
        user_id: user_id,
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });

    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// quick sort algorithm
// asc = ascending
const quickSortDocuments = (documents, field, order = "asc") => {
  if (documents.length <= 1) {
    return documents;
  }

  const pivotIndex = Math.floor(documents.length / 2);
  const pivot = documents[pivotIndex];

  const left = [];
  const right = [];

  for (let i = 0; i < documents.length; i++) {
    if (i === pivotIndex) continue; // Skip the pivot element

    if (documents[i] && documents[i][field]) {
      // Use comparison based on the desired order
      if (
        (order === "asc" && documents[i][field] < pivot[field]) ||
        (order === "desc" && documents[i][field] > pivot[field])
      ) {
        left.push(documents[i]);
      } else {
        right.push(documents[i]);
      }
    } else {
      console.error(`Document at index ${i} does not have field ${field}`);
    }
  }
  return [
    ...quickSortDocuments(left, field, order),
    pivot,
    ...quickSortDocuments(right, field, order),
  ];
};

const sortDocuments = async (req, res) => {
  try {
    const { sortBy, order = "asc" } = req.query;
    const validFields = [
      "id",
      "createdAt",
      "document_name",
      "file_type",
      "uploaded_by",
      "status",
      "document_type",
      "esuCampus",
    ];

    if (!validFields.includes(sortBy)) {
      return res.status(400).json({ message: "Invalid field to sort by" });
    }

    const documents = await documentModel.findAll({
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });

    const sortedDocuments = quickSortDocuments(documents, sortBy, order);
    return res.status(200).json(sortedDocuments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const sortDocumentsByUser = async (req, res) => {
  try {
    const { sortBy, order = "asc", user_id, esuCampus } = req.query;
    const validFields = [
      "id",
      "createdAt",
      "document_name",
      "file_type",
      "uploaded_by",
      "status",
      "document_type",
      "esuCampus",
    ];

    if (!validFields.includes(sortBy)) {
      return res.status(400).json({ message: "Invalid field to sort by" });
    }

    // Build the filter dynamically based on the query parameters
    const filter = {};
    // Only include user_id and esuCampus in the filter if they are not null or undefined
    if (user_id && user_id !== "null") {
      filter.user_id = Number(user_id); // Ensure user_id is an integer
    }

    if (esuCampus && esuCampus !== "null") {
      filter.esuCampus = esuCampus;
    }

    const documents = await documentModel.findAll({
      where: filter,
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });

    const sortedDocuments = quickSortDocuments(documents, sortBy, order);
    return res.status(200).json(sortedDocuments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const searchDocumentsByUserId = async (req, res) => {
  const { name, user_id } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        user_id: user_id,
        [Sequelize.Op.or]: [
          { document_name: { [Op.like]: `${name}%` } },
          { uploaded_by: { [Op.like]: `${name}%` } },
        ],
      },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const receiveDocuments = async (req, res) => {
  const {
    document_id,
    office_name,
    user_id,
    action,
    recipient_user,
    recipient_office,
    document_name,
  } = req.body;

  try {
    const document = await documentModel.findOne({
      where: {
        id: document_id,
      },
    });
    if (action === "received") {
      await documentRecipientModel.update(
        {
          status: documentStatus.received,
          received_at: createdAt,
          updatedAt: createdAt,
        },
        {
          where: {
            document_id: document_id,
            user_id: user_id,
          },
        }
      );
    }

    if (action === "forwarded") {
      await documentRecipientModel.update(
        {
          status: documentStatus.forwarded,
          updatedAt: createdAt,
        },
        {
          where: {
            document_id: document_id,
            user_id: user_id,
          },
        }
      );
    }

    const documentHistory = {
      document_id,
      office_name,
      action,
      recipient_office,
      recipient_user,
      createdAt: createdAt,
    };

    await documentHistoryModel.create(documentHistory);

    await addNotification({
      document_id: document_id,
      content: `${document_name} has been ${action} by ${recipient_user} at ${recipient_office}`,
      user_id: document?.user_id,
    });

    await sendNotification({
      email: document?.user_email,
      subject: `WMSU-ESU Document Tracker - Document ${action}`,
      message: `The document ${document_name} has been ${action} by ${recipient_user} at the ${recipient_office} on ${new Date().toDateString()} at ${new Date().toLocaleTimeString()}`,
    });

    return res.status(200).json({
      status: "success",
      message: `Document ${action} successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadDocument,
  getAllDocuments,
  getDocumentByTrackingNum,
  searchDocuments,
  filterDocuments,
  getDocumentById,
  sortDocuments,
  getAllDocumentsByUserId,
  sortDocumentsByUser,
  searchDocumentsByUserId,
  filterUserDocuments,
  receiveDocuments,
};
