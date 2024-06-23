import PropTypes from "prop-types";
const StepperMobile = ({ data }) => {
  return (
    <div className="flex items-center  justify-center">
      <ol className="relative  right-[-60px] text-gray-600 border-l-4 border-yellow ">
        {data.map((history, index) => (
          <li key={index} className=" mb-10 ms-6">
            <p className="absolute left-[-120px] text-end max-w-24 text-sm">
              {history.date}
            </p>
            <span className="absolute flex items-center justify-center w-8 h-8 bg-red-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
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

            <p className="font-bold text-sm max-w-40">{history.office}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

StepperMobile.propTypes = {
  data: PropTypes.object,
};
export default StepperMobile;
