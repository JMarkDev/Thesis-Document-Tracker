import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loader/loginloader/LoginLoading";
import PropTypes from "prop-types";
import {
  fetchDocumentById,
  getDocumentById,
} from "../../../services/documentSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import api from "../../../api/axios";
import { useToast } from "../../../hooks/useToast";
import io from "socket.io-client";
const socket = io.connect(`${api.defaults.baseURL}`);

const UpdateDocumentDetails = ({ documentId, closeEditModal, modal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const documentData = useSelector(getDocumentById);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [documentNameError, setDocumentNameError] = useState("");
  const [commentError, setCommentError] = useState("");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    document_name: "",
    document_desc: "",
    file_type: "",
    files: [],
    uploaded_by: "",
    trackingNumber: "",
    document_type: "",
  });

  useEffect(() => {
    if (documentId) {
      dispatch(fetchDocumentById(documentId));
    }
  }, [dispatch, documentId]);

  useEffect(() => {
    if (documentData) {
      setData({
        document_name: documentData.document_name,
        document_desc: documentData.document_desc,
        file_type: documentData.file_type,
        files: documentData.files,
        uploaded_by: documentData.uploaded_by,
        trackingNumber: documentData.tracking_number,
        document_type: documentData.document_type,
      });
      console.log(documentData);
    }
  }, [documentData]);

  const handleDeleteFile = (fileName) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUpdateDocument = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("document_name", data?.document_name);
      formData.append("document_desc", data?.document_desc);
      formData.append("file_type", data?.file_type);
      formData.append("uploaded_by", data?.uploaded_by);
      for (let i = 0; i < selectedFiles.length; i++) {
        if (selectedFiles.length > 0) {
          formData.append("files", selectedFiles[i]);
        } else {
          formData.append("files", null);
        }
      }

      const response = await api.put(
        `/document/update/id/${documentId}`,
        formData
      );
      if (response.data.status === "success") {
        setLoading(false);
        closeEditModal();
        socket.emit("upload_document", response.data);
        toast.success(response.data.message);
        setTimeout(() => {
          setLoading(false);
          navigate(`/document/tracking-number/${data?.trackingNumber}`);
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      console.log(error.response.data);
      if (error.response.data.errors) {
        error.response.data.errors.forEach((error) => {
          switch (error.path) {
            case "document_name":
              setDocumentNameError(error.msg);
              break;
            case "document_desc":
              setCommentError(error.msg);
              break;
            default:
              console.log(error);
          }
        });
      }
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden={!modal}
      className="fixed overflow-y-auto overflow-hidden  inset-0 z-50 px-5 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-40 font-normal"
    >
      {/* <div className="relative w-full max-w-2xl bg-white  rounded-xl shadow-lg"> */}
      {loading && <Loading />}

      <div className="shadow-lg w-full flex items-center justify-center bg-white border-2 rounded-md md:max-w-2xl p-4 max-w-xl mx-auto ">
        <form
          action=""
          method="POST"
          encType="multipart/form-data"
          className="w-full "
          onSubmit={handleUpdateDocument}
        >
          <h1 className="text-gray-700 font-bold md:text-xl text-lg">
            Document Information
          </h1>

          <div className=" mb-3 mt-4 ">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tracking Code
            </label>
            <div className="flex flex-grow relative ">
              <input
                type="text"
                id="tracking"
                name="tracking_number"
                className={`flex flex-grow  bg-gray-200 border-1 border-gray-300 text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder="Tracking Number"
                defaultValue={data?.trackingNumber || ""}
                disabled={true}
              />
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Uploaded By
            </label>
            <input
              type="text"
              id="uploaded"
              name="uploaded_by"
              defaultValue={data.uploaded_by || ""}
              className="bg-gray-200 border w-full border-gray-300 text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              disabled={true}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Document Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue={data.document_name || ""}
              onChange={(e) =>
                setData({ ...data, document_name: e.target.value })
              }
              className={` ${
                documentNameError ? "border-red-500" : "border-gray-300"
              } bg-gray-200 border w-full  text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer `}
              placeholder="Enter document name"
              required
            />
            {documentNameError && (
              <span className="text-red-500 text-sm">{documentNameError}</span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Document Type
            </label>
            <input
              type="text"
              id="name"
              defaultValue={data.document_type || ""}
              onChange={(e) =>
                setData({ ...data, document_name: e.target.value })
              }
              disabled={true}
              className={` ${
                documentNameError ? "border-red-500" : "border-gray-300"
              } bg-gray-200 border w-full  text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer `}
              placeholder="Enter document name"
              required
            />
            {documentNameError && (
              <span className="text-red-500 text-sm">{documentNameError}</span>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              File Type
            </label>
            <input
              type="text"
              id="name"
              defaultValue={data.file_type || ""}
              disabled={true}
              className={`border-gray-300 bg-gray-200 border w-full  text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer `}
              placeholder="Enter document name"
              required
            />
          </div>

          {data?.file_type === "Soft Copy" && (
            <div className="mb-3">
              <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 ">
                Upload New File
              </h1>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-62 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF, PPT, DOC, DOCX, CSV, JPEG, PNG, GIF
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    multiple
                    name="files"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              {selectedFiles.length > 0 && (
                <ul className="mt-2">
                  {selectedFiles?.map((file, index) => (
                    <div className="flex items-center gap-3" key={index}>
                      <li
                        key={index}
                        className="text-gray-900 dark:text-white text-sm font-medium"
                      >
                        {file.name}
                      </li>
                      <button
                        type="button"
                        onClick={() => handleDeleteFile(file.name)}
                        className="text-red-500 font-bold text-lg "
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="mb-3">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Document Description
            </label>
            <textarea
              type="text"
              id="name"
              rows={5}
              defaultValue={data.document_desc || ""}
              onChange={(e) =>
                setData({ ...data, document_desc: e.target.value })
              }
              className={`${
                commentError ? "border-red-500" : "border-gray-300"
              } bg-gray-200 border w-full  text-gray-900 text-sm rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
              placeholder="Enter document description"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => closeEditModal()}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg mr-4"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateDocument}
              type="submit"
              disabled={loading}
              className={`px-10 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } py-2 bg-main hover:bg-main_hover text-white rounded-lg`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

UpdateDocumentDetails.propTypes = {
  documentId: PropTypes.number,
  closeEditModal: PropTypes.func,
  modal: PropTypes.bool,
};

export default UpdateDocumentDetails;
