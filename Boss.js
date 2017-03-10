var direction2;

var healthbar2;
var healthText2;

var player2Health = 100;

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

    game.physics.arcade.enable(player2);
    player2.body.bounce.y = 0.0;
    player2.body.gravity.y = 675;
    player2.body.collideWorldBounds = true;

    //  Our three animations, walking left ,right and jumping.

    player2.animations.add('left', [3, 2, 1], 10, true);
    player2.animations.add('right', [6, 7, 8], 10, true);
    player2.animations.add('jumpleft', [0], 10, true);
    player2.animations.add('jumpright', [9], 10, true);
    player2.animations.add('standleft', [4], 10, true);
    player2.animations.add('standright', [5], 10, true);

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

    healthText2 = game.add.text(775, 60, "Joe's Health");

    // Health bar
    var barConfig = {x: 200, y: 100};
    healthbar2 = new HealthBar(this.game, {x: 875, y: 100});

}

var player2Update = function() {
    var hitPlatform = game.physics.arcade.collide(player2, platforms);
    
    var collidePlayer2 = game.physics.arcade.collide(player, player2);
    
    var hitPlayer2 = game.physics.arcade.overlap(bullets, player2);
    
    
    if (collidePlayer2) {
        playerHealth -= 33;
        healthbar.setPercent(playerHealth);
        game.camera.flash(0xff0000, 500);
    }
    
    if (hitPlayer2) {
        player2Health -= 20;
        healthbar2.setPercent(player2Health);
        // setTimeout(() => bullets.destroy(), 1);
    }

    function playerIsOnGround(player) {
        return player.body.touching.down && hitPlatform;
    }
    
    if (player2Health == 0) {
        // youlose = true;
        // music.stop();
        // lose.play();
        player2.kill();
        // store.get('score');

        // setTimeout(() => location.reload(), 3000);
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

