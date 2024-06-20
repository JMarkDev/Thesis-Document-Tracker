import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import userIcon from "../../assets/images/wmsu logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import { FaBars } from "react-icons/fa6";

const NavDashboard = ({ handleBurger, sidebar }) => {
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
    <div className="w-full md:w-[calc(100vw-16rem)] flex gap-5 items-center px-4 flex-grow fixed h-16 bg-[#D4A4AC]">
      <button
        onClick={handleBurger}
        aria-controls="logo-sidebar"
        type="button"
        className=" inline-flex items-center md:hidden text-2xl font-bold text-main rounded-lg    "
      >
        <FaBars />
      </button>
      <div className="flex  justify-between items-center w-full">
        <h1 className="md:text-3xl text-xl font-bold text-main">{title}</h1>
        <div className="flex  lg:text-[16px] text-sm gap-5">
          <div className="flex items-center gap-2">
            <button className="flex items-center">
              {" "}
              <TiPlus className="text-2xl" />
              <span className="hidden lg:block">Deadline</span>
            </button>
          </div>

          <button className="flex items-center ">
            <IoMdNotificationsOutline className="text-2xl " />
            <span className="hidden lg:block">Notifications</span>
          </button>
          <div className="flex items-center gap-5">
            <div className="flex-col flex">
              <span className="font-bold">Byron Go Silk</span>
              <span className="text-[12px]">Admin</span>
            </div>

            <img src={userIcon} alt="" className="h-10 w-10 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;
