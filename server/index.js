const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  // console.log(`User Onnected:${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    // console.log(data);
    // socket.broadcast.emit("receive_message", data);
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(4000, () => {
  console.log("server is runing at 4000");
});
