const mongoose = require('mongoose');
const { type } = require('os');
const { Schema } = mongoose;

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        data: Buffer,
        contentType: String
    }
})

const User = mongoose.model ('user', UserSchema);
module.exports = User;