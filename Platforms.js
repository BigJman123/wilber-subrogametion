var Platforms = {};

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