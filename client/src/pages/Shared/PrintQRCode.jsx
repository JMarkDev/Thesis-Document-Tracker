import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import "../../App.css";
import {
  fetchDocumentByTrackingNum,
  getDocumentByTrackingNumber,
} from "../../services/documentSlice";
import { useDispatch, useSelector } from "react-redux";
import noDataIMG from "../../assets/images/undraw_no_data_re_kwbl.svg";

const PrintQRCode = () => {
  const { tracking_number } = useParams();
  const dispatch = useDispatch();
  const [value] = useState("CUTE12314"); // QR Code value
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
    <div className="flex justify-center py-10">
      <div className="flex flex-col w-full max-w-lg">
        <div
          className="print_container m-auto bg-white rounded-lg shadow-lg border w-lg border-gray-300 p-6 max-w-xl"
          ref={contentRef}
        >
          {/* QR Code Section */}
          {isLoading ? (
            <>
              <div className="mb-6 w-[450px] flex gap-5 items-center animate-pulse">
                <div className="bg-gray-200 h-32 w-32 rounded-lg"></div>
                <div className="h-8 bg-gray-200 rounded w-3/5"></div>
              </div>
              <div className="space-y-3 animate-pulse">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            </>
          ) : Object.keys(documentData).length === 0 ? (
            <div className="flex flex-col gap-5 justify-center">
              <h2 className="text-3xl font-semibold text-gray-800 text-center">
                Document not found
              </h2>
              <img
                src={noDataIMG}
                alt="No data available"
                className="w-64 h-64"
              />
            </div>
          ) : (
            <div>
              <div className="mb-6 flex gap-5 items-center">
                <div
                  className="flex justify-center"
                  style={{ height: "auto", maxWidth: 120, width: "100%" }}
                >
                  <QRCode
                    id="QRCode"
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={value}
                    viewBox={`0 0 256 256`}
                  />
                </div>
                <h2 className="h2_print md:text-4xl text-3xl font-semibold text-gray-800 text-center">
                  {documentData.tracking_number}
                </h2>
              </div>
              <div className="rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Document Information
                </h2>

                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 flex gap-3">
                      <strong className="text-gray-800">
                        Tracking Number:
                      </strong>{" "}
                      {documentData.tracking_number}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex gap-3">
                      <strong className="text-gray-800">Document Name:</strong>{" "}
                      {documentData.document_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex gap-3">
                      <strong className="text-gray-800">Document Type:</strong>
                      {documentData.document_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex gap-3">
                      <strong className="text-gray-800">File Type:</strong>
                      {documentData.file_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex gap-3">
                      <strong className="text-gray-800">Uploaded By:</strong>
                      {documentData.uploaded_by}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex gap-3">
                      <strong className="text-gray-800">Date & Time:</strong>{" "}
                      {new Date(documentData.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {documentData.description && (
                    <div>
                      <p className="text-gray-600 flex gap-3">
                        <strong className="text-gray-800">Description:</strong>{" "}
                        {documentData.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {Object.keys(documentData).length !== 0 && (
          <div className="flex justify-end space-x-4 mt-6">
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
  );
};

export default PrintQRCode;
