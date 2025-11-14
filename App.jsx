import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// NEW: Users CRUD Page
import UsersPage from "./pages/UsersPage";

function App() {
  const jwt = localStorage.getItem("jwt");

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to={jwt ? "/dashboard" : "/signup"} />} />

        {/* Auth Pages */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={jwt ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* 🔥 NEW: Users CRUD Page */}
        <Route
          path="/users"
          element={jwt ? <UsersPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
