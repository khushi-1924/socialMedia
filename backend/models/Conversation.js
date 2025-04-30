const mongoose = require('mongoose');
const User = require('./User');
const Messages = require('./Messages');
const { Schema } = mongoose;

const ConversationSchema = new Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Messages,
            default: [],
        }
    ],
}, {
    timestamps: true,
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
module.exports = Conversation;