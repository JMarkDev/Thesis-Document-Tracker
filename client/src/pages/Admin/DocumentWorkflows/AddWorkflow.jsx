import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Route from "../../../components/dropdown/Route";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffice,
  fetchAdmin,
  getRoleStatus,
  getRoleUsers,
} from "../../../services/usersSlice";

const AddWorkflow = ({ modal, closeModal }) => {
  const [documentType, setDocumentType] = useState("");
  const [route, setRoute] = useState([{ user_id: null, office_name: "" }]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const officeUsers = useSelector(getRoleUsers("office"));
  const officeStatus = useSelector(getRoleStatus("office"));
  const adminStatus = useSelector(getRoleStatus("admin"));

  useEffect(() => {
    if (officeStatus === "idle") {
      dispatch(fetchOffice());
    }

    if (adminStatus === "idle") {
      dispatch(fetchAdmin());
    }
  }, [officeStatus, adminStatus, dispatch]);

  const toggleDrowdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAddStep = () => {
    setRoute([...route, { user_id: null, office_name: "" }]);
  };

  const handleDeleteStep = (index) => {
    const updatedRoute = route.filter((_, i) => i !== index);
    setRoute(updatedRoute);
  };

  const handleStepChange = (index, value) => {
    const updatedRoute = route.map((step, i) =>
      i === index ? { ...step, office_name: value } : step
    );
    setRoute(updatedRoute);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log({ documentType, route });
  };

  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden={!modal}
        className={`fixed inset-0 z-40 px-5 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-20 font-normal ${
          modal ? "block" : "hidden"
        }`}
      >
        <div className="relative w-full h-auto max-w-2xl md:mt-10 bg-white overflow-y-auto rounded-xl shadow-lg">
          <div className="relative text-gray-800 rounded-xl">
            <div className="flex items-center justify-between border-b border-gray-200 rounded-t p-4">
              <h1 className="md:text-2xl font-bold text-lg">Add Workflow</h1>
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

            <form className="p-5 space-y-5" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Document Type
                </label>
                <input
                  type="text"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  onClick={toggleDrowdown}
                  className="text-gray-700 border border-gray-300 rounded-md shadow-sm w-full  font-medium text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  } bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-fit dark:bg-gray-700 dark:divide-gray-600 absolute `}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDividerButton"
                  >
                    {officeUsers?.map((office) => (
                      <li key={office.id}>
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {office.office.officeName}
                        </a>
                      </li>
                    ))}
                    {/* <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              IDP
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              DTR
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              IOR
            </a>
          </li> */}
                  </ul>
                </div>
                {/* <Route /> */}
                {/* {route.map((step, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={step.office_name}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      placeholder="Office Name"
                      className="mr-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteStep(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="text-blue-500 hover:text-blue-700 mt-2"
                >
                  Add Step
                </button> */}
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddWorkflow.propTypes = {
  modal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AddWorkflow;
