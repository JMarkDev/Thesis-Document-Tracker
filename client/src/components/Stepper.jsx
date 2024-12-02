import PropTypes from "prop-types";
import { useFormat } from "../hooks/useFormatDate";

const Stepper = ({ data }) => {
  const { dateFormat } = useFormat();

  return (
    <div className="overflow-x-auto py-4">
      <ol className="flex  relative items-center h-48  w-[1050px] ">
        {data?.map(({ office_name, received_at, returned_at }, index) => (
          <li
            key={index}
            className={`${
              index === data.length - 1
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
                <p className="font-bold text-[12px] max-w-44">{office_name}</p>
                {received_at && (
                  <p className="text-sm md:text-[14px]">
                    {/* {history.office === "Faculty" ? "Uploaded: " : "Received: "} */}
                    Received: {dateFormat(received_at)}
                  </p>
                )}

                {returned_at && (
                  <p className="text-sm md:text-[14px] text-red-500 ">
                    Return: {dateFormat(returned_at)}
                    {/* Return: Oct 20, 2024, 7:33 AM */}
                  </p>
                )}
              </div>

              {index === data.length - 1 ? (
                <span
                  className={` flex items-center justify-center w-8 h-8 ${
                    received_at ? "bg-red-300" : "bg-gray-300"
                  } rounded-full lg:h-10 lg:w-10 dark:bg-blue-800 shrink-0`}
                >
                  {received_at && (
                    <>
                      <svg
                        className="w-4 h-4 text-blue-600 lg:w-8 lg:h-8 dark:text-gray-100"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                      </svg>
                    </>
                  )}

                  {returned_at && (
                    <svg
                      className="w-3.5 h-3.5 text-red-600 lg:w-8 lg:h-8 dark:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                      />
                    </svg>
                  )}
                </span>
              ) : (
                <span
                  className={`flex items-center justify-center w-8 h-8 ${
                    received_at ? "bg-red-300" : "bg-gray-300"
                  }  rounded-full lg:h-10 lg:w-10 dark:bg-blue-800 shrink-0`}
                >
                  {received_at && (
                    <>
                      <svg
                        className="w-3.5 h-3.5  text-blue-600 lg:w-5 lg:h-5 dark:text-blue-300"
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
                    </>
                  )}

                  {returned_at && (
                    <svg
                      className="w-3.5 h-3.5 text-red-600 lg:w-8 lg:h-8 dark:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14M5 12l4-4m-4 4 4 4"
                      />
                    </svg>
                  )}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

Stepper.propTypes = {
  data: PropTypes.array,
};

export default Stepper;
