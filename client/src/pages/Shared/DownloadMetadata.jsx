import QRCode from "react-qr-code";
import PropTypes from "prop-types";
import { useFormat } from "../../hooks/useFormatDate";
const DownloadMetadata = ({ documentData, contentRef }) => {
  const { dateFormat } = useFormat();
  return (
    <>
      <div className="flex justify-center py-10">
        <div className="flex flex-col w-full max-w-lg">
          <div
            className="print_container m-auto bg-white rounded-lg shadow-lg border w-lg border-gray-300 p-6 max-w-xl"
            ref={contentRef}
          >
            <div>
              <div className="mb-6 flex gap-5 items-center">
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
                    value={documentData.tracking_number}
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
                      <strong className="text-gray-800">Tracking Code:</strong>{" "}
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
                      <strong className="text-gray-800">Contact Number:</strong>
                      {documentData.contact_number}
                    </p>
                  </div>
                  {documentData.esuCampus &&
                    documentData.esuCampus !== "null" && (
                      <div>
                        <p className="text-gray-600 flex gap-3">
                          <strong className="text-gray-800">ESU Campus:</strong>
                          {documentData.esuCampus}
                        </p>
                      </div>
                    )}
                  <div>
                    <p className="text-gray-600 flex gap-3">
                      <strong className="text-gray-800">Date & Time:</strong>{" "}
                      {dateFormat(documentData.createdAt)}
                    </p>
                  </div>
                  {documentData.document_desc && (
                    <div>
                      <p className="text-gray-600 flex gap-3">
                        <strong className="text-gray-800">Description:</strong>{" "}
                        {documentData.document_desc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DownloadMetadata.propTypes = {
  documentData: PropTypes.object,
  contentRef: PropTypes.object,
};
export default DownloadMetadata;
