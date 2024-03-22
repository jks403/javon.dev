const http = require('http');

http.createServer(function (req, res) {
	res.write("Javon's driving app with drivers, locations, riders, tips for people wanting rides ");
	res.end();

}).listen(3000);

console.log("server started on port 3000");








