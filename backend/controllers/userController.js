// controllers/userController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/users.js";

const JWT_SECRET = process.env.JWT_SECRET || "11235";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "11235";

// 🔑 Generate Access & Refresh Tokens
const generateTokens = async (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });

  // Save refresh token in DB
  const user = await User.findById(userId);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ✅ REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const { accessToken, refreshToken } = await generateTokens(user._id);

    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .status(201)
      .json({
        message: "User registered successfully",
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
        refreshToken,
      });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const { accessToken, refreshToken } = await generateTokens(user._id);

    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
        refreshToken,
      });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
};

// ✅ LOGOUT
export const logout = async (req, res) => {
  try {
    const { userId } = req.user;

    // Clear refresh token in DB
    await User.findByIdAndUpdate(userId, { refreshToken: "" });

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error during logout" });
  }
};

// ✅ REFRESH ACCESS TOKEN
export const refreshAccessToken = async (req, res) => {
  const refreshToken =
    req.cookies.refreshToken || req.body.refreshToken || req.headers["x-refresh-token"];

  if (!refreshToken)
    return res.status(401).json({ error: "No refresh token provided" });

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      user._id
    );

    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", newRefreshToken, { httpOnly: true })
      .json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

// ✅ GET CURRENT USER
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password -refreshToken");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching user" });
  }
};
