import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user not logged in, redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If logged in, render the protected page
  return children;
};

export default ProtectedRoute;