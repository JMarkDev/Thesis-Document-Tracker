const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Route = sequelize.define(
  "routes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    document_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    route: {
      type: DataTypes.JSON,
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

module.exports = Route;
