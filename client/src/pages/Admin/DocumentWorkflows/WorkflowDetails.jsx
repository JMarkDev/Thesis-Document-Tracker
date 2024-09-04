import PropTypes from 'prop-types'

const WorkflowDetails = ({modal, closeModal}) => {
  
  return <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden={!modal}
        className="fixed inset-0 z-[40] px-5 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-20 font-normal"
      >
        {" "}
        <div className="relative w-full max-w-6xl mt-10  h-full overflow-y-auto rounded-xl">
          <div className="relative text-gray-800 bg-white rounded-xl shadow-lg ">
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
              <div className="bg-white ">
                {/* <div className="mt-8 flex flex-col gap-5 p-4">
                  <div className="hidden lg:block">
                    {" "}
                    <Stepper data={data} />
                  </div>

                  <div className="lg:hidden block">
                    {" "}
                    <StepperMobile data={data} />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>;
};

WorkflowDetails.propTypes = {
  modal: PropTypes.bool,
  closeModal: PropTypes.func
};

export default WorkflowDetails;
