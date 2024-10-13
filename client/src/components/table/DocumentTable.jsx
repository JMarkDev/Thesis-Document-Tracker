import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { FaEye, FaFileDownload } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getDocumentStatus } from "../../utils/documentStatus";
import { documentBackground } from "../../utils/documentBackgroundColor";
import { useFormat } from "../../hooks/useFormatDate";
import html2pdf from "html2pdf.js";
import DownloadMetadata from "../../pages/Shared/DownloadMetadata";
import {
  fetchDocumentByTrackingNum,
  getDocumentByTrackingNumber,
} from "../../services/documentSlice";
import { useToast } from "../../hooks/useToast";

import noDataImage from "../../assets/images/undraw_no_data_re_kwbl.svg";
import PrintMetadata from "../../pages/Shared/PrintMetadata";
import { toastUtils } from "../../hooks/useToast";

// Utility to detect if it's a mobile device
const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const Table = ({ documents, handleSort }) => {
  const toast = useToast();
  const { dateFormat } = useFormat();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentRef = useRef(); // Reference for printing and downloading
  const document = useSelector(getDocumentByTrackingNumber);
  const [documentData, setDocumentData] = useState({});

  // useEffect(() => {
  //   if (document) {
  //     setDocumentData(document);
  //   }
  // }, [document]);
  // Download the content as a searchable PDF (not image)
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
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        toast.success("Document Metadata successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDownload = (tracking_number) => {
    dispatch(
      fetchDocumentByTrackingNum({ tracking_number, toast: toastUtils() })
    );
    setTimeout(() => {
      handleDownloadPDF();
    }, 300);
  };

  const handleReactToPrint = useReactToPrint({
    contentRef,
    documentTitle: "Document Metadata",
    onAfterPrint: () => console.log("Printing completed"),
    onPrintError: (errorLocation, error) =>
      console.error("Error:", errorLocation, error),
  });

  const handleMobilePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(contentRef.current.outerHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handlePrint = () => {
    if (isMobileDevice()) {
      handleMobilePrint();
    } else {
      handleReactToPrint();
    }
  };

  const printMetadata = (tracking_number) => {
    // Dispatch and fetch the document by tracking number
    dispatch(
      fetchDocumentByTrackingNum({ tracking_number, toast: toastUtils() })
    );

    // Wait for the document data to be set in the state before triggering the print
    setTimeout(() => {
      if (documentData) {
        handlePrint();
      } else {
        toast.error("Document not ready for printing.");
      }
    }, 500); // You may need to adjust the timeout duration based on how long fetching takes.
  };

  useEffect(() => {
    if (document) {
      setDocumentData(document);
    }
  }, [document]);

  return (
    <>
      {documents.length === 0 ? (
        <div className="flex flex-col p-4 bg-gray-200 gap-5 justify-center items-center">
          <h2 className="md:text-3xl text-lg font-semibold text-gray-800 text-center">
            Documents not found
          </h2>
          <img
            src={noDataImage}
            alt="No data available"
            className="w-64 h-64"
          />
        </div>
      ) : (
        <div className="relative overflow-x-auto  shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center  whitespace-nowrap">
                    ID
                    <a href="#" onClick={() => handleSort("id")}>
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    DOCUMENT NAME
                    <a href="#" onClick={() => handleSort("document_name")}>
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    TYPE
                    <a href="#" onClick={() => handleSort("document_type")}>
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th> */}
                {/* <th scope="col" className="px-6 py-3">
                <div className="flex items-center  whitespace-nowrap">
                  FILE TYPE
                  <a href="#" onClick={() => handleSort("file_type")}>
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th> */}
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    UPLOADED BY
                    <a href="#" onClick={() => handleSort("uploaded_by")}>
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    STATUS
                    <a href="#" onClick={() => handleSort("status")}>
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    DATE
                    <a href="#" onClick={() => handleSort("createdAt")}>
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className=" py-3 ">
                  <div className="flex items-center justify-center  whitespace-nowrap">
                    ACTION
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {documents?.map(
                (
                  {
                    id,
                    tracking_number,
                    document_name,
                    // document_type,
                    // file_type,
                    uploaded_by,
                    status,
                    createdAt,
                  },
                  index
                ) => (
                  <tr
                    onClick={() => navigate(`/document-details/${id}`)}
                    key={index}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-200 cursor-pointer"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {id}
                    </th>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                    {tracking_number}
                  </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {document_name}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      {document_type}
                    </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap">{file_type}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {uploaded_by}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p
                        className={`${documentBackground(
                          status
                        )} p-2 w-20 text-center rounded-lg`}
                      >
                        {" "}
                        {getDocumentStatus(status)}
                      </p>
                    </td>
                    <td className="px-6 w-5 py-4 whitespace-nowrap">
                      {" "}
                      {dateFormat(createdAt)}
                    </td>
                    <td className=" py-4 flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/document/details/${id}`);
                        }}
                        className=" p-2 text-lg bg-[#fca326] hover:bg-[#f58e40] text-white rounded-lg"
                      >
                        <FaEye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(tracking_number);
                        }}
                        className=" p-2 text-lg bg-[#3b9c3e] hover:bg-[#47a632] text-white rounded-lg"
                      >
                        <FaFileDownload className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          printMetadata(tracking_number);
                        }}
                        className="p-2 text-lg bg-[#3577c2] hover:bg-[#2d4199] text-white rounded-lg"
                      >
                        <IoMdPrint className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {Object.keys(documentData).length !== 0 && (
            <div style={{ display: "none" }}>
              {" "}
              {/* Hidden offscreen */}
              <DownloadMetadata
                documentData={documentData}
                contentRef={contentRef}
              />
            </div>
          )}
          {Object.keys(documentData).length !== 0 && (
            <div style={{ display: "none" }}>
              {" "}
              {/* Hidden offscreen */}
              <PrintMetadata
                documentData={documentData}
                contentRef={contentRef}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

Table.propTypes = {
  documents: PropTypes.array.isRequired,
  handleSort: PropTypes.func,
};

export default Table;
