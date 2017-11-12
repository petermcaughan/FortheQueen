var connectState = {

	preload: function(){
		this.load.image('background', 'assets/spy_background.jpg');
		this.load.image('back_button', 'assets/return.png');
		},
		
	create: function() {
		var background = game.add.sprite(0,0,'background');
		
		var RulesText = game.add.text(100, 200, "Waiting for other player...", {
			font: "20px Arial",
			fill: "#FFFFFF",
		}); 
		
		socket = io();
		
		},
		
	update: function(){
		socket.on('playersReady', function(conn){
			//game.state.start('mapState');
			game.state.start('hangmanState');
			}
			);
		
		socket.on('Player1', function(conn){
			playerNum = 1;
			console.log('I am player 1!');
			}
			);
		
		socket.on('Player2', function(conn){
			playerNum = 2;
			console.log('I am player 2!');
			}
			);
	
	},
	
	goBack: function(){
	  game.state.start('introState');
	}

	
	};