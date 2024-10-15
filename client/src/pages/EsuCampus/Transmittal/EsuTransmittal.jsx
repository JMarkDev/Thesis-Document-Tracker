import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../components/table/TransmittalTable";
import { IoSearch } from "react-icons/io5";
// import Pagination from "../../../components/Pagination";
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
  const contentRef = useRef(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllDocuments());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchDocument(searchTerm));
    } else {
      dispatch(fetchAllDocuments());
    }
  }, [searchTerm, dispatch]);

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
      <div className="flex  flex-col gap-5 justify-between mb-8">
        <div className="flex text-sm md:text-[16px] justify-between lg:flex-row-reverse flex-col-reverse gap-5">
          <div className=" flex max-w-[450px] w-full  items-center relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search..."
              className="border border-[#d67c80] focus:border-blue  rounded-xl w-full bg-gray-100 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
      </div>
      <Table
        documents={allDocuments}
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
