import { LuLogOut, LuUser2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../services/authSlice";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../services/authSlice";
import rolesList from "../constants/rolesList";

const NavProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);

  const handleProfile = () => {
    let path = "/";

    switch (userData.role) {
      case rolesList.faculty:
        path = "/faculty-profile";
        break;
      case rolesList.campusAdmin:
        path = "/campus-admin-profile";
        break;
      case rolesList.registrar:
        path = "/registrar-profile";
        break;
      case rolesList.admin:
        path = "/admin-profile";
        break;
      case rolesList.office:
        path = "/office-profile";
        break;
      default:
        break;
    }

    navigate(path);
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="  h-26 rounded-lg py-4 relative bg-white shadow-lg text-gray-700 z-50">
      <ul>
        <li
          onClick={handleProfile}
          className="flex w-full items-center gap-2 px-4 py-2  hover:bg-gray-200 cursor-pointer"
        >
          {/* <Link to={"/user-profile"} className="flex gap-2"> */}
          <span className="text-blue-600 text-lg">
            <LuUser2 />
          </span>
          Profile
          {/* </Link> */}
        </li>
        <li
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2  hover:bg-gray-200 cursor-pointer"
        >
          <span className="text-red-600 text-lg">
            <LuLogOut />
          </span>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default NavProfile;
