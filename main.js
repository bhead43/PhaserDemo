//You probably want to set the size of the game fairly large so it scales nicer.
var game = new Phaser.Game(1500, 1000, Phaser.AUTO);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.start('state1');