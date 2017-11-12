// Create a web server using Express.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var playerNum = 1;

// Add WebSocket support to the web server, using socket.io.
var io = require('socket.io')(server);


// Serve static files on the root path.
app.use('/', express.static('.'));

io.sockets.on('connection', function(conn) {
  //create user ID and check whether id is in the user array, loop until unique
 
  console.log('Got a connection!');
  if (playerNum == 1){
	playerNum = 2;
	console.log('Player1');
	conn.emit('Player1');
  }
  else if (playerNum == 2){
	playerNum = -1;
	console.log('Player2');
	conn.emit('Player2');
	io.sockets.emit('playersReady');
  }
  else {
	console.log('nope');
	conn.emit('error');
  }
  
  conn.on('sendP1Pos',function(msg){
	io.sockets.emit('getP1Pos', msg);
  });
  
  conn.on('sendP2Pos',function(msg){
	io.sockets.emit('getP2Pos', msg);
  });
  
  conn.on('getWord', function(){
  	var keyword = getRandomWord();
	console.log(keyword);
	io.sockets.emit('randomWord', { word:keyword });
 	});
	
	conn.on('p1Guess', function(msg){
	console.log('Emitting hangman guess for p1');
	io.sockets.emit('p1Guess', { char: msg.char });
 	});
	
  conn.on('p2Guess', function(msg){
	console.log('Emitting hangman guess for p2');
	io.sockets.emit('p2Guess', { char: msg.char });
 	});
	  
	  
  });

	
function getRandomWord(){
	var words = ['mansion', 'kingdom', 'spy', 'weapon', 'tuxedo', 'hacker', 'computer', 'plans'];
	var randomNum = Math.floor(Math.random() * (words.length)) ;
	return words[randomNum];
}

// Listen on a high port.
var port = 12129;
server.listen(port, function() {
  console.log("Listening on port " + port);
});
