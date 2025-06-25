const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Posts = require("../models/Posts");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require("express-validator");
const { upload } = require("../middleware/multerMiddleware");
const fetchUser = require("../middleware/fetchUser");

// Route 1: create a post using: POST '/api/posts/createPost'
router.post(
  "/createPost",
  fetchUser,
  upload.single("img"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            success: false,
            message: "no image uploaded",
            errors: errors.array(),
          });
      }

      // Read the file from disk
      const filePath = path.join(
        __dirname,
        "../public/temp",
        req.file.filename
      );

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
      }, 3000);

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
  }
);

// Route 2: get my posts using: GET '/api/posts/getMyPosts'
router.get("/getMyPosts", fetchUser, async (req, res) => {
  try {
    const posts = await Posts.find({ user: req.user.id })
      .populate("user", "-password")
      .sort({ date: -1 });

    // Convert image buffer to base64 for each post
    const postsWithBase64 = posts.map((post) => {
      return {
        ...post._doc,
        img: `data:image/jpeg;base64,${post.img.toString("base64")}`,
        user: {
          ...post.user._doc,
        },
      };
    });

    res.status(200).json(postsWithBase64);
  } catch (error) {
    console.log(req.user);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

// Route 3: get all posts using: GET '/api/posts/getPosts'
router.get("/getPosts", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const followingIds = user.following;
    const posts = await Posts.find({ user: { $in: followingIds } })
      .populate("user", "-password")
      .sort({ date: -1 });

    // Convert image buffer to base64 for each post
    const postsWithBase64 = posts.map((post) => {
      const profilePic = post.user?.profilePic?.data
        ? `data:${
            post.user.profilePic.contentType
          };base64,${post.user.profilePic.data.toString("base64")}`
        : `http://localhost:3000/static/user.png`;

      return {
        ...post._doc,
        img: `data:image/jpeg;base64,${post.img.toString("base64")}`,
        user: {
          ...post.user._doc,
          profilePic: profilePic,
        },
      };
    });

    res.status(200).json(postsWithBase64);
  } catch (error) {
    console.log(req.user);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
});

// Route 5: get posts of specific user using: GET '/api/posts/getUserPosts'
router.get("/getUserPosts/:id", fetchUser, async (req, res) => {
  try {
    const posts = await Posts.find({ user: req.params.id })
      .populate("user", "-password")
      .sort({ date: -1 });
    // Convert image buffer to base64 for each post

    const postsWithBase64 = posts.map((post) => {
      const profilePic = post.user?.profilePic?.data
        ? `data:${
            post.user.profilePic.contentType
          };base64,${post.user.profilePic.data.toString("base64")}`
        : `http://localhost:3000/static/user.png`;

      return {
        ...post._doc,
        img: `data:image/jpeg;base64,${post.img.toString("base64")}`,
        user: {
          ...post.user._doc,
          profilePic: profilePic,
        },
      };
    });
    res.json(postsWithBase64);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
});

// Route 4: delete post with id using: DELETE '/api/posts/deletePost'
router.delete("/deletePost/:id", fetchUser, async (req, res) => {
  try {
    //find the post to be deleted and delete it
    let post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Not found");
    }

    //allow deletion only if user owns this post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    post = await Posts.findByIdAndDelete(req.params.id);
    res.json({ Success: "Post has beend deleted successfully", post: post });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route 5: toggle likes in posts using: POST '/api/posts/like/:id'
router.put("/like/:postId", fetchUser, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(post)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    if (!post) {
      console.log("Post not found for ID:", req.params.postId);
      return res.status(404).json({ msg: "Post not found" });
    }

    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId); // You can push string or ObjectId — Mongoose will handle conversion
    }
    await post.save();
    console.log("Post liked/unliked successfully:", post._id);
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

// Route 5: add comment in posts using: POST '/api/posts/comment/:id'
router.post("/comment/:postId", fetchUser, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    const { text } = req.body;
    const userId = req.user.id;

    if (!post) return res.status(404).json({ msg: "Post not found" });

    const newComment = { user: userId, text };
    post.comments.push(newComment);
    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route 6: delete post using: DELETE '/api/posts/deletePost/:postId'
router.delete("/deletePost/:postId", fetchUser, async(req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await post.deleteOne();
    res.status(200).json({ msg: "Post deleted successfully", postId: post._id });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete post" });
  }
})

module.exports = router;
