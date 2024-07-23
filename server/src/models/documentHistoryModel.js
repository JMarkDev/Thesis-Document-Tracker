const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");
const documentModel = require("../models/documentModel");

const DocumentHistory = sequelize.define(
  "document_history",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
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

// documentModel.hasMany(DocumentHistory, {
//   foreignKey: "document_id",
//   onDelete: "CASCADE",
// });

module.exports = DocumentHistory;
