import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../services/authSlice";
import userIcon from "../../assets/images/user (1).png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaBars, FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import NavProfile from "../NavProfile";
import Notification from "../Notification";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  getNotificationById,
  fetchNotificationById,
  readNotification,
} from "../../services/notificationSlice";
import { getUserRole } from "../../utils/userRoles";
import rolesList from "../../constants/rolesList";
import io from "socket.io-client";
import { toast } from "react-toastify";

const socket = io.connect(`${api.defaults.baseURL}`);

const NavDashboard = ({ handleBurger }) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  // const { userData } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [profilePic, setProfilePic] = useState(userIcon);
  const [notifications, setNotifications] = useState([]);
  const getNotification = useSelector(getNotificationById);
  const [unread, setUnread] = useState(0);
  const [delayOpen, setDelayOpen] = useState(false);
  const [autoLogout, setAutoLogout] = useState(false);
  const [delayThreshold, setDelayThreshold] = useState(0);
  const [autoLogoutThreshold, setAutoLogoutThreshold] = useState(0);

  const handleSaveDelay = async () => {
    setDelayOpen(false);
    try {
      const response = await api.put("/document/delay/id/1", {
        delay: delayThreshold,
      });
      if (response.data.status === "success") {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveAutoLogout = async () => {
    setAutoLogout(false);
    try {
      const response = await api.put("/document/auto-logout/id/1", {
        auto_logout_minutes: autoLogoutThreshold,
      });
      if (response.data.status === "success") {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDelay = async () => {
      try {
        const response = await api.get("/document/get-delay/1");
        setAutoLogoutThreshold(response.data.auto_logout_minutes);
        setDelayThreshold(response.data.days_before_delay);
      } catch (error) {
        console.log(error);
      }
    };
    getDelay();
  }, []);

  useEffect(() => {
    if (userData && userData.image) {
      setProfilePic(`${api.defaults.baseURL}${userData.image}`);
    }
  }, [userData]);

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/scan-now": "Scan Now",
    "/documents": "Documents",
    "/document-workflow": "Workflow",
    "/offices": "Offices",
    "/user-management": "User Management",
    "/reports": "Reports",
    "/transmittal": "Transmittal",
    "/user-profile": "Profile",
    "/settings": "Settings",
    "/deadlines": "Deadlines",
    "/upload-documents": "Upload",
    "/faculty/all-documents": "All Documents",
    "/faculty-reports": "Reports",
    "/users/admin-staff": "Admin",
    "/users/faculty": "Faculty",
    "/users/esu-registrar": "Registrar",
    "/users/campus-administrator": "Campus Administrator",
  };

  const handleNotification = () => {
    setShowNotification(!showNotification);
    setShowProfile(false);
    setAutoLogout(false);
    setDelayOpen(false);
  };

  const handleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotification(false);
  };
  const location = useLocation();
  const title = pageTitles[location.pathname];

  useEffect(() => {
    if (userData) {
      dispatch(fetchNotificationById(userData.id));
    }
  }, [userData, dispatch]);

  // useEffect(() => {
  //   if (userData) {
  //     const handleUploadSuccess = () => {
  //       dispatch(fetchNotificationById(userData.id))
  //         .unwrap() // Make sure the data is updated before proceeding
  //         .then((newNotifications) => {
  //           setNotifications(newNotifications); // Explicitly set new notifications
  //         });
  //     };

  //     const handleReceivedSuccess = () => {
  //       dispatch(fetchNotificationById(userData.id))
  //         .unwrap() // Make sure the data is updated before proceeding
  //         .then((newNotifications) => {
  //           setNotifications(newNotifications); // Explicitly set new notifications
  //         });
  //     };

  //     const handleSuccessDeadline = () => {
  //       dispatch(fetchNotificationById(userData.id))
  //         .unwrap() // Make sure the data is updated before proceeding
  //         .then((newNotifications) => {
  //           setNotifications(newNotifications); // Explicitly set new notifications
  //         });
  //     };

  //     const handleSuccessUser = () => {
  //       dispatch(fetchNotificationById(userData.id))
  //         .unwrap() // Make sure the data is updated before proceeding
  //         .then((newNotifications) => {
  //           setNotifications(newNotifications); // Explicitly set new notifications
  //         });
  //     };

  //     socket.on("success_upload", handleUploadSuccess);
  //     socket.on("success_received", handleReceivedSuccess);
  //     socket.on("success_deadline", handleSuccessDeadline);
  //     socket.on("success_user", handleSuccessUser);
  //   }

  //   // Clean up the socket connection and remove the event listener
  //   return () => {
  //     socket.off("success_upload");
  //     socket.off("success_received");
  //     socket.off("success_deadline");
  //     socket.off("success_user");
  //     // socket.disconnect();
  //   };
  // }, [dispatch, userData]);

  useEffect(() => {
    if (userData) {
      // Generic success handler
      const handleSuccess = () => {
        dispatch(fetchNotificationById(userData.id))
          .unwrap()
          .then((newNotifications) => {
            setNotifications(newNotifications);
          });
      };

      // List of events to handle
      const events = [
        "success_upload",
        "success_received",
        "success_deadline",
        "success_user",
      ];

      // Attach the event listeners
      events.forEach((event) => {
        socket.on(event, handleSuccess);
      });

      // Clean up the socket listeners
      return () => {
        events.forEach((event) => {
          socket.off(event, handleSuccess);
        });
      };
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (getNotification) {
      setNotifications(getNotification);
      const unread = getNotification.filter(
        (notification) => notification.is_read === 0
      );
      setUnread(unread.length);
    }
  }, [getNotification]);

  const handleNotificationClick = (id) => {
    dispatch(readNotification(id));
    setTimeout(() => {
      dispatch(fetchNotificationById(userData.id));
    }, 1000);
  };
  return (
    <div className="w-full text-gray-800 z-20 md:w-[calc(100vw-16rem)] flex gap-5 items-center px-4 flex-grow fixed h-16 bg-[#D4A4AC]">
      <button
        onClick={handleBurger}
        aria-controls="logo-sidebar"
        type="button"
        className=" inline-flex items-center md:hidden text-2xl font-bold text-main rounded-lg    "
      >
        <FaBars />
      </button>
      <div className="flex  justify-between items-center w-full">
        <h1 className="md:text-2xl  text-sm font-bold text-main">{title}</h1>
        <div className="flex items-center lg:text-[16px] text-sm sm:gap-3 gap-2">
          {userData?.role === rolesList.admin && (
            <>
              <div className="relative  inline-block text-left">
                <button
                  onClick={() => {
                    setAutoLogout((prev) => !prev);
                    setDelayOpen(false);
                    setShowNotification(false);
                  }}
                  className="flex  items-center gap-2 focus:outline-none"
                >
                  <RiLogoutCircleLine className="text-2xl" />
                  <span className="hidden md:block text-sm">Auto-Logout</span>
                </button>

                {/* Dropdown Content */}
                {autoLogout && (
                  <div
                    onMouseLeave={() => setAutoLogout(false)}
                    className="absolute md:right-0 left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                  >
                    <div className="p-2">
                      <label
                        htmlFor="delay-threshold"
                        className="block text-sm font-medium text-nowrap text-gray-700"
                      >
                        Minutes before auto-logout:
                      </label>
                      <input
                        type="number"
                        id="delay-threshold"
                        min="1"
                        defaultValue={autoLogoutThreshold}
                        onChange={(e) => setAutoLogoutThreshold(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      />
                      <button
                        onClick={handleSaveAutoLogout}
                        className="mt-3 w-full bg-blue-500 text-white py-1.5 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative inline-block text-left">
                <button
                  onClick={() => {
                    setDelayOpen((prev) => !prev);
                    setAutoLogout(false);
                    setShowNotification(false);
                  }}
                  className="flex  items-center gap-2 focus:outline-none"
                >
                  <FaRegClock className="text-xl" />
                  <span className="hidden md:block text-sm">Delay</span>
                </button>

                {/* Dropdown Content */}
                {delayOpen && (
                  <div
                    onMouseLeave={() => setDelayOpen(false)}
                    className="absolute md:right-0 left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                  >
                    <div className="p-2">
                      <label
                        htmlFor="delay-threshold"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Days before delay:
                      </label>
                      <input
                        type="number"
                        id="delay-threshold"
                        min="1"
                        defaultValue={delayThreshold}
                        onChange={(e) => setDelayThreshold(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      />
                      <button
                        onClick={handleSaveDelay}
                        className="mt-3 w-full bg-blue-500 text-white py-1.5 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Deadline link */}
              <div className="flex items-center gap-2">
                <Link to={"/deadlines"} className="flex gap-2 items-center">
                  <FaRegCalendarAlt className="text-xl" />
                  <span className="hidden md:block text-sm">Deadline</span>
                </Link>
              </div>
            </>
          )}

          <div className="relative  flex items-center">
            {unread > 0 && (
              <span className="text-sm  px-1.5 absolute right-[-10px] top-[-10px] text-white bg-red-600 rounded-full text-center">
                {unread}
              </span>
            )}
            <button
              onClick={handleNotification}
              onMouseEnter={handleNotification}
              className="flex items-center "
            >
              <IoMdNotificationsOutline className="text-2xl " />
              {/* <span className="hidden lg:block">Notifications</span> */}
            </button>
          </div>
          {showNotification && (
            <div
              onMouseLeave={handleNotification}
              className="absolute top-12 right-5"
            >
              <Notification
                notifications={notifications}
                handleNotificationClick={handleNotificationClick}
              />
            </div>
          )}

          <div className="flex text-nowrap items-center sm:gap-3 gap-2">
            <div className=" flex-col flex">
              <span className="font-bold">{userData?.firstName}</span>
              <span className="text-[12px]">
                {userData?.role === rolesList.office_staff
                  ? getUserRole(userData?.role) + " staff"
                  : getUserRole(userData?.role)}
              </span>
            </div>

            <img
              src={profilePic}
              onClick={handleProfile}
              onMouseEnter={handleProfile}
              alt=""
              className="h-10 w-10 rounded-full cursor-pointer bg-gray-100"
            />
            {showProfile && (
              <div
                onMouseLeave={handleProfile}
                className="absolute top-12 right-5 text-sm"
              >
                <NavProfile />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

NavDashboard.propTypes = {
  handleBurger: PropTypes.func,
};

export default NavDashboard;
