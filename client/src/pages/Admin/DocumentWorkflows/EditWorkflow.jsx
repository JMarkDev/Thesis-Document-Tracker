import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffice,
  fetchAdmin,
  getRoleStatus,
  getRoleUsers,
} from "../../../services/usersSlice";
import { MdDelete } from "react-icons/md";
import {
  updateWorkflow,
  fetchWorkflowById,
  getWorkflowById,
  updateWorkflowStatus,
  resetWorkflowStatus,
} from "../../../services/documentWolkflowSlice";
import { toastUtils } from "../../../hooks/useToast";
import Loader from "../../../components/loader/loginloader/LoginLoading";

const EditWorkflow = ({ modal, closeModal, id }) => {
  const [documentType, setDocumentType] = useState("");
  const [route, setRoute] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const officeUsers = useSelector(getRoleUsers("office"));
  const officeStatus = useSelector(getRoleStatus("office"));
  const adminStatus = useSelector(getRoleStatus("admin"));
  const workflow = useSelector(getWorkflowById);
  const workflowStatus = useSelector(updateWorkflowStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (workflow) {
      setDocumentType(workflow.document_type);
      setRoute(workflow.route);
    }
  }, [workflow]);

  useEffect(() => {
    if (officeStatus === "idle") {
      dispatch(fetchOffice());
    }

    if (adminStatus === "idle") {
      dispatch(fetchAdmin());
    }
  }, [officeStatus, adminStatus, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchWorkflowById(id));
    }
  }, [id, dispatch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle adding selected office to the route array
  const handleSelectOffice = (officeName, userId) => {
    // Add new step with office name to the route
    setRoute([...route, { office_name: officeName, user_id: userId }]);

    if (officeName === "DEFAULT") {
      const allOffices = officeUsers.map((office) => ({
        office_name: office.office.officeName,
        user_id: office.id,
      }));

      setRoute([
        { office_name: "FACULTY", user_id: null },
        { office_name: "REGISTRAR", user_id: null },
        ...allOffices,
      ]);
    } else {
      if (!isOfficeInRoute(officeName)) {
        setRoute([...route, { office_name: officeName, user_id: userId }]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const workflow = { document_type: documentType, route };
    dispatch(updateWorkflow({ id, workflow, toast: toastUtils() }));
  };

  useEffect(() => {
    if (workflowStatus === "succeeded") {
      dispatch(resetWorkflowStatus());
      closeModal();
      setLoading(false);
    } else if (workflowStatus === "loading") {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [workflowStatus, closeModal, dispatch]);

  const isOfficeInRoute = (officeName) => {
    return route.some((office) => office.office_name === officeName);
  };

  const handleDeleteOffice = (officeName) => {
    const newRoute = route.filter(
      (office) => office.office_name !== officeName
    );
    setRoute(newRoute);
  };

  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden={!modal}
        className="fixed overflow-y-auto overflow-hidden  inset-0 z-50 px-5 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-20 font-normal"
      >
        {/* <div className="relative w-full max-w-2xl bg-white  rounded-xl shadow-lg"> */}
        {loading && <Loader />}
        <div
          className={`relative w-full max-w-2xl ${
            isOpen ? "h-full" : "h-fit"
          }  rounded-xl shadow-lg bg-white mt-10 overflow-y-auto`}
        >
          <div className="relative text-gray-800 rounded-xl">
            <div className="flex items-center justify-between border-b border-gray-200 rounded-t p-4">
              <h1 className="md:text-2xl font-bold text-lg">Update Workflow</h1>
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
                onClick={closeModal}
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

            <div className="">
              <form className="p-5  space-y-5" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block  font-semibold text-gray-700 mb-2">
                    Document Type
                  </label>
                  <input
                    type="text"
                    defaultValue={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className=" block text-sm w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                    placeholder="Enter Document Type"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-gray-700 font-semibold mb-2">
                    Document Route:
                  </h3>
                  <button
                    id="dropdownDividerButton"
                    data-dropdown-toggle="dropdownDivider"
                    onClick={toggleDropdown}
                    className="text-gray-700 border border-gray-300 rounded-md shadow-sm w-full font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    Select office
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div
                    id="dropdownDivider"
                    className={`z-10 ${
                      isOpen ? "block" : "hidden"
                    } bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 dark:divide-gray-600`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 border border-gray-300 border-t-0 bg-gray-200 dark:text-gray-200"
                      aria-labelledby="dropdownDividerButton"
                    >
                      <li>
                        <a
                          href="#"
                          className={`block px-4 py-2  ${
                            isOfficeInRoute("DEFAULT")
                              ? "text-gray-400 cursor-not-allowed"
                              : "hover:bg-gray-300"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!isOfficeInRoute("DEFAULT")) {
                              handleSelectOffice("DEFAULT", null);
                            }
                          }}
                          disabled={isOfficeInRoute("DEFAULT")}
                        >
                          DEFAULT ROUTE
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className={`block px-4 py-2  ${
                            isOfficeInRoute("FACULTY")
                              ? "text-gray-400 cursor-not-allowed"
                              : "hover:bg-gray-300"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!isOfficeInRoute("FACULTY")) {
                              handleSelectOffice("FACULTY", null);
                            }
                          }}
                          disabled={isOfficeInRoute("FACULTY")}
                        >
                          FACULTY
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className={`block px-4 py-2 ${
                            isOfficeInRoute("REGISTRAR")
                              ? "text-gray-400 cursor-not-allowed"
                              : "hover:bg-gray-300"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!isOfficeInRoute("REGISTRAR")) {
                              handleSelectOffice("REGISTRAR", null);
                            }
                          }}
                          disabled={isOfficeInRoute("REGISTRAR")}
                        >
                          REGISTRAR
                        </a>
                      </li>
                      {officeUsers?.map((office) => (
                        <li key={office.id}>
                          <a
                            href="#"
                            className={`block px-4 py-2 ${
                              isOfficeInRoute(office.office.officeName)
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-300"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isOfficeInRoute(office.office.officeName)) {
                                handleSelectOffice(
                                  office.office.officeName,
                                  office.officeId
                                );
                              }
                            }}
                            disabled={isOfficeInRoute(office.office.officeName)}
                          >
                            {office.office.officeName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {route.length > 0 && (
                  <div className="flex items-center  justify-center">
                    <ol className="relative  right-0 text-gray-600 border-l-4 border-yellow ">
                      {route?.map(({ office_name }, index) => (
                        <li key={index} className="last:mb-0 mb-10 ms-6">
                          <span
                            className="absolute flex items-center justify-center w-8 h-8 bg-red-300
                 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-blue-500 dark:text-green-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 16 12"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5.917 5.724 10.5 15 1.5"
                              />
                            </svg>
                          </span>

                          <p className="font-bold hover:bg-gray-300 px-2 rounded-sm py-1 flex w-full justify-between items-center text-[12px] ">
                            {office_name}
                            <span
                              onClick={() => handleDeleteOffice(office_name)}
                              className="text-xl cursor-pointer text-red-500 hover:bg-gray-400 rounded-sm ml-20"
                            >
                              <MdDelete />
                            </span>
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className=" flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Workflow
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditWorkflow.propTypes = {
  id: PropTypes.number.isRequired,
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditWorkflow;
