const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Create new post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      author: req.user.id,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
});

//Add coments to a post
router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      text: req.body.text,
      author: req.user.id,
      createAt: new Date(),
    };
    post.comments.push(comment);
    await post.save();

    await post.populate("comments.author");
    res.json({ comments: post.comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
});

module.exports = router;
