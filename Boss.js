var direction2;

var pretend = (function() {

    var direction = {
        left: false,
        right: false,
        up: false,
        down: false,
    };

    var move = function(dir, at, duration)
    {
        var that = this;

        setTimeout(function() {that[dir] = true;}, at);
        setTimeout(function() {that[dir] = false;}, at + duration);
    };

    var fire = function(at)
    {
        setTimeout(function() {shootBullet();}, at);
    }

    return {
        move: move,
        fire: fire,
        left: direction.left,
        right: direction.right,
        up: direction.up,
        down: direction.down
    }
})();

var setupPlayer2 = function() {
    player2 = game.add.sprite(480, game.world.height - 200, 'joe');
    player2.scale.setTo(0.75, 0.75);

    game.physics.arcade.enable(player2);
    player2.body.bounce.y = 0.0;
    player2.body.gravity.y = 675;
    player2.body.collideWorldBounds = true;

    //  Our three animations, walking left ,right and jumping.

    player2.animations.add('left', [4, 3, 2, 1], 10, true);
    player2.animations.add('right', [7, 8, 9, 10], 10, true);
    player2.animations.add('jumpleft', [0], 10, true);
    player2.animations.add('jumpright', [11], 10, true);
    player2.animations.add('standleft', [5], 10, true);
    player2.animations.add('standright', [6], 10, true);

    // pretend.move('right', 0, 2000);
    // pretend.move('left', 2000, 4000);
    // pretend.move('right', 6000, 2000);  

    setTimeout(function() {
        pretend.move('right', 0, 2000);
        pretend.move('left', 2000, 4200);
        pretend.move('right', 6200, 2000);
    }, 1000);

    setInterval(function() {
        pretend.move('right', 0, 2000);
        pretend.move('left', 2000, 4200);
        pretend.move('right', 6200, 2000);
    }, 9200);



}

var player2Update = function() {
    var hitPlatform = game.physics.arcade.collide(player2, platforms);

    function playerIsOnGround(player) {
        return player.body.touching.down && hitPlatform;
    }


    player2.body.velocity.x = 0;

    if (pretend.left) {
        direction2 = -1;
    }
    else if (pretend.right) {
        direction2 = 1;
    }

    if (pretend.left) {
        player2.body.velocity.x = -225;
        let animation = playerIsOnGround(player2) ? 'left' : 'jumpleft';
        player2.animations.play(animation);

    } else if (pretend.right) {

        player2.body.velocity.x = 225;
        let animation = playerIsOnGround(player2) ? 'right' : 'jumpright';
        player2.animations.play(animation);

    } else if (! pretend.right || ! pretend.left) {
        //  Stand still
        player2.animations.stop();

        if (playerIsOnGround(player2)) {
            let animation = direction == 1 ? 'standright' : 'standleft';
            player2.animations.play(animation);
        }
    }

    // Allow the player to jump if they are touching the ground.
    if (pretend.up && player2.body.touching.down && hitPlatform)
    {
        jump.play();
        player2.frame = direction == 1 ? 11 : 0;
        player2.body.velocity.y = -350;
    }


}

