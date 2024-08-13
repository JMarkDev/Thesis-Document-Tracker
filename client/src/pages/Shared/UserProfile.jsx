import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserById, getFetchedUserById } from "../../services/usersSlice";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import userIcon from "../../assets/images/user.png";
const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getFetchedUserById);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [id, dispatch]);
  return (
    <div className="flex w-full gap-5">
      <div className="flex flex-col gap-3 justify-center items-center p-6 bg-gray-200 min-w-[150px] rounded-md">
        <img
          src={`${
            data.image ? `${axios.defaults.baseURL}${data.image}` : userIcon
          }`}
          alt=""
          className="h-32 w-32 rounded-full"
        />
        <h1 className="font-bold text-lg text-center">Hi, {data.firstName}</h1>
        <span className="text-gray-700 md:text-md text-sm">{data.email}</span>
      </div>
      <div className="flex w-auto">
        <div>Name</div>
      </div>
    </div>
  );
};

export default UserProfile;
