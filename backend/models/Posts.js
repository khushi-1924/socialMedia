const mongoose = require("mongoose");
const User = require("../models/User");
const { Schema } = mongoose;

const PostsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Link to User
    ref: "User", // Reference to User model
    required: true,
  },
  img: {
    type: Buffer,
    required: true,
  },
  caption: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      edited: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model("posts", PostsSchema);
module.exports = Posts;
