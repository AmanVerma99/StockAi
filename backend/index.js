import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";  // 👈 Needed for JWT in cookies
import passport from "./middlewares/passport.js"; // 👈 Import passport setup
import connectDB from "./db.js";
import newsRoutes from "./Routes/extract.js";
import userRoutes from "./Routes/authRoute.js";
import stockRoutes from "./Routes/stockRoutes.js";

const app = express();
const PORT = 5000;

// 🛢️ Connect to MongoDB
connectDB();

// 🔧 Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); 
// 👆 allows frontend (React) to send cookies
app.use(express.json());
app.use(cookieParser());

// 🔐 Initialize Passport
app.use(passport.initialize());

// 📡 API Routes
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stocks", stockRoutes);

// 🩺 Health Check
app.get("/", (req, res) => {
  res.send("✅ Backend is up and running!");
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
