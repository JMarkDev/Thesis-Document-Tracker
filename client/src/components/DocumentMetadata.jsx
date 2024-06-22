import { Link } from "react-router-dom";
import Back from "../components/buttons/Back";
import Stepper from "../components/Stepper";
const DocumentMetadata = () => {
  return (
    <div className="bg-white ">
      <div className="flex items-center gap-5">
        <Link to="/documents">
          {" "}
          <Back />
        </Link>

        <h1 className="font-bold text-2xl text-gray-900"> Document Details</h1>
      </div>
      <div className="mt-8">
        <Stepper />
      </div>
    </div>
  );
};

export default DocumentMetadata;
