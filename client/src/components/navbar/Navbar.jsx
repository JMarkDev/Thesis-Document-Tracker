import React, { useState } from "react";
import Logo from "../../assets/images/document-tracking-3-768113.png";
import { Link } from "react-router-dom";
import Login from "../../pages/Auth/Login";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const closeModal = (modal) => {
    setModal(modal);
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
              <Link
                onClick={() => setModal(!modal)}
                className="px-4 py-[8px] bg-yellow rounded-lg hover:bg-yellow_hover"
              >
                Login
              </Link>
              {modal && <Login modal={modal} closeModal={closeModal} />}
            </li>
            <li>
              <Link
                to=""
                className="px-4 py-[8px]  bg-yellow rounded-lg hover:bg-yellow_hover"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
