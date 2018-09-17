//var demo = {}; 
demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image('background', 'assets/superCoolBackgroundResized.png');
    },
    create: function(){
        console.log('You\'re on state two!');   //Just for debug
        game.add.sprite(0, 0, 'background');
        
        game.add.text(500, 350, 'Congrats! You got 10 points!', { fontSize: '32px', fill: '#000' });
        game.add.text(600, 450, 'Press \'E\' to restart', { fontSize: '32px', fill: '#000' });
    },
    update: function(){
        //Check for restart condition
        if(game.input.keyboard.isDown(Phaser.Keyboard.E)){
            addKeyCallback(Phaser.Keyboard.E, changeState, 1);
        }
    }
}