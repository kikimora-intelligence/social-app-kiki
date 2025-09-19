const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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

// Update profile (username or picture)
router.put(
  "/profile/picture",
  authMiddleware,
  upload.single("picture"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ message: "No file uploaded" });

      // FULL URL to backend
      const pictureUrl = `http://localhost:5000/uploads/${req.file.filename}`;

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { pictureUrl },
        { new: true }
      ).select("-password");

      res.json({ user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error uploading picture" });
    }
  }
);

module.exports = router;
