import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUserData, getLoading } from "../../services/authSlice";
import Logo from "../../assets/images/logo with word (1).png";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import { IoMdNotificationsOutline } from "react-icons/io";
import Notification from "../Notification";
import NavProfile from "../NavProfile";
import userIcon from "../../assets/images/user (1).png";
import api from "../../api/axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const loading = useSelector(getLoading);

  const [modal, setModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(userIcon);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (userData && userData.image) {
      setProfilePic(`${api.defaults.baseURL}${userData.image}`);
    }
  }, [userData]);

  const openLogin = () => {
    setModal(true);
    setRegisterModal(false);
  };

  const closeModal = (modal) => {
    setModal(modal);
  };

  const openRegister = () => {
    setRegisterModal(true);
    setModal(false);
  };

  const closeRegister = () => {
    setRegisterModal(false);
  };

  const handleNotification = () => {
    setShowNotification(!showNotification);
    setShowProfile(false);
  };

  const handleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotification(false);
  };

  return (
    <div className="h-16 w-full flex items-center bg-main">
      <div className="mx-5 flex justify-between w-full">
        <div className="flex items-center gap-2 ">
          <img src={Logo} alt="logo" className="h-8" />
        </div>

        <div className="flex items-center">
          <ul className="flex gap-5 items-center text-white lg:text-lg text-sm">
            {loading ? (
              <li>Loading...</li>
            ) : userData ? (
              <>
                <li>
                  <div className="relative">
                    <span className="text-sm absolute right-[-12px] top-0 text-white bg-red-600 rounded-full px-1.5">
                      10
                    </span>
                    <div
                      onClick={handleNotification}
                      onMouseEnter={handleNotification}
                      className="h-10 w-10 text-white cursor-pointer flex justify-center items-center"
                    >
                      <IoMdNotificationsOutline className="text-3xl " />
                    </div>
                  </div>
                  {showNotification && (
                    <div
                      onMouseLeave={handleNotification}
                      className="absolute right-5"
                    >
                      <Notification />
                    </div>
                  )}
                </li>
                <li className="font-bold">{userData.firstName}</li>
                <li>
                  <img
                    src={profilePic}
                    onClick={handleProfile}
                    onMouseEnter={handleProfile}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-100 cursor-pointer"
                  />
                  {showProfile && (
                    <div
                      onMouseLeave={handleProfile}
                      className="absolute right-5 text-sm"
                    >
                      <NavProfile />
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={openLogin}
                    className="px-4 h-10 bg-yellow rounded-lg hover:bg-yellow_hover"
                  >
                    Login
                  </button>
                  {modal && (
                    <Login
                      modal={modal}
                      closeModal={closeModal}
                      openRegister={openRegister}
                    />
                  )}
                </li>
                <li>
                  <button
                    onClick={openRegister}
                    className="px-4 h-10 bg-yellow rounded-lg hover:bg-yellow_hover"
                  >
                    Register
                  </button>
                  {registerModal && (
                    <Register
                      modal={registerModal}
                      closeModal={closeRegister}
                      openLogin={openLogin}
                    />
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
