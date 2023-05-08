import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Contributor from "./components/Contributor";
import User from "./components/User";
import HomePage from "./components/HomePage";
import Startup from "./components/Startup";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Startup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contributor" element={<Contributor />} />
          <Route path="/user" element={<User />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
