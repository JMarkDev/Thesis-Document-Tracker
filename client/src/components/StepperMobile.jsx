import PropTypes from "prop-types";
import { useFormat } from "../hooks/useFormatDate";
const StepperMobile = ({ data }) => {
  const { dateFormat } = useFormat();
  return (
    <div className="flex items-center  justify-center">
      <ol className="relative  right-[-50px] text-gray-600 border-l-4 border-yellow ">
        {data?.map(({ office_name, received_at }, index) => (
          <li key={index} className="last:mb-0 mb-10 ms-6">
            <p className="absolute left-[-120px] text-end max-w-24 text-sm">
              {dateFormat(received_at)}
            </p>
            {index === data.length - 1 ? (
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${
                  received_at ? "bg-red-300" : "bg-gray-300"
                }  rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}
              >
                {received_at && (
                  <>
                    <svg
                      className="w-4 h-4 text-blue-600 lg:w-5 lg:h-5 dark:text-gray-100"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                    </svg>
                  </>
                )}
              </span>
            ) : (
              <span
                className={` absolute flex items-center justify-center w-8 h-8 ${
                  received_at ? "bg-red-300" : "bg-gray-300"
                }  rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900 `}
              >
                {received_at && (
                  <>
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
                  </>
                )}
              </span>
            )}

            <p className="font-bold text-[12px] ">{office_name}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

StepperMobile.propTypes = {
  data: PropTypes.array,
};
export default StepperMobile;
