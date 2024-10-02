import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

const PrintQRCode = () => {
  const [value] = useState("CUTE12314"); // QR Code value
  const componentRef = useRef(); // Reference for printing

  // Handler for print functionality
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Document_QR_Code",
  });

  // Download the QR code as an image
  const handleDownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "QRCode.png";
      downloadLink.click();
    };
  };

  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col  w-full max-w-lg">
        <div
          className="bg-white rounded-lg shadow-lg border border-gray-300 p-6 w-full"
          ref={componentRef}
        >
          {/* QR Code Section */}
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
            <h2 className="md:text-4xl text-xl font-semibold text-gray-800 text-center">
              1223D456123A
            </h2>
          </div>

          {/* Document Information Section */}
          <div className="bg-gray-50 rounded-lg shadow-md  ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Document Information
            </h2>

            {/* Information Rows */}
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 flex gap-3">
                  <strong className="text-gray-800">Tracking Number:</strong>{" "}
                  1223D456123A
                </p>
              </div>
              <div>
                <p className="text-gray-600 flex gap-3">
                  <strong className="text-gray-800">Document Name:</strong>{" "}
                  Project Proposal
                </p>
              </div>
              <div>
                <p className="text-gray-600 flex gap-3">
                  <strong className="text-gray-800">Document Type:</strong> IOR
                  (Internal Office Reports)
                </p>
              </div>
              <div>
                <p className="text-gray-600 flex gap-3">
                  <strong className="text-gray-800">File Type:</strong> Hardcopy
                </p>
              </div>
              <div>
                <p className="text-gray-600 flex gap-3">
                  <strong className="text-gray-800">Uploaded By:</strong> John
                  Doe
                </p>
              </div>
              <div>
                <p className="text-gray-600 flex gap-3">
                  <strong className="text-gray-800">Date & Time:</strong>{" "}
                  2024-10-03 14:30
                </p>
              </div>
              <div>
                <p className="text-gray-600 flex gap-3">
                  <strong className="text-gray-800">Description:</strong>{" "}
                  Detailed project proposal for 2024 initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Print
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintQRCode;
