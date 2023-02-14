const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);
require('dotenv').config();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.urlencoded(
    { extended: true }
));

const authController = require("./controllers/auth");
const userController = require('./controllers/user');
const messageController = require('./controllers/message');

app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.get("/api/getAllUsers", userController.allUsers);
app.get("/api/getUser/:userId", userController.getUser);

io.on("connection", (socket) => {
    console.log("a user connected");

    messageController.allMessages((data) => {
		console.log(data);
		socket.emit("message-list", data);
	});

    socket.on("new-message", (message) => {
        messageController.addMessage(message);
        socket.emit("receive-message", message);
    });

    socket.on("disconnect", () => console.log("a user disconnected"));
});

const port = process.env.PORT || 9999;
http.listen(port, () => {
    console.log(`Listening port ${port}`);
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        console.log(err ? err : "Mongoose ile bağlantı yapıldı")
    });
});