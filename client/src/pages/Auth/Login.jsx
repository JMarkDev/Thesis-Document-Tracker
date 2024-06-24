import PropTypes from "prop-types";
import { useState } from "react";
import api from "../../api/api";
import LoginLoading from "../../components/loader/LoginLoading";
const Login = ({ modal, closeModal, openRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await api.post("/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {modal && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden={!modal}
          className="fixed inset-0 z-[40] px-5 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 font-normal"
        >
          {isLoading && <LoginLoading />}
          <div className="relative w-full max-w-lg  max-h-full">
            <div className="relative text-gray-800 bg-white rounded-xl shadow-lg ">
              <div className="flex items-center justify-center rounded-t">
                <h1 className="md:text-2xl font-bold text-lg p-4">
                  Sign in your account
                </h1>
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

              <div className="p-6 space-y-4 text-sm text-[#221f1f]">
                <form onSubmit={handleLogin}>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="email"
                      className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-100 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <label
                    htmlFor="password"
                    className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a4 4 0 00-4 4v4H5a3 3 0 00-3 3v5a3 3 0 003 3h10a3 3 0 003-3v-5a3 3 0 00-3-3h-1V6a4 4 0 00-4-4zm-3 6V6a3 3 0 016 0v4H7zm3 4a1 1 0 100 2 1 1 0 000-2z" />
                      </svg>
                    </span>
                    <input
                      type="password"
                      id="password"
                      className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-100 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <span className="text-end mt-2  text-blue-600 hover:text-blue-800 cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading ? true : false}
                    className={` ${
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    } w-full  mt-6 p-2 bg-main hover:bg-main_hover text-[#fff] md:text-lg text-sm rounded-lg`}
                  >
                    Login
                  </button>
                  <p className="mt-4">
                    Don&apos;t have an account?{" "}
                    <span
                      onClick={openRegister}
                      className="text-blue-700 font-semibold cursor-pointer"
                    >
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

Login.propTypes = {
  modal: PropTypes.bool,
  closeModal: PropTypes.func,
  openRegister: PropTypes.func,
};

export default Login;
