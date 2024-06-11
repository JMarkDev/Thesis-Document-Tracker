import React, { useState } from "react";

const Login = ({ modal, closeModal }) => {
  return (
    <>
      {modal && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden={!modal}
          className="fixed inset-0 z-50 px-5 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 font-normal"
        >
          <div className="relative w-full max-w-lg  max-h-full">
            <div className="relative text-gray-800 bg-white rounded-lg shadow ">
              <div className="flex items-center justify-center rounded-t">
                <h1 className="md:text-2xl font-bold text-lg p-2">Sign In</h1>
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => closeModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4  text-[#221f1f]">
                <form action="">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-600 ">
                      Email Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter email address"
                      className="rounded-lg  text-sm border border-gray-400 focus:border-blue-100 mt-2"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label htmlFor="email" className="text-gray-600 ">
                      Password
                    </label>
                    <input
                      type="text"
                      placeholder="Enter password"
                      className="rounded-lg  text-sm border border-gray-400 focus:border-blue-100 mt-2"
                    />
                    <span className="text-end mt-2 md:text-lg  text-blue-600 hover:text-blue-800 cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 p-2 bg-main text-[#fff] md:text-lg rounded-lg"
                  >
                    Login
                  </button>
                  <p className="mt-4 md:text-lg">
                    Don't have an account?{" "}
                    <span className="text-blue-700 font-semibold">
                      Register
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
