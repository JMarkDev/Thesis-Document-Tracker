const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const DocumentHistory = sequelize.define(
  "histories",
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
    uploaded_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    received_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    forwarded_to: {
      type: DataTypes.STRING(100),
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

module.exports = DocumentHistory;
