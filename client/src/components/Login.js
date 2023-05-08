import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        const role = response.data.role;
        const { token, user } = response.data;
        login({ token, user });
        // Pass the user role as a state parameter to the HomePage component
        navigate("/home", { state: { role } });
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed!");
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
      </div>
    </div>
  );
};

export default Login;
