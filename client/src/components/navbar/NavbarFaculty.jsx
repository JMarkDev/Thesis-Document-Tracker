import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../../services/authSlice";
import userIcon from "../../assets/images/user-profile.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import PropTypes from "prop-types";
import NavProfile from "../NavProfile";
import Notification from "../Notification";
import { useState, useEffect } from "react";
import api from "../../api/axios";

const NavFaculty = ({ handleBurger }) => {
  const userData = useSelector(getUserData);

  // const { userData } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [profilePic, setProfilePic] = useState(userIcon);

  useEffect(() => {
    if (userData && userData.image) {
      setProfilePic(`${api.defaults.baseURL}${userData.image}`);
    }
  }, [userData]);

  const pageTitles = {
    "/faculty-profile": "Profile",
    "/faculty-upload-documents": "Upload Documents",
    "/faculty-all-documents": "All Documents",
    "/faculty-reports": "Reports",
  };

  const handleNotification = () => {
    setShowNotification(!showNotification);
    setShowProfile(false);
  };

  const handleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotification(false);
  };
  const location = useLocation();
  const title = pageTitles[location.pathname];
  return (
    <div className="w-full z-20 md:w-[calc(100vw-16rem)] flex gap-5 items-center px-4 flex-grow fixed h-16 bg-[#D4A4AC]">
      <button
        onClick={handleBurger}
        aria-controls="logo-sidebar"
        type="button"
        className=" inline-flex items-center md:hidden text-2xl font-bold text-main rounded-lg    "
      >
        <FaBars />
      </button>
      <div className="flex  justify-between items-center w-full">
        <h1 className="md:text-2xl text-lg font-bold text-main">{title}</h1>
        <div className="flex  lg:text-[16px] text-sm gap-7">
          <div className="relative flex items-center">
            <span className="text-sm absolute right-[-12px] top-[-4px]  text-white bg-red-600 rounded-full px-1">
              10
            </span>
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
              <Notification />
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex-col flex">
              <span className="font-bold">Josiel Mark Seroy</span>
              <span className="text-[12px]">Faculty</span>
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

NavFaculty.propTypes = {
  handleBurger: PropTypes.func,
};

export default NavFaculty;
