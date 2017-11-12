
/***********************/
/*  GLOBAL VARIABLES   */
/***********************/
var turn_part;
var lock;
var instructions;
var triangle;
var leftKey;
var rightKey;
//var returnButton;

var timer;
//var total = 0;
//var timeLeft;

//var socket = io();
var safeState = {

  // loads the game assets before the game starts
  preload: function() {
    // load background
	this.load.image('back_button', 'assets/return.png');
    this.load.image('background', 'assets/images/background.jpg');

    // load sprites for turning lock
    this.load.image('lock', 'assets/images/lock.png');
    this.load.image('triangle', 'assets/images/triangle.png');
    this.load.image('turn-part', 'assets/images/turn-part.png');
    // emit connected
   // socket.emit('connection', {debugMsg: 'connected'});


  },

  // executed after everything is loaded
  create: function () {
    this.background = this.game.add.sprite(0,0, 'background');

	//RETURN BUTTON
	this.returnButton = this.game.add.sprite(0,0,'back_button');
	this.returnButton.scale.setTo(.1,.1);
	this.returnButton.inputEnabled = true;
	this.returnButton.events.onInputDown.add(this.goBack, this);

    lock = this.game.add.sprite(320, 179, 'lock');
    lock.scale.setTo(0.3);
    turn_part = this.game.add.sprite(400, 300, 'turn-part');
    turn_part.scale.setTo(0.3);
    turn_part.anchor.setTo(0.5, 0.5);
    triangle = this.game.add.sprite(380, 210, 'triangle');

    instructions =
    game.add.text(game.world.centerX-300, game.world.centerY-300,
      'Use Arrow keys to rotate lock', {fill: "cyan"});
    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x00ff00, 1);
    graphics.drawCircle(600, 150, 75);

      //timer
    timer = this.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(timeLeft, this.updateCounter, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();

  },
  // this is executed many times per second
  update: function () {
    if (playerNum == 1){
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    if (leftKey.isDown) {
      console.log('sending leftKey');
      socket.emit('leftKey', {move : function(){
        turn_part.angle += 1;
      }});
    turn_part.angle += 1;
    console.log('angle is : ' + turn_part.angle)
    }
    if (rightKey.isDown){
      turn_part.angle -= 1;
      console.log('sending rightKey');
      socket.emit('rightKey', {move : function(){
        turn_part.angle -= 1;
      }});
      console.log('angle is : ' + turn_part.angle)
    }
}
if (playerNum == 2){
  //TODO handle this 
}
  },

  updateCounter: function(){
        total++;
        timeLeft = timeLeft - total;
  },

  render: function() {
    game.debug.text('Time Remaining: ' + timer.duration.toFixed(0)/1000, 300, 10);
},



  goBack: function(){
    game.state.states['mapState'].timeLeft = timer.duration.toFixed(0)/1000;
	  game.state.start('mapState');
  }
};
