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
          tracking_number: "1223D456123",
          document_name: "IOR Pagadian Campus",
          document_type: "IDP",
          file_type: "Hardcopy",
          files: null,
          uploaded_by: "Josiel Mark M. Seroy",
          esuCampus: "WMSU-ESU Diplahan",
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
          user_id: 1,
        },
        {
          tracking_number: "1223D456123",
          document_name: "IOR Pagadian Campus",
          document_type: "IDP",
          file_type: "Hardcopy",
          files: null,
          uploaded_by: "Josiel Mark M. Seroy",
          esuCampus: "WMSU-ESU Pagadian",
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
          user_id: 1,
        },
        {
          tracking_number: "1223D456123",
          document_name: "IOR Pagadian Campus",
          document_type: "IDP",
          file_type: "Hardcopy",
          files: null,
          uploaded_by: "Josiel Mark M. Seroy",
          esuCampus: "WMSU-ESU Malangas",
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
          user_id: 2,
        },
        {
          tracking_number: "1223D456123",
          document_name: "IOR Pagadian Campus",
          document_type: "IDP",
          file_type: "Hardcopy",
          files: null,
          uploaded_by: "Josiel Mark M. Seroy",
          esuCampus: "WMSU-ESU Alicia",
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
          user_id: 2,
        },
        // Add more documents if needed
      ],
      {}
    );
  },

  // async up(queryInterface, Sequelize) {
  //   await queryInterface.bulkDelete("documents", null, {});
  // },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("documents", null, {});
    // await queryInterface.bulkDelete("document_histories", null, {});
  },
};
