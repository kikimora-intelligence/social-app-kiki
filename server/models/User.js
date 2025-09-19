const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pictureUrl: { type: String, default: "" },
  posts: [
    {
      imageUrl: String,
      caption: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
