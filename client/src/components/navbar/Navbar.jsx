import React from "react";
import Logo from "../../assets/images/document-tracking-3-768113.png";
import { Link } from "react-router-dom";

const Navbar = () => {
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
                to=""
                className="px-4 py-[8px] bg-yellow-600 rounded-lg hover:bg-yellow-700"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="px-4 py-[8px] bg-yellow-600 rounded-lg hover:bg-yellow-700"
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
