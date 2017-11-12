
var game = new Phaser.Game(800,600, Phaser.CANVAS);
var socket;
var playerNum;

game.state.add('mapState', mapState);
game.state.add('safeState', safeState);
game.state.add('wireState', wireState);
game.state.add('shootState', shootState);
game.state.add('simonState', simonState);
game.state.add('introState', introState);
game.state.add('rulesState', rulesState);
game.state.add('connectState', connectState);
game.state.add('hangmanState', hangmanState);
game.state.states['mapState'].timeLeft = 100000;
//game.state.start('mapState');
//game.state.start('hangmanState');
game.state.start('introState');


