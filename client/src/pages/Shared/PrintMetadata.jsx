import QRCode from "react-qr-code";
import noDataIMG from "../../assets/images/undraw_no_data_re_kwbl.svg";
import PropTypes from "prop-types";

const PrintMetadata = ({ isLoading, contentRef, documentData }) => {
  return (
    <div>
      <div
        className="print_container m-auto bg-white rounded-lg shadow-lg border border-gray-300 p-6 max-w-xl"
        ref={contentRef}
      >
        {/* Loading and No Data Handling */}
        {isLoading ? (
          <>
            <div className="mb-6 w-[450px] flex gap-5 items-center animate-pulse">
              <div className="bg-gray-200 h-32 w-32 rounded-lg"></div>
              <div className="h-8 bg-gray-200 rounded w-3/5"></div>
            </div>
            <div className="space-y-3 animate-pulse">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded"></div>
              ))}
            </div>
          </>
        ) : Object.keys(documentData).length === 0 ? (
          <div className="flex flex-col gap-5 justify-center items-center">
            <h2 className="md:text-3xl text-lg font-semibold text-gray-800 text-center">
              Documents not found
            </h2>
            <img
              src={noDataIMG}
              alt="No data available"
              className="w-64 h-64"
            />
          </div>
        ) : (
          <div>
            {/* QR Code and Document Tracking Number */}
            <div className="mb-6 flex gap-5 items-center justify-center">
              <div
                className="flex justify-center"
                style={{ height: "auto", maxWidth: 120, width: "100%" }}
              >
                <QRCode
                  id="QRCode"
                  size={256}
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                  }}
                  value={documentData?.tracking_number}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <h2 className="h2_print md:text-4xl text-3xl font-semibold text-gray-800 text-center">
                {documentData?.tracking_number}
              </h2>
            </div>

            {/* Document Information Section */}
            <div className="rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Document Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 flex gap-3">
                    <strong className="text-gray-800">Tracking Number:</strong>{" "}
                    {documentData?.tracking_number}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 flex gap-3">
                    <strong className="text-gray-800">Document Name:</strong>{" "}
                    {documentData?.document_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 flex gap-3">
                    <strong className="text-gray-800">Document Type:</strong>{" "}
                    {documentData?.document_type}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 flex gap-3">
                    <strong className="text-gray-800">File Type:</strong>{" "}
                    {documentData?.file_type}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 flex gap-3">
                    <strong className="text-gray-800">Uploaded By:</strong>{" "}
                    {documentData?.uploaded_by}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 flex gap-3">
                    <strong className="text-gray-800">Contact Number:</strong>{" "}
                    {documentData?.contact_number}
                  </p>
                </div>
                {documentData?.esuCampus && (
                  <div>
                    <p className="text-gray-600 flex gap-3">
                      <strong className="text-gray-800">ESU Campus:</strong>{" "}
                      {documentData?.esuCampus}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600 flex gap-3">
                    <strong className="text-gray-800">Date & Time:</strong>{" "}
                    {new Date(documentData?.createdAt).toLocaleString()}
                  </p>
                </div>
                {documentData?.document_desc && (
                  <div>
                    <p className="text-gray-600 flex gap-3">
                      <strong className="text-gray-800">Description:</strong>{" "}
                      {documentData?.document_desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PrintMetadata.propTypes = {
  isLoading: PropTypes.bool,
  documentData: PropTypes.object,
  contentRef: PropTypes.object,
};

export default PrintMetadata;
