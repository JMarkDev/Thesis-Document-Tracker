import React, { useState } from "react";
import Logo from "../../assets/images/document-tracking-3-768113.png";
import { Link } from "react-router-dom";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

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

  return (
    <div className="h-16 w-full flex items-center bg-main">
      <div className="mx-5 flex justify-between w-full">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-12" />
          <h1 className="text-[#ffffff] font-bold md:text-xl text-md">
            Document Tracker
          </h1>
        </div>

        <div className="flex items-center">
          <ul className="flex gap-5 text-white font-bold  lg:text-lg text-sm">
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
