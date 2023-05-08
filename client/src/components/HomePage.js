import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FoodWasteCard from "../components/FoodWasteCard";

const HomePage = () => {
  const [foodWasteData, setFoodWasteData] = useState([]);

  useEffect(() => {
    // Fetch food waste data from different APIs
    Promise.all([
      fetch("https://api.example.com/food-waste-data-1"),
      fetch("https://api.example.com/food-waste-data-2"),
      fetch("https://api.example.com/food-waste-data-3"),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => setFoodWasteData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-[#EDF1D6]">
      <Navbar />
      <div className="container mx-auto p-10">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Food Waste Data from Around the World
        </h1>
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
          {foodWasteData.map((data, index) => (
            <FoodWasteCard key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
