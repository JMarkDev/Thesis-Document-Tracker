"use strict";
const { createdAt } = require("../utils/formattedTime");
const documentStatus = require("../constants/documentStatus");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "documents",
      [
        {
          id: 1,
          tracking_number: "1223D456123",
          document_name: "IOR Pagadian Campus",
          document_type: "IDP",
          file_type: "Hardcopy",
          files: null,
          uploaded_by: "Josiel Mark M. Seroy",
          status: documentStatus.received,
          route: JSON.stringify([
            "Faculty",
            "Registrar",
            "OIC Dean of External Studies Unit",
            "Vice President for Academic Affairs Office",
            "Human Resources Office",
            "Accounting Office",
            "Records Office",
          ]),
          current_position: 0,
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        // Add more documents if needed
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("documents", null, {});
  },
};
