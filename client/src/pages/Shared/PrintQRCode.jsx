import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import "../../App.css";
import {
  fetchDocumentByTrackingNum,
  getDocumentByTrackingNumber,
} from "../../services/documentSlice";
import { useDispatch, useSelector } from "react-redux";
import Back from "../../components/buttons/Back";
import PrintMetadata from "./PrintMetadata";

const PrintQRCode = () => {
  const { tracking_number } = useParams();
  const dispatch = useDispatch();
  const contentRef = useRef(); // Reference for printing and downloading
  const document = useSelector(getDocumentByTrackingNumber);
  const [documentData, setDocumentData] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (tracking_number) {
      dispatch(fetchDocumentByTrackingNum(tracking_number)).then(() => {
        setIsLoading(false); // Set loading to false when data is fetched
      });
    }
  }, [tracking_number, dispatch]);

  useEffect(() => {
    if (document) {
      setDocumentData(document);
    }
  }, [document]);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Document Metadata",
    onAfterPrint: () => console.log("Printing completed"),
    onPrintError: (errorLocation, error) =>
      console.error("Error:", errorLocation, error),
  });

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
    html2pdf().set(options).from(element).save();
  };

  return (
    <>
      {" "}
      <div className="flex md:flex-row flex-col items-start gap-5">
        <Back />
        <div className="md:text-[16px] text-sm bg-red-100 border border-red-500 text-gray-800 px-4 py-3 rounded relative text-center">
          Please print the document details and attach them to the physical copy
          before passing it to the office.
        </div>
      </div>
      {/* <Back /> */}
      <div className="flex justify-center py-4">
        <div className="flex flex-col w-full max-w-lg">
          <PrintMetadata
            isLoading={isLoading}
            documentData={documentData}
            contentRef={contentRef}
          />
          {/* Action Buttons */}
          {Object.keys(documentData).length !== 0 && (
            <div className="flex justify-end space-x-4 m-6">
              <button
                onClick={handleDownloadPDF}
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors"
              >
                Download as PDF
              </button>
              <button
                onClick={handlePrint}
                className="bg-blue-500 text-white py-2 px-8 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              >
                Print
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PrintQRCode;
