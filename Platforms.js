var Platforms = {};

Platforms.assets = function() {
    game.load.image('ground', 'assets/platform.png');
    game.load.image('ground2', 'assets/platform6.png');
    game.load.image('ground3', 'assets/platform3.png');
    game.load.image('ground4', 'assets/platform4.png');
    game.load.image('ground5', 'assets/platform5.png');
}

Platforms.create = function() {
	    //  The platforms group contains the ground and ledges then we enable physics on platforms
    platforms = game.add.group();
    platforms.enableBody = true;

    // create ground
    ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(3,2)
    ground.body.immovable = true;
}

Platforms.add = function(x, y, sprite, w, h) {
	var ledge = platforms.create(x, y, sprite);
    ledge.body.immovable = true;
    ledge.scale.setTo(w, h);
}