import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import wmsuCampus from "../../../constants/Campus";
import ReportsTable from "../../../components/table/ReportsTable";
import { IoSearch } from "react-icons/io5";

import {
  fetchAllDocuments,
  filterAllDocuments,
  getFilteredDocuments,
} from "../../../services/documentSlice";
import {
  getAllWorkflow,
  fetchAllWorkflow,
} from "../../../services/documentWolkflowSlice";
import LineChartDocumentSubmissions from "../../../components/charts/LineChartDocumentSubmissions";
import { useFormat } from "../../../hooks/useFormatDate";

const Reports = () => {
  const { dateFormat } = useFormat();
  const dispatch = useDispatch();
  const allDocuments = useSelector(getFilteredDocuments);
  const allWorkflow = useSelector(getAllWorkflow);
  const [documentType, setDocumentType] = useState("");
  const [esuCampus, setEsuCampus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(
      filterAllDocuments({
        document_type: documentType,
        esuCampus: esuCampus,
        startDate: startDate,
        endDate: endDate,
        uploaded_by: searchTerm,
      })
    );
  }, [dispatch, documentType, esuCampus, startDate, endDate, searchTerm]);

  useEffect(() => {
    dispatch(fetchAllDocuments());
    dispatch(fetchAllWorkflow());
  }, [dispatch]);

  const downloadCsv = () => {
    const headers = [
      "Tracking Number",
      "Document Name",
      "Document Type",
      "Uploaded By",
      "Contact Number",
      "ESU Campus",
      "Date And Time Submitted",
    ];

    const formatFieldCsv = (field) => {
      if (/[,]/.test(field)) {
        return `"${field}"`;
      }

      return field;
    };

    const dataRows = allDocuments.map((response) => {
      return [
        formatFieldCsv(response.tracking_number),
        formatFieldCsv(response.document_name),
        formatFieldCsv(response.document_type),
        formatFieldCsv(response.uploaded_by),
        formatFieldCsv(response.contact_number),
        formatFieldCsv(
          response.esuCampus !== "null" ? response.esuCampus : "N/A"
        ),
        formatFieldCsv(dateFormat(response.createdAt)),
      ];
    });

    const csvContent = [headers, ...dataRows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Documents_Reports.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        <div className="w-full">
          <select
            name=""
            id=""
            onChange={(e) => setDocumentType(e.target.value)}
            className="text-sm w-full border-gray-400 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="">Document Type</option>
            {allWorkflow?.map(({ document_type }) => (
              <option key={document_type} value={document_type}>
                {document_type}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <select
            name=""
            id=""
            onChange={(e) => setEsuCampus(e.target.value)}
            className="text-sm w-full border-gray-400 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            <option value="">WMSU-ESU CAMPUS</option>
            {wmsuCampus?.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <div className="relative w-full ">
            <input
              type="date"
              id="start_date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`border-blue-500 
                           block  w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
            />
            <label
              htmlFor="from_date"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Start Date
            </label>
          </div>
        </div>
        <div className="">
          <div className="relative w-full ">
            <input
              type="date"
              id="end_date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`border-blue-500 
                           block  w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder=" "
            />
            <label
              htmlFor="from_date"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              End Date
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-col md:flex-row mt-5 gap-3 ">
        <div className="flex md:w-[500px] w-full">
          <div className="flex items-center relative w-full">
            <input
              type="text"
              placeholder="Enter uploader's name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border focus:border-blue rounded-xl bg-gray-100 focus:outline-none focus:ring-0 border-blue-600 peer"
            />
            <IoSearch className="text-2xl right-3 absolute text-gray-600" />
          </div>
        </div>
        <button
          onClick={downloadCsv}
          className="bg-blue-600 text-nowrap w-fit hover:bg-blue-700 text-white rounded-lg py-2 px-4"
        >
          Download Reports
        </button>
      </div>

      <div className="mt-5">
        <ReportsTable documents={allDocuments} />
      </div>
      <div className="mt-10">
        <h1 className="font-bold mb-5">Documents Chart</h1>
        <LineChartDocumentSubmissions data={allDocuments} />
      </div>
    </div>
  );
};

export default Reports;
