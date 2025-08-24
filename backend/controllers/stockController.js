// controllers/stockController.js
import Stock from "../models/Stock.js";
import jwt from "jsonwebtoken";

// Middleware to verify JWT and extract userId
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
    next();

  try {
    const decoded = jwt.verify(token, "11235");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid h token" });
  }
};

// Get all stocks for a logged-in user
export const getMyStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.userId });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};

// Add a new stock entry
// export const addStock = async (req, res) => {
//   const { symbol, quantity, buyPrice, currentPrice } = req.body;
//   try {
//     const stock = new Stock({
//       user: req.userId,
//       symbol,
//       quantity,
//       buyPrice,
//       currentPrice,
//     });

//     await stock.save();
//     res.status(201).json({ message: "Stock added successfully", stock });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to add stock" });
//   }
// };
// Add a new stock entry
export const addStock = async (req, res) => {
  try {
    // Extract values from request body
    const { symbol, quantity, buyPrice, currentPrice } = req.body;

    // Basic validation
    if (!symbol || quantity == null || buyPrice == null || currentPrice == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new stock document linked to logged-in user
    const stock = new Stock({
      user: req.userId,  // Comes from verifyToken middleware
      symbol: symbol.trim().toUpperCase(), // Normalize stock symbol
      quantity,
      buyPrice,
      currentPrice,
    });

    // Save to database
    await stock.save();

    res.status(201).json({
      message: "Stock added successfully",
      stock,
    });

  } catch (err) {
    console.error("Error adding stock:", err);
    res.status(500).json({ error: "Failed to add stock" });
  }
};
