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

io.on('connection', (socket) => {
  console.log('user connect');
  console.log(socket.id);

  socket.on('welcomeMessage', (message) => {
    console.log(message);
    socket.emit('serverWelcome', 'welcome');
  });
})

server.listen(6969, () => {
  console.log('server is online');
});
