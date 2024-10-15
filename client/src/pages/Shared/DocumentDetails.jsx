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
import { documentBackground } from "../../utils/documentBackgroundColor";
import NoData from "../../components/NoData";
import { getUserData } from "../../services/authSlice";
import rolesList from "../../constants/rolesList";

const DocumentDetails = () => {
  const { id } = useParams();
  const user = useSelector(getUserData);
  const dispatch = useDispatch();
  const document = useSelector(getDocumentById);
  const [sortedHistories, setSortedHistories] = useState([]);
  const [data, setData] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const { dateFormat } = useFormat();
  const [recipientOffice, setRecipientOffice] = useState("");
  const [isReceived, setIsReceived] = useState(false);

  useEffect(() => {
    dispatch(fetchDocumentById(id));
  }, [id, dispatch]);

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

  useEffect(() => {
    if (
      user.role === rolesList.campus_admin ||
      user.role === rolesList.registrar
    ) {
      setRecipientOffice(user.esuCampus);
    } else if (user.office?.office_name) {
      setRecipientOffice(user.office.office_name);
    }
  }, [user]);

  useEffect(() => {
    if (document && recipientOffice) {
      const recipientReceived = document.document_recipients.find(
        (recipient) =>
          recipient.office_name
            .toLowerCase()
            .includes(recipientOffice.trim().toLowerCase()) &&
          !recipient.office_name.toLowerCase().includes("faculty") &&
          recipient.received_at !== null
      );

      // Set the received status
      setIsReceived(!!recipientReceived); // Use !! to ensure it sets a boolean (true/false)
    }
  }, [document, recipientOffice]);

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
                  className={`px-4 py-1 rounded-full text-sm ${documentBackground(
                    documentData.status
                  )}`}
                >
                  {isReceived ? "Received" : "Incoming"}
                </span>
              </div>
            </div>

            {/* <div className="lg:w-1/2 w-full p-4 text-gray-600 bg-white text-sm md:text-[16px] shadow-lg rounded-md">
              <h1 className="text-main lg:text-xl font-bold text-lg mb-4">
                Tracking History
              </h1>
              <ul className="space-y-4 leading-6">
                {sortedHistories.map(
                  ({
                    id,
                    action,
                    recipient_office,
                    recipient_user,
                    createdAt,
                  }) => (
                    <li key={id} className="border-b pb-2">
                      <p className="font-semibold text-gray-800">
                        {recipient_office}
                      </p>
                      <span>
                        Document {action} by: {recipient_user}
                      </span>
                      <p className="text-gray-600">
                        Date: {dateFormat(createdAt)}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div> */}
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
                        Document {action} by: {recipient_user}
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
