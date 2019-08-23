//Make connection

const socket = io.connect('http://localhost:4000');

//

const message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

btn.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

socket.on('chat', function(data) {
  feedback.innerHTML = ' ';
  output.innerHTML +=
    '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value);
});

socket.on('typing', function(data) {
  feedback.innerHTML = '<p><em>' + data + 'is typing a message...</em></p>';
});
