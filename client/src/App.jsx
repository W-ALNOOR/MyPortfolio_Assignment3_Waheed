import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";

// here the Main App component wraps the site in react Router

const App = () => {
  return (
    <Router>
      <MainRouter />
    </Router>
  );
};

export default App;
