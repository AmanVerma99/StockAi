import React, { useState } from "react";

const SearchStockNews = () => {
  const [symbol, setSymbol] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const keyword = symbol.trim().toUpperCase();
    if (!keyword) return setResults([]);

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/news/stock/${keyword}`);
      if (!response.ok) throw new Error("Failed to fetch news");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("❌ Could not fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-2">🔍 Search News by Stock Symbol</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="e.g., INFY, TCS, RELIANCE"
          className="input input-bordered w-full max-w-xs"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {results.length > 0 ? (
          results.map((item, idx) => (
            <div key={idx} className="p-3 border rounded">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-semibold hover:underline"
              >
                {item.title}
              </a>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="text-xs text-gray-400 mt-1">
                {item.source} • {new Date(item.pubDate).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No news found for symbol: {symbol.toUpperCase()}</p>
        )}
      </div>
    </div>
  );
};

export default SearchStockNews;
