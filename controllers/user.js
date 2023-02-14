const UserModel = require("../models/User");

exports.getUser = async (req, res) => {

    const userId = req.params.userId

    UserModel.findById(userId, (err, user) => {
        if (err) {
            return res.status(200).json({ message: err, error: true });
        } else {
            return res.status(200).json({ user: user, error: false });
        }
    });

}

exports.allUsers = async (req, res) => {

    UserModel.find({}, (err, user) => {
        if (err) {
            return res.status(200).json({ message: err, error: true });
        } else {
            return res.status(200).json({ users: user, error: false });
        }
    });

}