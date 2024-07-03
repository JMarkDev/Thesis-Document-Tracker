import { LuLogOut, LuUser2 } from "react-icons/lu";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const NavProfile = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="  h-26 rounded-lg py-4 relative bg-white text-gray-700 z-50">
      <ul>
        <li className="flex items-center gap-2 px-4 py-2  hover:bg-gray-200 cursor-pointer">
          <span className="text-blue-600 text-lg">
            <LuUser2 />
            logout
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
