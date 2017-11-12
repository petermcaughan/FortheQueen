var rulesState = {

	preload: function(){
		this.load.image('background', 'assets/spy_background.jpg');
		this.load.image('back_button', 'assets/return.png');
		},
		
	create: function() {
		var background = game.add.sprite(0,0,'background');
		
		//RETURN BUTTON
		this.returnButton = this.game.add.sprite(0,0,'back_button');
		this.returnButton.scale.setTo(.1,.1);
		this.returnButton.inputEnabled = true; 
		this.returnButton.events.onInputDown.add(this.goBack, this);
		
		var RulesText = game.add.text(100, 200, "This is the rules text! Add stuff here later. Go back using the upper arrow.", {
			font: "20px Arial",
			fill: "#FFFFFF",
		}); 
		
		},
		
	update: function(){
	
	
	},
	
	goBack: function(){
	  game.state.start('introState');
	}

	
	};