const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    img: {
        type: String,
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