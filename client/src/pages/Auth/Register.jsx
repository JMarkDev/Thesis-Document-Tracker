import wmsuCampus from "../../utils/Campus";
import Profile from "../../components/profile_image/Profile";
import PropTypes from "prop-types";
import api from "../../api/api";
import { useForm } from "react-hook-form";
import LoginLoading from "../../components/loader/LoginLoading";
import VerifyOTP from "../Verification/VerifyOTP";
import { useState } from "react";

const Register = ({ modal, closeModal, openLogin }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setEmail(data.email);
    data.role = "faculty";
    console.log(data);
    setLoading(true);

    try {
      const response = await api.post("/auth/register", data);
      if (response.data.status === "success") {
        setShowOTP(true);
        setLoading(false);
      }
      console.log(data);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const closeOTP = () => {
    setShowOTP(false);
  };

  return (
    <>
      {showOTP ? (
        <VerifyOTP showOTP={showOTP} closeOTP={closeOTP} email={email} />
      ) : (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden={!modal}
          className="fixed overflow-y-auto overflow-hidden  inset-0 z-50 px-5 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-40 font-normal"
        >
          {loading && <LoginLoading />}
          <div className="relative w-full max-w-2xl max-h-full py-5 ">
            <div className="relative text-gray-800 bg-white rounded-xl shadow-lg">
              <div className="flex items-center justify-center">
                <h1 className="md:text-2xl font-bold text-lg p-4">
                  Sign up your account
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

              <div className="p-6  space-y-4 text-sm text-[#221f1f]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-center items-center">
                    <Profile setValue={setValue} />
                  </div>

                  <div className="flex justify-between md:flex-row flex-col gap-4 mt-4">
                    <div className="relative">
                      <input
                        {...register("firstName")}
                        type="text"
                        id="first_name"
                        className="block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-red-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="first_name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        First Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        {...register("lastName")}
                        type="text"
                        id="last_name"
                        className="block  pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="last_name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Last Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        {...register("middleInitial")}
                        type="text"
                        id="middle_initial"
                        className="block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="middle_initial"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Middle Initial
                      </label>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <input
                      {...register("email")}
                      type="text"
                      id="email"
                      className="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="flex justify-between md:flex-row flex-col gap-5">
                    <div className="relative mt-4 md:w-1/3">
                      <input
                        {...register("birthDate")}
                        type="date"
                        id="birth_date"
                        className="block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="birth_date"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Birth Date
                      </label>
                    </div>

                    <div className="relative mt-4 flex flex-grow">
                      <input
                        {...register("contactNumber")}
                        type="number"
                        id="contact_number"
                        className="block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="contact_number"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Contact Number
                      </label>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <input
                      {...register("designation")}
                      type="text"
                      id="designation"
                      className="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="designation"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Designation
                    </label>
                  </div>
                  <div className="relative mt-4">
                    <select
                      {...register("esuCampus")}
                      type="text"
                      id="esu_campus"
                      className="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    >
                      <option value="">Select ESU Campus</option>
                      {wmsuCampus.map((campus, index) => (
                        <option
                          key={index}
                          value={campus}
                          className="md:text-sm text-[12px]"
                        >
                          {campus}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="esu_campus"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      ESU Campus
                    </label>
                  </div>
                  <div className="relative mt-4">
                    <input
                      {...register("password")}
                      type="password"
                      id="password"
                      className="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative mt-4">
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      id="confirm_password"
                      className="block px-2.5 pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="confirm_password"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 p-2 bg-main hover:bg-main_hover text-[#fff] md:text-lg text-sm rounded-lg"
                  >
                    Register
                  </button>
                  <p className="mt-4 text-sm">
                    Already have an account?{" "}
                    <span
                      onClick={openLogin}
                      className="text-blue-700 font-semibold cursor-pointer"
                    >
                      Login
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {modal && ( */}

      {/* )} */}
    </>
  );
};

Register.propTypes = {
  modal: PropTypes.bool,
  closeModal: PropTypes.func,
  openLogin: PropTypes.func,
};

export default Register;
