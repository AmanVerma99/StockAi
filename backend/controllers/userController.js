import User from "../models/users.js";
import jwt from "jsonwebtoken";

// ⚠️ For development only — move these to .env in production
const JWT_SECRET = "11235";
const REFRESH_SECRET = "11235";

// Helper: Generate Access & Refresh Tokens
const generateTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET, { expiresIn: "7d" });

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ✅ Register (no hashing)
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ name, email, password }); // storing plain text
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// ✅ Plain-text password comparison
const compare = (enteredPassword, storedPassword) => {
  return enteredPassword === storedPassword;
};

// ✅ Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("🔑 Password entered:", password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }

    if (!compare(password, user.password)) {
      return res.status(400).json({ error: "Password does not match" });
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
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

// ✅ Logout
export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(400).json({ error: "No refresh token found" });

    const user = await User.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = null;
      await user.save({ validateBeforeSave: false });
    }

    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "User logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).json({ error: "Server error during logout" });
  }
};

// ✅ Refresh Token
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingToken = req.cookies.refreshToken;
    if (!incomingToken) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(incomingToken, REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== incomingToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "15m" });

    res
      .cookie("accessToken", accessToken, { httpOnly: true, secure: false })
      .json({ accessToken });
  } catch (err) {
    console.error("❌ Token refresh error:", err.message);
    res.status(403).json({ error: "Could not refresh token" });
  }
};

// ✅ Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password -refreshToken");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error("❌ Fetch current user error:", err.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
