
var shootPlayer;
var aliens;
var bullets;
var bulletTime = 0;
var fireButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var timeString;
var timeText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var livingEnemies = [];
var timer;
//var total = 0;
//var timeLeft;



var shootState = {

preload: function() {

	this.load.image('back_button', 'assets/return.png');
    this.load.image('bullet', 'assets/bullet147.png');
    this.load.image('enemyBullet', 'assets/enemy-bullet.png');
    this.load.spritesheet('invader', 'assets/Enemy.png', 32, 33);
    this.load.image('ship', 'assets/SecretAgent.png');
    this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    this.load.image('starfield', 'assets/Space.png');
    this.load.image('background', 'assets/ParkingLot.png');

},

create: function(){

	//RETURN BUTTON
	this.returnButton = this.game.add.sprite(0,0,'back_button');
	this.returnButton.scale.setTo(.1,.1);
	this.returnButton.inputEnabled = true; 
	this.returnButton.events.onInputDown.add(this.goBack, this);
	
	
    this.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'background');

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  The hero!
    shootPlayer = game.add.sprite(400, 500, 'ship');
    shootPlayer.anchor.setTo(0.5, 0.5);
    this.physics.enable(shootPlayer, Phaser.Physics.ARCADE);

    //  The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    this.createAliens();
    //aliens.events.onOutOfBounds.add(enemyGetsToBottom, this);

    //  The score
    scoreString = 'Score : ';
    scoreText = this.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //timer
    timer = this.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(timeLeft, this.updateCounter, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();
    //  Lives
    lives = game.add.group();
    this.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    //  Text
    stateText = this.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) 
    {
        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(this.setupInvader, this);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
},

updateCounter: function(){
    total++;
    timeLeft = timeLeft - total;
    if(total = timeLeft){
        shootPlayer.kill();
        enemyBullets.callAll('kill');
        aliens.forEachAlive(function(item){
                item.kill();
        });
        timer.destroy(); 
        stateText.text="Time is up!\n Click to restart";
        stateText.visible = true;
        game.input.onTap.addOnce(this.goBack,this);
    }
    //timeText = timeString + timer.duration.toFixed(0); 
},

createAliens: function() {

    for (var y = 0; y < 2; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var alien = aliens.create(x * 48, y * 50, 'invader');
            //alien.anchor.setTo(0.5, 0.5);
            //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            alien.play('fly');
            alien.body.moves = true;
            alien.checkWorldBounds = true;
            alien.events.onOutOfBounds.add(this.enemyGetsToBottom, this);
            alien.body.velocity.x = 40;
            alien.body.velocity.y = 40;
        }
    }

    aliens.x = 100;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    //var tween = game.add.tween(aliens).to( { x: 200, y: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    //  When the tween loops it calls descend
    //tween.onRepeat.add(descend, this);
},

setupInvader: function(invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

},

descend: function() {

    aliens.body.angle = -(aliens.body.angle);

},

moveEnemies: function(invader){
    invader.body.velocity.x = -(invader.body.velocity.x)
},

update: function() {

    //  Scroll the background
    //starfield.tilePosition.y += 2;
    if (shootPlayer.alive)
    {
        //  Reset the shootPlayer, then check for movement keys
        shootPlayer.body.velocity.setTo(0, 0);

        if (cursors.left.isDown)
        {
            shootPlayer.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            shootPlayer.body.velocity.x = 200;
        }

        //  Firing?
        if (fireButton.isDown)
        {
            this.fireBullet();
        }

        if (game.time.now > firingTimer)
        {
            this.enemyFires();
            aliens.forEachAlive(function(item){
            item.body.velocity.x = -(item.body.velocity.x);
            });
        }
        //  Run collision
        game.physics.arcade.overlap(bullets, aliens, this.collisionHandler, null, this);
        game.physics.arcade.overlap(enemyBullets, shootPlayer, this.enemyHitsshootPlayer, null, this);
        game.physics.arcade.overlap(aliens, shootPlayer, this.enemyFliesIntoshootPlayer, null, this);
    }    

},

render: function() {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }
    game.debug.text('Time Remaining: ' + timer.duration.toFixed(0)/1000, 300, 10);
},


collisionHandler: function(bullet, alien) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if ((aliens.countLiving() == 0) && total < 20000) 
    {
        score += 1000;
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill',this);
        //stateText.text = " You Won, \n Click to restart";
        //stateText.visible = true;

        //the "click to restart" handler
        //game.input.onTap.addOnce(restart,this);
        this.createAliens();
    }

},

enemyHitsshootPlayer: function(shootPlayer,bullet) {
    
    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(shootPlayer.body.x, shootPlayer.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the shootPlayer dies
    if (lives.countLiving() < 1)
    {
        shootPlayer.kill();
        enemyBullets.callAll('kill');
        timer.destroy();
        stateText.text=" You Got a Bullet Hole in Ya \n Click to restart";
        stateText.visible = true;

        game.input.onTap.addOnce(this.goBack,this);
    }

},

enemyFliesIntoshootPlayer: function(shootPlayer,alien){

    //when an enemy flies into the shootPlayer, kill the shootPlayer and create explosion
    var explosion = explosions.getFirstExists(false);
    explosion.reset(shootPlayer.body.x, shootPlayer.body.y);
    explosion.play('kaboom', 30, false, true);
    shootPlayer.kill();
    enemyBullets.callAll('kill');

    stateText.text=" You Just Got Hit! \n Click to restart";
    stateText.visible = true;
    timer.destroy();
    
    game.input.onTap.addOnce(this.goBack,this);

},

enemyFires: function() {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        game.physics.arcade.moveToObject(enemyBullet,shootPlayer,120);
        firingTimer = game.time.now + 2000;
    }

},

fireBullet: function() {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(shootPlayer.x, shootPlayer.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

},

resetBullet: function (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

},

enemyGetsToBottom: function(alien){
    shootPlayer.kill();
    enemyBullets.callAll('kill');

    stateText.text="The Fuzz Got to Your Car!\n Click to restart";
    stateText.visible = true;

    //timer.destroy();
    //the "click to restart" handler
    game.input.onTap.addOnce(this.restart,this);
},

timeOver: function(){
    shootPlayer.kill();
    enemyBullets.callAll('kill');
     aliens.forEachAlive(function(item){
            item.kill();
            });
    timer.destroy(); 
    stateText.text="Time is up!\n Click to restart";
    stateText.visible = true;
    game.input.onTap.addOnce(this.restart,this);
},

restart: function () {

    //  A new level starts
    
    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    this.createAliens();

    //revives the shootPlayer
    shootPlayer.revive();
    //hides the text
    stateText.visible = false;
    timer = game.time.create(false);
    total = 0;

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(20000, this.updateCounter, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();

},

 goBack: function(){
      game.state.states['mapState'].timeLeft = timer.duration.toFixed(0)/1000;      
	  game.state.start('mapState');
  }

};
