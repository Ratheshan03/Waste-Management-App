import React from "react";

const FoodWasteCard = ({ country, city, metric, metricType }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <h2 className="text-lg font-bold mb-2">
        {city}, {country}
      </h2>
      <p className="text-gray-500 mb-4">
        {metric} {metricType} of food waste
      </p>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        View Details
      </button>
    </div>
  );
};

export default FoodWasteCard;
