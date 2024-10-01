import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserRole } from "../../utils/userRoles";
import { useFormat } from "../../hooks/useFormatDate";
import Profile from "../../components/profile_image/Profile";
import Back from "../../components/buttons/Back";
import { getUserData } from "../../services/authSlice";
import api from "../../api/axios";
import { useToast } from "../../hooks/useToast";
import Loading from "../../components/loader/loginloader/LoginLoading";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserProfile = () => {
  const navigate = useNavigate();
  const { fullDateFormat } = useFormat();
  const [newEmail, setNewEmail] = useState("");
  const userData = useSelector(getUserData);
  const toast = useToast();
  const [otp, setOTP] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    image: "",
    firstName: "",
    middleInitial: "",
    lastName: "",
    birthDate: "",
    email: "",
    role: "",
    contactNumber: "",
    designation: "",
    esuCampus: "",
    office: "",
  });
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (userData) {
      setData(userData);
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    try {
      const response = await api.post(`/users/update-email`, {
        email: newEmail,
      });
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };

  const handleChangeUsername = async (e) => {
    const id = userData?.id;
    e.preventDefault();
    const values = {
      email: newEmail,
      otp: otp,
    };

    setLoader(true);

    try {
      const response = await api.put(
        `/users/update-email/verify-otp/${id}`,
        values
      );

      if (response.data.status === "success") {
        toast.success("Email updated successfully. Please login again.");
        Cookies.remove("accessToken");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }

      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const submitDisable = !(newEmail && otp);

  return (
    <>
      <div className="flex items-center gap-5">
        {" "}
        <Back />
        <h1 className="font-bold md:text-2xl text-lg text-gray-900">
          {" "}
          User Profile
        </h1>
      </div>

      <div className="flex text-sm flex-col lg:flex-row w-full gap-5 mt-5">
        <div className="flex flex-col gap-3 justify-center items-center p-4 bg-white border border-gray-300 shadow-lg min-w-[250px] h-fit rounded-lg">
          {/* <img
          src={`${
            data.image ? `${axios.defaults.baseURL}${data.image}` : userIcon
          }`}
          alt=""
          className="h-32 w-32 rounded-full"
        /> */}
          {loader && <Loading />}
          <Profile image={data.image} />
          <h1 className="font-bold text-lg text-gray-800 text-center">{`${data.firstName} ${data.middleInitial}. ${data.lastName}`}</h1>
          <span className="text-gray-700 md:text-md text-sm">
            {getUserRole(data.role)}
          </span>
        </div>
        <div className="flex flex-col w-full border border-gray-300 shadow-lg rounded-lg">
          <ul className="flex gap-2 border-b-2 border-gray-300 w-full h-12 items-center md:p-4 ">
            <li
              className={`cursor-pointer  text-sm text-nowrap px-2 py-1 rounded-md ${
                activeTab === "profile"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile info
            </li>
            <li
              className={`cursor-pointer text-sm text-nowrap px-2 py-1 rounded-md ${
                activeTab === "update"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("update")}
            >
              Change email
            </li>
            <li
              className={`cursor-pointer  text-sm text-nowrap px-2 py-1 rounded-md  ${
                activeTab === "password"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("password")}
            >
              Change password
            </li>
          </ul>
          <div className="py-6  md:px-4 text-gray-600">
            {activeTab === "profile" && (
              <div className="flex flex-col gap-3">
                {data.office?.officeName && (
                  <div className="flex items-center gap-5">
                    <label
                      htmlFor=""
                      className="text-md font-semibold text-gray-700 w-1/4" // Adjust this width as needed
                    >
                      Office name
                    </label>
                    <input
                      className="rounded-lg border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                      type="text"
                      disabled={true}
                      value={data.office?.officeName || ""}
                    />
                  </div>
                )}

                <div className="flex items-center gap-5">
                  <label
                    htmlFor=""
                    className="text-md font-semibold text-gray-700 w-1/4"
                  >
                    Full name
                  </label>
                  <input
                    className="rounded-lg border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    disabled={true}
                    value={`${data?.firstName || ""} ${
                      data?.middleInitial || ""
                    }. ${data?.lastName || ""}`}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor=""
                    className="text-md font-semibold text-gray-700 w-1/4"
                  >
                    Email
                  </label>
                  <input
                    className="rounded-lg border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    disabled={true}
                    value={data?.email || ""}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor=""
                    className="text-md font-semibold text-gray-700 w-1/4"
                  >
                    Date of birth
                  </label>
                  <input
                    className="rounded-lg border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    disabled={true}
                    defaultValue={fullDateFormat(data?.birthDate || "")}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor=""
                    className="text-md font-semibold text-gray-700 w-1/4"
                  >
                    Contact number
                  </label>
                  <input
                    className="rounded-lg border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    disabled={true}
                    value={data?.contactNumber || ""}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor=""
                    className="text-md font-semibold text-gray-700 w-1/4"
                  >
                    Designation
                  </label>
                  <input
                    className="rounded-lg border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    disabled={true}
                    value={data?.designation || ""}
                  />
                </div>
                {data?.esuCampus &&
                  (console.log(data?.esuCampus),
                  (
                    <div className="flex items-center gap-5">
                      <label
                        htmlFor=""
                        className="text-md font-semibold text-gray-700 w-1/4"
                      >
                        Esu Campus
                      </label>
                      <input
                        className="rounded-lg border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                        type="text"
                        disabled={true}
                        value={data?.esuCampus || ""}
                      />
                    </div>
                  ))}
              </div>
            )}
            {activeTab === "update" && (
              <div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-5">
                    <label
                      htmlFor=""
                      className="text-md font-semibold text-gray-700 w-1/4" // Adjust this width as needed
                    >
                      New email
                    </label>
                    <input
                      onChange={(e) => setNewEmail(e.target.value)}
                      className={`rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm`}
                      type="text"
                      placeholder="Enter new email"
                    />
                  </div>

                  <div className="flex items-center relative gap-5">
                    <label
                      htmlFor=""
                      className="text-md font-semibold text-gray-700 w-1/4" // Adjust this width as needed
                    >
                      OTP
                    </label>
                    <input
                      onChange={(e) => setOTP(e.target.value)}
                      className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                      type="text"
                      placeholder="Enter 4 digits OTP"
                    />
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="text-[#1A9CE7] text-sm absolute right-5"
                    >
                      SEND
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleChangeUsername}
                    disabled={submitDisable ? true : false}
                    className={`${
                      submitDisable ? "cursor-not-allowed" : "cursor-pointer"
                    } w-fit mt-4 bg-blue-500 hover:bg-blue-700 text-white text-nowrap px-4 rounded-lg p-2`}
                  >
                    Verify code
                  </button>
                </div>
              </div>
            )}
            {activeTab === "password" && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-5 justify-between">
                  <label
                    htmlFor=""
                    className="text-md w-1/4 font-semibold text-gray-700"
                  >
                    Old password
                  </label>
                  <input
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="password"
                    placeholder="Enter old password"
                  />
                </div>
                <div className="flex items-center gap-5 justify-between">
                  <label
                    htmlFor=""
                    className="text-md w-1/4 font-semibold text-gray-700"
                  >
                    New password
                  </label>
                  <input
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="flex items-center gap-5 justify-between">
                  <label
                    htmlFor=""
                    className="text-md w-1/4  font-semibold text-gray-700"
                  >
                    Confirm password
                  </label>
                  <input
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    placeholder="Confirm password"
                  />
                </div>

                <button className="w-1/4 mt-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg p-2">
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
