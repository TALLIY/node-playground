import * as net from "net";

const error = Error();

const server = net.createServer((socket) => {
  console.log("Client connected");

  //concatinate the incoming messages
  let buffer = "";

  socket.on("data", (buf) => {});
});
