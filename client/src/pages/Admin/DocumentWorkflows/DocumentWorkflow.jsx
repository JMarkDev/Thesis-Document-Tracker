import DocumentWorkflowTable from "../../../components/table/DocumentWorkflow";
import { IoSearch } from "react-icons/io5";
import {
  getAllWorkflow,
  fetchAllWorkflow,
  searchWorkflow,
} from "../../../services/documentWolkflowSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const DocumentWorkflow = () => {
  const dispatch = useDispatch();
  const workflow = useSelector(getAllWorkflow);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (workflow === "idle") {
      dispatch(fetchAllWorkflow());
    }
  }, [workflow, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchWorkflow(searchTerm));
    } else {
      dispatch(fetchAllWorkflow());
    }
  }, [dispatch, searchTerm]);
  return (
    <div>
      <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col-reverse gap-5">
        <div className=" flex max-w-[450px] w-full  items-center relative">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
            className="border border-[#d67c80] focus:border-blue  rounded-xl w-full bg-gray-100"
          />
          <IoSearch className="text-2xl absolute right-2 text-gray-600" />
        </div>
        <button className="w-fit p-2 px-4 rounded-lg bg-main hover:bg-main_hover text-white font-semi">
          Add Document Workflow
        </button>
      </div>
      <div className="mt-8">
        <DocumentWorkflowTable data={workflow} />
      </div>
    </div>
  );
};

export default DocumentWorkflow;
