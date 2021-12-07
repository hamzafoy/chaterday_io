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
//const scope = process.env.SCOPE;


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
        console.log(rawmsg);
        asyncHandler(async(req, res) => {
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
        })
    })
});

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