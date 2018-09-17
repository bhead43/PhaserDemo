//Initial state, give instructions of game here
var demo = {};

demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('background', 'assets/superCoolBackgroundResized.png');
    },
    create: function(){
        //game.stage.backgroundColor = '#24fd24';
        console.log('You\'re on state zero!');  //Just here for debug purposes
        game.add.sprite(0, 0, 'background');
        
        //Make the game scale
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //Add text explaining game
        game.add.text(400, 250, 'Kick the paper balls to the floor to gain points', { fontSize: '32px', fill: '#000' });
        game.add.text(350, 350, 'Move with the \'A\' and \'D\' keys, jump with the spacebar', { fontSize: '32px', fill: '#000' });
        game.add.text(600, 450, 'Get 10 points to win!', { fontSize: '32px', fill: '#000' });
        game.add.text(600, 550, 'Press \'E\' to continue', { fontSize: '32px', fill: '#000' });
        
    },
    update: function(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)){
            addKeyCallback(Phaser.Keyboard.E, changeState, 1);
        }
    }
}

//General state switching functions
function changeState(i, stateNum){
    game.state.start('state' + stateNum);
}

//To streamline things a little bit:
function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);   //Same event as the one above, just made more universal with arguments here!
}

//This is a much cleaner way to handle the event listeners. Just call this function in each subsequent state.
function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
}