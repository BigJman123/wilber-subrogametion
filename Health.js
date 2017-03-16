var Health = {};

Health.level = 3;

Health.preload = function() {
    game.load.spritesheet('health', 'assets/hearts 608x44.png', 152, 44);
}

Health.create = function() {
    Health.sprite = game.add.sprite(900, 40, 'health');
    Health.sprite.anchor.setTo(.5, .5);
    Health.sprite.scale.x = -1;
    Health.set(Health.level);
}

Health.set = function(level) {
    Health.level = level;
    Health.sprite.frame = level;
}

Health.hit = function() {
    Health.set(Health.level -1);
}

Health.isEmpty = function() {
    return Health.level == 0;
}
