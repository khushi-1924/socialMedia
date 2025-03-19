const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts");
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require('express-validator');
const { upload } = require("../middleware/multerMiddleware"); // Import your middleware
const fetchUser = require("../middleware/fetchUser");

// Route 1: create a post using: POST '/api/posts/createPost'
router.post("/createPost", fetchUser, upload.single("img"), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: "no image uploaded", errors: errors.array() });
    }

    // Read the file from disk
    const filePath = path.join(__dirname, "../public/temp", req.file.filename);

    // image saved as buffer
    const imgData = fs.readFileSync(filePath);

    const newPost = new Posts({
      user: req.user.id, 
      caption: req.body.caption,
      img: imgData, // Store image as Buffer
      date: new Date(),
    });

    // Save the post to MongoDB
    await newPost.save();

    // delete from folder after 5secs
    setTimeout(() => {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting temp file:", err);
        } else {
          console.log("Temp file deleted successfully.");
        }
      });
    }, 3000)
    
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