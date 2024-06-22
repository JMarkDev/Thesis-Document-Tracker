import Table from "../../../components/table/DocumentTable";
import { IoSearch } from "react-icons/io5";
import Dropdown from "../../../components/dropdown/YearDropdown";

const Documents = () => {
  return (
    <div className="">
      <div className="flex  flex-col xl:flex-row justify-between mb-8">
        <div className="flex max-w-[450px] w-full  items-center relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-[#d67c80] focus:border-blue  rounded-lg w-full bg-gray-100"
          />
          <IoSearch className="text-2xl absolute right-2 text-gray-600" />
        </div>

        <div className="flex sm:justify-end justify-center flex-col lg:flex-row lg:items-center items-end  gap-3 xl:mt-0 mt-4">
          <span className="text-gray-700">Filter documents by:</span>
          <div className="flex items-center gap-3">
            <div>
              <Dropdown />
            </div>
            <div>
              <Dropdown />
            </div>
            <div>
              <Dropdown />
            </div>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Documents;
