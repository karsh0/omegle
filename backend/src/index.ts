import express from "express"
import http from "http"
import { Server } from "socket.io"
import { UserManager } from "./managers/UserManager"
const app = express()
const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:"*"
  }
})

const userManager = new UserManager()

io.on('connection', (socket) => {
    console.log('a user connected');
      userManager.addUser('1', socket)
    socket.on('disconnect', () => {
      console.log('user disconnected');
      userManager.removeUser(socket.id)
    });
  });

server.listen(3000, ()=>{
    console.log('server running on port 3000')
})
