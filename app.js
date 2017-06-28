const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
app.use(express.static(__dirname + '/public'));
var server = http.createServer(app);
var io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

let messageObject = {
  message : 'welcome everyone',
  time : new Date()
};

let broadcastMessage = {
  message : 'broadcast Message',
  time : new Date()
}

io.on('connection', (socket) => {
  console.log('user connect');
  console.log(socket.id);

  socket.on('welcomeMessage', (message) => {
    console.log(message);
    socket.emit('serverWelcome', 'welcome');
  });

  io.emit('chatAll', messageObject);

  socket.broadcast.emit('boardcastMessage', broadcastMessage);

  socket.on('joinRoom', (roomName) => {
    console.log(roomName);
    socket.join(roomName);
    io.to(roomName).emit('roomMessage',`${socket.id} join ${roomName}`);
  });
})

server.listen(6969, () => {
  console.log('server is online');
});
