import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import logo from "../assets/Scrapsaver.png";

const Navbar = () => {
  const { currentUser } = useAuth();
  const { user } = currentUser || {};
  const { role, profilePicture } = user || {};

  return (
    <nav className="bg-[#1e251b] text-white shadow-md p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/home" className="hover:text-[#9DC08B]">
              <img src={logo} alt="Application logo" className="w-60" />
            </Link>
          </div>
          <div className="flex space-x-4">
            {role === "contributor" ? (
              <Link
                to="/contributor"
                className="hover:text-[#9DC08B] transition duration-200"
              >
                Contributor Page
              </Link>
            ) : (
              <Link
                to="/user"
                className="hover:text-[#9DC08B] transition duration-200"
              >
                User Page
              </Link>
            )}
            <Link
              to="/profile"
              className="hover:text-[#9DC08B] transition duration-200"
            >
              Profile
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#9DC08B] transition duration-200"
            >
              Contact
            </Link>

            {profilePicture && (
              <img
                src={`data:${profilePicture.contentType};base64,${profilePicture.data}`}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
