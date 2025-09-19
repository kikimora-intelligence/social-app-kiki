require("dotenv").config({ path: __dirname + "/.env" }); // <-- must be first
console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

const User = require("./models/User");
const userRoutes = require("./routes/user");

const app = express();
const PORT = 5000;
const SECRET = process.env.JWT_SECRET || "your_secret_key";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// CORS & JSON Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRoutes);

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// JWT authentication middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// Multer setup for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${req.user.username}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// ================================ Routes =====================================

// Register
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(409).json({ message: "Username or Email Taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login

app.post("/login", async (req, res) => {
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

    const token = jwt.sign(
      { email: user.email, username: user.username },
      SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Login successful",
      accessToken: token,
      email: user.email,
      username: user.username,
      pictureUrl: user.pictureUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Profile picture upload
app.put(
  "/profile/picture",
  authMiddleware,
  upload.single("picture"),
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email });
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
// Root
app.get("/", (req, res) => res.send("Server is running"));

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
