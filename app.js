const http = require('http');

http.createServer(function (req, res) {
	res.write("Javon's driving app with drivers, locations, riders, tips for people wanting rides ");
	res.end();

}).listen(3000);

console.log("server started on port 3000");


/** Begin Websocket */

const webSocketServer = require('ws').Server;

const wss = new WebSocketServer({server:server});
wss.on('connection', function connection (ws) {
	const numClients = wss.clients.size;
	console.log('clients connected', numClients);

	wss.broadcast(`Current visitors:  ${numClients}`);

	if(ws.readyState === ws.OPEN) {
		ws.send('Welcome to my server');


	}
	ws.on('close', function close() {
		console.log("a client has disconnected");
	});



});

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
		client.send(data);
	});
}


