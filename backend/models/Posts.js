const mongoose = require('mongoose');
const User = require('../models/User');
const { Schema } = mongoose;

const PostsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Link to User
        ref: "User", // Reference to User model
    },
    img: {
        type: Buffer,       
        required: true
    },
    caption: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Posts = mongoose.model('posts', PostsSchema);
module.exports = Posts;