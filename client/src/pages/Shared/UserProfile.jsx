import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserById, getFetchedUserById } from "../../services/usersSlice";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import userIcon from "../../assets/images/user (1).png";
import { getUserRole } from "../../utils/userRoles";
import { useFormat } from "../../hooks/useFormatDate";
import Profile from "../../components/profile_image/Profile";

const UserProfile = () => {
  const { fullDateFormat } = useFormat();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getFetchedUserById);
  const [data, setData] = useState({
    // image: "",
    // firstName: "",
    // middleInitial: "",
    // lastName: "",
    // birthDate: "",
    // email: "",
    // role: "",
    // contactNumber: "",
    // designation: "",
    // esuCampus: "",
    // office: "",
  });
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [id, dispatch]);
  console.log(data);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-5">
      <div className="flex flex-col gap-3 justify-center items-center p-4 bg-white border border-gray-300 shadow-lg min-w-[250px] h-fit rounded-lg">
        {/* <img
          src={`${
            data.image ? `${axios.defaults.baseURL}${data.image}` : userIcon
          }`}
          alt=""
          className="h-32 w-32 rounded-full"
        /> */}
        <Profile image={data.image} />
        <h1 className="font-bold text-lg text-gray-800 text-center">{`${data.firstName} ${data.middleInitial}. ${data.lastName}`}</h1>
        <span className="text-gray-700 md:text-md text-sm">
          {getUserRole(data.role)}
        </span>
      </div>
      <div className="flex flex-col w-full border border-gray-300 shadow-lg rounded-lg">
        <ul className="flex gap-6 border-b-2 border-gray-300 w-full h-12 items-center p-6">
          <li
            className={`cursor-pointer px-2 py-1 rounded-md ${
              activeTab === "profile"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile info
          </li>
          <li
            className={`cursor-pointer px-2 py-1 rounded-md ${
              activeTab === "update"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("update")}
          >
            Update info
          </li>
          <li
            className={`cursor-pointer px-2 py-1 rounded-md ${
              activeTab === "password"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Change password
          </li>
        </ul>
        <div className="py-6 px-4 text-gray-600">
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
              {data.esuCampus && (
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
              )}
            </div>
          )}
          {activeTab === "update" && (
            <div>
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
                      className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                      type="text"
                      defaultValue={data.office?.officeName || ""}
                    />
                  </div>
                )}

                <div className="flex items-center gap-5">
                  <label
                    htmlFor=""
                    className="text-md font-semibold text-gray-700 w-1/4"
                  >
                    First name
                  </label>
                  <input
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    defaultValue={`${data?.firstName || ""}`}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor=""
                    className="text-md font-semibold text-gray-700 w-1/4"
                  >
                    Last name
                  </label>
                  <input
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    defaultValue={`${data?.lastName || ""}`}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label
                    htmlFor=""
                    className="text-md font-semibold text-gray-700 w-1/4"
                  >
                    Middle initial
                  </label>
                  <input
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    defaultValue={`${data?.middleInitial || ""}`}
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
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    defaultValue={data?.email || ""}
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
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="date"
                    defaultValue={data?.birthDate || ""}
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
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    defaultValue={data?.contactNumber || ""}
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
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-100 border-2 bg-gray-50 border-gray-200 flex-grow p-2 text-sm"
                    type="text"
                    defaultValue={data?.designation || ""}
                  />
                </div>
                {data.esuCampus && (
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
                      defaultValue={data?.esuCampus || ""}
                    />
                  </div>
                )}
                <button className="w-1/4 mt-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg p-2">
                  Update
                </button>
              </div>
            </div>
          )}
          {activeTab === "password" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-5 justify-between">
                <label
                  htmlFor=""
                  className="text-md w-1/4 text-nowrap font-semibold text-gray-700"
                >
                  Old password
                </label>
                <input
                  className="rounded-lg focus:ring-blue-500 focus:border-blue-100 flex flex-grow border-2 bg-gray-50 border-gray-200 w-full p-2 text-sm"
                  type="text"
                  placeholder="Enter old password"
                />
              </div>
              <div className="flex items-center gap-5 justify-between">
                <label
                  htmlFor=""
                  className="text-md w-1/4 text-nowrap font-semibold text-gray-700"
                >
                  New password
                </label>
                <input
                  className="rounded-lg focus:ring-blue-500 focus:border-blue-100 flex flex-grow border-2 bg-gray-50 border-gray-200 w-full p-2 text-sm"
                  type="text"
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex items-center gap-5 justify-between">
                <label
                  htmlFor=""
                  className="text-md w-1/4 text-nowrap font-semibold text-gray-700"
                >
                  Confirm password
                </label>
                <input
                  className="rounded-lg focus:ring-blue-500 focus:border-blue-100 flex flex-grow border-2 bg-gray-50 border-gray-200 w-full p-2 text-sm"
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
  );
};

export default UserProfile;
