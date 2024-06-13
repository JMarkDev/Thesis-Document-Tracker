import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const NavDashboard = ({ handleBurger }) => {
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/scan-now": "Scan Now",
    "/documents": "Documents",
    "/document-workflow": "Document Workflow",
    "/offices": "Offices",
    "/user-management": "User Management",
    "/reports": "Reports",
    "/transmittal": "Transmittal",
  };

  const location = useLocation();
  const title = pageTitles[location.pathname];
  return (
    <div className="w-full flex gap-5 items-center px-4 flex-grow fixed h-16 bg-[#D4A4AC]">
      <button
        onClick={handleBurger}
        aria-controls="logo-sidebar"
        type="button"
        className=" inline-flex items-center p-2  text-sm text-gray-500 rounded-lg sm:hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
      <h1 className="md:text-3xl text-xl font-bold text-main">{title}</h1>
    </div>
  );
};

export default NavDashboard;
