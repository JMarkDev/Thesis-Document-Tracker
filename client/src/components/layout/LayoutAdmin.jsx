import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import NavDashboard from "../navbar/NavDashboard";

const LayoutAdmin = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const handleBurger = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="flex min-h-screen ">
      <div className="">
        <Sidebar sidebar={sidebar} handleBurger={handleBurger} />
      </div>
      <div className="flex flex-col flex-grow">
        <NavDashboard handleBurger={handleBurger} sidebar={sidebar} />
      </div>
      <div className="flex-grow w-full p-4 mt-16">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
