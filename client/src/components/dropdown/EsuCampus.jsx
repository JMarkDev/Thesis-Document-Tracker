import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrowdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        onClick={toggleDrowdown}
        className="text-white bg-gray-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        ESU Campus
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
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute `}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDividerButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
