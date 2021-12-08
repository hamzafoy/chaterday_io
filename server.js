/*::::::::::::::::::::::::::::::::::::::::
::::::::  Required Dependencies  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const http = require('http');
require('dotenv').config()
let server = http.Server(app);
let io = require('socket.io')(server);
const port = process.env.PORT || 8080;
const { google } = require('googleapis');
const scope = process.env.SCOPE;


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


io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        io.emit('message', msg);
    })
    socket.on('rawMessage', function(rawmsg) {
        socket.broadcast.emit('rawMessage', rawmsg);
        console.log(rawmsg);
        
            const auth = new google.auth.GoogleAuth({
                keyFile: "keys.json",
                scopes: scope
            });
            const authClientObject =  auth.getClient();
            const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
            const spreadsheetId = process.env.SPREADSHEET_ID;
             googleSheetsInstance.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!A:A",
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [[rawmsg]]
                }
            });
        })
});

/* app.post('/form', asyncHandler(async(req, res) => {
    io.sockets.emit("rawMessage", rawmsg);
    console.log(rawmsg);
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json",
        scopes: scope
    });
    const authClientObject =  auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
     googleSheetsInstance.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A",
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: rawmsg
        }
    });
})) */

/* asyncHandler(async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json",
        scopes: scope
    });
    const authClientObject =  auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
     googleSheetsInstance.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A",
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: rawmsg
        }
    });
}) */

server.listen(port, function() {
    console.log(`Spinning up the chat room!`)
});

module.exports = server;