// routes/stockRoutes.js
import express from "express";
import {
  verifyToken,
  getMyStocks,
  addStock,
} from "../controllers/stockController.js";

const router = express.Router();

router.get("/my-stocks", verifyToken, getMyStocks);
// router.post("/add", verifyToken, addStock);
router.post("/add",verifyToken, addStock);
export default router;
