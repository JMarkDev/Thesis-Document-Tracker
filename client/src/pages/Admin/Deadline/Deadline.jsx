import DeadlineTable from "../../../components/table/DeadlineTable";
import {
  getAllWorkflow,
  fetchAllWorkflow,
  resetAddworkflowStatus,
} from "../../../services/documentWolkflowSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import AddDeadLine from "./AddDeadline";
const Deadline = () => {
  const dispatch = useDispatch();
  const workflow = useSelector(getAllWorkflow);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 7;
  const [deadline, setDeadine] = useState([]);

  useEffect(() => {
    if (workflow === "idle") {
      dispatch(fetchAllWorkflow());
    }
  }, [workflow, dispatch]);

  useEffect(() => {
    dispatch(fetchAllWorkflow());
  }, [dispatch]);

  const handleAddWorkflow = () => {
    dispatch(resetAddworkflowStatus());
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (workflow) {
      const hasDeadline = workflow.filter((item) => item.deadline !== null);
      setDeadine(hasDeadline);
    }
  }, [workflow]);

  // Paganation
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = deadline?.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex text-sm md:text-[16px] justify-end lg:flex-row flex-col-reverse gap-5">
        <button
          onClick={() => handleAddWorkflow()}
          className="w-fit p-2 px-4 rounded-lg bg-main hover:bg-main_hover text-white font-semi"
        >
          Add Document Deadline
        </button>
      </div>
      <div className="mt-8">
        <DeadlineTable data={currentDocuments} />
        <div className="flex justify-end mt-5">
          <Pagination
            documentsPerPage={documentsPerPage}
            totalDocuments={workflow.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      {modal && <AddDeadLine modal={modal} closeModal={closeModal} />}
    </div>
  );
};

export default Deadline;
