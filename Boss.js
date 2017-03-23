var direction2 = -1;

var healthText2;
var health2;

var playerHealthPretend = 100;
var bossInvincible = false;

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
        setTimeout(function() {shootBulletPretend();}, at);
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
    player2 = game.add.sprite(840, game.world.height - 238, 'joe');

    game.physics.arcade.enable(player2);
    player2.body.bounce.y = 0.0;
    player2.body.gravity.y = 500;
    player2.body.collideWorldBounds = true;

    //  Our three animations, walking left ,right and jumping.

    player2.animations.add('left', [3, 2, 1], 10, true);
    player2.animations.add('right', [6, 7, 8], 10, true);
    player2.animations.add('jumpleft', [0], 10, true);
    player2.animations.add('jumpright', [9], 10, true);
    player2.animations.add('standleft', [4], 10, true);
    player2.animations.add('standright', [5], 10, true);

    // setTimeout(function() {
    //     pretend.move('left', 0, 500);
    //     pretend.move('left', 5000, 5000);
    //     pretend.fire(0, 1000);
    //     pretend.fire(1000, 1000);
    //     pretend.fire(2000, 1000);
    //     pretend.fire(3000, 1000);
    //     pretend.fire(4000, 1000);
    //     pretend.move('right', 2000, 4200);
    //     pretend.move('left', 6200, 2000);
    // }, 1000);

    // setInterval(function() {
    //     pretend.move('left', 0, 2000);
    //     pretend.move('right', 2000, 4200);
    //     pretend.move('left', 6200, 2000);
    // }, 9200);


    // Health bar
    healthText2 = game.add.text(810, 10, "Joe's Health");
    HealthPretend.create(830, 50); 

}

var player2Update = function() {
    var hitPlatform = game.physics.arcade.collide(player2, platforms);
    
    var collidePlayer2 = game.physics.arcade.collide(player, player2, function() {
        game.camera.flash(0xff0000, 500);
    });
    
    // var hitPlayer2 = game.physics.arcade.overlap(bullets, player2);
    
    if (typeof(fakeMove[fakeFrame]) == "undefined") {
        fakeFrame = 0;
    }
    pretend = fakeMove[fakeFrame];


    if (pretend.fire) {
        shootBulletPretend();
    }

    if (collidePlayer2) {
        Health.kill();
        hitplayer.play();
    }
    
    function playerIsOnGround(player) {
        return player.body.touching.down && hitPlatform;
    }
    
    if (HealthPretend.isEmpty()) {
        // youlose = true;
        // music.stop();
        // lose.play();
        player2.kill();
        bullets2.destroy();
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
            let animation = direction2 == 1 ? 'standright' : 'standleft';
            player2.animations.play(animation);
        }
    }

    // Allow the player to jump if they are touching the ground.
    if (pretend.up && player2.body.touching.down && hitPlatform)
    {
        jump.play();
        player2.frame = direction2 == 1 ? 11 : 0;
        player2.body.velocity.y = -350;
    }

}