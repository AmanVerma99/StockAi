import React, { useState } from "react";
import GeneralNews from "./GeneralNews";
import PortfolioNews from "./PortfolioNews";
import SearchStockNews from "./SearchStockNews";

const HomeContent = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="tabs mb-4">
        <button
          className={`tab tab-bordered ${activeTab === "general" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          General News
        </button>
        <button
          className={`tab tab-bordered ${activeTab === "portfolio" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("portfolio")}
        >
          My Portfolio News
        </button>
        <button
          className={`tab tab-bordered ${activeTab === "search" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("search")}
        >
          Search Stock
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "general" && <GeneralNews />}
      {activeTab === "portfolio" && <PortfolioNews />}
      {activeTab === "search" && <SearchStockNews />}
    </div>
  );
};

export default HomeContent;
