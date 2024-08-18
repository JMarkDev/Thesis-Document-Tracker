const sequelize = require("../configs/database");
const { DataTypes, Sequelize } = require("sequelize");
const Document = require("../models/documentModel");

const DocumentHistory = sequelize.define(
  "document_history",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "documents", // Ensure this matches the model name in the Document model
        key: "id",
      },
      onDelete: "CASCADE",
    },
    // content: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    // },
    action: {
      type: DataTypes.STRING(20),
      // type: Sequelize.ENUM("Uploaded", "Received", "Forwared"),
      allowNull: true,
    },
    recipient_office: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    recipient_user: {
      type: DataTypes.STRING(100),
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
  },
  {
    timestamps: false,
    tableName: "document_history",
  }
);

// DocumentHistory.belongsTo(Document, {
//   foreignKey: "document_id",
//   onDelete: "CASCADE",
// });

module.exports = DocumentHistory;
