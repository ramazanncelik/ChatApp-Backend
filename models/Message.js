const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    From: {
        type: String,
        required: true
    },
    To: {
        type: String,
        required: true
    },
    MessageType: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Files: {
        type: String,
        required: false
    },
    Room: {
        type: String,
        required: true
    },
    FullDate: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    Month: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model("messages", MessageSchema);