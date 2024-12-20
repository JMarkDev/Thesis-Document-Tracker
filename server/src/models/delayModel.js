const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");

const Delay = sequelize.define(
  "delay",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    days_before_delay: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    auto_logout_minutes: {
      type: DataTypes.TINYINT,
      allowNull: true,
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
  },
  {
    timestamps: false,
  }
);

module.exports = Delay;
