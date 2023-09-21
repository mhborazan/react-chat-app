import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// const users = {};
// const colors = [
//   ["#4b494c", "#b3c2ce"],
//   ["#357315", "white"],
// ];

app.get("/", (req, res) => {
  //res.sendFile("C:\\Users\\Hakan\\react-chat-app\\server\\index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", { msg: msg, id: socket.id });
  });
});

server.listen(3000, () => {
  console.log("app is running on port 3000");
});
