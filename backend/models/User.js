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
    }
})

const User = mongoose.model ('user', UserSchema);
module.exports = User;