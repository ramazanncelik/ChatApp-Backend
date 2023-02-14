const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.urlencoded(
    { extended: true }
));

const authController = require("./controllers/auth");
const userController = require('./controllers/user');
const messageController = require('./controllers/message');

const dbUrl = "mongodb+srv://ramazanc:!Kbuvo44m34i@cluster0.kmzoims.mongodb.net/chatapp?retryWrites=true&w=majority";

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

http.listen(5000, () => {
    console.log('Listening port 5000');
    mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        console.log(err ? err : "Mongoose ile bağlantı yapıldı")
    });
});