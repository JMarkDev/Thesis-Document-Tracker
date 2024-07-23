"use strict";
const { createdAt } = require("../utils/formattedTime");
const documentStatus = require("../constants/documentStatus");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("documents", [
      {
        id: 1,
        tracking_number: "1ABCD456123",
        document_name: "IDP Pagadian Campus",
        document_type: "IDP",
        file_type: "Hardcopy",
        files: null,
        uploaded_by: "Josiel Mark M. Seroy",
        status: documentStatus.received,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        id: 2,
        tracking_number: "1223D456123",
        document_name: "IOR Pagadian Campus",
        document_type: "IDP",
        file_type: "Hardcopy",
        files: null,
        uploaded_by: "Josiel Mark M. Seroy",
        status: documentStatus.received,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        id: 3,
        tracking_number: "1213123",
        document_name: "IOR Pagadian Campus",
        document_type: "IDP",
        file_type: "Hardcopy",
        files: null,
        uploaded_by: "Josiel Mark M. Seroy",
        status: documentStatus.received,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("documents", null, {});
  },
};
