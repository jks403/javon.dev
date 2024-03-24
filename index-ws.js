const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', function(req, res)  {
        res.sendFile('index.html', {root:__dirname});


});

server.on('request', app);
server.listen(3000, function() {console.log('server started on 3000');});



/** begin web sockets     */
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server:server});

wss.on('connection', function connection(ws)  {   
    const numClients = wss.clients.size;
    console.log('Clients connected', numClients);

    wss.broadcast(`Current visitors: ${numClients}`);

    if(ws.readyState ===ws.OPEN) {
        ws.send('Welcome to my server');
    }
    ws.on('close', function close() {
        console.log('a client has disconnected');
    });


});


wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) { 
        client.send(data);
    });
}





process.on('SIGINT', () =>   {
        server.close(()   => {
                shutdownDB();

        });
})


/** end websockets */

/** begin database */

const sqlite = require('sqlite3');
const db = new sqlite.Database(':memory:');

db.serialize(() => {
        db.run(`
        CREATE TABLE visitors (
                count INTEGER, 
                time TEXT
        )
        
        `)

});

function getCounts() {
        db.each("SELECT * FROM visitors", (err, row)  =>  {
                console.log(row);
        })
}


function shutdownDB()  {
        getCounts();
        console.log('Shutting down db');
        db.close();

}