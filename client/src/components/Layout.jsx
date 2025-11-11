// here the Navbar, logo and the links 

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const { user, logout } = useContext(AuthContext);


  return (
    <nav className="navbar">
      {/* Logo section */}
        <div className="logo">
          <img src="/logo.PNG" alt="Logo" className="logo-img" />
        </div>

        {/* Navigation links */}
           <ul className="nav-links">
           <li><Link to="/">Home</Link></li>
           <li><Link to="/about">About</Link></li>
           <li><Link to="/projects">Projects</Link></li>
           <li><Link to="/education">Education</Link></li>
           <li><Link to="/services">Services</Link></li>
           <li><Link to="/contact">Contact</Link></li>

          {user && user.role === "admin" && (
            <li>
              <Link to="/admin">Admin Panel</Link>
              </li>
          )}


           {/* Auth Links */}
          {user ? (
            <>
              <li style={{ marginLeft: "15px", color: "white" }}>
                 Hi, {user.name}
               </li>
               <li>
                 <button
                   onClick={logout}
                   style={{
                   marginLeft: "10px",
                   backgroundColor: "red",
                   color: "white",
                   border: "none",
                   borderRadius: "5px",
                   padding: "5px 10px",
                   cursor: "pointer",
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
       </ul>
    </nav>
);
};

export default Layout;