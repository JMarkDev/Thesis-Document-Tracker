import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Back from "../../../components/buttons/Back";
import Stepper from "../../../components/Stepper";
import StepperMobile from "../../../components/StepperMobile";
const DocumentDetails = () => {
  const [data, setData] = useState([]);
  // const id = useParams();

  // console.log(id)

  const documentHistory = [
    { office: "Faculty", date: "01 Aug 2024, 01:00pm" },
    {
      office: "Registrar",
      date: "01 Aug 2024, 01:00pm",
    },
    {
      office: "OCI Dean Of ESU Office",
      date: "01 Aug 2024, 01:00pm",
    },
    {
      office: "Vice President for Academic Affairs Office",
      date: "01 Aug 2024, 01:00pm",
    },
    {
      office: "Human Resources Office",
      date: "01 Aug 2024, 01:00pm",
    },
    {
      office: "Accounting Office",
      date: "01 Aug 2024, 01:00pm",
    },
    {
      office: "Records Office",
      date: "01 Aug 2024, 01:00pm",
    },
  ];

  useEffect(() => {
    setData(documentHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 
   *   {
    documentId: "IDP-2024",
    trackingNumber: "293412319023",
    documentName: "IDP Pagadian Campus",
    documentType: "IDP",
    fileType: "CSV",
    uploadedBy: "Josiel Mark Cute",
    status: "received",
    date: "2024-06-20",
  },
   */
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

        <div className="bg-gray-200 mt-10 md:p-4 rounded-lg flex flex-col lg:flex-row gap-5 justify-between text-gray-700">
          <div className="flex flex-col gap-4 lg:w-1/2 w-full p-4 bg-white text-sm md:text-[16px]  shadow-lg rounded-md">
            <div className="flex items-center gap-5 border-b pb-2">
              <h1 className="font-bold text-gray-800">Tracking Number:</h1>
              <p className="text-gray-700">293412319023</p>
            </div>
            <div className="flex items-center gap-5 border-b pb-2">
              <h1 className="font-bold text-gray-800">Document Name:</h1>
              <p className="text-gray-700">IDP Pagadian Campus</p>
            </div>
            <div className="flex items-center gap-5 border-b pb-2">
              <h1 className="font-bold  text-gray-800">Document Type:</h1>
              <p className="text-gray-700">IDP</p>
            </div>
            <div className="flex items-center gap-5 border-b pb-2">
              <h1 className="font-bold  text-gray-800">File Type:</h1>
              <p className="text-gray-700">Hardcopy</p>
            </div>
            <div className="flex items-center gap-5 border-b pb-2">
              <h1 className="font-bold  text-gray-800">Uploaded By:</h1>
              <p className="text-gray-700">Josiel Mark Cute</p>
            </div>
            <div className="flex items-center gap-5 border-b pb-2">
              <h1 className="font-bold  text-gray-800">Date:</h1>
              <p className="text-gray-700">2024-06-20</p>
            </div>
            <div className="flex items-center gap-5">
              <h1 className="font-bold  text-gray-800">Status:</h1>
              <p className="text-gray-700">Received</p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full p-4 text-gray-600 bg-white text-sm md:text-[16px] shadow-lg rounded-md">
            <h1 className="text-main lg:text-xl font-bold text-lg mb-4">
              Tracking History
            </h1>
            <ul className="space-y-4 leading-6">
              <li className="border-b pb-2">
                <p className="font-semibold text-gray-800">
                  Document received by: Vice President for Academic Affairs
                  Office
                </p>
                <span>Recipient: Josiel Mark Receiver Cute</span>
                <p className="text-gray-600">Date: June 06, 01:01 PM</p>
              </li>
              <li className="border-b pb-2">
                <p className="font-semibold text-gray-800">
                  Document forwarded to: Vice President for Academic Affairs
                  Office
                </p>
                <p className="text-gray-600">Date: June 05, 01:01 PM</p>
              </li>
              <li className="border-b pb-2">
                <p className="font-semibold text-gray-800">
                  Document received by: OCI Dean of ESU Office
                </p>
                <span>Recipient: Josiel Mark Receiver Cute</span>
                <p className="text-gray-600">Date: June 04, 01:01 PM</p>
              </li>
              <li className="border-b pb-2">
                <p className="font-semibold text-gray-800">
                  Document forwarded to: OIC Dean of ESU Office
                </p>
                <p className="text-gray-600">Date: June 03, 01:01 PM</p>
              </li>
              <li className="border-b pb-2">
                <p className="font-semibold text-gray-800">
                  Document received by: WMSU-ESU Pagadian Campus
                </p>
                <span>Recipient: Josiel Mark Receiver Cute</span>
                <p className="text-gray-600">Date: June 02, 01:01 PM</p>
              </li>
              <li>
                <p className="font-semibold text-gray-800">
                  Document uploaded by: Josiel Mark Cute
                </p>
                <p className="text-gray-600">Date: June 01, 2024, 12:12 AM</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
