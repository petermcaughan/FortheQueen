//var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render:render });

var player;
var doors;
var bossDoors;
var background;
var cursors;
var mapText;
var walls;
var returnButton;
var playerVelocityX = 0;
var playerVelocityY = 0;
var Player2VelocityX = 0;
var Player2VelocityY = 0;
var playerPositionX = 1200;
var playerPositionY = 1100;
var timer;
var player2;
//var total = 0;
//var timeLeft;
	
var mapState = {

	preload: function() {
		this.load.image('door', 'assets/door.png');
		if (playerNum == 1){
			this.load.spritesheet('Spy', 'assets/spy3.png', 400, 600, 16);
			this.load.spritesheet('Spy2', 'assets/spy4.png', 400, 600, 16);
		}
		else if (playerNum == 2){
			this.load.spritesheet('Spy', 'assets/spy4.png', 400, 600, 16);
			this.load.spritesheet('Spy2', 'assets/spy3.png', 400, 600, 16);
		}
		this.load.image('brick', 'assets/wall.png');
		this.load.image('numbers', 'assets/numbers.png');
		this.load.image('floor', 'assets/floor.png');
		timer = this.time.create(false);
		//timer.loop(timeLeft, this.updateCounter, this);
	},
	
	create: function() {



		 //timer

	    //  Set a TimerEvent to occur after 2 seconds
	    timer.loop(timeLeft, this.updateCounter, this);

	    //  Start the timer running - this is important!
	    //  It won't start automatically, allowing you to hook it to button events and the like.
	    timer.start();

		//Controls + World setup
		game.world.setBounds(0,0,3000,3000)
		cursors = game.input.keyboard.createCursorKeys();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		
		// Matrix-esque background
		background = game.add.tileSprite(0,0, 3000, 3000, 'numbers');
		background.alpha = 0.3; //transparency of background
		//Flooring for rooms
		var floor1 = game.add.tileSprite(1000,1000,320,320, 'floor');
		var floor2 = game.add.tileSprite(1320,1000,330,320, 'floor');
		var floor3 = game.add.tileSprite(1650,1000,320,330, 'floor');
		var floor4 = game.add.tileSprite(1650,680,320,320, 'floor');
		var floor5 = game.add.tileSprite(1650,360,320,320, 'floor');
		var floor6 = game.add.tileSprite(1650,1330,320,310, 'floor');
		//Regular doors, boss doors, and walls are groups
		doors = game.add.group();
		doors.enableBody = true;
		bossDoors = game.add.group();
		bossDoors.enableBody = true;
		walls = game.add.group();
		walls.enableBody = true;
		
		console.log(playerVelocityX);
		////////////////////////////////////////////////////////Set the player and the camera up
		//When returning to the map state, the player needs to be spawned where they were before the state switch, but a little further to pass the door they previously touched
		if (playerVelocityX > 0) {
			player = game.add.sprite(playerPositionX + 120, playerPositionY, 'Spy');
			player2 = game.add.sprite(playerPositionX + 140, playerPositionY, 'Spy2');
		}
		else if (playerVelocityX < 0) {
			player = game.add.sprite(playerPositionX - 120, playerPositionY, 'Spy');
			player2 = game.add.sprite(playerPositionX - 140, playerPositionY, 'Spy2');
		}
		else if (playerVelocityY > 0) {
			player = game.add.sprite(playerPositionX, playerPositionY + 130, 'Spy');
			player2 = game.add.sprite(playerPositionX, playerPositionY + 140, 'Spy2');
		}
		else if (playerVelocityY < 0) {
			player = game.add.sprite(playerPositionX, playerPositionY - 130, 'Spy');
			player2 = game.add.sprite(playerPositionX, playerPositionY - 140, 'Spy2');
		}
		else {
		player = game.add.sprite(playerPositionX, playerPositionY, 'Spy');
		player2 = game.add.sprite(playerPositionX +10, playerPositionY + 10 , 'Spy2');
		}
		player.scale.setTo(.1, .1);
		player2.scale.setTo(.1, .1);
		
		// Add animations for player
		player.animations.add('up', [4, 5, 6, 7], 10, true);
		player.animations.add('down', [0, 1, 2, 3], 10, true);
		player.animations.add('left', [8, 9, 10, 11], 10, true);
		player.animations.add('right', [12, 13, 14, 15], 10, true);
		
		player2.animations.add('up', [4, 5, 6, 7], 10, true);
		player2.animations.add('down', [0, 1, 2, 3], 10, true);
		player2.animations.add('left', [8, 9, 10, 11], 10, true);
		player2.animations.add('right', [12, 13, 14, 15], 10, true);
		
		
		//enable physics 
		game.physics.arcade.enable(player);
		player.body.gravity.y = 0;
		player.body.gravity.x = 0;
		player.body.collideWorldBounds = true;
		
		game.physics.arcade.enable(player2);
		player2.body.gravity.y = 0;
		player2.body.gravity.x = 0;
		player2.body.collideWorldBounds = true;
		
		
		//Have amera follow the player
		game.camera.follow(player)
		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
		game.camera.deadzone = new Phaser.Rectangle(200,380,1,1);
		
		
		/////////////////////////////////////////////////////// Create the map
		//Room 1
		//Start
		var x_val = 1000;
		var y_val = 1000;
		
		
		//Top Wall Horizontal
		var wall = walls.create( x_val,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(10, .5);
		//Left wall vertical
		var wall = walls.create( x_val,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 10);
		//bottom wall horizontal
		var wall = walls.create( x_val,y_val+320,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(10, .5);
		//upper half of left wall
		var wall = walls.create( x_val+320,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 4);
		//bottom half of left wall
		var wall = walls.create( x_val+320,y_val+210,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 4);
		//door
		var door = doors.create( x_val+320, y_val+140, 'door');
		door.body.immovable = true;
		
		//Room 2
		var x_val = 1330;
		var y_val = 1000;

		//Top wall horizontal
		var wall = walls.create( x_val,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(10, .5);
		//bottom wall horizontal
		var wall = walls.create( x_val,y_val+320,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(10, .5);
		//right wall upper
		var wall = walls.create( x_val+320,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 4);
		//right door lower
		var wall = walls.create( x_val+320,y_val+210,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 4);
		//door
		var door = doors.create( x_val+320, y_val+140, 'door');
		door.body.immovable = true;
		//Room 3
		var x_val = 1650;
		var y_val = 1000;

		//upper wall left half
		var wall = walls.create( x_val,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//upper wall right half
		var wall = walls.create( x_val+210,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//lower wall left half
		var wall = walls.create( x_val,y_val+320,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//lower wall right half
		var wall = walls.create( x_val+210,y_val+320,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//right wall
		var wall = walls.create( x_val+320,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 10);
		//doors
		var door = doors.create( x_val+150, y_val+300, 'door');
		door.body.immovable = true;
		
		//Room 4
		var x_val = 1650;
		var y_val = 680;

		//left wall
		var wall = walls.create( x_val,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 10);
		//upper wall left half
		var wall = walls.create( x_val,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//upper wall right half
		var wall = walls.create( x_val+210,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//lower wall left half
		var wall = walls.create( x_val,y_val+320,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//lower wall right half
		var wall = walls.create( x_val+210,y_val+320,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//right wall
		var wall = walls.create( x_val+320,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 10);
		//doors
		var door = doors.create( x_val+150, y_val-20, 'door');
		door.body.immovable = true;
		var door = doors.create( x_val+150, y_val+300, 'door');
		door.body.immovable = true;
		
		//Room 5 (VERY TOP)
		var x_val = 1650;
		var y_val = 360;

		//left wall
		var wall = walls.create( x_val,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 10);
		//upper wall left half
		var wall = walls.create( x_val,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//upper wall right half
		var wall = walls.create( x_val+210,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(4, .5);
		//right wall
		var wall = walls.create( x_val+320,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 10);
		//doors
		var bossDoor = bossDoors.create( x_val+150, y_val-20, 'door');
		bossDoor.body.immovable = true;
		//Room 6 (VERY BOTTOM)
		var x_val = 1650;
		var y_val = 1300;

		//left wall
		var wall = walls.create( x_val,y_val,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 10);
		//lower wall
		var wall = walls.create( x_val,y_val+320,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(10, .5);
		//right wall
		var wall = walls.create( x_val+320,y_val+20,'brick');
		wall.body.immovable = true;
		wall.scale.setTo(.5, 10);
		
		setInterval(this.updatePosition, 100);
		setInterval(this.getPosition, 100);
	
	},

	updateCounter: function(){
	    total++;
	    timeLeft = timeLeft - total;
	},

	updatePosition: function(){
		
	if  (playerNum == 1){
		socket.emit('sendP1Pos', { 
			x_vel: player.body.velocity.x, 
			y_vel: player.body.velocity.y,
			x_pos: player.x,
			y_pos: player.y});	
		//console.log('I fired.');
	}
	
	if  (playerNum == 2){
		socket.emit('sendP2Pos', { 
			x_vel: player.body.velocity.x, 
			y_vel: player.body.velocity.y,
			x_pos: player.x,
			y_pos: player.y});	
		//console.log('I fired.');
	}
	
	
	
	},
		

	getPosition: function(){
		
	if  (playerNum == 1){
		socket.on('getP2Pos', function(msg){ 
			player2.x = msg.x_pos;
			player2.y = msg.y_pos;
			Player2VelocityX = msg.x_vel;
			Player2VelocityY = msg.y_vel;
	});
	}
	
	else if  (playerNum == 2){
		socket.on('getP1Pos', function(msg){ 
			player2.x = msg.x_pos;
			player2.y = msg.y_pos;
			Player2VelocityX = msg.x_vel;
			Player2VelocityY = msg.y_vel;
	});
	}
	
	
	},
	
	update: function() {
		
		//Look for collisions with walls
		game.physics.arcade.collide(player, walls);
		//Player should be moving still by default
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		
		//If player is touching a door, handle it accordingly with chooseGame and bossGame functions
		game.physics.arcade.collide(player, doors, this.gameCheck, null, this);
		game.physics.arcade.collide(player, bossDoors, this.bossCheck, null, this);
		
		//Move controls
		if (cursors.left.isDown)
		{
			//  Move to the left
			player.body.velocity.x = -150;
			playerVelocityX = -150;
			playerVelocityY = 0;
			player.animations.play('left');
			
		}
		else if (cursors.right.isDown)
		{
			//  Move to the right
			player.body.velocity.x = 150;
			playerVelocityX = 150;
			playerVelocityY = 0;
			player.animations.play('right');
		}
		else if (cursors.down.isDown)
		{
			//  Move up
			player.body.velocity.y = 150;
			playerVelocityX = 0;
			playerVelocityY = 150;
			player.animations.play('down');
		}
		else if (cursors.up.isDown)
		{
			//  Move down
			player.body.velocity.y = -150;
			playerVelocityX = 0;
			playerVelocityY = -150;
			player.animations.play('up');
		}
		else
		{
			//  Stand still
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
			player.animations.stop();

		}
		
		if (Player2VelocityX > 0){
			player2.animations.play('right');
			console.log('went right');
		}
		else if (Player2VelocityX < 0){
			player2.animations.play('left');
		}
		else if (Player2VelocityY > 0){
			player2.animations.play('down');
		}
		else if (Player2VelocityY < 0){
			player2.animations.play('up');
		}
		else{
			player2.animations.stop();
		}
	
	},

//Used for displaying camera info, used for debugging
	render: function(){
	 //game.debug.cameraInfo(game.camera, 32, 32);
	 game.debug.text('Time Remaining: ' + timer.duration.toFixed(0)/1000, 300, 10);
	},
	
	//Kill Door, display that the player crossed a boss door
	bossGame: function(player, bossDoor){
		bossDoor.kill()
		playerPositionX = player.x;
		playerPositionY = player.y;
		var bossText = game.add.text(1800, 320, "BOSS GAME	", {
			font: "16px Arial",
			fill: "#ff0044",
		}); 
		bossText.anchor.setTo(0.5, 0.5);
		game.state.states['shootState'].timeLeft = timer.duration.toFixed(0)/1000;
		game.state.start('shootState');
	},



//Kill door, choose random game, tell player which game activated
	chooseGame: function(player, door){
		door.kill()
		//Save the players position
		playerPositionX = player.x;
		playerPositionY = player.y;
		console.log("Player velocity is " + playerVelocityX);
		var rand = game.rnd.integerInRange(1,4);
		//Create text object where door used to be
		var mapText = game.add.text(door.x, door.y, "here", {
			font: "16px Arial",
			fill: "#ff0044",
		}); 
		mapText.anchor.setTo(0.5, 0.5);
		//console.log(rand)
		rand = 1;
		if (rand == 1){
			mapText.setText(" Simon Says game activated.");
			game.state.states['simonState'].timeLeft = timer.duration.toFixed(0)/1000;
			game.state.start('simonState');
			}
		else if (rand == 2){
			mapText.setText(" Hangman game activated.");
			game.state.states['safeState'].timeLeft = timer.duration.toFixed(0)/1000;
			game.state.start('safeState');
			}
		else if (rand == 3){
			mapText.setText(" WireCutter game activated.");
			game.state.states['wireState'].timeLeft = timer.duration.toFixed(0)/1000;
			game.state.start('wireState');
			
			}
		else if (rand == 4){
			mapText.setText(" Frequency Jammer game activated.");
			
			}
	},
	
	gameCheck: function(player, door){
		game.physics.arcade.collide(player2, door, this.chooseGame, null, this);
	},
	
	bossCheck: function(player, door){
		game.physics.arcade.collide(player2, door, this.bossGame, null, this);
	}


	
};