import PropTypes from "prop-types";
import Loader from "../../components/loader/loginloader/LoginLoading";

const ReceiveDocument = ({
  modal,
  closeModal,
  documentData,
  handleReceive,
  isReceived,
  isForwarded,
  lastRecipient,
  receivedLoader,
  isRecipient,
  handleComment,
}) => {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden={!modal}
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full px-4 bg-black bg-opacity-50"
    >
      {receivedLoader && <Loader />}
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
              <strong className="text-gray-800">Tracking Code:</strong>{" "}
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
            <p>
              <strong className="text-gray-800">Contact Number:</strong>{" "}
              {documentData.contact_number}
            </p>

            {/* Conditional ESU Campus */}
            {documentData.esuCampus && documentData.esuCampus !== "null" && (
              <p>
                <strong className="text-gray-800">ESU Campus:</strong>{" "}
                {documentData.esuCampus}
              </p>
            )}

            {documentData.document_desc && (
              <p>
                <strong className="text-gray-800">Description:</strong>{" "}
                {documentData.document_desc}
              </p>
            )}

            {/* <p>
              <strong className="text-gray-800">Description:</strong>{" "}
              {documentData.document_desc}
            </p> */}
          </div>

          {/* Optional Description */}
          {/* {documentData.document_desc && (
            <p className="col-span-2">
              <strong className="text-gray-800">Description:</strong>{" "}
              {documentData.document_desc}
            </p>
          )} */}
        </div>
        {isReceived && !isForwarded && (
          <div className="w-full">
            <label>
              <strong className="text-gray-800">Comments:</strong>
            </label>
            <textarea
              name=""
              rows={4}
              id=""
              placeholder="Enter your comments here..."
              onChange={(e) => handleComment(e.target.value)}
              className="w-full border-gray-400 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent"
            />
          </div>
        )}

        {isRecipient && (
          <div className="flex justify-end items-center pt-3 border-t">
            {isForwarded ? (
              <p className="text-gray-600">
                Document has already been forwarded.
              </p>
            ) : lastRecipient ? (
              <p className="text-gray-600">
                Document has already been received.
              </p>
            ) : (
              <div className="flex gap-3">
                {/* {isReceived && !isForwarded && (
                  <button
                    className="px-6 py-2 text-white bg-red-500 hover:bg-red-800 rounded-md shadow-md transition"
                    onClick={() => handleReceive()}
                  >
                    Return
                  </button>
                )} */}
                <button
                  className="px-6 py-2 text-white bg-green-600 hover:bg-green-800 rounded-md shadow-md transition"
                  onClick={() => handleReceive()}
                >
                  {isReceived ? "Forward" : "Receive"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ReceiveDocument.propTypes = {
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  documentData: PropTypes.object.isRequired,
  handleReceive: PropTypes.func.isRequired,
  isReceived: PropTypes.bool,
  isForwarded: PropTypes.bool,
  lastRecipient: PropTypes.bool,
  receivedLoader: PropTypes.bool,
  isRecipient: PropTypes.bool,
  handleComment: PropTypes.func,
};

export default ReceiveDocument;
