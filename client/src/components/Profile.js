import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { user } = currentUser || {};
  const { _id, email, organization, role, profilePicture } = user || {};
  const [userContributions, setUserContributions] = useState([]);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserContributions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/contributions/user-contributions",
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching user contributions");
        }

        const data = await response.json();
        setUserContributions(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserContributions();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      console.error("Failed to log out");
    }
  };

  return (
    <div className="min-h-screen bg-[#EDF1D6]">
      <Navbar />
      <div className="container mx-auto mt-20 space-y-10">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-10 text-[#40513B]">
              User Profile
            </h1>
            {profilePicture && (
              <img
                src={`data:${profilePicture.contentType};base64,${profilePicture.data}`}
                alt="Profile"
                className="w-30 h-30 rounded-full object-cover border-4 border-[#609966] mb-6"
              />
            )}
            <button
              onClick={() => setShowLogoutConfirmation(true)}
              className="mt-4 w- px-3 py-2 mb-10 text-white bg-[#609966] rounded-md focus:bg-[#9DC08B] focus:outline-none"
            >
              Log Out
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold">Email</p>
              <p className="text-xl text-[#40513B]">{email}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Role</p>
              <p className="text-xl text-[#40513B]">{role}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Organization</p>
              <p className="text-xl text-[#40513B]">{organization}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold mb-5 text-center text-[#40513B]">
            User Contributions
          </h2>
          {userContributions.map((contribution, index) => (
            <div
              key={index}
              className="my-4 p-4 border border-[#9DC08B] rounded-lg"
            >
              <h3 className="text-xl font-semibold">
                Reporter: {contribution.fullName}
              </h3>
              <p className="mt-2">Description: {contribution.description}</p>
              <h2 className="mt-2">Contact: {contribution.contactNumber}</h2>
              <p className="mt-2">
                Waste Category: {contribution.detectedWaste[0].name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {showLogoutConfirmation && (
        <LogoutConfirmation
          message="Are you sure you want to logout?"
          onLogout={() => {
            handleLogout();
            setShowLogoutConfirmation(false);
          }}
          onCancel={() => setShowLogoutConfirmation(false)}
        />
      )}
    </div>
  );
};

export default Profile;

const LogoutConfirmation = ({ message, onLogout, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">{message}</h2>
        <button
          onClick={onLogout}
          className="bg-[#609966] hover:bg-[#9DC08B] text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
        <button
          onClick={onCancel}
          className="bg-[#609966] hover:bg-[#9DC08B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
