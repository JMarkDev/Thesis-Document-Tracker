import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Back from "../../../components/buttons/Back";
import Stepper from "../../../components/Stepper";
import StepperMobile from "../../../components/StepperMobile";
const DocumentDetails = () => {
  const [data, setData] = useState([]);

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
      </div>
    </div>
  );
};

export default DocumentDetails;
