import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../Table";
import { MdQrCodeScanner } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { GoWorkflow } from "react-icons/go";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import Logo from "../../assets/images/logo with word.png";
import { RiPieChart2Fill } from "react-icons/ri";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarLinks = [
    { title: "Scan Now", path: "/scan", src: <MdQrCodeScanner /> },
    { title: "Dashboard", path: "/dashboard", src: <RiPieChart2Fill /> },
    { title: "Documents", path: "/documents", src: <IoDocuments /> },
    { title: "Document Workflow", path: "/workflow", src: <GoWorkflow /> },
    { title: "Offices", path: "/offices", src: <HiBuildingOffice2 /> },
    { title: "User Management", path: "/users", src: <FaUsers /> },
    { title: "Reports", path: "/reports", src: <TbReportAnalytics /> },
  ];

  return (
    <>
      <button
        onClick={() => setSidebar(!sidebar)}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      {sidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
          onClick={() => setSidebar(false)}
        ></div>
      )}
      <aside
        id="logo-sidebar"
        className={` fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:transform-none`}
        aria-label="Sidebar"
      >
        <div className="fixed w-64 h-full px-3 py-4 overflow-y-auto bg-gray-300 dark:bg-gray-800 ">
          <Link className="flex  ps-2.5 mb-5">
            <img src={Logo} className="h-14 me-3 text-center" alt="Logo" />
          </Link>
          <ul className="space-y-2 font-medium">
            {sidebarLinks.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-main dark:hover:bg-gray-700 group"
                >
                  <span className="text-2xl">{menu.src}</span>
                  <span className="ms-3">{menu.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
