import { LuLogOut, LuUser2 } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { logoutUser } from "../services/authSlice";

const NavProfile = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="  h-26 rounded-lg py-4 relative bg-white shadow-lg text-gray-700 z-50">
      <ul>
        <li className="flex items-center gap-2 px-4 py-2  hover:bg-gray-200 cursor-pointer">
          <span className="text-blue-600 text-lg">
            <LuUser2 />
          </span>
          Profile
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
