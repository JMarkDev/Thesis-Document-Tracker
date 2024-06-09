import React from "react";
import QrCode from "../components/QrCode";
import Stepper from "../components/Stepper";
import landingImg from "../assets/images/landing page background (2).jpg";
import NavBar from "../components/navbar/Navbar";

const Homepage = () => {
  return (
    <>
      <NavBar />

      <div className="relative">
        <img
          src={landingImg}
          alt=""
          className="absolute w-[100vw] h-[calc(100vh-4rem)]"
        />
        <div className="absolute left-10 top-10">
          <h3 className="md:text-xl text-sm text-main">
            Western Mindanao State University - External Studies Unit
          </h3>
          <h1 className="text-6xl font-bold">WMSU - ESU</h1>
          <h2 className="text-4xl">Document Tracker</h2>
        </div>
      </div>
    </>
  );
};

export default Homepage;
