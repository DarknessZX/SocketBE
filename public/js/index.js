var socket = io();

socket.on('connect', ()=> {
  socket.emit('welcomeMessage', 'user connect to the app');

  socket.on('serverWelcome', (message) => {
    console.log(message);
  });
});

socket.on('chatAll', (messageObject) => {
  console.log(messageObject);
});

socket.on('boardcastMessage', (boardcastMessage) => {
  console.log(boardcastMessage);
})

socket.on('roomMessage', (roomMessage) => {
  console.log(roomMessage);
})

var buttonId = document.getElementById('submit_button');
var inputId = document.getElementById('room_name');

buttonId.onclick = () => {
  socket.emit('joinRoom', inputId.value);
}
