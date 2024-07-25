"use strict";
const { createdAt } = require("../utils/formattedTime");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("routes", [
      {
        document_type: "IOR (Internal Office Reports)", // Example document type
        route: JSON.stringify([
          "Faculty",
          "Registrar",
          "OIC Dean of External Studies Unit",
          "Vice President for Academic Affairs Office",
          "Human Resources Office",
          "Accounting Office",
          "Records Office",
        ]),
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        document_type: "IDP (Individual Development Plans)", // Another example document type
        route: JSON.stringify([
          "Faculty",
          "Registrar",
          "OIC Dean of External Studies Unit",
          "Vice President for Academic Affairs Office",
          "Human Resources Office",
          "Accounting Office",
          "Records Office",
        ]),
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        document_type: "DTR (Daily Time Record)", // Another example document type
        route: JSON.stringify([
          "Faculty",
          "Registrar",
          "OIC Dean of External Studies Unit",
          "Vice President for Academic Affairs Office",
          "Human Resources Office",
          "Accounting Office",
          "Records Office",
        ]),
        createdAt: createdAt,
        updatedAt: createdAt,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("routes", null, {});
  },
};
