import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const GeneralNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      const data = await response.json();

      const cleaned = data.map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: item.source,
        description: item.description,
      }));

      setNews(cleaned);
    } catch (err) {
      console.error("❌ Failed to fetch news from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-6 border rounded shadow bg-gray-50 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        📰 Market News Highlights
      </h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : news.length > 0 ? (
        <div className="h-[500px] overflow-y-scroll space-y-4 pr-2">
          {news.map((item, idx) => (
            <NewsCard key={idx} {...item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No news found.</p>
      )}
    </div>
  );
};

export default GeneralNews;
