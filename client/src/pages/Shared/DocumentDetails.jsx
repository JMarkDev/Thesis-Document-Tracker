import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Back from "../../components/buttons/Back";
import Stepper from "../../components/Stepper";
import StepperMobile from "../../components/StepperMobile";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentById,
  fetchDocumentById,
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

const DocumentDetails = () => {
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

  useEffect(() => {
    setFullName(`${user.firstName} ${user.middleInitial} ${user.lastName}`);
  }, [user]);

  useEffect(() => {
    dispatch(fetchDocumentById(id));
    setStatus("");
  }, [id, dispatch]);

  useEffect(() => {
    if (
      user.role === rolesList.campus_admin ||
      user.role === rolesList.registrar
    ) {
      setOfficeRecipient(`${user.esuCampus.toUpperCase()} REGISTRAR`);
    } else if (user.office?.officeName) {
      setOfficeRecipient(user.office?.officeName);
    }
  }, [user]);

  useEffect(() => {
    if (!document || !document.document_recipients) return;

    // Check if all recipients have received the document
    const allReceived = document?.document_recipients.every(
      (recipient) => recipient.received_at !== null
    );
    // Find the current office and check if it has received the document
    // const officeReceived = document?.document_recipients.find(
    //   (recipient) =>
    //     recipient.office_name?.trim().toLowerCase() ===
    //       user.office?.officeName.trim().toLowerCase() &&
    //     recipient.received_at !== null
    // );
    // console.log(officeReceived);

    // Find the current office and check if it has received the document
    const officeReceived = document?.document_recipients.find(
      (recipient) =>
        recipient.office_name === officeRecipient &&
        recipient.received_at !== null
    );

    // Get the previous office recipient to compare the time difference
    const previousRecipient = document?.document_recipients.find(
      (recipient) =>
        recipient.office_name !== officeRecipient &&
        recipient.received_at !== null
    );

    // Check if the previous office has received the document
    if (previousRecipient) {
      const receivedAt = new Date(previousRecipient.received_at);
      const currentTime = new Date();

      // Check if the time difference exceeds 24 hours (86400000 milliseconds)
      const timeDifference = currentTime - receivedAt;

      if (timeDifference > 86400000 && !officeReceived && !allReceived) {
        setStatus("Delayed");
        return;
      }
    }

    if (allReceived) {
      setStatus("Completed");
    } else if (
      !allReceived &&
      normalizeString(fullName) === normalizeString(documentData.uploaded_by)
    ) {
      setStatus("In Progress"); // Default status if not all are received
    } else if (officeReceived) {
      setStatus("Received");
    } else {
      setStatus("Incoming");
    }
  }, [document, user, officeRecipient, documentData, fullName]);

  useEffect(() => {
    if (document) {
      setDocumentData(document);
      setData(document.document_recipients);
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

  // useEffect(() => {
  //   if (
  //     user.role === rolesList.campus_admin ||
  //     user.role === rolesList.registrar
  //   ) {
  //     setRecipientOffice(user.esuCampus);
  //   } else if (user.office?.office_name) {
  //     setRecipientOffice(user.office.office_name);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (document && recipientOffice) {
  //     const recipientReceived = document.document_recipients.find(
  //       (recipient) =>
  //         recipient.office_name
  //           .toLowerCase()
  //           .includes(recipientOffice.trim().toLowerCase()) &&
  //         !recipient.office_name.toLowerCase().includes("faculty") &&
  //         recipient.received_at !== null
  //     );

  //     // Set the received status
  //     setIsReceived(!!recipientReceived); // Use !! to ensure it sets a boolean (true/false)
  //   }
  // }, [document, recipientOffice]);
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
            <StepperMobile data={data} />
          </div>

          {/* Document Details Section */}
          <div className=" md:bg-gray-100 mt-10 md:p-4 rounded-lg flex flex-col lg:flex-row gap-5 justify-between text-gray-700">
            <div className="lg:sticky  lg:top-20 flex flex-col gap-4 h-fit lg:w-1/2  p-4 bg-white text-sm   shadow-lg rounded-md">
              <div className=" flex items-center gap-5 border-b pb-2 fix">
                <h1 className="font-bold text-gray-800">Tracking Number:</h1>
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
              {documentData.files && documentData.files.length > 0 && (
                <div className="flex flex-col gap-3 border-b ">
                  <div className="flex items-center gap-5">
                    <h1 className="font-bold text-gray-800">File Type:</h1>
                    <p className="text-gray-700">{documentData.file_type}</p>
                  </div>
                  <div>
                    {/* <h1 className="font-bold text-gray-800">Files:</h1> */}
                    <div className="flex flex-row gap-2">
                      {documentData.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex text-sm items-center gap-2"
                        >
                          <span className="text-lg">{getFileIcon(file)}</span>
                          <a
                            href={file} // Use the URL directly
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
              {documentData.esuCampus && (
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
                {sortedHistories.map(
                  ({
                    id,
                    action,
                    recipient_office,
                    recipient_user,
                    createdAt,
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
