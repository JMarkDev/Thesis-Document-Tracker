import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../AuthContext/AuthContext";
import LoginLoading from "../components/loader/LoginLoading";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { userData } = useContext(AuthContext);

  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div>
        <LoginLoading />
      </div>
    ); // Show loading state while fetching user
  }

  if (!userData) {
    // if user is not authenticated, redirect to home
    return <Navigate to="/home" replace />;
  }

  // if user is authenticated but not authorzed
  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // if user is authenticated and authorized, render the element
  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  allowedRoles: PropTypes.node.isRequired,
};

export default ProtectedRoute;
