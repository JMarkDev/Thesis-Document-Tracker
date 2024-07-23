"use strict";

const bcrypt = require("bcryptjs");
const { createdAt } = require("../utils/formattedTime");
const saltsRounds = 10;
const rolesList = require("../constants/rolesList");
const statusList = require("../constants/statusList");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Generate hashed password
    const hashPassword = await bcrypt.hash("password", saltsRounds);

    return queryInterface.bulkInsert("users", [
      {
        firstName: "Byron",
        lastName: "Go Silk",
        middleInitial: "B",
        email: "wmsuesudocumenttracker@gmail.com",
        birthDate: "2000-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["OIC DEAN", "Admin"]),
        esuCampus: null,
        role: rolesList.admin,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Vice ",
        lastName: "President",
        middleInitial: "B",
        email: "vide_president_office@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Vice President"]),
        esuCampus: null,
        role: rolesList.office,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Human",
        lastName: "Resouces",
        middleInitial: "B",
        email: "human_resource_office@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Human Resource"]),
        esuCampus: null,
        role: rolesList.office,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Accounting",
        lastName: "Office",
        middleInitial: "B",
        email: "accounting_office@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Accounting"]),
        esuCampus: null,
        role: rolesList.office,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Records",
        lastName: "Office",
        middleInitial: "B",
        email: "records_office@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Records Office"]),
        esuCampus: null,
        role: rolesList.office,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Alicia",
        lastName: "Campus Admin",
        middleInitial: "A",
        email: "alicia_campus_admin@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Campus Admin"]),
        esuCampus: "WMSU-ESU Alicia",
        role: rolesList.campus_admin,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Alicia",
        lastName: "Registrar",
        middleInitial: "A",
        email: "alicia_registrar@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Registrar"]),
        esuCampus: "WMSU-ESU Alicia",
        role: rolesList.registrar,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Aurora",
        lastName: "Campus Admin",
        middleInitial: "A",
        email: "aurora_campus_admin@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Campus Admin"]),
        esuCampus: "WMSU-ESU Aurora",
        role: rolesList.campus_admin,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Aurora",
        lastName: "Registrar",
        middleInitial: "A",
        email: "aurora_registrar@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Registrar"]),
        esuCampus: "WMSU-ESU Aurora",
        role: rolesList.registrar,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Diplahan",
        lastName: "Campus Admin",
        middleInitial: "A",
        email: "diplahan_campus_admin@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Campus Admin"]),
        esuCampus: "WMSU-ESU Diplahan",
        role: rolesList.campus_admin,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Diplahan",
        lastName: "Registrar",
        middleInitial: "A",
        email: "diplahan_registrar@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Registrar"]),
        esuCampus: "WMSU-ESU Diplahan",
        role: rolesList.registrar,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Malangas",
        lastName: "Campus Admin",
        middleInitial: "A",
        email: "malangas_campus_admin@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Campus Admin"]),
        esuCampus: "WMSU-ESU Malangas",
        role: rolesList.campus_admin,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Malangas",
        lastName: "Registrar",
        middleInitial: "A",
        email: "malangas_registrar@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Registrar"]),
        esuCampus: "WMSU-ESU Malangas",
        role: rolesList.registrar,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Pagadian",
        lastName: "Campus Admin",
        middleInitial: "A",
        email: "pagadian_campus_admin@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Campus Admin"]),
        esuCampus: "WMSU-ESU Pagadian",
        role: rolesList.campus_admin,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Pagadian",
        lastName: "Registrar",
        middleInitial: "A",
        email: "pagadian_registrar@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Registrar"]),
        esuCampus: "WMSU-ESU Pagadian",
        role: rolesList.registrar,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Siay",
        lastName: "Campus Admin",
        middleInitial: "A",
        email: "siay_campus_admin@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Campus Admin"]),
        esuCampus: "WMSU-ESU Siay",
        role: rolesList.campus_admin,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Siay",
        lastName: "Registrar",
        middleInitial: "A",
        email: "siay_registrar@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Registrar"]),
        esuCampus: "WMSU-ESU Siay",
        role: rolesList.registrar,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Tungawan",
        lastName: "Campus Admin",
        middleInitial: "A",
        email: "tungawan_campus_admin@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Campus Admin"]),
        esuCampus: "WMSU-ESU Tungawan",
        role: rolesList.campus_admin,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Tungawan",
        lastName: "Registrar",
        middleInitial: "A",
        email: "tungawan_registrar@gmail.com",
        birthDate: "2001-01-01",
        contactNumber: "01234567789",
        designation: JSON.stringify(["Registrar"]),
        esuCampus: "WMSU-ESU Tungawan",
        role: rolesList.registrar,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Josiel Mark",
        lastName: "Seroy",
        middleInitial: "M",
        email: "jmseroy@gmail.com",
        birthDate: "2001-10-05",
        contactNumber: "01234567890",
        designation: JSON.stringify(["Faculty", "Cute"]),
        esuCampus: "WMSU-ESU Pagadian",
        role: rolesList.faculty,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Sample",
        lastName: "Faculty",
        middleInitial: "B",
        email: "diplahan_faculty@gmail.com",
        birthDate: "1982-01-01",
        contactNumber: "01234567891",
        designation: JSON.stringify(["Faculty"]),
        esuCampus: "WMSU-ESU Diplahan",
        role: rolesList.faculty,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Malangas",
        lastName: "Faculty",
        middleInitial: "C",
        email: "faculty3_tungawan@gmail.com",
        birthDate: "1984-01-01",
        contactNumber: "01234567892",
        designation: JSON.stringify(["Faculty"]),
        esuCampus: "WMSU-ESU Malangas",
        role: rolesList.faculty,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Sample",
        lastName: "Faculty",
        middleInitial: "D",
        email: "faculty4_tungawan@gmail.com",
        birthDate: "1986-01-01",
        contactNumber: "01234567893",
        designation: JSON.stringify(["Faculty"]),
        esuCampus: "WMSU-ESU Tungawan",
        role: rolesList.faculty,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
      {
        firstName: "Sample",
        lastName: "Faculty",
        middleInitial: "E",
        email: "molave_faculty@gmail.com",
        birthDate: "1988-01-01",
        contactNumber: "01234567894",
        designation: JSON.stringify(["Faculty"]),
        esuCampus: "WMSU-ESU Molave",
        role: rolesList.faculty,
        password: hashPassword,
        status: statusList.verified,
        createdAt: createdAt,
        updatedAt: createdAt,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    return queryInterface.bulkDelete("users", null, {});
  },
};
