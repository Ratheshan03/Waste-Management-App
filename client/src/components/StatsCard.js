import React from "react";

const StatsCard = ({ title, stat, description, image }) => {
  return (
    <div className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-md rounded-lg shadow-lg p-8 mb-4 max-w-sm mx-auto">
      <img
        src={image}
        alt={title}
        className="w-70 h-70 rounded-full mx-auto mb-6"
      />
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="flex justify-between items-center">
        <div className="text-4xl font-bold">{stat}</div>
        <div className="text-gray-500 text-justify pl-5">{description}</div>
      </div>
    </div>
  );
};

export default StatsCard;
