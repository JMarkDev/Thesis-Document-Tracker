import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../components/table/TransmittalTable";
import { IoSearch } from "react-icons/io5";
import {
  fetchAllDocuments,
  getAllDocuments,
  getStatus,
  searchDocument,
} from "../../../services/documentSlice";
import html2pdf from "html2pdf.js";
import { getUserData } from "../../../services/authSlice";

const EsuTransmittal = () => {
  const dispatch = useDispatch();
  const allDocuments = useSelector(getAllDocuments);
  const user = useSelector(getUserData);
  const status = useSelector(getStatus);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const contentRef = useRef(null);
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllDocuments());
    }
  }, [status, dispatch]);

  const filterDocuments = allDocuments.filter((doc) => {
    const createdAt = new Date(doc.createdAt);

    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;
    return (!from || createdAt >= from) && (!to || createdAt <= to);
  });

  useEffect(() => {
    if (!startDate && !endDate) {
      setFilteredDocuments(allDocuments);
    }
  }, [allDocuments, startDate, endDate]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchDocument(searchTerm));
    } else {
      dispatch(fetchAllDocuments());
    }
  }, [searchTerm, startDate, endDate, dispatch]);

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
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="From Date"
            className="border focus:ring-blue-500 focus:border-blue-100 rounded-lg p-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="To Date"
            className="border focus:ring-blue-500 focus:border-blue-100 rounded-lg p-2"
          />
          <button
            onClick={() => setFilteredDocuments(filterDocuments)}
            className="bg-blue-500 text-white text-sm text-nowrap px-4 py-2 rounded-lg"
          >
            Filter by Date
          </button>
        </div>
      </div>
      <Table
        documents={filteredDocuments}
        contentRef={contentRef}
        campus={user?.esuCampus}
      />
      {/* <div className="flex justify-end mt-10">
        <Pagination />
      </div> */}
    </div>
  );
};

export default EsuTransmittal;
