var timeLeft = 100000;
var total = 0;

var introState = {

	preload: function(){
		this.load.image('playButton', 'assets/play_button.png');
		this.load.image('rulesButton','assets/rules_button.png');
		this.load.image('introScreen', 'assets/intro_screen.jpg');
		this.load.image('background', 'assets/spy_background.jpg');
		},
		
	create: function() {
		var background = game.add.sprite(0,0,'background');
		var introScreen = game.add.sprite(184,40,'introScreen');
		introScreen.scale.setTo(.6,.6);
		
		//Set up rules button
		rulesButton = game.add.sprite(97,400, 'rulesButton');
		rulesButton.inputEnabled = true; 
		rulesButton.events.onInputDown.add(this.gotoRules, this);
		
		//Set up play button
		var playButton = game.add.sprite(420,400, 'playButton');
		playButton.inputEnabled = true; 
		playButton.events.onInputDown.add(this.gotoPlay, this);
		},
		
	update: function(){
	
	
	},
	
	gotoPlay: function(){
		total = 0;
		//game.state.states['mapState'].timeLeft = 100000;
		game.state.start('connectState');
	},
	
	gotoRules: function(){
		game.state.start('rulesState');
	}
	
	};