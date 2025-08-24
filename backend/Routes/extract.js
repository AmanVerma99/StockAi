// backend/Routes/extract.js
import express from "express";
import { getGeneralNews, getStockNews } from "../controllers/newsController.js";

const router = express.Router();

// router.get("/news", getGeneralNews);           // /api/news
// router.get("/stock-news/:symbol", getStockNews); // /api/stock-news/AAPL
router.get("/", getGeneralNews);              // GET /api/news
router.get("/stock/:symbol", getStockNews);   // GET /api/news/stock/AAPL

export default router;
