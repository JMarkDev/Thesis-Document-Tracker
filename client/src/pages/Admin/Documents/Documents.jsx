import Table from "../../../components/Table";
import DocumentType from "../../../components/dropdown/DocumentType";
import EsuCamus from "../../../components/dropdown/EsuCampus";
import Status from "../../../components/dropdown/Status";
import { IoSearch } from "react-icons/io5";

const Documents = () => {
  return (
    <div className="">
      <div className="flex  flex-col xl:flex-row justify-between mb-8">
        <div className="flex lg:w-1/3 w-full  items-center relative">
          <input
            type="text"
            placeholder="Search..."
            className=" rounded-lg w-full"
          />
          <IoSearch className="text-2xl absolute right-0" />
        </div>

        <div className="flex sm:justify-end justify-center flex-col lg:flex-row lg:items-center items-end  gap-3 xl:mt-0 mt-4">
          <span className="">Filter documents by:</span>
          <div className="flex gap-3">
            <div>
              <DocumentType />
            </div>
            <div>
              <EsuCamus />
            </div>
            <div>
              <Status />
            </div>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Documents;
