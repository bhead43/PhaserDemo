//Declare a variable for the character
var jimmy;
var centerX = 750, centerY = 500;
var speed = 275;
var platforms, ground;  //This will hold the 'platforms' group so we can add physics to all of them at once.
var paperBall;

//Score stuff
var score = 0;
var END_SCORE = 10;
var scoreText;
demo.state1 = function(){};
demo.state1.prototype = {
    preload: function(){
        //Load in assets
        game.load.spritesheet('jimmy', 'assets/characterSpritesheet.png', 230, 406);
        game.load.image('background', 'assets/superCoolBackgroundResized.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('paperBall', 'assets/paperBall.png');
        game.load.image('ground', 'assets/ground.png');
        
    },
    create: function(){
        //Starts the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.stage.backgroundColor = '#DDDDDD';   //We have an actual background now! Don't need this
        game.add.sprite(0, 0, 'background');    //Load in the background. Draw it at 0, 0 so it fills the screen properly
        console.log('You\'re on state one!'); //Just here for debug purposes     
        
        //Create the ground
        ground = game.add.group();
        ground.enableBody = true;
        var actualGround = ground.create(0, 900, 'ground');
        actualGround.body.immovable = true;
        
        //Set up platforms
        platforms = game.add.group();
        
        platforms.enableBody = true;    //Give the platforms collision
        //Start adding in platforms
        var ledge = platforms.create(900, 600, 'platform');
        ledge.body.immovable = true;
        
        ledge = platforms.create(0, 400, 'platform');
        ledge.body.immovable = true;
        
        //Create initial paper ball
        paperBall = createPaperBall(1050, 450);
        
        //Load in our character
        jimmy = game.add.sprite(centerX, centerY, 'jimmy');
        jimmy.anchor.setTo(0.5, 0.5);
        jimmy.scale.setTo(0.5, 0.5);    //Make Jimmy a bit smaller
        game.physics.enable(jimmy);
        
        //Make Jimmy bow to Newton
        jimmy.body.bounce.y = 0;
        jimmy.body.gravity.y = 1000; //Fudge this number a bit till it feels right
        jimmy.body.collideWorldBounds = true;
        //Create an animation from our spritesheet
        jimmy.animations.add('walk', [1, 2, 3, 0]);
        
        //Set up score text
        scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    },
    update: function(){
        //This is where the game mostly runs. Every frame this function is called (around 60 times a second, typically)
        //  Handle collision here
        game.physics.arcade.collide(paperBall, platforms);
        game.physics.arcade.collide(paperBall, jimmy);
        var paperGround = game.physics.arcade.collide(paperBall, ground);
        var hitGround = game.physics.arcade.collide(jimmy, ground);
        var hitPlatforms = game.physics.arcade.collide(jimmy, platforms);
        //  Handle movement here!
        if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            jimmy.scale.setTo(0.5, 0.5);    //Make sure Jimmy is facing the right
            jimmy.body.velocity.x = speed;
            jimmy.animations.play('walk', 7, true);    //Animation key, frame rate, does it loop?
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            jimmy.scale.setTo(-0.5, 0.5);   //Make sure Jimmy is facing the left
            jimmy.body.velocity.x = speed * -1;
            jimmy.animations.play('walk', 7, true);
        }
        
        else{
            jimmy.animations.stop('walk');
            jimmy.frame = 0;
            //Stop all momentum
            jimmy.body.velocity.x = 0;
        }
        
        //  Handle jumping here (This is a kind of lame way of doing this -- there's no animation in place right now)
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && jimmy.body.touching.down && (hitGround || hitPlatforms)){
            jimmy.body.velocity.y = -850;
        }
        
        //  Handle ball falling to ground and score system
        if (paperGround){
            paperBall.destroy();
            
            var randNum = Math.random();
            if (randNum < 0.5){
                paperBall = createPaperBall(1050, 450);
            }
            else{
                paperBall = createPaperBall(150, 300);
            }
            
            score += 1;
            scoreText.text = 'Score: ' + score;
        }
        
        //  Check to see if win condition had been met
        if (score >= END_SCORE){
            score = 0;
            game.state.start('state2'); //Switch over to state 2
        }
    }
}

//Easy way to recreate the paperBall object
function createPaperBall(spawnX, spawnY){
    var ball = game.add.sprite(spawnX, spawnY, 'paperBall');
    game.physics.enable(ball);
    ball.enableBody = true;
    ball.body.bounce.setTo(0.2, 0.2);
    ball.body.gravity.y = 1000;
    ball.body.collideWorldBounds = true;
    return ball;
    
}