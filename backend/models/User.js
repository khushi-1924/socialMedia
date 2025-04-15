const mongoose = require("mongoose");
const { type } = require("os");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  font: {
    type: String,
    default: "Inria Sans",
  },
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  text: {
    type: String,
    default: "Whoever is happy will make others happy!",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
