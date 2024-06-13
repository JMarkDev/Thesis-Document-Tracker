import React from "react";
import { useLocation } from "react-router-dom";

const NavDashboard = () => {
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
    <div className="w-full flex items-center px-4 flex-grow fixed h-16 bg-[#D4A4AC]">
      <h1 className="text-3xl font-bold text-main">{title}</h1>
    </div>
  );
};

export default NavDashboard;
