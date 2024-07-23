const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");
const userModel = require("../models/userModel");

const Office = sequelize.define(
  "offices",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    officeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    officeName: {
      type: DataTypes.STRING(55),
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

userModel.hasOne(Office, { foreignKey: "officeId", onDelete: "CASCADE" });

module.exports = Office;
