import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../components/table/TransmittalTable";
import { IoSearch } from "react-icons/io5";
import {
  filterAllDocuments,
  getFilteredDocuments,
} from "../../../services/documentSlice";
import html2pdf from "html2pdf.js";
import { getUserData } from "../../../services/authSlice";

const EsuTransmittal = () => {
  const dispatch = useDispatch();
  const allDocuments = useSelector(getFilteredDocuments);
  const user = useSelector(getUserData);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const contentRef = useRef(null);
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  useEffect(() => {
    dispatch(
      filterAllDocuments({
        document_type: "",
        esuCampus: user?.esuCampus,
        startDate: "",
        endDate: "",
        uploaded_by: "",
        name: searchTerm,
      })
    );
  }, [dispatch, searchTerm, user]);

  useEffect(() => {
    if (!startDate && !endDate) {
      setFilteredDocuments(allDocuments);
    } else {
      const filterDocuments = allDocuments.filter((doc) => {
        const createdAt = new Date(doc.createdAt);
        const formattedDate = createdAt.toISOString().split("T")[0];

        const from = startDate ? startDate : null;
        const to = endDate ? endDate : null;
        return (!from || formattedDate >= from) && (!to || formattedDate <= to);
      });
      setFilteredDocuments(filterDocuments);
    }
  }, [allDocuments, startDate, endDate]);

  useEffect(() => {
    if (searchTerm) {
      filterAllDocuments({
        document_type: "",
        esuCampus: user?.esuCampus,
        startDate: "",
        endDate: "",
        uploaded_by: "",
        name: searchTerm,
      });
    }
  }, [searchTerm, startDate, endDate, dispatch, user]);

  const handleDownloadPDF = () => {
    const element = contentRef.current;

    const options = {
      margin: 0.5,
      filename: "Document_Metadata.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Convert HTML content into PDF
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="">
      <div className="flex flex-col gap-5 justify-between mb-8">
        <div className="flex text-sm md:text-[16px] justify-between lg:flex-row-reverse flex-col-reverse gap-5">
          <div className="flex max-w-[450px] w-full items-center relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search..."
              className="border border-[#d67c80] focus:border-blue rounded-xl w-full bg-gray-100 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <IoSearch className="text-2xl absolute right-2 text-gray-600" />
          </div>
          <button
            onClick={handleDownloadPDF}
            className="w-fit p-2 flex items-center text-center px-4 rounded-lg bg-main hover:bg-main_hover text-white font-semi"
          >
            Generate Transmittal
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative  ">
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
          <div className="relative  ">
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
      <Table
        documents={filteredDocuments}
        contentRef={contentRef}
        campus={user?.esuCampus}
      />
    </div>
  );
};

export default EsuTransmittal;
