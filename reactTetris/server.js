var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {
	if(req.headers['x-forwared-proto'] == 'https') {
		res.redirect('http://' + req.hostname + req.url);
	} else {
		next();
	}
})

app.use(express.static('public'));

var mapa = [];
var WIDTH = 1000;
var HEIGHT = 1000;

server.listen(PORT, function() {
	console.log('Express server running on PORT' + PORT);
	
});


io.on('connection', function (socket) {
	console.log('user connected');
	// var activeGame;
	socket.emit('mapa', { mapa: mapa });

	
});