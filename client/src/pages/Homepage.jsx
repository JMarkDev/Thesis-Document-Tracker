import React from "react";
import QrCode from "../components/QrCode";
import Stepper from "../components/Stepper";
import landingImg from "../assets/images/landing page background (2).jpg";
import NavBar from "../components/navbar/Navbar";
import { IoSearchSharp } from "react-icons/io5";
import chatbotImg from "../assets/images/chatbot_icon.png";
import wmsuLogo from "../assets/images/wmsu logo.png";

const Homepage = () => {
  return (
    <>
      <NavBar />

      <div className="relative w-full h-[calc(100vh-4rem)]">
        <img
          src={landingImg}
          alt=""
          className="absolute w-[100vw] h-[calc(100vh-4rem)] object-cover"
        />
        <div className="absolute md:ml-10 ml-3 top-16">
          <h3 className="md:text-xl text-sm text-main">
            Western Mindanao State University - External Studies Unit
          </h3>
          <div className="text-wmsu md:text-6xl text-4xl font-extrabold mt-4">
            WMSU - ESU
          </div>
          <div className="text-document-tracker font-extrabold  md:text-4xl text-xl mt-4">
            DOCUMENT TRACKER
          </div>
          <div className="flex items-center mt-4 mr-5">
            <input
              type="text"
              placeholder="Enter Tracking Number"
              className="p-2 md:text-lg text-sm w-full rounded-lg relative border-2 outline-none  border-[#8a7665] focus:border-[#c0834e] shadow-lg"
            />
            <button className="absolute mr-5 right-0 text-2xl bg-yellow hover:bg-yellow_hover md:h-12 p-2  rounded-lg ">
              <IoSearchSharp />
            </button>
          </div>
        </div>
        <div className="absolute right-5 bottom-10">
          <div className="p-[2px] bg-[#ffffff] rounded-full h-16 w-16 hover:scale-110 transition-all cursor-pointer ">
            <img src={chatbotImg} alt="icon" className="filter-orange mt-1 " />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
