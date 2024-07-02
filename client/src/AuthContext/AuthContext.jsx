import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import PropTypes from "prop-types";
import LoginLoading from "../components/loader/LoginLoading";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/protected", { withCredentials: true });
        setUserData(response.data?.user);
        const email = response.data?.user.email;
        if (email) {
          const userResponse = await api.get(`/users/get-user?email=${email}`);
          setUserData(userResponse.data);
        }
      } catch (error) {
        setLoading(false);
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div>
        <LoginLoading />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthContext.propTypes = {
  children: PropTypes.node,
};
