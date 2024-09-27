import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const WorkflowDetails = ({ modal, closeModal, workflowDetails }) => {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    setRoute(workflowDetails?.route);
  }, [workflowDetails]);

  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden={!modal}
        className="fixed inset-0 z-[40] px-5 flex items-center justify-center rounded-xl w-full h-full bg-gray-800 bg-opacity-20 font-normal"
      >
        {" "}
        <div className="relative w-full max-w-6xl md:mt-10 bg-white  overflow-y-auto rounded-xl">
          <div className="relative text-gray-800  rounded-xl shadow-lg ">
            <div className="flex items-center justify-center rounded-t">
              <h1 className="md:text-2xl font-bold text-lg p-4">
                Workflow Details
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
              <div className="bg-white md:p-8 p-4">
                <h1 className="text-gray-700 font-bold md:text-lg text-sm">
                  {workflowDetails?.document_type}
                </h1>
                <div className="mt-8 flex flex-col gap-5 p-4">
                  <div className="hidden lg:block">
                    {" "}
                    {/* <Stepper data={data} /> */}
                    <div>
                      <ol className="flex  relative items-center h-32 w-full">
                        {route?.map(({ office_name }, index) => (
                          <li
                            key={index}
                            className={`${
                              index === route.length - 1
                                ? "after:border-white"
                                : "after:border-yellow"
                            } flex w-full  items-center text-gray-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-1 after:border-4  after:inline-block dark:after:border-blue-800`}
                          >
                            <div className="">
                              <div
                                className={`absolute ${
                                  index % 2 === 0 ? "lg:top-0" : "bottom-0"
                                } `}
                              >
                                <p className="font-bold text-[12px] max-w-40">
                                  {office_name}
                                </p>
                              </div>

                              <span
                                className=" flex items-center justify-center w-8 h-8 
                     bg-red-300 
                  rounded-full lg:h-10 lg:w-10 dark:bg-blue-800 shrink-0"
                              >
                                <svg
                                  className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
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
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="lg:hidden block">
                    {/* {" "}
                    <StepperMobile data={data} /> */}
                    <div className="flex items-center  justify-center">
                      <ol className="relative  right-[-60px] text-gray-600 border-l-4 border-yellow ">
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

                            <p className="font-bold text-[12px] max-w-40">
                              {office_name}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WorkflowDetails.propTypes = {
  modal: PropTypes.number,
  closeModal: PropTypes.func,
  workflowDetails: PropTypes.object,
};

export default WorkflowDetails;
