import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import NavDashboard from "../navbar/NavDashboard";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="flex min-h-screen ">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow">
        <NavDashboard />
      </div>
      <div className="flex-grow p-4 mt-16">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
