// mods by Patrick OReilly
// Twitter: @pato_reilly Web: http://patricko.byethost9.com


var simon;
var N = 6; //All sequences should be 6 numbers
var userCount = 0;
var currentCount = 0;
var sequenceCount = 16;
var sequenceList = [];
var simonSez = false;
var timeCheck;
var litSquare;
var winner;
var loser;
var intro;

var timer;
//var total = 0;
//var timeLeft;

var simonState = { 

preload: function() {
	this.load.image('back_button', 'assets/return.png');
    this.load.spritesheet('item', 'assets/KeyPad.png', 171, 105, 12);
},


create: function() {


    //timer
    timer = this.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(timeLeft, this.updateCounter, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();    


	//RETURN BUTTON
	//this.returnButton = this.game.add.sprite(0,0,'back_button', this);
	//this.returnButton.scale.setTo(.1,.1);
	//this.returnButton.inputEnabled = true; 
	//this.returnButton.events.onInputDown.add(this.goBack, this);
	
	
    //game.stage.backgroundColor = rgb(100,100,100);
    simon = this.add.group();
    var item;

    for (var i = 0; i < 3; i++)
    {
        item = simon.create(171 + 171 * i, 105, 'item', i);
        // Enable input.
        item.inputEnabled = true;
        item.input.start(0, true);
        item.events.onInputDown.add(this.select, this);
        item.events.onInputUp.add(this.release, this);
        item.events.onInputOut.add(this.moveOff, this);
        simon.getAt(i).alpha = 0;
    }

    for (var i = 0; i < 3; i++)
    {
        item = simon.create(171 + 171 * i, 210, 'item', i + 3);
        // Enable input.
        item.inputEnabled = true;
        item.input.start(0, true);
        item.events.onInputDown.add(this.select, this);
        item.events.onInputUp.add(this.release, this);
        item.events.onInputOut.add(this.moveOff, this);
        simon.getAt(i + 3).alpha = 0;
    }

    for (var i = 0; i < 3; i++)
    {
        item = simon.create(171 + 171 * i, 315, 'item', i + 6);
        // Enable input.
        item.inputEnabled = true;
        item.input.start(0, true);
        item.events.onInputDown.add(this.select, this);
        item.events.onInputUp.add(this.release, this);
        item.events.onInputOut.add(this.moveOff, this);
        simon.getAt(i + 6).alpha = 0;
    }

    this.introTween();
    this.setUp();
    //setTimeout(function(){this.simonSequence; intro = false;}, 6000, this);
    setInterval(function(){this.simonSequence; intro = false;}, 6000);
    //this.simonSequence();
    //intro = false;

},

updateCounter: function(){
        total++;
        timeLeft = timeLeft - total;
},


restart: function() {

    N = 6
    userCount = 0;
    currentCount = 0;
    sequenceList = [];
    winner = false;
    loser = false;
    this.introTween();
    this.setUp();
    setTimeout(function(){this.simonSequence; intro=false;}, 9000);

},

introTween: function() {

    intro = true;

    for (var i = 0; i < 9; i++)
    {
        var flashing = this.add.tween(simon.getAt(i)).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true);
        var final = this.add.tween(simon.getAt(i)).to( { alpha: .25 }, 500, Phaser.Easing.Linear.None, true);

        flashing.chain(final);
        flashing.start();
    }

},

update: function() {

    if (simonSez)
    {
        if (this.time.now - timeCheck >700-N*40)
        {
            simon.getAt(litSquare).alpha = .25;
            this.paused = true;

            setTimeout(function()
            {
                if ( currentCount< N)
                {
                    this.paused = false;
                    this.simonSequence();
                }
                else
                {
                    simonSez = false;
                    this.paused = false;
                }
            }, 400 - N * 20);
        }
    }
},

playerSequence: function(selected) {

    correctSquare = sequenceList[userCount];
    userCount++;
    thisSquare = simon.getIndex(selected);

    if (thisSquare == correctSquare)
    {
        if (userCount == N)
        {
            if (N == sequenceCount)
            {
                winner = true;
                setTimeout(function(){this.restart;}, 3000);
            }
            else
            {
                userCount = 0;
                currentCount = 0;
                //N++;
                simonSez = true;
            }
        }
    }
    else
    {
        loser = true;
        setTimeout(function(){this.restart;}, 3000);
    }

},

simonSequence: function () {
   // for(var i = 0; i < sequenceCount; i++){
        simonSez = true;
        litSquare = sequenceList[currentCount];
        simon.getAt(litSquare).alpha = 1;
        timeCheck = this.time.now;
        currentCount++;
    //}

},

setUp: function() {

    for (var i = 0; i < sequenceCount; i++)
    {
        thisSquare = this.rnd.integerInRange(0,8);
        sequenceList.push(thisSquare);
    }

},
select: function(item, pointer) {

    if (!simonSez && !intro && !loser && !winner)
    {
        item.alpha = 1;
    }

},

release: function(item, pointer) {

    if (!simonSez && !intro && !loser && !winner)
    {
        item.alpha = .25;
        this.playerSequence(item);
    }
},

moveOff: function(item, pointer) {

    if (!simonSez && !intro && !loser && !winner)
    {
        item.alpha = .25;
    }

},

render: function() {


    game.debug.text('Time Remaining: ' + timer.duration.toFixed(0)/1000, 300, 10);    
    if (!intro)
    {
        if (simonSez)
        {
            game.debug.text('Simon Sez', 360, 96, 'rgb(255,0,0)');
        }
        else
        {
            game.debug.text('Your Turn', 360, 96, 'rgb(0,255,0)');
        }
    }
    else
    {
        game.debug.text('Get Ready', 360, 96, 'rgb(0,0,255)');
    }

    if (winner)
    {
        game.debug.text('You Win!', 360, 32, 'rgb(0,0,255)');
    }
    else if (loser)
    {
        game.debug.text('You Lose!', 360, 32, 'rgb(0,0,255)');
    }

}

};
