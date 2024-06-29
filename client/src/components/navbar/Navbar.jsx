import { useState } from "react";
import Logo from "../../assets/images/logo with word (1).png";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import { IoMdNotificationsOutline } from "react-icons/io";
import Profile from "../../assets/images/wmsu logo.png";
import Notification from "../Notification";
import NavProfile from "../NavProfile";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [autorize, setAutorize] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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
          <ul className="flex md:gap-5 gap-3 items-center text-white font-bold  lg:text-lg text-sm">
            {autorize ? (
              <>
                <li>
                  <div className="relative">
                    <span className="text-sm absolute right-[-12px] top-0 text-white bg-red-600 rounded-full px-1.5">
                      10
                    </span>
                    <div
                      onClick={handleNotification}
                      onMouseEnter={handleNotification}
                      className=" h-10 w-10 bg-white hover:bg-gray-300 cursor-pointer rounded-full text-gray-700 flex justify-center items-center"
                    >
                      <IoMdNotificationsOutline className="text-3xl " />
                    </div>
                  </div>
                  {showNotification && (
                    <div className="absolute right-5">
                      <Notification />
                    </div>
                  )}
                </li>
                <li>Josiel Mark</li>
                <li>
                  <img
                    src={Profile}
                    onClick={handleProfile}
                    onMouseEnter={handleProfile}
                    alt=""
                    className="h-10 w-10 cursor-pointer"
                  />
                  {showProfile && (
                    <div className="absolute right-5">
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
                    className="px-4 h-10  bg-yellow rounded-lg hover:bg-yellow_hover"
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
