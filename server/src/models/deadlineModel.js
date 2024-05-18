const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Deadline = sequelize.define("deadlines", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  documentName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  documentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  esuCampus: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Deadline;
