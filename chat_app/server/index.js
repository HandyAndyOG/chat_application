const express = require('express')
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')
require('dotenv').config();

app.use(cors())


const PORT = process.env.PORT || 8080
const server = http.createServer(app);
const io = new Server(server
  , {
  cors: {
    origin: process.env.FRONTEND,
    methods: ['GET', 'POST'],
  },
});

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on('joinChat', (room, user) => {
      socket.join(room, user)
      socket.to(room).emit('currentUser', user)
      console.log(`${user} with id ${socket.id} joined room: ${room}`);
    })

    socket.on("sendMessage", (message) => {
      console.log(message);
      socket.to(message[0].room).emit('receiveMessage', message)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    })

    socket.on('leaveChat', (room) => {
      socket.leave(room)
    })
})


server.listen(PORT, () => console.log(`Server is running at ${process.env.FRONTEND}:${PORT}`))
