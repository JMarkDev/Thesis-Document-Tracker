const { Op, fn, col, where, Sequelize } = require("sequelize"); // Import necessary Sequelize functions
const documentModel = require("../models/documentModel");
const documentHistoryModel = require("../models/documentHistoryModel");
const documentRecipientModel = require("../models/documentRecipientModel");
const { createdAt } = require("../utils/formattedTime");
const documentStatus = require("../constants/documentStatus");
const userModel = require("../models/userModel");
const officeModel = require("../models/officeModel");
const routeModel = require("../models/documentRouteModel");
const rolesList = require("../constants/rolesList");
const statusList = require("../constants/statusList");
const wmsuCampus = require("../constants/Campus");

const getAdminCardData = async (req, res) => {
  try {
    const totalDocuments = await documentModel.findAll({
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });
    const totalDocumentType = await routeModel.findAll();
    const totalOffice = await officeModel.findAll();
    // const totalEsuCampus = await userModel.findAll({
    //   where: {
    //     role: rolesList.registrar,
    //     status: statusList.verified,
    //   },
    // });

    const totalFaculty = await userModel.findAll({
      where: {
        role: rolesList.faculty,
        status: statusList.approved,
      },
    });

    const data = [
      {
        title: "Total Documents",
        value: totalDocuments.length,
        documents: totalDocuments,
      },
      {
        title: "Total Documents types",
        value: totalDocumentType.length,
        data: totalDocumentType,
      },
      { title: "Total Offices", value: totalOffice.length, data: totalOffice },
      // {
      //   title: "Total ESU Campus",
      //   value: totalEsuCampus.length,
      //   data: totalEsuCampus,
      // },
      {
        title: "Total Faculty",
        value: totalFaculty.length,
        data: totalFaculty,
      },
    ];

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const processDocumentsByYear = async (year, esuCampus = null) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Fetch document types, optionally filtering by `esuCampus`
  const documentTypes = await routeModel.findAll({
    where: esuCampus ? { esuCampus } : {},
  });

  // Prepare a structure for the results
  const results = months.map((month) => {
    const monthResults = { month };
    documentTypes.forEach((type) => {
      monthResults[type.document_type] = 0; // Initialize with 0 for each document type
    });
    return monthResults;
  });

  return { results, months };
};

const countDocumentsByMonth = (documents, year, months, results) => {
  documents.forEach((document) => {
    const documentDate = new Date(document.createdAt);
    const documentYear = documentDate.getFullYear();
    const documentMonth = documentDate.getMonth(); // Get month as index (0 = Jan, 11 = Dec)

    if (documentYear === parseInt(year, 10)) {
      const monthName = months[documentMonth];
      const documentType = document.document_type;

      // Find the month result object and increment the count
      const monthResult = results.find((result) => result.month === monthName);
      if (monthResult && monthResult[documentType] !== undefined) {
        monthResult[documentType] += 1; // Increment the count
      }
    }
  });
};

const getDataByYear = async (req, res) => {
  const { year } = req.params;

  try {
    const documents = await documentModel.findAll(); // Fetch documents for the year
    const { results, months } = await processDocumentsByYear(year);

    // Populate results with actual counts
    countDocumentsByMonth(documents, year, months, results);

    return res.status(200).json(results); // Send formatted results
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFacultyDataByYear = async (req, res) => {
  const { year, user_id } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        user_id,
      },
    }); // Fetch documents for the year
    const { results, months } = await processDocumentsByYear(year);

    // Populate results with actual counts
    countDocumentsByMonth(documents, year, months, results);

    return res.status(200).json(results); // Send formatted results
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOfficeDataByYear = async (req, res) => {
  const { year, officeName } = req.params;

  try {
    const documents = await documentModel.findAll({
      include: [
        {
          model: documentRecipientModel,
          where: {
            office_name: officeName,
          },
        },
      ],
    });

    // Fetch documents for the year
    const { results, months } = await processDocumentsByYear(year);

    // Populate results with actual counts
    countDocumentsByMonth(documents, year, months, results);

    return res.status(200).json(results); // Send formatted results
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDataByYearByEsu = async (req, res) => {
  const { year, esuCampus } = req.params;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  try {
    // Fetch documents created within the specified year
    const documents = await documentModel.findAll({
      where: {
        esuCampus,
      },
    }); // Adjust this if you want to filter by a specific date field
    const documentTypes = await routeModel.findAll();

    // Prepare a structure for the results
    const results = months.map((month) => {
      const monthResults = { month };
      documentTypes.forEach((type) => {
        monthResults[type.document_type] = 0; // Initialize with 0 for each document type
      });
      return monthResults;
    });

    // Populate results with actual counts
    documents.forEach((document) => {
      const documentDate = new Date(document.createdAt);
      const documentYear = documentDate.getFullYear();
      const documentMonth = documentDate.getMonth(); // Get month as an index (0 = Jan, 11 = Dec)

      if (documentYear === parseInt(year, 10)) {
        const monthName = months[documentMonth];
        const documentType = document.document_type;

        // Find the month result object and increment the count
        const monthResult = results.find(
          (result) => result.month === monthName
        );
        if (monthResult && monthResult[documentType] !== undefined) {
          monthResult[documentType] += 1; // Increment the count
        }
      }
    });

    return res.status(200).json(results); // Send formatted results
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOfficeReports = async (req, res) => {
  const { year, officeName } = req.params;

  try {
    const documents = await documentModel.findAll({
      include: [
        {
          model: documentRecipientModel,
          where: {
            office_name: officeName,
          },
        },
      ],
      where: Sequelize.where(
        Sequelize.fn("YEAR", Sequelize.col("documents.createdAt")), // Specify the "documents" table for createdAt
        year
      ),
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOfficeReportsByESU = async (req, res) => {
  const { esuCampus, officeName } = req.params;

  try {
    const whereClause =
      esuCampus === "WMSU-ESU"
        ? {} // No condition on esuCampus for "WMSU-ESU"
        : {
            esuCampus,
            // [Sequelize.Op.and]: Sequelize.where(
            //   Sequelize.fn("YEAR", Sequelize.col("documents.createdAt")), // Specify "documents" table for createdAt
            //   year
            // ),
          };

    const documents = await documentModel.findAll({
      where: whereClause,
      // {
      //   esuCampus,
      //   [Sequelize.Op.and]: Sequelize.where(
      //     Sequelize.fn("YEAR", Sequelize.col("documents.createdAt")), // Specify the "documents" table for createdAt
      //     year
      //   ),
      // },
      include: [
        {
          model: documentRecipientModel,
          where: {
            office_name: officeName,
          },
        },
      ],
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDataByEsuCampus = async (req, res) => {
  try {
    const documents = await documentModel.findAll();

    const campusData = wmsuCampus.map((campus) => ({
      campus: campus.replace("WMSU-ESU ", ""),
      documents: 0,
    }));

    // cound documents for each campus

    documents.forEach((document) => {
      const campusIndex = campusData.findIndex(
        (campusItem) => `WMSU-ESU ${campusItem.campus}` === document.esuCampus
      );

      if (campusIndex !== -1) {
        campusData[campusIndex].documents += 1;
      }
    });

    return res.status(200).json(campusData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDocumentTypeData = async (req, res) => {
  try {
    const documents = await documentModel.findAll();
    const documentTypes = await routeModel.findAll();

    const documentTypeCounts = {};

    documentTypes.forEach((type) => {
      documentTypeCounts[type.document_type] = 0;
    });

    documents.forEach((document) => {
      const documentType = document.document_type;

      if (documentTypeCounts[documentType]) {
        documentTypeCounts[documentType] += 1;
      } else {
        documentTypeCounts[documentType] = 1;
      }
    });

    const documentType = Object.entries(documentTypeCounts).map(
      ([type, count]) => ({
        type,
        count,
      })
    );

    return res.status(200).json(documentType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDocumentReports = async (req, res) => {
  const { year } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: where(fn("YEAR", col("createdAt")), year), // Use Sequelize where with fn
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDocumentESUReports = async (req, res) => {
  const { year, esuCampus } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        [Op.and]: [
          { esuCampus }, // Assuming esuCampus is correctly passed as a string
          Sequelize.where(fn("YEAR", col("createdAt")), year), // Ensure proper comparison here
        ],
      },
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSumittedDocumentByType = async (req, res) => {
  const { type } = req.params;

  try {
    const documents = await documentModel.findAll({
      where: {
        document_type: type,
      },
    });

    return res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAdminCardData,
  getDataByYear,
  getFacultyDataByYear,
  getDataByEsuCampus,
  getDocumentTypeData,
  getDocumentReports,
  getSumittedDocumentByType,
  getDataByYearByEsu,
  getDocumentESUReports,
  getOfficeDataByYear,
  getOfficeReports,
  getOfficeReportsByESU,
};
