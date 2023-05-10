import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../AuthContext";

const ContributionCard = ({ contribution, userId }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);

  useEffect(() => {
    if (saveSuccessful) {
      const timer = setTimeout(() => {
        setSaveSuccessful(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [saveSuccessful]);

  const handleClick = async () => {
    setIsSaving(true);

    try {
      const response = await fetch("http://localhost:3001/api/auth/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          contributionId: contribution._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Error saving contribution");
      }

      const data = await response.json();
      setSaveSuccessful(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border-2 border-[#9DC08B] rounded-lg p-6 my-6 bg-white shadow-lg relative lg:max-w-xl mx-auto">
      {saveSuccessful && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white p-4 rounded-lg">
            Contribution saved successfully
          </div>
        </div>
      )}
      <h3 className="text-xl font-semibold text-[#40513B] mb-2">
        Reporter: {contribution.fullName}
      </h3>
      <h2 className="text-l mt-2 text-[#609966]">{contribution.description}</h2>
      <p className="mt-2 text-[#40513B]">
        Contact: {contribution.contactNumber}
      </p>
      <p className="mt-2 text-[#40513B]">
        Waste Category:{" "}
        <span className="text-[#fa658d] font-bold">
          {contribution.detectedWaste[0].name}
        </span>
      </p>
      <p className="mt-2 text-[#40513B]">
        Reported Date: {contribution.createdTime}
      </p>
      <p className="mt-2 text-[#40513B]">Status: {contribution.status}</p>
      <p className="mt-2 text-[#40513B]">
        Location: {(contribution.location[1], contribution.location[1])}
      </p>
      <div className="mt-4">
        <p className="text-[#40513B]">Waste Detected Image:</p>
        <img
          src={`data:${contribution.detectedImage.contentType};base64,${contribution.detectedImage.data}`}
          alt="contributed-img"
          className="mt-2 rounded-md"
        />
      </div>
      <button
        disabled={contribution.isSaved || isSaving}
        onClick={handleClick}
        className={`mt-4 py-2 px-4 rounded shadow text-white font-semibold ${
          contribution.isSaved || isSaving
            ? "bg-[#9DC08B] cursor-not-allowed"
            : "bg-[#609966] hover:bg-[#40513B] transition-colors duration-200"
        }`}
      >
        {contribution.isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

const User = () => {
  const [contributions, setContributions] = useState([]);
  const { currentUser } = useAuth();
  const { user } = currentUser || {};
  const { _id, email } = user || {};

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/contributions/all-contributions"
        );

        if (!response.status === 201) {
          throw new Error("Error fetching contributions");
        }

        const data = await response.json();
        setContributions(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div className="min-h-screen bg-[#EDF1D6]">
      <Navbar />
      <div className="container mx-auto mt-20 space-y-10">
        <div className="px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold mb-5 text-center text-[#40513B]">
            All Contributions
          </h2>
          {contributions.map((contribution, index) => (
            <ContributionCard
              key={index}
              contribution={contribution}
              userId={_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
