import PropTypes from "prop-types";

const ReceiveDocument = ({
  modal,
  closeModal,
  documentData,
  handleReceive,
  isReceived,
  isForwarded,
  lastRecipient,
}) => {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden={!modal}
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full px-4 bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-2xl p-5 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="text-xl font-semibold text-gray-800">
            Document Details
          </h1>
          <button
            type="button"
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            onClick={() => closeModal(false)}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
            </svg>
          </button>
        </div>

        {/* Document Details */}
        <div className="py-5 space-y-4 text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong className="text-gray-800">Tracking Number:</strong>{" "}
              {documentData.tracking_number}
            </p>
            <p>
              <strong className="text-gray-800">Document Name:</strong>{" "}
              {documentData.document_name}
            </p>
            <p>
              <strong className="text-gray-800">Document Type:</strong>{" "}
              {documentData.document_type}
            </p>
            <p>
              <strong className="text-gray-800">File Type:</strong>{" "}
              {documentData.file_type}
            </p>
            <p>
              <strong className="text-gray-800">Uploaded By:</strong>{" "}
              {documentData.uploaded_by}
            </p>
            {documentData.esuCampus && (
              <p>
                <strong className="text-gray-800">ESU Campus:</strong>{" "}
                {documentData.esuCampus}
              </p>
            )}
          </div>
          {documentData.document_desc && (
            <p>
              <strong className="text-gray-800">Description: lorem </strong>{" "}
              {documentData.document_desc}
            </p>
          )}
        </div>

        <div className="flex justify-end items-center pt-3 border-t">
          {isForwarded ? (
            <p className="text-gray-600">
              Document has already been forwarded.
            </p>
          ) : lastRecipient ? (
            <p className="text-gray-600">Document has already been received.</p>
          ) : (
            <button
              className="px-6 py-2 text-white bg-green-600 hover:bg-green-800 rounded-md shadow-md transition"
              onClick={() => {
                handleReceive();
              }}
            >
              {isReceived ? "Forward" : "Receive"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ReceiveDocument.propTypes = {
  modal: PropTypes.bool,
  closeModal: PropTypes.func,
  documentData: PropTypes.object.isRequired,
  handleReceive: PropTypes.func,
  isReceived: PropTypes.bool,
  isForwarded: PropTypes.bool,
  lastRecipient: PropTypes.bool,
};

export default ReceiveDocument;
