import React, { useContext } from "react"; 
import { Navigate } from "react-router-dom"; 
import { AuthContext } from "../context/AuthContext.jsx"; 

const PublicRoute = ({ children }) => { 
    const { user } = useContext(AuthContext); 
    // If user is logged in → redirect to dashboard 
    if (user) { 
        return <Navigate to="/dashboard" replace />; 
    } 
    // Otherwise → show the requested public page 
    return children; 
}; 
export default PublicRoute;