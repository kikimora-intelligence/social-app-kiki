// routes/user.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const SECRET = process.env.JWT_SECRET || "your_secret_key";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_secret";

// Generate tokens
function generateTokens(user) {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    SECRET,
    { expiresIn: "15m" } // short-lived
  );

  const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, {
    expiresIn: "7d", // long-lived
  });

  return { accessToken, refreshToken };
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${req.user?.username || "user"}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

/* ------------------- ROUTES ------------------- */

// Profile picture upload
router.post(
  "/profile/picture",
  authMiddleware,
  upload.single("picture"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.pictureUrl = `/uploads/${req.file.filename}`;
      await user.save();

      res.json({
        message: "Profile picture updated",
        pictureUrl: user.pictureUrl,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Register
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: "Login successful",
      accessToken,
      email: user.email,
      username: user.username,
      pictureUrl: user.pictureUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Refresh token
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign({ id: decoded.id }, SECRET, {
      expiresIn: "15m",
    });

    res.json({ accessToken });
  });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

// Get profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching profile" });
  }
});

module.exports = router;
