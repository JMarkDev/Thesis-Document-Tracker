import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import DeleteModal from "../DeleteModal";
import { useState } from "react";
import WorkflowDetails from "../../pages/Admin/DocumentWorkflows/WorkflowDetails";
import {
  fetchWorkflowById,
  getWorkflowById,
  fetchAllWorkflow,
} from "../../services/documentWolkflowSlice";
import { useFormat } from "../../hooks/useFormatDate";
import NoData from "../NoData";
import EditDeadline from "../../pages/Admin/Deadline/EditDeadline";
import api from "../../api/axios";
import { useToast } from "../../hooks/useToast";

const DocumentWorkflow = ({ data }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [showModal, setModal] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showWorkflowDetails, setShowWorkflowDetails] = useState(null);
  const workflowDetails = useSelector(getWorkflowById);
  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const { fullDateFormat } = useFormat();

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

  const handleDelete = async () => {
    try {
      const response = await api.put(
        `/workflow/delete-deadline/${selectedWorkflow}`
      );
      if (response.data.status === "success") {
        closeDeleteModal();
        dispatch(fetchAllWorkflow());
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
                  <div className="flex items-center  whitespace-nowrap">ID</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    DOCUMENT TYPE
                  </div>
                </th>

                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    DEADLINE
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
              {data?.map(({ id, document_type, deadline }, index) => (
                <tr
                  onClick={() => handleWorkflow(id)}
                  key={index}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 cursor-pointer"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {id}
                  </th>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {document_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {" "}
                    {fullDateFormat(deadline)}
                  </td>
                  <td className="px-6 py-4 flex gap-3 justify-center items-center">
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
                        setTitle(`${document_type} deadline`);
                        e.stopPropagation();
                      }}
                      className="p-2 md:text-lg text-sm   hover:bg-red-700 bg-red-500 text-white rounded-lg"
                    >
                      <MdDelete className="h-5 w-5" />
                    </button>
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
          <EditDeadline
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
