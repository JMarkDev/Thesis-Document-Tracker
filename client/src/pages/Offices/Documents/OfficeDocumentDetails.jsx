// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Back from "../../../components/buttons/Back";
// import Stepper from "../../../components/Stepper";
// import StepperMobile from "../../../components/StepperMobile";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getDocumentById,
//   fetchDocumentById,
//   reset,
// } from "../../../services/documentSlice";
// // import { getDocumentStatus } from "../../utils/documentStatus";
// import { useFormat } from "../../../hooks/useFormatDate";
// // import { documentBackground } from "../../utils/documentBackgroundColor";
// import NoData from "../../../components/NoData";
// import { getUserData } from "../../../services/authSlice";
// import rolesList from "../../../constants/rolesList";
// import {
//   FaFilePdf,
//   FaFileCsv,
//   FaFilePowerpoint,
//   FaFileWord,
//   FaFileImage,
// } from "react-icons/fa6";
// import io from "socket.io-client";
// import api from "../../../api/axios";
// import documentStatusList from "../../../constants/documentStatusList";
// import SuccessModal from "../../../components/SuccessModal";
// import { useToast } from "../../../hooks/useToast";
// import TrackLoader from "../../../components/loader/track_loader/Track";
// import ReceiveDocs from "./ReceiveDocs";

// // Create a single socket connection outside the component
// const socket = io.connect(`${api.defaults.baseURL}`);

// const DocumentDetails = () => {
//   // const socket = io.connect(`${api.defaults.baseURL}`);
//   const { id } = useParams();
//   const user = useSelector(getUserData);
//   const dispatch = useDispatch();
//   const document = useSelector(getDocumentById);
//   const [sortedHistories, setSortedHistories] = useState([]);
//   const [data, setData] = useState([]);
//   const [documentData, setDocumentData] = useState(null);
//   const [documentName, setDocumentName] = useState("");
//   const [documentId, setDocumentId] = useState(null);
//   const { dateFormat } = useFormat();
//   // const [recipientOffice, setRecipientOffice] = useState("");
//   // const [isReceived, setIsReceived] = useState(false);
//   const toast = useToast();
//   const [status, setStatus] = useState("");
//   const [officeRecipient, setOfficeRecipient] = useState("");
//   const [fullName, setFullName] = useState("");
//   const normalizeString = (str) => str?.trim().replace(/\./g, "").toLowerCase();
//   const [files, setFiles] = useState([]);
//   const [delayThreshold, setDelayThreshold] = useState(0);
//   const [isReceived, setIsReceived] = useState(false);
//   const [isForwarded, setIsForwarded] = useState(false);
//   const [isRecipient, setIsRecipient] = useState(false);
//   const [lastRecipient, setLastRecipient] = useState(false);
//   const [recipientOffice, setRecipientOffice] = useState("");
//   const [officeId, setOfficeId] = useState(null);
//   const [nextRoute, setNextRoute] = useState(null);
//   const [successModal, setSuccessModal] = useState(false);
//   const [receivedLoader, setReceivedLoader] = useState(false);
//   const [action, setAction] = useState("");
//   const [isReturn, setIsReturn] = useState(false);
//   const [returnStatus, setReturnStatus] = useState(false);
//   const [alreadyReturn, setAlreadyReturn] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [trackingNumber, setTrackingNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setRecipientOffice(`${user?.esuCampus?.toUpperCase()} FACULTY`);
//   }, [user]);

//   useEffect(() => {
//     if (document) {
//       setDocumentData(document);
//       setDocumentName(document.document_name);
//       setDocumentId(document.id);
//       if (document.status === documentStatusList.returned) {
//         setReturnStatus(true);
//       }
//     }
//   }, [document]);

