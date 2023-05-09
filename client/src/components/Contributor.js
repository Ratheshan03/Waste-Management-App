import React, { useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../AuthContext";
import axios from "axios";
import SelectLocationGoogleMap from "./SelectLocationGoogleMap";
import { useNavigate } from "react-router-dom";

const Contributor = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [media, setMedia] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const resetForm = () => {
    setFullName("");
    setDescription("");
    setLocation("");
    setMedia(null);
    setContactNumber("");
    setSelectedLocation(null);
    setShowMap(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("description", description);
    formData.append("location", JSON.stringify(selectedLocation));
    formData.append("media", media);
    formData.append("contactNumber", contactNumber);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/contributions/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Error submitting contribution");
      }

      setShowPopup(true);
      setPopupMessage("Contribution submitted successfully");
    } catch (error) {
      console.error(error);
      setPopupMessage(
        "Contribution failed, uploaded photo doesn't consist of any food wastes"
      );
    }
  };

  return (
    <div className="bg-[#EDF1D6] min-h-screen">
      <Navbar />
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#40513B]">
          Submit a Waste Management Contribution
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-[#40513B] text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#40513B] leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-[#40513B] text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#40513B] leading-tight focus:outline-none focus:shadow-outline h-32"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-[#40513B] text-sm font-bold mb-2"
            >
              Location
            </label>
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="bg-[#609966] hover:bg-[#9DC08B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {selectedLocation ? "Change location" : "Select location"}
            </button>
            {showMap && (
              <div className="mt-4">
                <SelectLocationGoogleMap
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="media"
              className="block text-[#40513B] text-sm font-bold mb-2"
            >
              Image/Video of the Waste
            </label>
            <input
              type="file"
              id="media"
              onChange={(e) => setMedia(e.target.files[0])}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => document.getElementById("media").click()}
              className="bg-[#609966] hover:bg-[#9DC08B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Choose File
            </button>
          </div>

          <div className="mb-4">
            <label
              htmlFor="contactNumber"
              className="block text-[#40513B] text-sm font-bold mb-2"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-[#40513B] leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#609966] hover:bg-[#9DC08B] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {popupMessage && (
        <Popup
          message={popupMessage}
          onReportAgain={() => {
            resetForm();
            setPopupMessage("");
          }}
          onCancel={() => {
            setPopupMessage("");
            navigate("/profile");
          }}
        />
      )}
    </div>
  );
};

export default Contributor;

const Popup = ({ message, onReportAgain, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">{message}</h2>
        <button
          onClick={onReportAgain}
          className="bg-[#609966] hover:bg-[#9DC08B] text-white font-bold py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline"
        >
          Report Again
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
