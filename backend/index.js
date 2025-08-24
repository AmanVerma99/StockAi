import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import newsRoutes from "./Routes/extract.js"; // 📰 News scraping routes
import userRoutes from "./Routes/authRoute.js"; // 👤 Auth/User routes
import stockRoutes from "./Routes/stockRoutes.js"; // 📊 Stock routes

const app = express();
const PORT = 5000;

// 🛢️ Connect to MongoDB
connectDB();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 📡 API Routes
app.use("/api/news", newsRoutes);         // e.g., GET /api/news
app.use("/api/users", userRoutes);        // e.g., POST /api/users/register, /login
app.use("/api/stocks", stockRoutes);      // e.g., GET /api/stocks/my-stocks, POST /api/stocks/add

//  Health Check
app.get("/", (req, res) => {
  res.send("✅ Backend is up and running!");
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
