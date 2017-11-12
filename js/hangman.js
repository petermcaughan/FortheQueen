var randomWord = ['a', 'b', 'c'];
var playerTurn = 1;
var correctLetters = 100;
var remainingTries;
var triesText;
var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z;
var hangmanState = {

	
	//This code sucks to read. Each sprite has a click handler, and a handler for dealing with socket inputs. Lots of repeated things.
	preload: function(){
		this.load.image('A', 'assets/alphabet/Marble/letter_A.png');
		this.load.image('B', 'assets/alphabet/Marble/letter_B.png');
		this.load.image('C', 'assets/alphabet/Marble/letter_C.png');
		this.load.image('D', 'assets/alphabet/Marble/letter_D.png');
		this.load.image('E', 'assets/alphabet/Marble/letter_E.png');
		this.load.image('F', 'assets/alphabet/Marble/letter_F.png');
		this.load.image('G', 'assets/alphabet/Marble/letter_G.png');
		this.load.image('H', 'assets/alphabet/Marble/letter_H.png');
		this.load.image('I', 'assets/alphabet/Marble/letter_I.png');
		this.load.image('J', 'assets/alphabet/Marble/letter_J.png');
		this.load.image('K', 'assets/alphabet/Marble/letter_K.png');
		this.load.image('L', 'assets/alphabet/Marble/letter_L.png');
		this.load.image('M', 'assets/alphabet/Marble/letter_M.png');
		this.load.image('N', 'assets/alphabet/Marble/letter_N.png');
		this.load.image('O', 'assets/alphabet/Marble/letter_O.png');
		this.load.image('P', 'assets/alphabet/Marble/letter_P.png');
		this.load.image('Q', 'assets/alphabet/Marble/letter_Q.png');
		this.load.image('R', 'assets/alphabet/Marble/letter_R.png');
		this.load.image('S', 'assets/alphabet/Marble/letter_S.png');
		this.load.image('T', 'assets/alphabet/Marble/letter_T.png');
		this.load.image('U', 'assets/alphabet/Marble/letter_U.png');
		this.load.image('V', 'assets/alphabet/Marble/letter_V.png');
		this.load.image('W', 'assets/alphabet/Marble/letter_W.png');
		this.load.image('X', 'assets/alphabet/Marble/letter_X.png');
		this.load.image('Y', 'assets/alphabet/Marble/letter_Y.png');
		this.load.image('Z', 'assets/alphabet/Marble/letter_Z.png');
		this.load.image('back_button', 'assets/return.png');
		},
		
	create: function() {
		// Set tries and correct words
		remainingTries = 3;
		correctLetters = 0;
		// Get word
		this.getWord();
		//Space out and place alphabet tiles and set correct callback function
		var seperation = 80;
		var start_x = 70;
		a = game.add.sprite(start_x,300,'A');
		a.scale.setTo(.25, .25);
		a.inputEnabled = true;
		a.events.onInputDown.add(this.touchA, this);
		b = game.add.sprite(start_x + seperation*1,300,'B');
		b.scale.setTo(.25, .25);
		b.inputEnabled = true;
		b.events.onInputDown.add(this.touchB, this);
		c = game.add.sprite(start_x + seperation*2,300,'C');
		c.scale.setTo(.25, .25);
		c.inputEnabled = true;
		c.events.onInputDown.add(this.touchC, this);
		d = game.add.sprite(start_x + seperation*3,300,'D');
		d.scale.setTo(.25, .25);
		d.inputEnabled = true;
		d.events.onInputDown.add(this.touchD, this);
		e = game.add.sprite(start_x + seperation*4,300,'E');
		e.scale.setTo(.25, .25);
		e.inputEnabled = true;
		e.events.onInputDown.add(this.touchE, this);
		f = game.add.sprite(start_x + seperation*5,300,'F');
		f.scale.setTo(.25, .25);
		f.inputEnabled = true;
		f.events.onInputDown.add(this.touchF, this);
		g = game.add.sprite(start_x + seperation*6,300,'G');
		g.scale.setTo(.25, .25);
		g.inputEnabled = true;
		g.events.onInputDown.add(this.touchG, this);
		h = game.add.sprite(start_x + seperation*7,300,'H');
		h.scale.setTo(.25, .25);
		h.inputEnabled = true;
		h.events.onInputDown.add(this.touchH, this);
		i = game.add.sprite(start_x,380,'I');
		i.scale.setTo(.25, .25);
		i.inputEnabled = true;
		i.events.onInputDown.add(this.touchI, this);
		j = game.add.sprite(start_x + seperation*1,380,'J');
		j.scale.setTo(.25, .25);
		j.inputEnabled = true;
		j.events.onInputDown.add(this.touchJ, this);
		k = game.add.sprite(start_x + seperation*2,380,'K');
		k.scale.setTo(.25, .25);
		k.inputEnabled = true;
		k.events.onInputDown.add(this.touchK, this);
		l = game.add.sprite(start_x + seperation*3,380,'L');
		l.scale.setTo(.25, .25);
		l.inputEnabled = true;
		l.events.onInputDown.add(this.touchL, this);
		m = game.add.sprite(start_x + seperation*4,380,'M');
		m.scale.setTo(.25, .25);
		m.inputEnabled = true;
		m.events.onInputDown.add(this.touchM, this);
		n = game.add.sprite(start_x + seperation*5,380,'N');
		n.scale.setTo(.25, .25);
		n.inputEnabled = true;
		n.events.onInputDown.add(this.touchN, this);
		o = game.add.sprite(start_x + seperation*6,380,'O');
		o.scale.setTo(.25, .25);
		o.inputEnabled = true;
		o.events.onInputDown.add(this.touchO, this);
		p = game.add.sprite(start_x + seperation*7,380,'P');
		p.scale.setTo(.25, .25);
		p.inputEnabled = true;
		p.events.onInputDown.add(this.touchP, this);
		q = game.add.sprite(start_x,460,'Q');
		q.scale.setTo(.25, .25);
		q.inputEnabled = true;
		q.events.onInputDown.add(this.touchQ, this);
		r = game.add.sprite(start_x + seperation*1,460,'R');
		r.scale.setTo(.25, .25);
		r.inputEnabled = true;
		r.events.onInputDown.add(this.touchR, this);
		s = game.add.sprite(start_x + seperation*2,460,'S');
		s.scale.setTo(.25, .25);
		s.inputEnabled = true;
		s.events.onInputDown.add(this.touchS, this);
		t = game.add.sprite(start_x + seperation*3,460,'T');
		t.scale.setTo(.25, .25);
		t.inputEnabled = true;
		t.events.onInputDown.add(this.touchT, this);
		u = game.add.sprite(start_x + seperation*4,460,'U');
		u.scale.setTo(.25, .25);
		u.inputEnabled = true;
		u.events.onInputDown.add(this.touchU, this);
		v = game.add.sprite(start_x + seperation*5,460,'V');
		v.scale.setTo(.25, .25);
		v.inputEnabled = true;
		v.events.onInputDown.add(this.touchV, this);
		w = game.add.sprite(start_x + seperation*6,460,'W');
		w.scale.setTo(.25, .25);
		w.inputEnabled = true;
		w.events.onInputDown.add(this.touchW, this);
		x = game.add.sprite(start_x + seperation*7,460,'X');
		x.scale.setTo(.25, .25);
		x.inputEnabled = true;
		x.events.onInputDown.add(this.touchX, this);
		y = game.add.sprite(start_x + seperation*3,540,'Y');
		y.scale.setTo(.25, .25);
		y.inputEnabled = true;
		y.events.onInputDown.add(this.touchY, this);
		z = game.add.sprite(start_x + seperation*4,540,'Z');
		z.scale.setTo(.25, .25);
		z.inputEnabled = true;
		z.events.onInputDown.add(this.touchZ, this);
		
		//RETURN BUTTON
		this.returnButton = this.game.add.sprite(0,0,'back_button');
		this.returnButton.scale.setTo(.1,.1);
		this.returnButton.inputEnabled = true; 
		this.returnButton.events.onInputDown.add(this.goBack, this);
		
		//Tries Remaining
		triesText = game.add.text(400, 50, " Terminal Status", {
					font: "30px Arial",
					fill: "#00ff00",
				});
		
		//Set Interval for looking for tries
		this.checkAttempt();
		},
		
	update: function(){
		if (correctLetters == randomWord.length){
			this.playWin();
		}
		
	},
	
	
	checkAttempt: function(){
			var guessedChar;
			if (playerNum == 1){
				console.log('player1 listened');
				socket.on('p2Guess', function(msg){
					console.log('p1 got this: ', msg.char);
					guessedChar = msg.char;
					if (guessedChar == 'a'){
						a.kill();
						hangmanState.findChar('a');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'b'){
						b.kill();
						hangmanState.findChar('b');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'c'){
						c.kill();
						hangmanState.findChar('c');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'd'){
						d.kill();
						hangmanState.findChar('d');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'e'){
						e.kill();
						hangmanState.findChar('e');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'f'){
						f.kill();
						hangmanState.findChar('f');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'g'){
						g.kill();
						hangmanState.findChar('g');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'h'){
						h.kill();
						hangmanState.findChar('h');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'i'){
						i.kill();
						hangmanState.findChar('i');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'j'){
						j.kill();
						hangmanState.findChar('j');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'k'){
						k.kill();
						hangmanState.findChar('k');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'l'){
						l.kill();
						hangmanState.findChar('l');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'm'){
						m.kill();
						hangmanState.findChar('m');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'n'){
						n.kill();
						hangmanState.findChar('n');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'o'){
						o.kill();
						hangmanState.findChar('o');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'p'){
						p.kill();
						hangmanState.findChar('p');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'q'){
						q.kill();
						hangmanState.findChar('q');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'r'){
						r.kill();
						hangmanState.findChar('r');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 's'){
						s.kill();
						hangmanState.findChar('s');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 't'){
						t.kill();
						hangmanState.findChar('t');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'u'){
						u.kill();
						hangmanState.findChar('u');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'v'){
						v.kill();
						hangmanState.findChar('v');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'w'){
						w.kill();
						hangmanState.findChar('w');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'x'){
						x.kill();
						hangmanState.findChar('x');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'y'){
						y.kill();
						hangmanState.findChar('y');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'z'){
						z.kill();
						hangmanState.findChar('z');
						//hangmanState.checkAttempt();
					}
				});
			}
	
		
				else if (playerNum == 2){
				console.log('player2 listened');
				socket.on('p1Guess', function(msg){
					guessedChar = msg.char;
					console.log('p2 got this: ', msg.char);
					if (guessedChar == 'a'){
						a.kill();
						hangmanState.findChar('a');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'b'){
						b.kill();
						hangmanState.findChar('b');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'c'){
						c.kill();
						hangmanState.findChar('c');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'd'){
						d.kill();
						hangmanState.findChar('d');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'e'){
						e.kill();
						hangmanState.findChar('e');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'f'){
						f.kill();
						hangmanState.findChar('f');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'g'){
						g.kill();
						hangmanState.findChar('g');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'h'){
						h.kill();
						hangmanState.findChar('h');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'i'){
						i.kill();
						hangmanState.findChar('i');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'j'){
						j.kill();
						hangmanState.findChar('j');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'k'){
						k.kill();
						hangmanState.findChar('k');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'l'){
						l.kill();
						hangmanState.findChar('l');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'm'){
						m.kill();
						hangmanState.findChar('m');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'n'){
						n.kill();
						hangmanState.findChar('n');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'o'){
						o.kill();
						hangmanState.findChar('o');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'p'){
						p.kill();
						hangmanState.findChar('p');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'q'){
						q.kill();
						hangmanState.findChar('q');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'r'){
						r.kill();
						hangmanState.findChar('r');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 's'){
						s.kill();
						hangmanState.findChar('s');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 't'){
						t.kill();
						hangmanState.findChar('t');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'u'){
						u.kill();
						hangmanState.findChar('u');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'v'){
						v.kill();
						hangmanState.findChar('v');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'w'){
						w.kill();
						hangmanState.findChar('w');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'x'){
						x.kill();
						hangmanState.findChar('x');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'y'){
						y.kill();
						hangmanState.findChar('y');
						//hangmanState.checkAttempt();
					}
					else if (guessedChar == 'z'){
						z.kill();
						hangmanState.findChar('z');
						//hangmanState.checkAttempt();
					}
				});
				}
	},
	
	touchA: function(){
		a.kill();
		this.findChar('a');
		console.log('i am emitting a.');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'a'});
		}
		else{
			socket.emit('p2Guess', {char: 'a'});
		}
		
	},
	
	touchB: function(){
		b.kill();
		this.findChar('b');
		console.log('i am emitting b.');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'b'});
		}
		else{
			socket.emit('p2Guess', {char: 'b'});
		}
	},
	
	touchC: function(){
		c.kill();
		this.findChar('c');
		console.log('i am emitting c.');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'c'});
		}
		else{
			socket.emit('p2Guess', {char: 'c'});
		}
	},
	
	touchD: function(){
		d.kill();
		this.findChar('d');
		console.log('i am emitting d.');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'd'});
		}
		else{
			socket.emit('p2Guess', {char: 'd'});
		}
	},
	
	touchE: function(){
		e.kill();
		this.findChar('e');
		console.log('i am emitting e.');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'e'});
		}
		else{
			socket.emit('p2Guess', {char: 'e'});
		}
	},
	
	touchF: function(){
		f.kill();
		this.findChar('f');
		console.log('i am emitting f.');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'f'});
		}
		else{
			socket.emit('p2Guess', {char: 'f'});
		}
	},
	
	touchG: function(){
		g.kill();
		this.findChar('g');
		console.log('i am emitting g.');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'g'});
		}
		else{
			socket.emit('p2Guess', {char: 'g'});
		}
	},
	
	touchH: function(){
		h.kill();
		this.findChar('h');
		console.log('i am emitting h.');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'h'});
		}
		else{
			socket.emit('p2Guess', {char: 'h'});
		}
	},
	
	touchI: function(){
		i.kill();
		this.findChar('i');
		console.log('i am emitting i.');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'i'});
		}
		else{
			socket.emit('p2Guess', {char: 'i'});
		}
	},
	
	touchJ: function(){
		j.kill();
		this.findChar('j');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'j'});
		}
		else{
			socket.emit('p2Guess', {char: 'j'});
		}
	},
	
	touchK: function(){
		k.kill();
		this.findChar('k');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'k'});
		}
		else{
			socket.emit('p2Guess', {char: 'k'});
		}
	},
	
	touchL: function(){
		l.kill();
		this.findChar('l');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'l'});
		}
		else{
			socket.emit('p2Guess', {char: 'l'});
		}
	},
	
	touchM: function(){
		m.kill();
		this.findChar('m');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'm'});
		}
		else{
			socket.emit('p2Guess', {char: 'm'});
		}
	},
	
	touchN: function(){
		n.kill();
		this.findChar('n');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'n'});
		}
		else{
			socket.emit('p2Guess', {char: 'n'});
		}
	},
	
	touchO: function(){
		o.kill();
		this.findChar('o');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'o'});
		}
		else{
			socket.emit('p2Guess', {char: 'o'});
		}
	},
	
	touchP: function(){
		p.kill();
		this.findChar('p');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'p'});
		}
		else{
			socket.emit('p2Guess', {char: 'p'});
		}
	},
	
	touchQ: function(){
		q.kill();
		this.findChar('q');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'q'});
		}
		else{
			socket.emit('p2Guess', {char: 'q'});
		}
	},
	
	touchR: function(){
		r.kill();
		this.findChar('r');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'r'});
		}
		else{
			socket.emit('p2Guess', {char: 'r'});
		}
	},
	
	touchS: function(){
		s.kill();
		this.findChar('s');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 's'});
		}
		else{
			socket.emit('p2Guess', {char: 's'});
		}
	},
	
	touchT: function(){
		t.kill();
		this.findChar('t');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 't'});
		}
		else{
			socket.emit('p2Guess', {char: 't'});
		}
	},
	
	touchU: function(){
		u.kill();
		this.findChar('u');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'u'});
		}
		else{
			socket.emit('p2Guess', {char: 'u'});
		}
	},
	
	touchV: function(){
		v.kill();
		this.findChar('v');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'v'});
		}
		else{
			socket.emit('p2Guess', {char: 'v'});
		}
	},
	
	touchW: function(){
		w.kill();
		this.findChar('w');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'w'});
		}
		else{
			socket.emit('p2Guess', {char: 'w'});
		}
	},
	
	touchX: function(){
		x.kill();
		this.findChar('x');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'x'});
		}
		else{
			socket.emit('p2Guess', {char: 'x'});
		}
	},
	
	touchY: function(){
		y.kill();
		this.findChar('y');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'y'});
		}
		else{
			socket.emit('p2Guess', {char: 'y'});
		}
	},
	
	touchZ: function(){
		z.kill();
		this.findChar('z');
		if (playerNum == 1){
			socket.emit('p1Guess', {char : 'z'});
		}
		else{
			socket.emit('p2Guess', {char: 'z'});
		}
	},
	
	getWord: function(){
		//Get word from server, return it
		//only have player 1 request, have both players receive
		if (playerNum == 1){
		socket.emit('getWord');
		}
		//When you get word, put it as an array into randomWord variable, and create blanks accordingly. 
		socket.on('randomWord', function(msg){
			console.log('I got ', msg.word);
			randomWord = msg.word;
			randomWord = randomWord.split('');
			console.log(randomWord);
			var blanks = "__ \t \t";
			var i = randomWord.length - 1;
			while (i--){
				blanks = blanks.concat("__ \t \t");
			}
			var blankText = game.add.text(100, 200, blanks, {
					font: "32px Arial",
					fill: "#FFFFFF",
				});
		});
		
	},

	findChar: function(letter){
		//Look through randomWord array and look for character input. If found, place a letter in the correct spot.
		var tmp = randomWord.length;
		while (tmp--){
			if (randomWord[tmp] == letter){
				console.log('I found letter ', letter, ' in the word in index ', tmp);
				correctLetters++;
				var letterText = game.add.text(110 + 72*tmp, 200, letter, {
					font: "32px Arial",
					fill: "#FFFFFF",
				});
				return;
			}
		}
		//Letter wasnt found
		
		//update remainingTries and text.
		
		if (remainingTries == 3){
			triesText.setText = "Tries Remaining: \t 3 \t 2 ";
			triesText.fill = '#ffff00';
			remainingTries--;
		}
		else if (remainingTries == 2){
			triesText.setText = "Tries Remaining: \t 3 \t 2 \t 1 ";
			triesText.fill = '#ff0000';
			remainingTries--;
		}
		else if (remainingTries == 1){
			triesText.fill = '#000000';
			var loseText = game.add.text(400,50,"YOU LOSE!", {
				font: "32px Arial",
				fill: '#ff0000',
			});
			window.setTimeout(hangmanRestart, 2000);
		}
	},
	
	playWin: function(){
		triesText.fill = '#000000';
			var winText = game.add.text(400,50,"YOU WIN!", {
				font: "32px Arial",
				fill: '#00ff00',
			});
			window.setTimeout(hangmanRestart, 2000);
		
	},
	goBack: function(){
	  game.state.start('introState');
	}

	
	};

function hangmanRestart(){
	game.state.start('mapState');
}