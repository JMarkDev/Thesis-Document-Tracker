import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  fetchAllWorkflow,
  getAllWorkflow,
  getWorkflowById,
  fetchWorkflowById,
} from "../../../services/documentWolkflowSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api/axios";
import { useToast } from "../../../hooks/useToast";

const EditDeadline = ({ id, modal, closeModal }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const workflowById = useSelector(getWorkflowById);
  const workflow = useSelector(getAllWorkflow);
  const [deadlineDate, setDeadlineDate] = useState("");

  useEffect(() => {
    if (workflow === "idle") {
      dispatch(fetchAllWorkflow());
    }
  }, [workflow, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchWorkflowById(id));
    }
  }, [id, dispatch]);

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
  };

  const handleDateChange = (event) => {
    setDeadlineDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      deadline_date: deadlineDate,
    };
    try {
      const response = await api.put(`/workflow/update-deadline/${id}`, data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        dispatch(fetchAllWorkflow());
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (workflowById) {
      setSelectedDocumentType(workflowById.document_type);
      setDeadlineDate(workflowById.deadline);
    }
  }, [workflowById]);

  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden={!modal}
        className="fixed inset-0 z-[40] px-5 flex items-center justify-center rounded-xl w-full  bg-gray-800 bg-opacity-30 font-normal"
      >
        {" "}
        <div className="relative w-full max-w-2xl md:mt-10 bg-white h-fit overflow-y-auto rounded-xl">
          <div className="relative text-gray-800  rounded-xl shadow-lg ">
            <div className="flex items-center justify-center rounded-t">
              <h1 className="md:text-2xl font-bold text-lg p-4">
                Document Deadline Form
              </h1>
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => closeModal()}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <div>
              <div className="p-4  bg-white w-full max-w-2xl shadow-lg rounded-md">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="documentType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Document Type
                    </label>
                    <select
                      id="documentType"
                      defaultValue={selectedDocumentType}
                      onChange={handleDocumentTypeChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      required
                    >
                      {/* <option value="">Select a document type</option> */}

                      {workflow?.map(({ document_type, id }) => (
                        <option key={id} value={id}>
                          {document_type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="deadlineDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Deadline Date
                    </label>
                    <input
                      type="date"
                      id="deadlineDate"
                      value={deadlineDate}
                      onChange={handleDateChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditDeadline.propTypes = {
  id: PropTypes.number,
  modal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default EditDeadline;
