import { useEffect, useState } from "react";
import { logoutUser } from "../../services/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/authSlice";
import { Link, useLocation } from "react-router-dom";
import { MdQrCodeScanner, MdOutlineDocumentScanner } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { GoWorkflow } from "react-icons/go";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaUsers, FaRegUser, FaFileUpload } from "react-icons/fa";
import { TbReportAnalytics, TbReportSearch } from "react-icons/tb";
import { RiPieChart2Fill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { GiFiles } from "react-icons/gi";
import Logo from "../../assets/images/logo with word.png";
import PropTypes from "prop-types";
import rolesList from "../../constants/rolesList";

const Sidebar = ({ sidebar, handleBurger }) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  // const { userData } = useContext(AuthContext);
  const location = useLocation();
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [sidebarLinks, setSidebarLinks] = useState([]);
  const role = userData?.role;
  // const role = "faculty";

  const adminLinks = [
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
  ];

  const facultyLinks = [
    { title: "Profile", path: "/user-profile", src: <FaRegUser /> },
    {
      title: "Upload Documents",
      path: "/upload-documents",
      src: <FaFileUpload />,
    },
    {
      title: "All Documents",
      path: "/faculty/all-documents",
      src: <GiFiles />,
    },
    { title: "Reports", path: "/faculty-reports", src: <TbReportSearch /> },
  ];

  const EsuCampus = [
    {
      title: "Scan Now",
      path: "/esu-campus/scan-now",
      src: <MdQrCodeScanner />,
    },
    {
      title: "Dashboard",
      path: "/esu-campus/dashboard",
      src: <RiPieChart2Fill />,
    },
    {
      title: "Transmittal",
      path: "/esu-campus/transmittal",
      src: <MdOutlineDocumentScanner />,
      restrictedTo: [rolesList.campus_admin],
    },
    {
      title: "Documents",
      path: "/esu-campus/documents",
      src: <IoDocuments />,
    },

    {
      title: "Faculties",
      path: "/esu-campus/faculties",
      src: <FaUsers />,
    },
    {
      title: "Reports",
      path: "/esu-campus/reports",
      src: <TbReportSearch />,
    },
  ];

  const officeLinks = [
    {
      title: "Scan Now",
      path: "/office/scan-now",
      src: <MdQrCodeScanner />,
    },
    {
      title: "Dashboard",
      path: "/office/dashboard",
      src: <RiPieChart2Fill />,
    },
    {
      title: "Documents",
      path: "/office/documents",
      src: <IoDocuments />,
    },

    {
      title: "Staff",
      path: "/office-staff",
      src: <FaUsers />,
    },
    {
      title: "Reports",
      path: "/office/reports",
      src: <TbReportSearch />,
    },
  ];

  useEffect(() => {
    let filterdLinks;
    if (role === rolesList.admin) {
      setSidebarLinks(adminLinks);
    } else if (role === rolesList.faculty) {
      setSidebarLinks(facultyLinks);
    } else if (
      role === rolesList.campus_admin ||
      role === rolesList.registrar
    ) {
      filterdLinks = EsuCampus.filter(
        (link) => !link.restrictedTo || link.restrictedTo.includes(role)
      );
      setSidebarLinks(filterdLinks);
    } else if (role === rolesList.office || role === rolesList.office_staff) {
      setSidebarLinks(officeLinks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      {sidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={handleBurger}
        ></div>
      )}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#D4A4AC] rounded-br-lg transition-transform transform ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:transform-none`}
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
                // className={`${
                //   !isUserManagementOpen
                //     ? "last:absolute last:bottom-10 last:w-[230px] "
                //     : ""
                // }`}
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
                          <FiChevronDown />
                        ) : (
                          <FiChevronRight />
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
                    // onClick={handleLogout}
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
            <li>
              <button
                onClick={handleLogout}
                className={
                  "w-[230px] mt-20 flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-main dark:hover:bg-gray-700 group"
                }
              >
                <span className="text-2xl">
                  <BiLogOut />
                </span>
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  sidebar: PropTypes.bool,
  handleBurger: PropTypes.func,
};

export default Sidebar;
