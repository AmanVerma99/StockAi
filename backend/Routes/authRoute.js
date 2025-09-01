// // routes/userRoutes.js
// import express from "express";
// import { register, login, getCurrentUser } from "../controllers/userController.js";
// import { requireAuth } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.get("/me", requireAuth, getCurrentUser); // ✅ protected route

// export default router;

import express from "express";
import passport from "../middlewares/passport.js";
import { register, login, logout, refreshAccessToken, getCurrentUser } from "../controllers/userController.js";

const router = express.Router();

// Register (same as before)
router.post("/register", register);

// Local login -> generates JWTs
router.post("/login", login);

// Protect routes with JWT strategy
router.get("/me", passport.authenticate("jwt", { session: false }), getCurrentUser);

// Refresh & logout (custom functions still fine)
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

export default router;
