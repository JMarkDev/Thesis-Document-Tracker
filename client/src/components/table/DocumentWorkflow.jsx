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
import EditWorkflow from "../../pages/Admin/DocumentWorkflows/EditWorkflow";
import NoData from "../NoData";

const DocumentWorkflow = ({ data }) => {
  const dispatch = useDispatch();
  const [showModal, setModal] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showWorkflowDetails, setShowWorkflowDetails] = useState(null);
  const workflowDetails = useSelector(getWorkflowById);
  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const { dateFormat } = useFormat();

  const closeDeleteModal = () => {
    setModal(false);
    setSelectedWorkflow(null);
  };

  const openModal = (id) => {
    setSelectedWorkflow(id);
    setModal(!showModal);
  };

  const handleEdit = (id) => {
    setSelectedWorkflow(id);
    // dispatch(resetWorkflowStatus());
    setShowEditModal(true);
  };

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

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedWorkflow(null);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {data.length === 0 ? (
          <NoData />
        ) : (
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
                  <div className="flex items-center  whitespace-nowrap">
                    DATE
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 ">
                  <div className="flex items-center justify-center  whitespace-nowrap">
                    ACTION
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map(({ id, document_type, createdAt }, index) => (
                <tr
                  onClick={() => handleWorkflow(id)}
                  key={index}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {document_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {" "}
                    {dateFormat(createdAt)}
                  </td>
                  {/* <td className="px-6 py-4 flex gap-3 justify-center items-center">
                    <button
                      onClick={(e) => {
                        handleWorkflow(id);
                        e.stopPropagation();
                      }}
                      // to={`/document-workflow/${id}`}
                      className="p-2 md:text-lg text-sm bg-[#fca326] hover:bg-[#f58e40] text-white rounded-lg"
                    >
                      <FaEye className="h-5 w-5" />
                    </button>

                    <button
                      onClick={(e) => {
                        handleEdit(id);
                        e.stopPropagation();
                      }}
                      className="p-2 md:text-lg text-sm  bg-[#3577c2] hover:bg-[#2d4199] text-white rounded-lg"
                    >
                      <FaRegEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        openModal(id);
                        setTitle(document_type);
                        e.stopPropagation();
                      }}
                      className="p-2 md:text-lg text-sm   hover:bg-red-700 bg-red-500 text-white rounded-lg"
                    >
                      <MdDelete className="h-5 w-5" />
                    </button>
                  </td> */}
                  <td className="px-6 py-4 flex gap-3 justify-center items-center">
                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          handleWorkflow(id);
                          e.stopPropagation();
                        }}
                        className="p-2 md:text-lg text-sm bg-[#fca326] hover:bg-[#f58e40] text-white rounded-lg"
                      >
                        <FaEye className="h-5 w-5" />
                      </button>
                      <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View
                      </span>
                    </div>

                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          handleEdit(id);
                          e.stopPropagation();
                        }}
                        className="p-2 md:text-lg text-sm bg-[#3577c2] hover:bg-[#2d4199] text-white rounded-lg"
                      >
                        <FaRegEdit className="h-5 w-5" />
                      </button>
                      <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Edit
                      </span>
                    </div>

                    <div className="relative group">
                      <button
                        onClick={(e) => {
                          openModal(id);
                          setTitle(document_type);
                          e.stopPropagation();
                        }}
                        className="p-2 md:text-lg text-sm hover:bg-red-700 bg-red-500 text-white rounded-lg"
                      >
                        <MdDelete className="h-5 w-5" />
                      </button>
                      <span className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showWorkflowDetails && (
          <WorkflowDetails
            modal={showWorkflowDetails}
            closeModal={closeModal}
            workflowDetails={workflowDetails}
          />
        )}
        {showEditModal && (
          <EditWorkflow
            id={selectedWorkflow}
            closeModal={closeEditModal}
            modal={showEditModal}
          />
        )}

        {showModal && (
          <DeleteModal
            title={title}
            deleteModal={showModal}
            closeDeleteModal={closeDeleteModal}
            handleDelete={handleDelete}
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
