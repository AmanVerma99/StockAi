import React from "react";

const NewsCard = ({ title, link, source, pubDate, description }) => {
  return (
    <div className="p-4 bg-white border rounded-md shadow hover:shadow-lg transition duration-300 ease-in-out">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-bold text-blue-700 hover:underline"
      >
        {title}
      </a>
      <p className="text-sm text-gray-700 mt-2">{description}</p>
      <div className="text-xs text-gray-500 mt-2 flex justify-between">
        <span>{source || "Unknown Source"}</span>
        <span>{new Date(pubDate).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default NewsCard;
