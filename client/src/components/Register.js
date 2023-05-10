import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { readAndCompressImage } from "browser-image-resizer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [organization, setOrganization] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // add this state variable
  const [popupMessage, setPopupMessage] = useState(""); // add this state variable
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !role) {
      alert("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("organization", organization);

      if (profilePicture) {
        formData.append("profilePicture", profilePicture, profilePicture.name);
      }

      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setPopupMessage("Registration successful!"); // set the popup message
        setShowPopup(true); // show the popup
        navigate("/login"); // redirect to login page
      } else {
        setPopupMessage(
          `Registration failed: ${response.status}: ${response.data.message}`
        ); // set the popup message
        setShowPopup(true); // show the popup
      }
    } catch (error) {
      console.error("Registration error:", error);
      setPopupMessage("Registration failed!"); // set the popup message
      setShowPopup(true); // show the popup
    }
  };

  const handleProfilePicture = async (e) => {
    const file = e.target.files[0] || e.target.files;
    if (file) {
      try {
        const resizedImage = await readAndCompressImage(file, {
          quality: 0.6,
          maxWidth: 800,
          maxHeight: 800,
        });
        setProfilePicture(resizedImage);
      } catch (err) {
        console.error("Error resizing image:", err);
        alert("Error resizing image");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF1D6]">
      <div className="bg-[#40513B] text-white p-10 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <input
          className="bg-[#9DC08B] p-2 w-full mb-4 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-[#9DC08B] p-2 w-full mb-4 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="bg-[#9DC08B] p-2 w-full mb-4 rounded"
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <label className="block mb-4">
          <span className="text-white mb-2">Profile Picture</span>
          <div className="mt-2 relative bg-[#9DC08B] p-2 w-full rounded">
            <span className="text-white">Choose file...</span>
            <input
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              onChange={handleProfilePicture}
            />
          </div>
        </label>
        <select
          className="bg-[#9DC08B] p-2 w-full mb-6 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select your role</option>
          <option value="user">User</option>
          <option value="contributor">Contributor</option>
        </select>
        <button
          className="bg-[#609966] p-2 w-full rounded hover:bg-green-700"
          onClick={handleRegister}
        >
          Register
        </button>
        {showPopup && (
          <Popup
            message={popupMessage}
            onReportAgain={() => {
              setShowPopup(false);
            }}
            onCancel={() => {
              setShowPopup(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Register;

const Popup = ({ message, onReportAgain, onCancel }) => {
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
