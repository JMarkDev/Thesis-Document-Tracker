const sequelize = require("../configs/database");
const { DataTypes } = require("sequelize");
const Office = require("./officeModel");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    middleInitial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING(55),
      allowNull: true,
    },
    esuCampus: {
      type: DataTypes.STRING(55),
      allowNull: true,
    },
    role: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
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
    officeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "offices",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
  }
);

// Define the relationship (assuming a one-to-one association)
Office.hasOne(User, { foreignKey: "officeId", onDelete: "CASCADE" });
User.belongsTo(Office, { foreignKey: "officeId", onDelete: "CASCADE" });

module.exports = User;
