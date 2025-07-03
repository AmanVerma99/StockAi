import React from "react";

const mockPortfolio = ["RELIANCE", "TCS", "HDFCBANK"];
const mockNews = [
  { title: "Reliance hits new high amid oil rally", symbol: "RELIANCE" },
  { title: "TCS earnings report shows slow growth", symbol: "TCS" },
  { title: "HDFCBANK to merge with HDFC", symbol: "HDFCBANK" },
  { title: "Infosys announces major buyback", symbol: "INFY" },
];

const PortfolioNews = () => {
  const filtered = mockNews.filter((n) =>
    mockPortfolio.includes(n.symbol)
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">News Based on Your Portfolio</h2>
      {filtered.length > 0 ? (
        filtered.map((item, idx) => (
          <div key={idx} className="p-2 border-b">
            <strong>{item.symbol}</strong>: {item.title}
          </div>
        ))
      ) : (
        <p>No matching news for your portfolio.</p>
      )}
    </div>
  );
};

export default PortfolioNews;
