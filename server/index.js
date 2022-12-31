const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Onnected:${socket.id}`);
  socket.on("send_message", (data) => {
    console.log(data);
  });
});

server.listen(4000, () => {
  console.log("server is runing at 4000");
});
