import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserById, getFetchedUserById } from "../../services/usersSlice";
import { useEffect } from "react";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getFetchedUserById);
  console.log(user);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [id, dispatch]);
  return <div>UserProfile</div>;
};

export default UserProfile;
