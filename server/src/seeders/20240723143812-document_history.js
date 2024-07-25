"use strict";
const { createdAt } = require("../utils/formattedTime"); // Import a function or use your own date values

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "document_history",
      [
        {
          id: 1,
          document_id: 1,
          content: "Document uploaded by: Josiel Mark M. Seroy",
          recipient: "Josiel Mark M. Seroy",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          id: 2,
          document_id: 1,
          content: "Document received by: Faculty",
          recipient: "Faculty",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          id: 3,
          document_id: 1,
          content: "Document forwarded to: Registrar",
          recipient: "Registrar",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          id: 4,
          document_id: 1,
          content: "Document received by: Registrar",
          recipient: "Registrar",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          id: 5,
          document_id: 1,
          content: "Document forwarded to: OIC Dean of External Studies Unit",
          recipient: "OIC Dean of External Studies Unit",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          id: 6,
          document_id: 1,
          content: "Document received by: OIC Dean of External Studies Unit",
          recipient: "OIC Dean of External Studies Unit",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        // Add more history entries as needed
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("document_history", null, {});
  },
};
