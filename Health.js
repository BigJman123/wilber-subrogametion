var Health = {};

Health.level = 3;

Health.assets = function() {
    game.load.spritesheet('health', 'assets/hearts.png', 152, 44);
}

Health.create = function(x, y) {
    Health.sprite = game.add.sprite(x, y, 'health');
    Health.sprite.scale.setTo(.8, .8);
    Health.set(Health.level);
}

Health.set = function(level) {
    Health.level = level;
    Health.sprite.frame = level;
}

Health.hit = function() {
    if (! playerInvincible) {
		Health.set(Health.level -1);
		
		playerInvincible = true;
		player.alpha = 0.2;

		setTimeout(function() {
			playerInvincible = false;
			player.alpha = 1;			
		}, 1000)

	}
}

Health.isEmpty = function() {
    return Health.level == 0;
}

Health.kill = function() {
	player.kill();
	Health.set(Health.level = 0)
}