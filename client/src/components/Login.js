import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Replace with the actual API response data
        setPopupMessage("Login successful!");
        setShowPopup(true);
        const role = response.data.role;
        const { token, user } = response.data;
        login({ token, user });
        // Pass the user role as a state parameter to the HomePage component
        navigate("/home", { state: { role } });
      } else {
        setPopupMessage("Login failed!");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setPopupMessage("Login failed!");
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF1D6]">
      <div className="bg-[#40513B] text-white p-10 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <input
          className="bg-[#9DC08B] p-2 w-full mb-4 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-[#9DC08B] p-2 w-full mb-6 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-[#609966] p-2 w-full rounded hover:bg-green-700"
          onClick={handleLogin}
        >
          Login
        </button>
        {showPopup && (
          <Popup
            message={popupMessage}
            onCancel={() => {
              setShowPopup(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Login;

const Popup = ({ message, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-72 md:w-auto">
        <h2 className="text-xl font-bold mb-4">{message}</h2>
        <div className="flex justify-center md:justify-end">
          <button
            onClick={onCancel}
            className="bg-[#609966] hover:bg-[#9DC08B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
