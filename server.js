const express = require('express');
let app = express();
const http = require('http');
let server = http.Server(app);

app.use(express.static('client'));

server.listen(8080, function() {
    console.log(`Spinning up the chat room!`)
})