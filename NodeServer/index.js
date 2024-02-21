//Node server for socket io
const io = require('socket.io')({
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });

const users = {};

io.on('connection', socket => {  //io.on listen to all the users connected to the server
    socket.on('new-user-joined', name => {
        console.log(`${name} joined the chat`);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //broadcasting to all other users
});

socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
})
io.listen(8000);
  
