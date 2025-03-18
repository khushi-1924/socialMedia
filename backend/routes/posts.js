const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts");
const fs = require("fs");
const path = require("path");
const { upload } = require("../middleware/multerMiddleware"); // Import your middleware

// Route 1: create a post using: POST '/api/posts/createPost'
router.post("/createPost", upload.single("img"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    // Read the file from disk
    const filePath = path.join(__dirname, "../public/temp", req.file.filename);

    // Convert file to base64
    // const imgData = fs.readFileSync(filePath).toString("base64");
    const imgData = fs.readFileSync(filePath);

    const newPost = new Posts({
      user: req.body.username, // Make sure this is a string (not ObjectId)
      caption: req.body.caption,
      img: imgData, // Store image as Buffer
      date: new Date(),
    });

    // Save the post to MongoDB
    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res
      .status(500)
      .json({ error: "Failed to create post", details: err.message });
  }
});

// Route 2: get all posts using: GET '/api/posts/getPosts'
router.get("/getPosts", async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

module.exports = router;