// Create a web server using Express.
var express = require('express');
var app = express();
var server = require('http').createServer(app);

// Add WebSocket support to the web server, using socket.io.
var io = require('socket.io')(server);

var userIDs = []
function idGenerator() {
  return Math.floor(Math.random()*10000);
}

// Serve static files on the root path.
app.use('/', express.static('static'));

io.sockets.on('connection', function(conn) {
  //create user ID and check whether id is in the user array, loop until unique
  var id = idGenerator();
  while (userIDs.indexOf(id) != -1) {
    id = idGenerator();
  }
  userIDs.push(id);
  console.log('New user entered the room with id: ' + id);
  
});

// Listen on a high port.
var port = 12129;
server.listen(port, function() {
  console.log("Listening on port " + port);
});
