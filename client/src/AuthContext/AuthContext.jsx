import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import PropTypes from "prop-types";
import LoginLoading from "../components/loader/LoginLoading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/protected", { withCredentials: true });
        console.log(response.data);

        setUser(response.data.user);
      } catch (error) {
        console.log(error);
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
  console.log(user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthContext.propTypes = {
  children: PropTypes.node,
};
