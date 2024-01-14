import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./components/UserProfile";
import Protected from "./features/auth/Protected";
import "./App.css";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/UserProfile"
            element={
              <Protected>
                <UserProfile />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
