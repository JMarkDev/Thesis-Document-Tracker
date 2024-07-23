const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Document = sequelize.define(
  "Document",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tracking_number: {
      type: DataTypes.STRING(55),
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
    uploaded_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT(1),
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
  }
);

module.exports = Document;
