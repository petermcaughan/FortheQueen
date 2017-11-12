

var counter = 0; 
var wireText;
var scissors;


var timer;
//var total = 0;
//var timeLeft;

var wireState = {

preload: function() {

	this.load.image('back_button', 'assets/return.png');
    this.load.image('box', 'assets/box.png'); 
    this.load.image('redwire', 'assets/redwire.png');
    this.load.image('greenwire', 'assets/greenwire.png');
    this.load.image('scissors', 'assets/scissors.png');
	this.load.image('numbers', 'assets/numbers.png');
},  

create: function() {
	//RETURN BUTTON
	this.returnButton = this.game.add.sprite(0,0,'back_button');
	this.returnButton.scale.setTo(.1,.1);
	this.returnButton.inputEnabled = true; 
	this.returnButton.events.onInputDown.add(this.goBack, this);
	
	
	var background = game.add.tileSprite(0,0, 3000, 3000, 'box');
	background.alpha = 0.3; //transparency of background
	cursors = game.input.keyboard.createCursorKeys();
    this.box = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'box'); 
    this.box.scale.setTo(0.5);
    this.box.anchor.setTo(0.5, 0.5);

    this.redwire = this.game.add.sprite(400, 200 , 'redwire');
    this.redwire.scale.setTo(0.5); 
    this.redwire.anchor.setTo(0.5, 0.5);

    this.greenwire = this.game.add.sprite(400, 400 , 'greenwire');
    this.greenwire.scale.setTo(0.5); 
    this.greenwire.anchor.setTo(0.5, 0.5);

    this.scissors= this.game.add.sprite(300, 300, 'scissors');
    this.scissors.anchor.setTo(0.75, 0.5);

    this.scissors.inputEnabled = true; 
    this.scissors.input.enableDrag(true); 

    this.greenwire.inputEnabled = true; 
    wireText = game.add.text(175, 0, '', { fill: 'cyan' });
    this.greenwire.events.onInputDown.add(this.touch, this);

    //timer
    timer = this.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(timeLeft, this.updateCounter, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();       

    <!-- https://phaser.io/examples/v2/input/key -->

	},

    updateCounter: function(){
        total++;
        timeLeft = timeLeft - total
    },

    render: function() {
        game.debug.text('Time Remaining: ' + timer.duration.toFixed(0)/1000, 300, 10);
    },


update:function() {
    if(cursors.up.isDown){
        //scissors.y--;
    }
    else if(cursors.down.isDown){
       // scissors.y++;
    }

    if(cursors.left.isDown){
       // scissors.x--;
    }
    else if(cursors.right.isDown){
       // scissors.x++; 
    }
	},
	
 goBack: function(){
      game.state.states['mapState'].timeLeft = timer.duration.toFixed(0)/1000;
	  game.state.start('mapState');
  },

 touch: function(){
    counter++; 
    wireText.text = "You clicked the greenwire " + counter + " times!"; 
}

}; 