import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#609966] text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl mb-2">Food Waste Statistics</h2>
        <ul className="flex justify-center space-x-4 mb-4">
          <li>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:underline">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
        <p>
          &copy; {new Date().getFullYear()} SCRAPSAVER. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
