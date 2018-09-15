//var demo = {}; Nooooo it's HERE I don't want you! Maybe
demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = '#24fd24';
        console.log('You\'re on state two!');
        
        //And here's the event listeners for this state!
        addChangeStateEventListeners();
    },
    update: function(){}
}