import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Back from "../../components/buttons/Back";
import Stepper from "../../components/Stepper";
import StepperMobile from "../../components/StepperMobile";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentById,
  fetchDocumentById,
  reset,
} from "../../services/documentSlice";
// import { getDocumentStatus } from "../../utils/documentStatus";
import { useFormat } from "../../hooks/useFormatDate";
// import { documentBackground } from "../../utils/documentBackgroundColor";
import NoData from "../../components/NoData";
import { getUserData } from "../../services/authSlice";
import rolesList from "../../constants/rolesList";
import {
  FaFilePdf,
  FaFileCsv,
  FaFilePowerpoint,
  FaFileWord,
  FaFileImage,
} from "react-icons/fa6";
import io from "socket.io-client";
import api from "../../api/axios";
import documentStatusList from "../../constants/documentStatusList";

// Create a single socket connection outside the component
const socket = io.connect(`${api.defaults.baseURL}`);

const DocumentDetails = () => {
  // const socket = io.connect(`${api.defaults.baseURL}`);
  const { id } = useParams();
  const user = useSelector(getUserData);
  const dispatch = useDispatch();
  const document = useSelector(getDocumentById);
  const [sortedHistories, setSortedHistories] = useState([]);
  const [data, setData] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const { dateFormat } = useFormat();
  // const [recipientOffice, setRecipientOffice] = useState("");
  // const [isReceived, setIsReceived] = useState(false);
  const [status, setStatus] = useState("");
  const [officeRecipient, setOfficeRecipient] = useState("");
  const [fullName, setFullName] = useState("");
  const normalizeString = (str) => str?.trim().replace(/\./g, "").toLowerCase();
  const [files, setFiles] = useState([]);
  const [delayThreshold, setDelayThreshold] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    const getDelay = async () => {
      try {
        const response = await api.get("/document/get-delay/1");
        setDelayThreshold(response.data.days_before_delay);
      } catch (error) {
        console.log(error);
      }
    };
    getDelay();
  }, []);

  useEffect(() => {
    setFullName(`${user.firstName} ${user.middleInitial} ${user.lastName}`);
  }, [user]);

  useEffect(() => {
    // Clear previous state
    setDocumentData([]);
    setData([]);
    setFiles([]);
    dispatch(fetchDocumentById(id)); // Fetch new data
    setStatus(""); // Reset status
  }, [id, dispatch]);

  // useEffect(() => {
  //   const handleSuccessReceived = () => {
  //     dispatch(fetchDocumentById(id));
  //   };

  //   socket.on("success_received", handleSuccessReceived);

  //   return () => {
  //     socket.off("success_received", handleSuccessReceived);
  //   };
  // }, [dispatch, id]);
  useEffect(() => {
    const handleSuccessReceived = () => {
      dispatch(fetchDocumentById(id));
    };

    socket.on("success_received", handleSuccessReceived);

    return () => {
      socket.off("success_received", handleSuccessReceived);
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (user.role === rolesList.faculty) {
      setOfficeRecipient(`${user.esuCampus.toUpperCase()} FACULTY`);
    } else if (user.role === rolesList.registrar) {
      setOfficeRecipient(`${user.esuCampus.toUpperCase()} REGISTRAR`);
    } else if (user.role === rolesList.campus_admin) {
      setOfficeRecipient(`${user.esuCampus.toUpperCase()} CAMPUS ADMIN`);
    } else if (user.office?.officeName) {
      setOfficeRecipient(user.office?.officeName);
    }
  }, [user]);

  useEffect(() => {
    if (!document || !document.document_recipients) return;

    const currentTime = new Date();

    // 24 hours in milliseconds
    // const Hours = 86400000;
    const Hours = 1000 * 60 * 60 * (delayThreshold * 24);

    // Check if all recipients have received the document
    const allReceived = document?.document_recipients.every(
      (recipient) => recipient.received_at !== null
    );

    let deadlinePassed = false;
    // Check if document have deadline
    const hasDeadline = document?.deadline;
    if (hasDeadline) {
      const deadline = new Date(
        hasDeadline?.toLocaleString("en-US", { timeZone: "UTC" })
      );

      if (currentTime > deadline) {
        deadlinePassed = true;
      }
    }

    // Find the current office and check if it has received the document
    const officeReceived = document?.document_recipients.find(
      (recipient) =>
        recipient.office_name === officeRecipient &&
        recipient.received_at !== null
    );

    const lastReveived = document?.document_recipients
      .filter((recipient) => recipient.received_at !== null)
      .sort((a, b) => new Date(b.received_at) - new Date(a.received_at))[0];

    const receivedAt = new Date(lastReveived?.received_at);
    const localReceivedAt = receivedAt.toLocaleString("en-US", {
      timeZone: "UTC",
    });

    const timeDifference = currentTime - new Date(localReceivedAt);

    let status = null;

    // First, check if the office has received and the uploaded_by matches the user
    if (
      !allReceived &&
      officeReceived &&
      normalizeString(fullName) !== normalizeString(documentData.uploaded_by)
    ) {
      status = "Received"; // Prioritize the "Received" status
    } else if (document.status === documentStatusList.returned) {
      status = "Returned";
    } else if (!allReceived && deadlinePassed) {
      status = "Delayed";
    } else if (timeDifference > Hours && !allReceived) {
      status = "Delayed";
    } else if (allReceived) {
      status = "Completed";
    } else if (
      // !allReceived &&
      normalizeString(fullName) === normalizeString(documentData.uploaded_by)
    ) {
      status = "In Progress";
    } else {
      status = "Incoming";
    }

    setStatus(status);
  }, [document, user, officeRecipient, documentData, fullName, delayThreshold]);

  // useEffect(() => {
  //   if (document) {
  //     setDocumentData(document);
  //     setData(document.document_recipients);
  //     if (document.files && document.files.length > 0) {
  //       // const parsedFiles = JSON.parse(document.files)
  //       const parsedFiles =
  //         typeof document.files === "string"
  //           ? JSON.parse(document.files)
  //           : document.files;

  //       setFiles(parsedFiles);
  //     }
  //   }
  // }, [document]);
  useEffect(() => {
    if (document) {
      setDocumentData(document);
      setData(document.document_recipients);
      if (document.files && document.files.length > 0) {
        const parsedFiles =
          typeof document.files === "string"
            ? JSON.parse(document.files)
            : document.files;

        setFiles(parsedFiles);
      }
    }
  }, [document]);

  // useEffect(() => {
  //   if (documentData && documentData.document_histories) {
  //     const sortedData = [...documentData.document_histories].sort(
  //       (a, b) => b.id - a.id
  //     );
  //     setSortedHistories(sortedData);
  //   }
  // }, [documentData]);
  useEffect(() => {
    if (documentData && documentData.document_histories) {
      const sortedData = [...documentData.document_histories].sort(
        (a, b) => b.id - a.id
      );
      setSortedHistories(sortedData);
    }
  }, [documentData]);

  // Helper function to get the file type icon
  const getFileIcon = (file) => {
    const extension = file.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <FaFilePdf className="text-red-500" />;
      case "csv":
        return <FaFileCsv className="text-green-500" />;
      case "ppt":
      case "pptx":
        return <FaFilePowerpoint className="text-orange-500" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-purple-500" />;
      default:
        return null; // No icon for unknown file types
    }
  };

  return (
    <div className="bg-white ">
      <div className="flex items-center gap-5">
        <Back />

        <h1 className="font-bold md:text-2xl text-lg  text-gray-900">
          {" "}
          Document Details
        </h1>
      </div>
      {document === null ? (
        <div className="mt-5">
          <NoData />
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-5">
          <div className="hidden lg:block">
            {" "}
            <Stepper data={data} />
          </div>

          <div className="lg:hidden block">
            {" "}
            <StepperMobile data={data} status={documentData?.status} />
          </div>

          {/* Document Details Section */}
          <div className=" md:bg-gray-100 mt-10 md:p-4 rounded-lg flex flex-col lg:flex-row gap-5 justify-between text-gray-700">
            <div className="lg:sticky  lg:top-20 flex flex-col gap-4 h-fit lg:w-1/2  p-4 bg-white text-sm   shadow-lg rounded-md">
              <div className=" flex items-center gap-5 border-b pb-2 fix">
                <h1 className="font-bold text-gray-800">Tracking Code:</h1>
                <p className="text-gray-700">{documentData.tracking_number}</p>
              </div>
              <div className="flex items-center gap-5 border-b pb-2">
                <h1 className="font-bold text-gray-800">Document Name:</h1>
                <p className="text-gray-700">{documentData.document_name}</p>
              </div>
              <div className="flex items-center gap-5 border-b pb-2">
                <h1 className="font-bold  text-gray-800">Document Type:</h1>
                <p className="text-gray-700">{documentData.document_type}</p>
              </div>
              <div className="flex items-center gap-5 border-b pb-2">
                <h1 className="font-bold  text-gray-800">File Type:</h1>
                <p className="text-gray-700">{documentData.file_type}</p>
              </div>
              {files?.length > 0 && (
                <div className="flex gap-3 border-b ">
                  <div className="flex items-center gap-5">
                    <h1 className="font-bold text-gray-800">Files:</h1>
                    {/* <p className="text-gray-700">{documentData.file_type}</p> */}
                  </div>
                  <div>
                    <div className="flex flex-row gap-2">
                      {files?.map((file, index) => (
                        <div
                          key={index}
                          className="flex text-sm items-center gap-2"
                        >
                          <span className="text-lg">{getFileIcon(file)}</span>
                          <a
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-main underline"
                          >
                            {`File ${index + 1}`}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {documentData.document_desc && (
                <div className="flex items-center gap-5 border-b pb-2">
                  <h1 className="font-bold  text-gray-800">Description:</h1>
                  <p className="text-gray-700">{documentData.document_desc}</p>
                </div>
              )}
              <div className="flex items-center gap-5 border-b pb-2">
                <h1 className="font-bold  text-gray-800">Uploaded By:</h1>
                <p className="text-gray-700">{documentData.uploaded_by}</p>
              </div>
              <div className="flex items-center gap-5 border-b pb-2">
                <h1 className="font-bold  text-gray-800">Contact Number:</h1>
                <p className="text-gray-700">{documentData.contact_number}</p>
              </div>
              {documentData.esuCampus !== null &&
                documentData.esuCampus !== "null" && (
                  <div className="flex items-center gap-5 border-b pb-2">
                    <h1 className="font-bold  text-gray-800">ESU Campus:</h1>
                    <p className="text-gray-700">{documentData.esuCampus}</p>
                  </div>
                )}
              <div className="flex items-center gap-5 border-b pb-2">
                <h1 className="font-bold  text-gray-800">Date:</h1>
                <p className="text-gray-700">
                  {dateFormat(documentData.createdAt)}
                </p>
              </div>

              {documentData.deadline &&
                documentData.deadline !== "0000-00-00" && (
                  <div className="flex items-center gap-5 border-b pb-2">
                    <h1 className="font-bold  text-gray-800">Deadline:</h1>
                    <p className="text-gray-700">
                      {new Date(documentData.deadline).toLocaleDateString()}
                    </p>
                  </div>
                )}
              <div className="flex items-center gap-5">
                <h1 className="font-bold  text-gray-800">Status:</h1>
                <span
                  className={`px-4 py-1 rounded-full text-sm ${
                    status === "Completed"
                      ? "bg-green-500 text-white"
                      : status === "Received"
                      ? "bg-blue-500 text-white"
                      : status === "In Progress"
                      ? "bg-[#f0d352] text-black"
                      : status === "Delayed"
                      ? "bg-red-700 text-white"
                      : "bg-gray-300 text-black" // Default case if no status matches
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>

            <div className="lg:w-1/2 w-full p-4 bg-white shadow-md rounded-md">
              <h1 className="font-bold text-md text-main mb-3">
                Tracking History
              </h1>
              <ul className="space-y-4">
                {sortedHistories?.map(
                  ({
                    id,
                    action,
                    recipient_office,
                    recipient_user,
                    createdAt,
                    comments,
                  }) => (
                    <li key={id} className="pb-3 border-b last:border-none">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-gray-700 text-sm">
                          {recipient_office}
                        </span>
                        <span className="text-xs text-gray-500 text-nowrap">
                          {dateFormat(createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Document {action}{" "}
                        {action === "forwarded" ? "to the next office" : ""} by:{" "}
                        {recipient_user}
                      </p>
                      {comments && (
                        <div className="mt-4 p-3 rounded-lg bg-gray-100 border-l-4 border-blue-500 shadow-sm">
                          <div className="flex items-start">
                            <svg
                              className="w-4 h-4 text-blue-500 mt-0.5 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M18 10c0-4.418-3.582-8-8-8S2 5.582 2 10s3.582 8 8 8 8-3.582 8-8zm-8-5c.337 0 .675.06 1.002.18A7.937 7.937 0 0116 10c0 1.304-.31 2.535-.861 3.62l-.272.413-1.86-.38c-1.197-.246-2.217-.78-3.04-1.545-.852.787-1.9 1.292-3.097 1.536L3.932 15.5l-.285-.429C3.31 12.536 3 11.305 3 10c0-3.87 3.13-7 7-7zm0 1C5.58 6 4 7.58 4 10c0 .9.23 1.748.656 2.516l1.205-1.394a1 1 0 111.416 1.416l-1.25 1.443C7.248 14.17 8.6 15 10 15c3.42 0 5-1.58 5-5s-1.58-5-5-5z" />
                            </svg>
                            <div>
                              <p className="text-sm font-semibold text-blue-600">
                                Comments
                              </p>
                              <p className="text-sm text-gray-700 mt-1">
                                {comments}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetails;
