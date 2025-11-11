import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Home from "./components/Home";
import About from "./about";
import Contact from "./contact";
import Education from './education';
import Project from './project';
import Services from './services';
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminPanel from "./components/AdminPanel";
import AdminRoute from "./components/AdminRoute";



const Dashboard = () => ( 
  <div style={{ textAlign: "center", marginTop: "80px" }}> 
    <h2>Welcome to your Dashboard!</h2> 
    <p>You are logged in </p> 
  </div> 
);

// Defines all the navigation routes

const MainRouter = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/education" element={<Education />} />
        <Route exact path="/projects" element={<Project />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/contact" element={<Contact />} />

        {/* protected */}
        <Route 
         path= "/dashboard" 
         element={
            <ProtectedRoute>
             <Dashboard/>
            </ProtectedRoute>
          }
       />

       {/* 🔓 Public routes (only for guests) */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default MainRouter;
