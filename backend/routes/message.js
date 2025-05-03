const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Conversation = require("../models/Conversation");
const Messages = require("../models/Messages");
const { getReceiverSocketId, io } = require("../socketio/server");

// Route 1: to send messages using: POST '/api/message/sendMessage'
router.post("/sendMessage/:id", fetchUser, async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = await Messages.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res
      .status(200)
      .json({ message: "message sent successfully", conversation });
  } catch (error) {
    console.log("error in sending message ", error);
    res.status(500).json({ message: "internal server error" });
  }
});

// Route 2: to get all messages of a coversation using: GET '/api/message/getMessages/:id'
router.get("/getMessages/:id", fetchUser, async(req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        const conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        }).populate("messages");

        if (!conversation) {
            console.log("no conversation found")
            return res.status(404).json({ messages: [] });
        }
        const messages = conversation.messages;
        res.status(200).json({ messages });
    } catch (error) {
        console.log("error in getting messages ", error);
        res.status(500).json({ message: "internal server error" });
    }
})

module.exports = router;
