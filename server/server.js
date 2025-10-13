require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const postsRouter = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploads folder for profile pictures
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount routers
app.use("/api/posts", postsRouter);
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/", (req, res) => res.send("Server is running"));

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
