"use strict";
const { createdAt } = require("../utils/formattedTime"); // Import a function or use your own date values

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "document_history",
      [
        {
          document_id: 1,
          content: "Document uploaded by: Josiel Mark M. Seroy",
          recipient: "Josiel Mark M. Seroy",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 1,
          content: "Document received by: WMSU-ESU Pagadian Campus",
          recipient: "Pagadian Registrar",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 1,
          content: "Document forwarded to: OIC Dean of ESU Office",
          recipient: null,
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 1,
          content: "Document received by: OCI Dean of ESU Office",
          recipient: "Byron Go Silk",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 1,
          content:
            " Document forwarded to: Vice President for Academic Affairs Office",
          recipient: null,
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 1,
          content:
            "Document received by: Vice President for Academic Affairs Office",
          recipient: "Vice president user",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 2,
          content: "Document uploaded by: Josiel Mark M. Seroy",
          recipient: "Josiel Mark M. Seroy",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 2,
          content: "Document received by: WMSU-ESU Pagadian Campus",
          recipient: "Pagadian Registrar",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 2,
          content: "Document forwarded to: OIC Dean of ESU Office",
          recipient: null,
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 2,
          content: "Document received by: OCI Dean of ESU Office",
          recipient: "Byron Go Silk",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 2,
          content:
            " Document forwarded to: Vice President for Academic Affairs Office",
          recipient: null,
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 2,
          content:
            "Document received by: Vice President for Academic Affairs Office",
          recipient: "Vice president user",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 3,
          content: "Document uploaded by: Josiel Mark M. Seroy",
          recipient: "Josiel Mark M. Seroy",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 3,
          content: "Document received by: WMSU-ESU Pagadian Campus",
          recipient: "Pagadian Registrar",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 3,
          content: "Document forwarded to: OIC Dean of ESU Office",
          recipient: null,
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 4,
          content: "Document uploaded by: Josiel Mark M. Seroy",
          recipient: "Josiel Mark M. Seroy",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 4,
          content: "Document received by: WMSU-ESU Pagadian Campus",
          recipient: "Pagadian Registrar",
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        {
          document_id: 4,
          content: "Document forwarded to: OIC Dean of ESU Office",
          recipient: null,
          createdAt: createdAt,
          updatedAt: createdAt,
        },
        // Add more history entries as needed
      ],
      {}
    );
  },

  // async up(queryInterface, Sequelize) {
  //   await queryInterface.bulkDelete("document_history", null, {});
  // },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("document_history", null, {});
  },
};