//   useEffect(() => {
//     return () => {
//       dispatch(reset());
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     const getDelay = async () => {
//       try {
//         const response = await api.get("/document/get-delay/1");
//         setDelayThreshold(response.data.days_before_delay);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getDelay();
//   }, []);

//   useEffect(() => {
//     setFullName(`${user.firstName} ${user.middleInitial} ${user.lastName}`);
//   }, [user]);

//   useEffect(() => {
//     // Clear previous state
//     setDocumentData([]);
//     setData([]);
//     setFiles([]);
//     dispatch(fetchDocumentById(id)); // Fetch new data
//     setStatus(""); // Reset status
//   }, [id, dispatch]);

//   useEffect(() => {
//     const handleSuccessReceived = () => {
//       dispatch(fetchDocumentById(id));
//     };

//     socket.on("success_received", handleSuccessReceived);

//     return () => {
//       socket.off("success_received", handleSuccessReceived);
//     };
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (user.role === rolesList.faculty) {
//       setOfficeRecipient(`${user.esuCampus.toUpperCase()} FACULTY`);
//     } else if (user.role === rolesList.registrar) {
//       setOfficeRecipient(`${user.esuCampus.toUpperCase()} REGISTRAR`);
//     } else if (user.role === rolesList.campus_admin) {
//       setOfficeRecipient(`${user.esuCampus.toUpperCase()} CAMPUS ADMIN`);
//     } else if (user.office?.officeName) {
//       setOfficeRecipient(user.office?.officeName);
//     }
//   }, [user]);

//   // useEffect(() => {
//   //   if (!document || !document.document_recipients) return;

//   //   const currentTime = new Date();

//   //   // 24 hours in milliseconds
//   //   // const Hours = 86400000;
//   //   const Hours = 1000 * 60 * 60 * (delayThreshold * 24);

//   //   // Check if all recipients have received the document
//   //   const allReceived = document?.document_recipients.every(
//   //     (recipient) => recipient.received_at !== null
//   //   );

//   //   let deadlinePassed = false;
//   //   // Check if document have deadline
//   //   const hasDeadline = document?.deadline;
//   //   if (hasDeadline) {
//   //     const deadline = new Date(
//   //       hasDeadline?.toLocaleString("en-US", { timeZone: "UTC" })
//   //     );

//   //     if (currentTime > deadline) {
//   //       deadlinePassed = true;
//   //     }
//   //   }

//   //   // Find the current office and check if it has received the document
//   //   const officeReceived = document?.document_recipients.find(
//   //     (recipient) =>
//   //       recipient.office_name === officeRecipient &&
//   //       recipient.received_at !== null
//   //   );

//   //   const lastReveived = document?.document_recipients
//   //     .filter((recipient) => recipient.received_at !== null)
//   //     .sort((a, b) => new Date(b.received_at) - new Date(a.received_at))[0];

//   //   const receivedAt = new Date(lastReveived?.received_at);
//   //   const localReceivedAt = receivedAt.toLocaleString("en-US", {
//   //     timeZone: "UTC",
//   //   });

//   //   const timeDifference = currentTime - new Date(localReceivedAt);

//   //   let status = null;

//   //   // First, check if the office has received and the uploaded_by matches the user
//   //   if (
//   //     !allReceived &&
//   //     officeReceived &&
//   //     normalizeString(fullName) !== normalizeString(documentData.uploaded_by)
//   //   ) {
//   //     status = "Received"; // Prioritize the "Received" status
//   //   } else if (document.status === documentStatusList.returned) {
//   //     status = "Returned";
//   //   } else if (!allReceived && deadlinePassed) {
//   //     status = "Delayed";
//   //   } else if (timeDifference > Hours && !allReceived) {
//   //     status = "Delayed";
//   //   } else if (allReceived) {
//   //     status = "Completed";
//   //   } else if (
//   //     // !allReceived &&
//   //     normalizeString(fullName) === normalizeString(documentData.uploaded_by)
//   //   ) {
//   //     status = "In Progress";
//   //   } else {
//   //     status = "Incoming";
//   //   }

//   //   setStatus(status);
//   // }, [document, user, officeRecipient, documentData, fullName, delayThreshold]);

//   useEffect(() => {
//     if (document) {
//       setDocumentData(document);
//       setData(document.document_recipients);
//       if (document.files && document.files.length > 0) {
//         const parsedFiles =
//           typeof document.files === "string"
//             ? JSON.parse(document.files)
//             : document.files;

//         setFiles(parsedFiles);
//       }
//     }
//   }, [document]);

//   useEffect(() => {
//     if (documentData && documentData.document_histories) {
//       const sortedData = [...documentData.document_histories].sort(
//         (a, b) => b.id - a.id
//       );
//       setSortedHistories(sortedData);
//     }
//   }, [documentData]);

//   // Helper function to get the file type icon
//   const getFileIcon = (file) => {
//     const extension = file.split(".").pop().toLowerCase();
//     switch (extension) {
//       case "pdf":
//         return <FaFilePdf className="text-red-500" />;
//       case "csv":
//         return <FaFileCsv className="text-green-500" />;
//       case "ppt":
//       case "pptx":
//         return <FaFilePowerpoint className="text-orange-500" />;
//       case "doc":
//       case "docx":
//         return <FaFileWord className="text-blue-500" />;
//       case "jpg":
//       case "jpeg":
//       case "png":
//       case "gif":
//         return <FaFileImage className="text-purple-500" />;
//       default:
//         return null; // No icon for unknown file types
//     }
//   };

//   useEffect(() => {
//     const recipientData = documentData?.document_recipients || [];
//     const fullName = `${user?.firstName} ${user?.middleInitial}. ${user?.lastName} (FACULTY)`;

//     const checkRecipient = recipientData.find((recipient) => {
//       return (
//         recipient.office_name === recipientOffice ||
//         recipient.office_name === fullName.toUpperCase()
//       );
//     });

//     if (checkRecipient?.received_at) {
//       setIsReceived(true);
//     }

//     if (checkRecipient?.returned_at) {
//       setAlreadyReturn(true);
//     }

//     setOfficeId(checkRecipient?.user_id);

//     if (checkRecipient && checkRecipient !== undefined) {
//       setIsRecipient(true);
//     }

//     const recipientReceived = recipientData.find(
//       (recipient) =>
//         recipient.office_name
//           .toLowerCase()
//           .includes(recipientOffice.trim().toLowerCase()) &&
//         !recipient.office_name.toLowerCase().includes("faculty") &&
//         recipient.received_at !== null
//     );

//     const recipientForwarded = recipientData.find(
//       (recipient) =>
//         recipient.office_name
//           .toLowerCase()
//           .includes(recipientOffice.trim().toLowerCase()) &&
//         !recipient.office_name.toLowerCase().includes("faculty") &&
//         recipient.status === documentStatusList.forwarded
//     );
//     if (
//       documentData?.status === documentStatusList.forwarded ||
//       recipientForwarded
//     )
//       setIsForwarded(true);

//     // if (recipientForwarded) setIsForwarded(true);
//     if (recipientReceived) setIsReceived(true);

//     const lastRecipient = recipientData[recipientData.length - 1];
//     if (
//       (lastRecipient?.user_id === user?.id &&
//         lastRecipient?.status === documentStatusList.received) ||
//       (user.officeId === officeId &&
//         lastRecipient?.status === documentStatusList.received)
//     ) {
//       setLastRecipient(true);
//     }

//     const campusRecipient = recipientData.find(
//       (recipient) =>
//         recipient.office_name
//           .toLowerCase()
//           .includes(recipientOffice.trim().toLowerCase()) &&
//         !recipient.office_name.toLowerCase().includes("faculty")
//     );

//     if (campusRecipient) setOfficeId(campusRecipient?.user_id);

//     // Find the index of the current recipient office
//     const currentIndex = recipientData.findIndex((recipient) =>
//       recipient.office_name
//         .toLowerCase()
//         .includes(recipientOffice.trim().toLowerCase())
//     );

//     // Get the next recipient office if it exists
//     if (currentIndex !== -1 && currentIndex < recipientData.length - 1) {
//       const nextRecipient = recipientData[currentIndex + 1];
//       setNextRoute(nextRecipient?.office_name);
//       // setOfficeId(nextRecipient?.user_id); // Set the next office's user ID if needed
//     } else {
//       setNextRoute(null); // No more routes
//     }
//   }, [user, recipientOffice, documentData, officeId]);

//   const handleReceive = async (act) => {
//     setAction(act);
//     setLoading(true);
//     setReceivedLoader(true);
//     const data = {
//       document_id: documentData.id,
//       user_id: officeId,
//       action: act,
//       recipient_user: `${user?.firstName} ${user?.middleInitial}. ${user?.lastName}`,
//       recipient_office: recipientOffice,
//       document_name: documentData.document_name,
//       next_route: nextRoute,
//       faculty_received: act === "forwarded" ? "forwarded" : null,
//     };

//     try {
//       const response = await api.post("/document/receive-document", data);
//       if (response.data.status === "success") {
//         socket.emit("received_document", data);
//         toast.success(response.data.message);
//         setSuccessModal(true);
//         setReceivedLoader(false);
//         setTrackingNumber("");
//         dispatch(fetchDocumentById(id)); // Fetch new data
//         // setTimeout(() => {
//         //   closeModal();
//         // }, 500);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white ">
//       <div className="flex items-center gap-5">
//         <Back />

//         <h1 className="font-bold md:text-2xl text-lg  text-gray-900">
//           {" "}
//           Document Details
//         </h1>
//       </div>
//       {document === null ? (
//         <div className="mt-5">
//           <NoData />
//         </div>
//       ) : (
//         <div className="mt-8 flex flex-col gap-5">
//           <div className="hidden lg:block">
//             {" "}
//             <Stepper data={data} />
//           </div>

//           <div className="lg:hidden block">
//             {" "}
//             <StepperMobile data={data} status={documentData?.status} />
//           </div>

//           {/* Document Details Section */}
//           <div className=" md:bg-gray-100 mt-10 md:p-4 rounded-lg flex flex-col lg:flex-row gap-5 justify-between text-gray-700">
//             <div className="lg:sticky  lg:top-20 flex flex-col gap-4 h-fit lg:w-1/2  p-4 bg-white text-sm   shadow-lg rounded-md">
//               {/* <div className=" rounded-full absolute z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 {loading && <TrackLoader />}
//               </div> */}
//               <div className=" flex items-center gap-5 border-b pb-2 fix">
//                 <h1 className="font-bold text-gray-800">Tracking Code:</h1>
//                 <p className="text-gray-700">{documentData.tracking_number}</p>
//               </div>
//               <div className="flex items-center gap-5 border-b pb-2">
//                 <h1 className="font-bold text-gray-800">Document Name:</h1>
//                 <p className="text-gray-700">{documentData.document_name}</p>
//               </div>
//               <div className="flex items-center gap-5 border-b pb-2">
//                 <h1 className="font-bold  text-gray-800">Document Type:</h1>
//                 <p className="text-gray-700">{documentData.document_type}</p>
//               </div>
//               <div className="flex items-center gap-5 border-b pb-2">
//                 <h1 className="font-bold  text-gray-800">File Type:</h1>
//                 <p className="text-gray-700">{documentData.file_type}</p>
//               </div>
//               {files?.length > 0 && (
//                 <div className="flex gap-3 border-b ">
//                   <div className="flex items-center gap-5">
//                     <h1 className="font-bold text-gray-800">Files:</h1>
//                     {/* <p className="text-gray-700">{documentData.file_type}</p> */}
//                   </div>
//                   <div>
//                     <div className="flex flex-row gap-2">
//                       {files?.map((file, index) => (
//                         <div
//                           key={index}
//                           className="flex text-sm items-center gap-2"
//                         >
//                           <span className="text-lg">{getFileIcon(file)}</span>
//                           <a
//                             href={file}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-main underline"
//                           >
//                             {`File ${index + 1}`}
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {documentData.document_desc && (
//                 <div className="flex items-center gap-5 border-b pb-2">
//                   <h1 className="font-bold  text-gray-800">Description:</h1>
//                   <p className="text-gray-700">{documentData.document_desc}</p>
//                 </div>
//               )}
//               <div className="flex items-center gap-5 border-b pb-2">
//                 <h1 className="font-bold  text-gray-800">Uploaded By:</h1>
//                 <p className="text-gray-700">{documentData.uploaded_by}</p>
//               </div>
//               <div className="flex items-center gap-5 border-b pb-2">
//                 <h1 className="font-bold  text-gray-800">Contact Number:</h1>
//                 <p className="text-gray-700">{documentData.contact_number}</p>
//               </div>
//               {documentData.esuCampus !== null &&
//                 documentData.esuCampus !== "null" && (
//                   <div className="flex items-center gap-5 border-b pb-2">
//                     <h1 className="font-bold  text-gray-800">ESU Campus:</h1>
//                     <p className="text-gray-700">{documentData.esuCampus}</p>
//                   </div>
//                 )}
//               <div className="flex items-center gap-5 border-b pb-2">
//                 <h1 className="font-bold  text-gray-800">Date:</h1>
//                 <p className="text-gray-700">
//                   {dateFormat(documentData.createdAt)}
//                 </p>
//               </div>

//               {documentData.deadline &&
//                 documentData.deadline !== "0000-00-00" && (
//                   <div className="flex items-center gap-5 border-b pb-2">
//                     <h1 className="font-bold  text-gray-800">Deadline:</h1>
//                     <p className="text-gray-700">
//                       {new Date(documentData.deadline).toLocaleDateString()}
//                     </p>
//                   </div>
//                 )}
//               {/* <div className="flex items-center gap-5">
//                 <h1 className="font-bold  text-gray-800">Status:</h1>
//                 <span
//                   className={`px-4 py-1 rounded-full text-sm ${
//                     status === "Completed"
//                       ? "bg-green-500 text-white"
//                       : status === "Received"
//                       ? "bg-blue-500 text-white"
//                       : status === "In Progress"
//                       ? "bg-[#f0d352] text-black"
//                       : status === "Delayed"
//                       ? "bg-red-700 text-white"
//                       : "bg-gray-300 text-black" // Default case if no status matches
//                   }`}
//                 >
//                   {status}
//                 </span>
//               </div> */}
//               <div className="flex gap-5 items-center">
//                 {/* <h1 className="font-bold  text-gray-800">Action:</h1> */}
//                 <ReceiveDocs trackingNumber={documentData.tracking_number} />

//                 {/* <div className="flex justify-end items-center ">
//                   {isForwarded ? (
//                     <p className="text-gray-600">
//                       Document has already been forwarded.
//                     </p>
//                   ) : lastRecipient ? (
//                     <p className="text-gray-600">
//                       Document has already been received.
//                     </p>
//                   ) : (
//                     <div className="flex gap-3">
//                       {returnStatus && !alreadyReturn ? (
//                         <button
//                           className="px-6 py-2 text-white bg-red-600 hover:bg-red-800 rounded-md shadow-md transition"
//                           onClick={() => handleReceive("returned")}
//                         >
//                           Receive
//                         </button>
//                       ) : (
//                         isRecipient && (
//                           <button
//                             className="px-6 py-2 text-white bg-green-600 hover:bg-green-800 rounded-md shadow-md transition"
//                             onClick={() =>
//                               handleReceive(
//                                 isReceived || alreadyReturn
//                                   ? "forwarded"
//                                   : "received"
//                               )
//                             }
//                           >
//                             {isReceived || alreadyReturn
//                               ? "Forward"
//                               : "Receive"}
//                           </button>
//                         )
//                       )}
//                     </div>
//                   )}
//                 </div> */}
//               </div>
//             </div>

//             <div className="lg:w-1/2 w-full p-4 bg-white shadow-md rounded-md">
//               <h1 className="font-bold text-md text-main mb-3">
//                 Tracking History
//               </h1>
//               <ul className="space-y-4">
//                 {sortedHistories?.map(
//                   ({
//                     id,
//                     action,
//                     recipient_office,
//                     recipient_user,
//                     createdAt,
//                     comments,
//                   }) => (
//                     <li key={id} className="pb-3 border-b last:border-none">
//                       <div className="flex justify-between items-start">
//                         <span className="font-semibold text-gray-700 text-sm">
//                           {recipient_office}
//                         </span>
//                         <span className="text-xs text-gray-500 text-nowrap">
//                           {dateFormat(createdAt)}
//                         </span>
//                       </div>
//                       <p className="text-xs text-gray-600 mt-1">
//                         Document {action}{" "}
//                         {action === "forwarded" ? "to the next office" : ""} by:{" "}
//                         {recipient_user}
//                       </p>
//                       {comments && (
//                         <div className="mt-4 p-3 rounded-lg bg-gray-100 border-l-4 border-blue-500 shadow-sm">
//                           <div className="flex items-start">
//                             <svg
//                               className="w-4 h-4 text-blue-500 mt-0.5 mr-2"
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path d="M18 10c0-4.418-3.582-8-8-8S2 5.582 2 10s3.582 8 8 8 8-3.582 8-8zm-8-5c.337 0 .675.06 1.002.18A7.937 7.937 0 0116 10c0 1.304-.31 2.535-.861 3.62l-.272.413-1.86-.38c-1.197-.246-2.217-.78-3.04-1.545-.852.787-1.9 1.292-3.097 1.536L3.932 15.5l-.285-.429C3.31 12.536 3 11.305 3 10c0-3.87 3.13-7 7-7zm0 1C5.58 6 4 7.58 4 10c0 .9.23 1.748.656 2.516l1.205-1.394a1 1 0 111.416 1.416l-1.25 1.443C7.248 14.17 8.6 15 10 15c3.42 0 5-1.58 5-5s-1.58-5-5-5z" />
//                             </svg>
//                             <div>
//                               <p className="text-sm font-semibold text-blue-600">
//                                 Comments
//                               </p>
//                               <p className="text-sm text-gray-700 mt-1">
//                                 {comments}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentDetails;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Back from "../../../components/buttons/Back";
import Stepper from "../../../components/Stepper";
import StepperMobile from "../../../components/StepperMobile";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentById,
  fetchDocumentById,
  reset,
} from "../../../services/documentSlice";
// import { getDocumentStatus } from "../../utils/documentStatus";
import { useFormat } from "../../../hooks/useFormatDate";
// import { documentBackground } from "../../utils/documentBackgroundColor";
import NoData from "../../../components/NoData";
import { getUserData } from "../../../services/authSlice";
import rolesList from "../../../constants/rolesList";
import {
  FaFilePdf,
  FaFileCsv,
  FaFilePowerpoint,
  FaFileWord,
  FaFileImage,
} from "react-icons/fa6";
import io from "socket.io-client";
import api from "../../../api/axios";
import documentStatusList from "../../../constants/documentStatusList";
import SuccessModal from "../../../components/SuccessModal";
import { useToast } from "../../../hooks/useToast";
import TrackLoader from "../../../components/loader/track_loader/Track";
import ReceiveDocs from "./ReceiveDocs";

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
  const [documentData, setDocumentData] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [documentId, setDocumentId] = useState(null);
  const { dateFormat } = useFormat();
  // const [recipientOffice, setRecipientOffice] = useState("");
  // const [isReceived, setIsReceived] = useState(false);
  const toast = useToast();
  const [status, setStatus] = useState("");
  const [officeRecipient, setOfficeRecipient] = useState("");
  const [fullName, setFullName] = useState("");
  const normalizeString = (str) => str?.trim().replace(/\./g, "").toLowerCase();
  const [files, setFiles] = useState([]);
  const [delayThreshold, setDelayThreshold] = useState(0);
  const [isView, setIsView] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [isForwarded, setIsForwarded] = useState(false);
  const [isRecipient, setIsRecipient] = useState(false);
  const [lastRecipient, setLastRecipient] = useState(false);
  const [recipientOffice, setRecipientOffice] = useState("");
  const [officeId, setOfficeId] = useState(null);
  const [nextRoute, setNextRoute] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [receivedLoader, setReceivedLoader] = useState(false);
  const [action, setAction] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [returnStatus, setReturnStatus] = useState(false);
  const [alreadyReturn, setAlreadyReturn] = useState(false);
  const [modal, setModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComment] = useState("");
  const [returnNextOffice, setReturnNextOffice] = useState(false);

  useEffect(() => {
    if (user?.office?.officeName) {
      setRecipientOffice(user.office.officeName);
    }
  }, [user]);

  useEffect(() => {
    if (document) {
      setDocumentData(document);
      setDocumentName(document.document_name);
      setDocumentId(document.id);
      if (document.status === documentStatusList.returned) {
        setReturnStatus(true);
      }
    }
  }, [document]);

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

  useEffect(() => {
    const recipientData = documentData?.document_recipients || [];
    const checkRecipient = recipientData.find((recipient) => {
      return recipient.office_name === officeRecipient;
    });

    if (checkRecipient?.view_at) {
      setIsView(true);
    }

    if (checkRecipient?.returned_at) {
      setIsReturn(true);
    }

    if (checkRecipient?.received_at) {
      setIsReceived(true);
    }

    if (checkRecipient?.returned_at) {
      setAlreadyReturn(true);
    }

    setOfficeId(checkRecipient?.user_id);

    if (checkRecipient && checkRecipient !== undefined) {
      setIsRecipient(true);
    }

    // const recipientReceived = recipientData.find(
    //   (recipient) =>
    //     recipient.office_name
    //       .toLowerCase()
    //       .includes(recipientOffice.trim().toLowerCase()) &&
    //     recipient.status === documentStatusList.received
    // );

    const recipientForwarded = recipientData.find(
      (recipient) =>
        recipient.office_name
          .toLowerCase()
          .includes(recipientOffice.trim().toLowerCase()) &&
        !recipient.office_name.toLowerCase().includes("faculty") &&
        recipient.status === documentStatusList.forwarded
    );
    if (
      documentData?.status === documentStatusList.forwarded ||
      recipientForwarded
    )
      setIsForwarded(true);

    // if (recipientForwarded) setIsForwarded(true);
    // if (recipientReceived) setIsReceived(true);

    const lastRecipient = recipientData[recipientData.length - 1];
    if (
      (lastRecipient?.user_id === user?.id &&
        lastRecipient?.status === documentStatusList.received) ||
      (user.officeId === officeId &&
        lastRecipient?.status === documentStatusList.received)
    ) {
      setLastRecipient(true);
    }

    // const campusRecipient = recipientData.find(
    //   (recipient) =>
    //     recipient.office_name
    //       .toLowerCase()
    //       .includes(recipientOffice.trim().toLowerCase()) &&
    //     !recipient.office_name.toLowerCase().includes("faculty")
    // );

    // if (campusRecipient) setOfficeId(campusRecipient?.user_id);

    // Find the index of the current recipient office
    const currentIndex = recipientData.findIndex((recipient) =>
      recipient.office_name
        .toLowerCase()
        .includes(recipientOffice.trim().toLowerCase())
    );

    // Get the next recipient office if it exists
    if (currentIndex !== -1 && currentIndex < recipientData.length - 1) {
      const nextRecipient = recipientData[currentIndex + 1];
      setNextRoute(nextRecipient?.office_name);
      // setOfficeId(nextRecipient?.user_id); // Set the next office's user ID if needed
      if (nextRecipient?.returned_at) {
        setReturnNextOffice(true);
      }
    } else {
      setNextRoute(null); // No more routes
    }
  }, [user, recipientOffice, documentData, officeId, officeRecipient]);

  const handleReceive = async (act) => {
    setAction(act);
    setLoading(true);
    setReceivedLoader(true);
    const data = {
      document_id: documentData.id,
      user_id: officeId,
      action: act,
      recipient_user: `${user?.firstName} ${user?.middleInitial}. ${user?.lastName}`,
      recipient_office: recipientOffice,
      document_name: documentData.document_name,
      next_route: nextRoute,
      faculty_received: act === "forwarded" ? "forwarded" : null,
      comments: comments,
    };

    try {
      const response = await api.post("/document/receive-document", data);
      window.open(files[0]);
      if (response.data.status === "success") {
        socket.emit("received_document", data);
        toast.success(response.data.message);
        setSuccessModal(true);
        setReceivedLoader(false);
        setTrackingNumber("");

        dispatch(fetchDocumentById(id)); // Fetch new data
        // setTimeout(() => {
        //   closeModal();
        // }, 500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async () => {
    setLoading(true);
    const data = {
      document_id: documentData.id,
      user_id: officeId,
    };

    try {
      const response = await api.put("/document/update/view-at", data);
      if (response.data.status === "success") {
        toast.success("Document viewed successfully");
        dispatch(fetchDocumentById(id)); // Fetch new data
        socket.emit("received_document", data);
      }
    } catch (error) {
      console.log(error);
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
              {/* <div className=" rounded-full absolute z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {loading && <TrackLoader />}
              </div> */}
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
                  className={` py-1 px-2 rounded-lg bg-gray-100 text-sm ${
                    status === "Completed"
                      ? "text-green-500 font-bold"
                      : status === "Received"
                      ? "text-blue-500 font-bold"
                      : status === "In Progress"
                      ? "text-[#f0d352] font-bold"
                      : status === "Delayed"
                      ? "text-red-700 font-bold"
                      : " text-black font-bold" // Default case if no status matches
                  }`}
                >
                  {status}
                </span>
              </div>
              <div className="flex gap-5 items-center">
                {/* <h1 className="font-bold  text-gray-800">Action:</h1> */}
                {/* <ReceiveDocs trackingNumber={documentData.tracking_number} /> */}

                {/* <div className="flex justify-end items-center ">
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
                      {returnStatus && !alreadyReturn ? (
                        <button
                          className="px-6 py-2 text-white bg-red-600 hover:bg-red-800 rounded-md shadow-md transition"
                          onClick={() => handleReceive("returned")}
                        >
                          Receive
                        </button>
                      ) : (
                        isRecipient && (
                          <button
                            className="px-6 py-2 text-white bg-green-600 hover:bg-green-800 rounded-md shadow-md transition"
                            onClick={() =>
                              handleReceive(
                                isReceived || alreadyReturn
                                  ? "forwarded"
                                  : "received"
                              )
                            }
                          >
                            {isReceived || alreadyReturn
                              ? "Forward"
                              : "Receive"}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div> */}
                <div className="flex flex-col gap-3">
                  <div className="grid  grid-cols-4 justify-items-center gap-3">
                    {documentData.file_type === "Soft Copy" && (
                      <button
                        // disabled={isView ? true : false}
                        // ${
                        //   isView ? "cursor-not-allowed" : "cursor-pointer"
                        // }
                        onClick={() => handleView()}
                        className={`  px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-green-300 transition-all`}
                      >
                        View
                      </button>
                    )}
                    <button
                      onClick={() => handleReceive("received")}
                      disabled={isReceived || isReturn || !isView}
                      className={` ${
                        isReceived || isReturn || !isView
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-blue-300 transition-all`}
                    >
                      Receive
                    </button>
                    {/* <button
                      onClick={() => handleReceive("returned")}
                      disabled={!isReceived || isReturn} // Disable if not received or already returned
                      className={` ${
                        !isReceived || isReturn
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      } px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-yellow-300 transition-all`}
                    >
                      Return
                    </button> */}
                    {returnNextOffice &&
                    !isReturn &&
                    documentData.status === documentStatusList.returned ? (
                      <button
                        onClick={() => handleReceive("returned")}
                        disabled={!returnNextOffice}
                        className={` ${
                          !returnNextOffice
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-yellow-300 transition-all`}
                      >
                        Return
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReceive("returned")}
                        disabled={isReturn || !isReceived || isForwarded}
                        className={` ${
                          isReturn || !isReceived || isForwarded
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-yellow-300 transition-all`}
                      >
                        Return
                      </button>
                    )}
                    <button
                      onClick={() => handleReceive("forwarded")}
                      disabled={isForwarded || isReturn || lastRecipient}
                      className={` ${
                        isForwarded || isReturn || lastRecipient
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }  px-6 py-2 text-sm font-medium text-white bg-yellow hover:bg-yellow_hover active:bg-yellow-800 rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-purple-300 transition-all`}
                    >
                      Forward
                    </button>
                  </div>
                  {/* {isReceived && !isReturn && !isForwarded && (
                    <div className="w-full">
                      <label>
                        <strong className="text-gray-800">
                          Comments:(Optional)
                        </strong>
                      </label>
                      <textarea
                        name=""
                        rows={4}
                        id=""
                        placeholder="Enter your comments here..."
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border-gray-400 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>
                  )} */}
                  {!isReturn &&
                    !returnNextOffice &&
                    documentData.status === documentStatusList.returned && (
                      <div className="w-full">
                        <label>
                          <strong className="text-gray-800">
                            Comments:(Optional)
                          </strong>
                        </label>
                        <textarea
                          name=""
                          rows={4}
                          id=""
                          placeholder="Enter your comments here..."
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full border-gray-400 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent"
                        />
                      </div>
                    )}
                  {isReceived && !isReturn && !isForwarded && (
                    <div className="w-full">
                      <label>
                        <strong className="text-gray-800">
                          Comments:(Optional)
                        </strong>
                      </label>
                      <textarea
                        name=""
                        rows={4}
                        id=""
                        placeholder="Enter your comments here..."
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full border-gray-400 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
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
