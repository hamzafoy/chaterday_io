const express = require('express');
let app = express();
const http = require('http');
let server = http.Server(app);

app.use(express.static('client'));

let io = require('socket.io')(server);
io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        io.emit('message', msg);
    })
});

server.listen(8080, function() {
    console.log(`Spinning up the chat room!`)
})