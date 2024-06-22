import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import NavDashboard from "../navbar/NavDashboard";
import PropTypes from "prop-types";

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
      <div className="flex-grow bg-white w-full p-4 mt-20 mx-2 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

LayoutAdmin.propTypes = {
  children: PropTypes.node,
};
export default LayoutAdmin;
