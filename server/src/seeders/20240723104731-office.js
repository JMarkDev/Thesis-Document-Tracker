"use strict";
const { createdAt } = require("../utils/formattedTime");

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
     * 
     *   {
 
     */
    return queryInterface.bulkInsert("offices", [
      {
        officeName: "OIC DEAN OF EXTERNAL STUDIES UNIT OFFICE",
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        officeName: "VICE PRESIDENT FOR ACADEMIC AFFAIRS OFFICE",
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        officeName: "HUMAN RESOURCE OFFICE",
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        officeName: "ACCOUNTING OFFICE",
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        officeName: "RECORDS OFFICE",
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
    return queryInterface.bulkDelete("offices", null, {});
  },
};
