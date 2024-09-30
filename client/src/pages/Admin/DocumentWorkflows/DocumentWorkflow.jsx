import DocumentWorkflowTable from "../../../components/table/DocumentWorkflow";
import { IoSearch } from "react-icons/io5";
import {
  getAllWorkflow,
  fetchAllWorkflow,
  searchWorkflow,
  resetAddworkflowStatus,
} from "../../../services/documentWolkflowSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddWorkflow from "./AddWorkflow";
const DocumentWorkflow = () => {
  const dispatch = useDispatch();
  const workflow = useSelector(getAllWorkflow);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);

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

  const handleAddWorkflow = () => {
    dispatch(resetAddworkflowStatus());
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  return (
    <div>
      <div className="flex text-sm md:text-[16px] justify-between lg:flex-row flex-col-reverse gap-5">
        <div className=" flex max-w-[450px] w-full h-auto items-center relative">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search..."
            className="border border-[#d67c80] focus:border-blue  rounded-xl w-full bg-gray-100 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <IoSearch className="text-2xl absolute right-2 text-gray-600" />
        </div>
        <button
          onClick={() => handleAddWorkflow()}
          className="w-fit p-2 px-4 rounded-lg bg-main hover:bg-main_hover text-white font-semi"
        >
          Add Workflow
        </button>
      </div>
      <div className="mt-8">
        <DocumentWorkflowTable data={workflow} />
      </div>
      {modal && <AddWorkflow modal={modal} closeModal={closeModal} />}
    </div>
  );
};

export default DocumentWorkflow;
