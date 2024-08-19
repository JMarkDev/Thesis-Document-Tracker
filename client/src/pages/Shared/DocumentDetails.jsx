import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Back from "../../components/buttons/Back";
import Stepper from "../../components/Stepper";
import StepperMobile from "../../components/StepperMobile";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentById,
  fetchDocumentById,
} from "../../services/documentSlice";
import { getDocumentStatus } from "../../utils/documentStatus";
import { useFormat } from "../../hooks/useFormatDate";
import { documentBackground } from "../../utils/documentBackgroundColor";

const DocumentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const document = useSelector(getDocumentById);
  const [sortedHistories, setSortedHistories] = useState([]);
  const [data, setData] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const { fullDateFormat } = useFormat();

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

  return (
    <div className="bg-white ">
      <div className="flex items-center gap-5">
        <Link to="/documents">
          {" "}
          <Back />
        </Link>

        <h1 className="font-bold text-2xl text-gray-900"> Document Details</h1>
      </div>
      <div className="mt-8 flex flex-col gap-5">
        <div className="hidden lg:block">
          {" "}
          <Stepper data={data} />
        </div>

        <div className="lg:hidden block">
          {" "}
          <StepperMobile data={data} />
        </div>

        <div className=" bg-gray-200 mt-10 md:p-4 rounded-lg flex flex-col lg:flex-row gap-5 justify-between text-gray-700">
          <div className="lg:sticky lg:top-20 flex flex-col gap-4 h-fit lg:w-1/2  p-4 bg-white text-sm md:text-[16px]  shadow-lg rounded-md">
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
            <div className="flex items-center gap-5 border-b pb-2">
              <h1 className="font-bold  text-gray-800">Uploaded By:</h1>
              <p className="text-gray-700">{documentData.uploaded_by}</p>
            </div>
            <div className="flex items-center gap-5 border-b pb-2">
              <h1 className="font-bold  text-gray-800">Date:</h1>
              <p className="text-gray-700">
                {fullDateFormat(documentData.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <h1 className="font-bold  text-gray-800">Status:</h1>
              <p
                className={`${documentBackground(
                  documentData.status
                )} text-gray-700  p-2 rounded-lg`}
              >
                {getDocumentStatus(documentData.status)}
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full p-4 text-gray-600 bg-white text-sm md:text-[16px] shadow-lg rounded-md">
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
                      {action !== "forwarded" ? recipient_office : null}
                    </p>
                    <span>
                      Document {action} by: {recipient_user}
                    </span>
                    <p className="text-gray-600">
                      Date: {fullDateFormat(createdAt)}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
