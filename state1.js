//We'll just define demo in the first state (Which should really be state0, but I digress)
//  We don't define it in any of the other state files. That invalidates the states that come before them, which is no bueno
var demo = {};
//Declare a variable for the character
var jimmy;
var centerX = 750, centerY = 500;
var speed = 4;
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        //This is where we load all of our assets in
        game.load.spritesheet('jimmy', 'assets/characterSpritesheet.png', 230, 406);
        
    },
    create: function(){
        //Adds a physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#DDDDDD';
        console.log('You\'re on state one!');
        
        //Switch to state 2
        //  This is an event listener! It only works while you're in state1 here. You'd have to copy/paste all this into other states for this to be universal. Which is gross.
        //game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(changeState, null, null, 2);
        
        //This is a much cleaner event listener.
        //  Again, if we had, say, 10 states, we'd need a changeState event like this for every state that we're not currently on in EVERY state file.
        //  Luckily, games tend to be a bit more linear in fashion, so there isn't too much need to be able to go from level 1 to level 15 for anyhting other than debug purposes.
        //  I don't think I need to cmd-c cmd-v 10 times to learn this, so I'll just have this one be really simple.
        //addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
        
        //The cleanest way! Way better for working across multiple states
        addChangeStateEventListeners();
        
        //Scales the game based on size of window. Probably a good idea to just auto add this in for now. Maybe. Maybe not, though?
        //  Also! This carries over to all states! You only need this in the first state
        //      -I'm guessing that you can overwrite the scale mode in subsequent states, though?
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //Load in our character
        jimmy = game.add.sprite(centerX, centerY, 'jimmy');
        jimmy.anchor.setTo(0.5, 0.5);
        jimmy.scale.setTo(0.5, 0.5);    //Make Jimmy a bit smaller
        game.physics.enable(jimmy);
        jimmy.body.collideWorldBounds = true;
        //Create an animation from our spritesheet
        jimmy.animations.add('walk', [1, 2, 3, 0]);
    },
    update: function(){
        //This is where the game mostly runs. Every frame this function is called (around 60 times a second, typically)
        //  Handle movement here!
        if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            jimmy.scale.setTo(0.5, 0.5);    //Make sure Jimmy is facing the right
            jimmy.x += speed;
            jimmy.animations.play('walk', 7, true);    //Animation key, frame rate, does it loop?
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            jimmy.scale.setTo(-0.5, 0.5);   //Make sure Jimmy is facing the left
            jimmy.x -= speed
            jimmy.animations.play('walk', 7, true);
        }
        
        else{
            jimmy.animations.stop('walk');
            jimmy.frame = 0;
        }                          
    }
}

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