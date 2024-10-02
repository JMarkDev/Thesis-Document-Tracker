const sequelize = require("../configs/database");
const { DataTypes, Sequelize } = require("sequelize");
const Document = require("./documentModel");

const DocumentRecipient = sequelize.define(
  "document_recipient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    office_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    received_at: {
      type: DataTypes.DATE,
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
    tableName: "document_recipient",
  }
);

// DocumentRecipient.belongsTo(Document, {
//   foreignKey: "document_id",
//   onDelete: "CASCADE",
// });

module.exports = DocumentRecipient;
