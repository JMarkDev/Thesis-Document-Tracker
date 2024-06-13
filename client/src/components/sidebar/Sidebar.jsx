import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdQrCodeScanner } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { GoWorkflow } from "react-icons/go";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { RiPieChart2Fill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import Logo from "../../assets/images/logo with word.png";

const Sidebar = ({ sidebar, handleBurger }) => {
  const location = useLocation();
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

  const sidebarLinks = [
    { title: "Scan Now", path: "/scan-now", src: <MdQrCodeScanner /> },
    { title: "Dashboard", path: "/dashboard", src: <RiPieChart2Fill /> },
    { title: "Documents", path: "/documents", src: <IoDocuments /> },
    {
      title: "Document Workflow",
      path: "/document-workflow",
      src: <GoWorkflow />,
    },
    { title: "Offices", path: "/offices", src: <HiBuildingOffice2 /> },
    {
      title: "User Management",
      path: "/users",
      src: <FaUsers />,
      sublinks: [
        { title: "Faculty", path: "/users/faculty" },
        { title: "Campus Admin", path: "/users/campus-admin" },
        { title: "ESU Registrar", path: "/users/esu-registrar" },
        { title: "Admin Staff", path: "/users/admin-staff" },
      ],
    },
    { title: "Reports", path: "/reports", src: <TbReportAnalytics /> },
    { title: "Logout", path: "/home", src: <BiLogOut /> },
  ];

  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  return (
    <>
      {sidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
          onClick={handleBurger}
        ></div>
      )}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen md:bg-[#D4A4AC] transition-transform transform ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:transform-none`}
        aria-label="Sidebar"
      >
        <div className="fixed w-64 h-full px-3 py-4 overflow-y-auto bg-gray-300 border-2 border-l-0 border-main rounded-xl dark:bg-gray-800 ">
          <Link to="/dashboard" className="flex ps-2.5 mb-5">
            <img src={Logo} className="h-14 me-3 text-center" alt="Logo" />
          </Link>
          <ul className="space-y-2 font-medium">
            {sidebarLinks.map((menu, index) => (
              <li
                key={index}
                className={`${
                  !isUserManagementOpen
                    ? "last:absolute last:bottom-10 last:w-[230px] "
                    : ""
                }`}
              >
                {menu.sublinks ? (
                  <div>
                    <button
                      onClick={toggleUserManagement}
                      className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg hover:text-white hover:bg-main dark:hover:bg-gray-700 group"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl">{menu.src}</span>
                        <span className="ms-3">{menu.title}</span>
                      </div>
                      <span className="text-xl">
                        {isUserManagementOpen ? (
                          <FiChevronLeft />
                        ) : (
                          <FiChevronDown />
                        )}
                      </span>
                    </button>
                    {isUserManagementOpen && (
                      <ul className="pl-8 mt-2 space-y-2">
                        {menu.sublinks.map((submenu, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={submenu.path}
                              className={`${
                                location.pathname === submenu.path &&
                                "bg-main text-white"
                              } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-main dark:hover:bg-gray-700 group`}
                            >
                              {submenu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={menu.path}
                    className={`${
                      location.pathname === menu.path && "bg-main text-white"
                    } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-main dark:hover:bg-gray-700 group`}
                  >
                    <span className="text-2xl">{menu.src}</span>
                    <span className="ms-3">{menu.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
