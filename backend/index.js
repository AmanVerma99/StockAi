// backend/index.js

// backend/index.js
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 5000;

app.use(cors());

// ✅ Replace with your NewsAPI key
const NEWS_API_KEY = "01d0208e23bb4452979df7cca5d9fc83";

// ✅ General news query endpoint
app.get("/api/news", async (req, res) => {
  const query = req.query.q || "stock market india";

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        sortBy: "publishedAt",
        language: "en",
        pageSize: 30,
        apiKey: NEWS_API_KEY,
      },
    });

    const filtered = (response.data.articles || []).map((item) => ({
      title: item.title,
      link: item.url,
      source: item.source.name,
      pubDate: item.publishedAt,
      description: item.description,
    }));

    console.table(filtered.slice(0, 5)); // Just log top 5 for preview
    res.json(filtered);
  } catch (error) {
    console.error("❌ Error fetching NewsAPI data:", error.message);
    res.status(500).json({ error: "Failed to fetch news from NewsAPI" });
  }
});

// ✅ Specific stock news endpoint by symbol (like /api/stock-news/INFY)
app.get("/api/stock-news/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  const query = `${symbol} stock`;

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        sortBy: "publishedAt",
        language: "en",
        pageSize: 30,
        apiKey: NEWS_API_KEY,
      },
    });

    const filtered = (response.data.articles || []).map((item) => ({
      title: item.title,
      link: item.url,
      source: item.source.name,
      pubDate: item.publishedAt,
      description: item.description,
    }));

    res.json(filtered);
  } catch (error) {
    console.error("❌ Error fetching stock-specific news:", error.message);
    res.status(500).json({ error: "Failed to fetch stock news" });
  }
});
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const connectDB = require('./db');
// require('dotenv').config();
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 3000;

  
// connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


