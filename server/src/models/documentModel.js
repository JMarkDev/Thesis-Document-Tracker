const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");
const DocumentHistory = require("../models/documentHistoryModel");
const DocumentRecipient = require("../models/documentRecipientModel");
const User = require("../models/userModel");
const notificationModel = require("../models/notificationModel");

const Document = sequelize.define(
  "documents",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tracking_number: {
      type: DataTypes.STRING(55),
      unique: true,
      allowNull: false,
    },
    document_name: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    document_type: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    document_desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    file_type: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    files: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    uploaded_by: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING(55),
      allowNull: true,
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    esuCampus: {
      type: DataTypes.STRING(55),
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    // route: {
    //   type: DataTypes.JSON, // Store the route as a JSON array
    //   allowNull: false,
    // },
    // current_position: {
    //   type: DataTypes.INTEGER, // Track the current position in the route
    //   allowNull: false,
    //   defaultValue: 0,
    // },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
  }
);

Document.hasMany(DocumentHistory, {
  foreignKey: "document_id",
  onDelete: "CASCADE",
});
Document.hasMany(DocumentRecipient, {
  foreignKey: "document_id",
  onDelete: "CASCADE",
});

DocumentHistory.belongsTo(Document, {
  foreignKey: "document_id",
  onDelete: "CASCADE",
});

DocumentRecipient.belongsTo(Document, {
  foreignKey: "document_id",
  onDelete: "CASCADE",
});

// Define the relationship with user
User.hasMany(Document, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Document.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

Document.hasMany(notificationModel, {
  foreignKey: "document_id",
  onDelete: "CASCADE",
});

module.exports = Document;
