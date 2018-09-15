//We'll just define demo in the first state (Which should really be state0, but I digress)
//  We don't define it in any of the other state files. That invalidates the states that come before them, which is no bueno
var demo = {};
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){},
    create: function(){
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
    },
    update: function(){}
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