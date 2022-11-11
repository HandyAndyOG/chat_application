const express = require('express')
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app);
const io = new Server(server
  , {
  cors: {
    origin: "http://localhost:3000",
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
      socket.to(room).emit('user left', socket.id);
    })
})


server.listen(8080, () => console.log('Server is running at Localhost:3000'))
