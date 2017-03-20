function playerAssets () {
	game.load.spritesheet('ken', 'assets/ken.png', 64, 64);
}

function playerCreate (gravity, height) {

	// The player and its settings
    player = game.add.sprite(475, height, 'ken');
    player.scale.setTo(0.75, 0.75);

    //  Player physics properties. Give the little guy a slight bounce.
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.0;
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true; 

    //  Player animations
    player.animations.add('left', [4, 3, 2, 1], 10, true);
    player.animations.add('right', [7, 8, 9, 10], 10, true);
    player.animations.add('jumpleft', [0], 10, true);
    player.animations.add('jumpright', [11], 10, true);
    player.animations.add('standleft', [5], 10, true);
    player.animations.add('standright', [6], 10, true);
}

function playerUpdate (nextlevel, loadinglevel) {
    
    var randQuote = [
        'Be The Hunter Not The Hunted',
        'Knowledge Is Our Ammo Preparation Is Our Game',
        'Carpe Pecunia (SEIZE THE MONEY)',
        'CHARGE! (OR CHECK OR CASH)',
        'U Send UM We Suspend UM',
        'The Subro Is Strong With This One',
        'Grab UM By The Assets',
        "They Can Run But They Can't Drive"
        // setTimeout(() => game.add.text(425, 20, 'Subro Suvival Tip #', { fontSize: '30px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(425, 30, 'Be The Hunter\nNot The Hunted', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(425, 30, 'Knowledge Is Our Ammo\nPreparation Is Our Game', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(425, 30, 'Carpe Pecunia\n(SEIZE THE MONEY)', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(425, 30, 'CHARGE!\n(OR CHECK OR CASH)', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(425, 30, 'U Send UM\nWe Suspend UM', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(425, 30, 'The Subro Is\nStrong With This One', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(425, 30, 'Grab UM By\nThe Assets', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(425, 30, "They Can Run\nBut They Can't Drive", { fontSize: '25px', fill: '#000' }), 500)
    ];
    
    function getRandQuote () {
        var quote = randQuote[Math.floor(Math.random() * 8)];
        
        return quote;
    }

	// helper
	function playerIsOnGround() {
	        return player.body.touching.down && hitPlatform;
	}

	function handlePlayerMovement() {
	    if (cursors.left.isDown) {
	        direction = -1;
	    }
	    else if (cursors.right.isDown) {
	        direction = 1;
	    }
	}

	handlePlayerMovement();

	//  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    var killSlime = game.physics.arcade.overlap(bullets, slimes);

    var hitSlime = game.physics.arcade.collide(player, slimes);

    var grabStar = game.physics.arcade.overlap(player, stars, collectStar, null, this);

    if (hitSlime && ! invincible && ! cheats.check('god')) {
        hitplayer.play();
        Health.hit();
        makeInvincible();
        game.camera.flash(0xff0000, 500);
        setTimeout(() => notInvincible(), 1000);
    }

    function makeInvincible() {
        invincible = true;
        player.alpha = 0.2;
    }

    function notInvincible() {
        invincible = false;
        player.alpha = 1;
    }

    // increases the score by 10 when a slime hit by a bullet
    if (killSlime) {
        hitcar.play();
        Score.add(50);
    }

    if (grabStar) {
        collect.play();
        Score.add(100);
    }

    if (Health.isEmpty() && youlose == false) {
        youlose = true;
        music.stop();
        lose.play();
        player.kill();
        
        setTimeout(() => game.add.text(425, 10, 'Subro Suvival Tip #', { fontSize: '30px', fill: '#000' }), 500);
        setTimeout(() => game.add.text(390, 50, getRandQuote(), { fontSize: '25px', fill: '#000' }), 500);
        // getRandQuote();
        setTimeout(() => location.reload(), 3000);
    }

    if (stars.countLiving() == 0 && youwin == false) {
        youwin = true;
        music.stop();
        win.play();
        // store.set('score', score);
        setTimeout(() => game.add.text(400, 10, loadinglevel, { fontSize: '30px', fill: '#ffd799'}), 1000);
        
        setTimeout(() => {window.location = nextlevel}, 3000);
    }

    function collectStar(player, stars) {
        stars.kill();
    }

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {

        player.body.velocity.x = -225;
        let animation = playerIsOnGround() ? 'left' : 'jumpleft';
        player.animations.play(animation);

    } else if (cursors.right.isDown) {

        player.body.velocity.x = 225;
        let animation = playerIsOnGround() ? 'right' : 'jumpright';
        player.animations.play(animation);

    } else if (cursors.right.onUp || cursors.left.onUp) {
        //  Stand still
        player.animations.stop();

        if (playerIsOnGround()) {
            let animation = direction == 1 ? 'standright' : 'standleft';
            player.animations.play(animation);
        }
    }
    // Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        jump.play();
        player.frame = direction == 1 ? 11 : 0;
        player.body.velocity.y = -350;
    }
}