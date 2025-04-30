const mongoose = require("mongoose");
const User = require('./User');
const { Schema } = mongoose;

const MessagesSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
    timestamps: true,
});

const Messages = mongoose.model("Messages", MessagesSchema);
module.exports = Messages;
