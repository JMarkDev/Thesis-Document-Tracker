"use strict";
const { createdAt } = require("../utils/formattedTime");
const documentStatus = require("../constants/documentStatus");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("documents", [
      {
        tracking_number: "1223D456123A",
        document_name: "IOR Pagadian Campus",
        document_type: "IDP",
        file_type: "Hardcopy",
        files: null,
        uploaded_by: "Josiel Mark M. Seroy",
        esuCampus: "WMSU-ESU Diplahan",
        status: documentStatus.incoming,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
      {
        tracking_number: "1223D456123B",
        document_name: "IOR Molave Campus",
        document_type: "IDP",
        file_type: "Softcopy",
        files: JSON.stringify(["file1.pdf", "file2.pdf"]),
        uploaded_by: "Jane Doe",
        esuCampus: "WMSU-ESU Molave",
        status: documentStatus.received,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
      {
        tracking_number: "1223D456123C",
        document_name: "Research Paper",
        document_type: "Research",
        file_type: "Softcopy",
        files: JSON.stringify(["research.pdf"]),
        uploaded_by: "John Smith",
        esuCampus: "WMSU-ESU Alicia",
        status: documentStatus.delayed,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
      {
        tracking_number: "1223D456123D",
        document_name: "Thesis",
        document_type: "Thesis",
        file_type: "Hardcopy",
        files: null,
        uploaded_by: "Maria Garcia",
        esuCampus: "WMSU-ESU Ipil",
        status: documentStatus.incoming,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
      {
        tracking_number: "1223D456123E",
        document_name: "Budget Proposal",
        document_type: "Proposal",
        file_type: "Softcopy",
        files: JSON.stringify(["budget.pdf"]),
        uploaded_by: "Michael Johnson",
        esuCampus: "WMSU-ESU Pagadian",
        status: documentStatus.incoming,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
      // 5 more documents
      {
        tracking_number: "1223D456123F",
        document_name: "Project Report",
        document_type: "Report",
        file_type: "Hardcopy",
        files: null,
        uploaded_by: "Emily Brown",
        esuCampus: "WMSU-ESU Molave",
        status: documentStatus.received,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
      {
        tracking_number: "1223D456123G",
        document_name: "Activity Plan",
        document_type: "Plan",
        file_type: "Softcopy",
        files: JSON.stringify(["activity_plan.pdf"]),
        uploaded_by: "David Lee",
        esuCampus: "WMSU-ESU Diplahan",
        status: documentStatus.incoming,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
      {
        tracking_number: "1223D456123H",
        document_name: "Annual Report",
        document_type: "Report",
        file_type: "Softcopy",
        files: JSON.stringify(["annual_report.pdf"]),
        uploaded_by: "Sarah Connor",
        esuCampus: "WMSU-ESU Ipil",
        status: documentStatus.delayed,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
      {
        tracking_number: "1223D456123I",
        document_name: "Inventory Report",
        document_type: "Report",
        file_type: "Hardcopy",
        files: null,
        uploaded_by: "Anna White",
        esuCampus: "WMSU-ESU Alicia",
        status: documentStatus.incoming,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
      {
        tracking_number: "1223D456123J",
        document_name: "Meeting Minutes",
        document_type: "Minutes",
        file_type: "Softcopy",
        files: JSON.stringify(["minutes.pdf"]),
        uploaded_by: "James Bond",
        esuCampus: "WMSU-ESU Pagadian",
        status: documentStatus.received,
        createdAt: createdAt,
        updatedAt: createdAt,
        user_id: 44,
      },
    ]);
    {
    }
  },

  // async up(queryInterface, Sequelize) {
  //   await queryInterface.bulkDelete("documents", null, {});
  // },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("documents", null, {});
    // await queryInterface.bulkDelete("document_histories", null, {});
  },
};
