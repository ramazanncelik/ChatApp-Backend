const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    ImageUrl: {
        type: String,
        required: true
    },
    NickName: {
        type: String,
        required: true
    },
    Online: {
        type: String,
        required: false
    },
});
module.exports = mongoose.model("users", UserSchema);