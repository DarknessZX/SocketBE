var socket = io();

socket.on('connect', ()=> {
  socket.emit('welcomeMessage', 'user connect to the app');

  socket.on('serverWelcome', (message) => {
    console.log(message);
  })
})
