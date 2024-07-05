import wmsuCampus from "../../utils/Campus";
import Profile from "../../components/profile_image/Profile";
import PropTypes from "prop-types";
import api from "../../api/api";
import { useForm } from "react-hook-form";
import LoginLoading from "../../components/loader/LoginLoading";
import VerifyOTP from "../Verification/VerifyOTP";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";

import { FiEyeOff, FiEye } from "react-icons/fi";

const Register = ({ modal, closeModal, openLogin }) => {
  const [showPass, setShowPass] = useState(false);

  const toast = useToast();
  const { register, handleSubmit, setValue } = useForm();
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Error state for backend validation messages
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [middleInitialError, setMiddleInitialError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [contactError, setContactError] = useState("");
  const [designationError, setDesignationError] = useState("");
  const [esuError, setEsuError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmpasswordError] = useState("");

  const onSubmit = async (data) => {
    setEmail(data.email);
    data.role = "faculty";
    data.officeName = null;
    setLoading(true);

    setFirstnameError("");
    setLastnameError("");
    setMiddleInitialError("");
    setEmailError("");
    setBirthDateError("");
    setContactError("");
    setDesignationError("");
    setEsuError("");
    setPasswordError("");
    setConfirmpasswordError("");

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("middleInitial", data.middleInitial);
      formData.append("email", data.email);
      formData.append("birthDate", data.birthDate);
      formData.append("contactNumber", data.contactNumber);
      formData.append("designation", data.designation);
      formData.append("esuCampus", data.esuCampus);
      formData.append("officeName", data.officeName);
      formData.append("role", data.role);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("image", data.image); // Append the file

      const response = await api.post("/auth/register", formData);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setShowOTP(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (data.esuCampus === "") {
        setEsuError("ESU Campus is required");
      }
      if (error.response.data.errors) {
        error.response.data.errors.forEach((error) => {
          switch (error.path) {
            case "firstName":
              setFirstnameError(error.msg);
              break;
            case "lastName":
              setLastnameError(error.msg);
              break;
            case "middleInitial":
              setMiddleInitialError(error.msg);
              break;
            case "email":
              setEmailError(error.msg);
              break;
            case "birthDate":
              setBirthDateError(error.msg);
              break;
            case "contactNumber":
              setContactError(error.msg);
              break;
            case "designation":
              setDesignationError(error.msg);
              break;
            case "password":
              setPasswordError(error.msg);
              break;
            case "confirmPassword":
              setConfirmpasswordError(error.msg);
              break;
            default:
              console.log(error);
          }
        });
      }
      toast.error(error.response.data.message);
    }
  };

  const closeOTP = () => {
    setShowOTP(false);
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      {showOTP ? (
        <VerifyOTP
          showOTP={showOTP}
          closeOTP={closeOTP}
          closeModal={closeModal}
          email={email}
        />
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
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="POST"
                  encType="multipart/form-data"
                >
                  <div className="flex justify-center items-center">
                    <Profile setValue={setValue} />
                  </div>

                  <div className="flex justify-between md:flex-row flex-col gap-4 mt-4">
                    <div className="flex flex-col">
                      <div className="relative">
                        <input
                          {...register("firstName")}
                          type="text"
                          id="first_name"
                          className={`${
                            firstnameError
                              ? "border-red-500 "
                              : "border-gray-300 "
                          } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          placeholder=" "
                        />
                        <label
                          htmlFor="first_name"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          First Name
                        </label>
                      </div>
                      {firstnameError && (
                        <span className="text-red-500">{firstnameError}</span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="relative">
                        <input
                          {...register("lastName")}
                          type="text"
                          id="last_name"
                          className={`${
                            lastnameError
                              ? "border-red-500 "
                              : "border-gray-300 "
                          } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          placeholder=" "
                        />
                        <label
                          htmlFor="last_name"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          Last Name
                        </label>
                      </div>
                      {lastnameError && (
                        <span className="text-red-500">{lastnameError}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="relative">
                        <input
                          {...register("middleInitial")}
                          type="text"
                          id="middle_initial"
                          className={`${
                            middleInitialError
                              ? "border-red-500 "
                              : "border-gray-300 "
                          } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          placeholder=" "
                        />
                        <label
                          htmlFor="middle_initial"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          Middle Initial
                        </label>
                      </div>
                      {middleInitialError && (
                        <span className="text-red-500">
                          {middleInitialError}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative mt-4">
                      <input
                        {...register("email")}
                        type="text"
                        id="email"
                        className={`${
                          emailError ? "border-red-500 " : "border-gray-300 "
                        } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Email Address
                      </label>
                    </div>
                    {emailError && (
                      <span className="text-red-500">{emailError}</span>
                    )}
                  </div>
                  <div className="flex justify-between md:flex-row flex-col gap-5">
                    <div className="flex flex-col mt-4 md:w-1/3">
                      <div className="relative ">
                        <input
                          {...register("birthDate")}
                          type="date"
                          id="birth_date"
                          className={`${
                            birthDateError
                              ? "border-red-500 "
                              : "border-gray-300 "
                          } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          placeholder=" "
                        />
                        <label
                          htmlFor="birth_date"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          Birth Date
                        </label>
                      </div>
                      {birthDateError && (
                        <span className="text-red-500">{birthDateError}</span>
                      )}
                    </div>

                    <div className="flex flex-col flex-grow md:mt-4 ">
                      <div className="relative ">
                        <input
                          {...register("contactNumber")}
                          type="number"
                          id="contact_number"
                          className={`${
                            contactError
                              ? "border-red-500 "
                              : "border-gray-300 "
                          } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                          placeholder=" "
                        />
                        <label
                          htmlFor="contact_number"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          Contact Number
                        </label>
                      </div>
                      {contactError && (
                        <span className="text-red-500">{contactError}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative mt-4">
                      <input
                        {...register("designation")}
                        type="text"
                        id="designation"
                        className={`${
                          designationError
                            ? "border-red-500 "
                            : "border-gray-300 "
                        } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                      />
                      <label
                        htmlFor="designation"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Designation
                      </label>
                    </div>
                    {designationError && (
                      <span className="text-red-500">{designationError}</span>
                    )}
                  </div>
                  <div className="flex flex-col mt-4">
                    <div className="relative ">
                      <select
                        {...register("esuCampus")}
                        type="text"
                        id="esu_campus"
                        className={`${
                          esuError ? "border-red-500 " : "border-gray-300 "
                        } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
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
                    {esuError && (
                      <span className="text-red-500">{esuError}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="relative mt-4">
                      <input
                        {...register("password")}
                        // type="text"
                        type={showPass ? "text" : "password"}
                        id="password"
                        className={`${
                          passwordError ? "border-red-500 " : "border-gray-300 "
                        } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                      />
                      <label
                        htmlFor="password"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Password
                      </label>
                      <span
                        onClick={handleShowPass}
                        className="absolute right-0 top-0 m-4 text-lg text-gray-700"
                      >
                        {showPass ? <FiEye /> : <FiEyeOff />}
                      </span>
                    </div>
                    {passwordError && (
                      <span className="text-red-500">{passwordError}</span>
                    )}
                  </div>
                  <div className="flex flex-col mt-4">
                    <div className="relative">
                      <input
                        {...register("confirmPassword")}
                        type={showPass ? "text" : "password"}
                        id="confirm_password"
                        className={`${
                          confirmPasswordError
                            ? "border-red-500 "
                            : "border-gray-300 "
                        } block pb-2 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                      />
                      <label
                        htmlFor="confirm_password"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Confirm Password
                      </label>
                      <span
                        onClick={handleShowPass}
                        className="absolute right-0 top-0 m-4 text-lg text-gray-700"
                      >
                        {showPass ? <FiEye /> : <FiEyeOff />}
                      </span>
                    </div>
                    {confirmPasswordError && (
                      <span className="text-red-500">
                        {confirmPasswordError}
                      </span>
                    )}
                  </div>
                  <button
                    disabled={loading ? true : false}
                    type="submit"
                    className={`${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    } w-full  mt-6 p-2 bg-main hover:bg-main_hover text-[#fff] md:text-lg text-sm rounded-lg`}
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
