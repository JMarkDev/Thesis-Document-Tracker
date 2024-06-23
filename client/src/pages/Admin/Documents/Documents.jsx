import Table from "../../../components/table/DocumentTable";
import { IoSearch } from "react-icons/io5";
import Dropdown from "../../../components/dropdown/YearDropdown";
import wmsuCampus from "../../../utils/Campus";
import { useEffect, useState } from "react";

const Documents = () => {
  const [campus, setCampus] = useState([]);
  const documentType = ["IDP", "IOR", "DTR"];
  const documentStatus = ["incoming", "received", "delayed"];

  useEffect(() => {
    setCampus(wmsuCampus);
  }, []);
  return (
    <div className="">
      <div className="flex  flex-col gap-5 justify-between mb-8">
        <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col gap-5">
          <button className="w-fit p-2 px-4 rounded-lg bg-main hover:bg-main_hover text-white font-semi">
            Upload Documents
          </button>
          <div className=" flex max-w-[450px] w-full  items-center relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-[#d67c80] focus:border-blue  rounded-lg w-full bg-gray-100"
            />
            <IoSearch className="text-2xl absolute right-2 text-gray-600" />
          </div>
        </div>

        <div className="flex sm:justify-end justify-center flex-col lg:flex-row lg:items-center items-end  gap-3">
          <span className="text-gray-700">Filter documents by:</span>
          <div className="flex items-center gap-3">
            <div>
              <Dropdown data={campus} option={"WMSU-ESU"} />
            </div>
            <div>
              <Dropdown data={documentType} option={"Document type"} />
            </div>
            <div>
              <Dropdown data={documentStatus} option={"Document status"} />
            </div>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Documents;
