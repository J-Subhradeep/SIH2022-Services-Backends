const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config.env") });
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const SocketIOFileUpload = require("socketio-file-upload");
const { Server } = require("socket.io");
const chatMiddleware = require("./middlewares/handshake");
const connectToSocket = require("./controllers/connect");
const connectDatabase = require("./config/db");
const router = require("./routes");

app.use(express.static(__dirname + "/resources"));
app.use(express.json());
app.use(SocketIOFileUpload.router);
app.use(cors());
connectDatabase();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

/*  socket Endpoints  */
const chat = io.of("/chat"); // chat nsp
//  Socket middleware
chat.use((socket, next) => chatMiddleware(chat, socket, next));
//  Socket on connection handler
chat.on("connection", (socket) => connectToSocket(chat, socket));

/*  http Endpoints  */
app.use("/", router);


server.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:" + process.env.PORT);
});
