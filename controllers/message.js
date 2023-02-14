const MessageModel = require('../models/Message')

exports.addMessage = async (message) => {

    const newMessage = new MessageModel(message);

    try {
        newMessage.save();
        console.log({ message: 'Message sent successfully', error: false });
        return { message: 'Message sent successfully', error: false };
    } catch (error) {
        return { message: error, error: true };
    }

}

exports.allMessages = async (callback) => {
    let messageList = [];
    try {
        MessageModel.find({}, (err, messages) => {
            if (err) {
                console.error(err);
                return callback([]);
            } else {
                messageList = messages;
                return callback(messageList);
            }
        });
    } catch (error) {
        return { message: error, error: true };
    }

}