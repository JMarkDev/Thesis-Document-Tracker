import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import NavbarFaculty from "../navbar/NavbarFaculty";
import PropTypes from "prop-types";

const LayoutFaculty = ({ children }) => {
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
        <NavbarFaculty handleBurger={handleBurger} sidebar={sidebar} />
      </div>
      <div className="flex-grow bg-white w-full p-4 mt-20 mx-2 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

LayoutFaculty.propTypes = {
  children: PropTypes.node,
};
export default LayoutFaculty;
