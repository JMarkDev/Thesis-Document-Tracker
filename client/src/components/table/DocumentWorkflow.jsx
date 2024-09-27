import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { deleteWorkflow } from "../../services/documentWolkflowSlice";
import { toastUtils } from "../../hooks/useToast";
import DeleteModal from "../DeleteModal";
import { useState } from "react";
import WorkflowDetails from "../../pages/Admin/DocumentWorkflows/WorkflowDetails";
import {
  fetchWorkflowById,
  getWorkflowById,
} from "../../services/documentWolkflowSlice";
import { useFormat } from "../../hooks/useFormatDate";

const DocumentWorkflow = ({ data }) => {
  const [showModal, setModal] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showWorkflowDetails, setShowWorkflowDetails] = useState(null);
  const workflowDetails = useSelector(getWorkflowById);
  const { dateFormat } = useFormat();

  const closeDeleteModal = () => {
    setModal(false);
    setSelectedWorkflow(null);
  };

  const openModal = (id) => {
    setSelectedWorkflow(id);
    setModal(!showModal);
  };

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteWorkflow({ id: selectedWorkflow, toast: toastUtils() }));
    closeDeleteModal();
  };

  const handleWorkflow = (id) => {
    dispatch(fetchWorkflowById(id));
    setShowWorkflowDetails(id);
  };

  const closeModal = () => {
    setShowWorkflowDetails(null);
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                <div className="flex items-center  whitespace-nowrap">
                  Route ID
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center  whitespace-nowrap">
                  DOCUMENT TYPE
                </div>
              </th>

              <th scope="col" className="px-6 py-3">
                <div className="flex items-center  whitespace-nowrap">DATE</div>
              </th>
              <th scope="col" className="px-6 py-3 ">
                <div className="flex items-center justify-center  whitespace-nowrap">
                  ACTION
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, document_type, createdAt }, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {id}
                </th>

                <td className="px-6 py-4 whitespace-nowrap">{document_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {" "}
                  {dateFormat(createdAt)}
                </td>
                <td className="px-6 py-4 flex gap-3 justify-center items-center">
                  <button
                    onClick={() => handleWorkflow(id)}
                    // to={`/document-workflow/${id}`}
                    className="px-4 py-2 text-lg bg-[#fca326] hover:bg-[#f58e40] text-white rounded-lg"
                  >
                    <FaEye className="h-5 w-5" />
                  </button>

                  <button className="px-4 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    <FaRegEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openModal(id)}
                    className="px-4 py-2 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                  {showModal && (
                    <DeleteModal
                      title={document_type}
                      deleteModal={showModal}
                      closeDeleteModal={closeDeleteModal}
                      handleDelete={handleDelete}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showWorkflowDetails && (
          <WorkflowDetails
            modal={showWorkflowDetails}
            closeModal={closeModal}
            workflowDetails={workflowDetails}
          />
        )}
      </div>
    </>
  );
};

DocumentWorkflow.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DocumentWorkflow;
