import { Navigate, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RefreshHandler from "./RefreshHandler";
import bg from "./assets/gradient.jpg";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // ------------------------------------------------------------------------
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<PrivateRoute element={<Tasks />} />} />
      </Routes>
    </div>
  );
}

export default App;
