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
        {number: 1, x: 350, y: 50, fontSize: '25px', tip: 'Be The Hunter Not The Hunted'},
        {number: 2, x: 390, y: 45, fontSize: '23px', tip: 'Knowledge Is Your Ammo\nPreparation Is Your Game'},
        {number: 3, x: 340, y: 50, fontSize: '23px', tip: 'Carpe Pecunia (SEIZE THE MONEY)'},
        {number: 4, x: 345, y: 50, fontSize: '23px', tip: 'CHARGE! (OR CHECK OR CASH)'},
        {number: 5, x: 360, y: 50, fontSize: '25px', tip: 'U Send UM We Suspend UM'},
        {number: 6, x: 340, y: 50, fontSize: '23px', tip: 'The Subro Is Strong With This One'},
        {number: 7, x: 385, y: 50, fontSize: '25px', tip: 'Grab UM By The Assets'},
        {number: 8, x: 345, y: 50, fontSize: '23px', tip: "They Can Run But They Can't Drive"}
        // setTimeout(() => game.add.text(350, 50, 'Be The Hunter Not The Hunted', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(385, 50, 'Knowledge Is Our Ammo Preparation Is Our Game', { fontSize: '23px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(335, 50, 'Carpe Pecunia (SEIZE THE MONEY)', { fontSize: '23px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(350, 50, 'CHARGE! (OR CHECK OR CASH)', { fontSize: '23px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(365, 50, 'U Send UM We Suspend UM', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(345, 50, 'The Subro Is Strong With This One', { fontSize: '23px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(395, 50, 'Grab UM By The Assets', { fontSize: '25px', fill: '#000' }), 500),
        // setTimeout(() => game.add.text(345, 50, "They Can Run But They Can't Drive", { fontSize: '23px', fill: '#000' }), 500)
    ];
    
    function getRandQuote () {
        var quote = randQuote[Math.floor(Math.random(0, 8) * 8)];

        setTimeout(function() {
            game.add.text(390, 10, 'Subro Suvival Tip #' + quote.number, { fontSize: '28px', fill: '#000' });
            game.add.text(quote.x, quote.y, quote.tip, { fontSize: quote.fontSize, fill: '#000' });
        }, 500);
    }



    var fakeDirection = {
        left: cursors.left.isDown,
        right: cursors.right.isDown,
        up: cursors.up.isDown,
        fire: spaceBar.isDown, 
    };

    if (record) {
        pretendDir.push(fakeDirection);
    }

	// helper
	function playerIsOnGround() {
	        return player.body.touching.down && hitPlatform;
	}


    // handle player movement
    if (cursors.left.isDown) {
        direction = -1;
    }
    else if (cursors.right.isDown) {
        direction = 1;
    }

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
        bullets.destroy();
        game.currentTimer.pause();
        
        getRandQuote();
        setTimeout(() => location.reload(), 3000);
    }

    if (stars.countLiving() == 9 && youwin == false) {
        youwin = true;
        music.stop();
        win.play();

        setTimeout(() => 
            dimGame()

        , 1500);

        setTimeout(() => game.add.sprite(game.world.centerX, game.world.centerY, 'bgimage3').anchor.setTo(.5), 1500);
        
        setTimeout(() => game.add.text(392, 250, 'Time Bonus! +' + Score.finalScore(), { fontSize: '25px', fill: '#000' }), 2000);
        // store.set('score', score);
        setTimeout(() => game.add.text(400, 175, loadinglevel, { fontSize: '25px', fill: '#ffd799'}), 8000);
        
        // setTimeout(() => {window.location = nextlevel}, 9000);
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

function dimGame() {
    var graphicOverlay = new Phaser.Graphics(game, 0, 0);
            graphicOverlay.beginFill(0x000000, 0.35);
            graphicOverlay.drawRect(0, 0, 1000, 650);
            graphicOverlay.endFill();
            game.add.image(0, 0, graphicOverlay.generateTexture());
}