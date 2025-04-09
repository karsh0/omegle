import express from "express"
import http from "http"
import { Server } from "socket.io"
const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

server.listen(3000, ()=>{
    console.log('server running on port 3000')
})
