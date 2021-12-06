/*::::::::::::::::::::::::::::::::::::::::
::::::::  Required Dependencies  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

const express = require('express');
let app = express();
const http = require('http');
require('dotenv').config()
let server = http.Server(app);
const port = process.env.PORT || 8080;
const { google } = require('googleapis');
const scope = process.env.SCOPE;
const spreadsheetId = process.env.SPREADSHEET_ID;

/*::::::::::::::::::::::::::::::::::::::::
:::::::  Async Handler Function  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

function asyncHandler(cb) {
    return async(req, res, next) => {
        try {
        await cb(req, res, next)
        } catch(error){
        // Forward error to the global error handler
        next(error);
        }
    }
}

app.use(express.static('client'));

let io = require('socket.io')(server);
io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        io.emit('message', msg);
    })
    socket.on('rawMessage', function(rawmsg) {
        io.emit('rawMessage', rawmsg);
    })
});

server.listen(port, function() {
    console.log(`Spinning up the chat room!`)
});