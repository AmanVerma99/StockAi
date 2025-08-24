// routes/userRoutes.js
import express from "express";
import { register, login, getCurrentUser } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, getCurrentUser); // ✅ protected route

export default router;
