import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffice,
  fetchAdmin,
  getRoleStatus,
  getRoleUsers,
} from "../../services/usersSlice";

const Dropdown = () => {
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
  return (
    <>
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
    </>
  );
};

export default Dropdown;
