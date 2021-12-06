/*::::::::::::::::::::::::::::::::::::::::
::::::::  Required Dependencies  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

const express = require('express');
let app = express();
const http = require('http');
let server = http.Server(app);
const port = process.env.PORT || 8080;
const apiKey = process.env.API_KEY;
const spreadsheetId = process.env.SPREADSHEET_ID;
const clientId = process.env.CLIENT_ID;
const scope = process.env.SCOPE;

app.use(express.static('client'));

let io = require('socket.io')(server);
io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        io.emit('message', msg);
    })
});

server.listen(port, function() {
    console.log(`Spinning up the chat room!`)
});