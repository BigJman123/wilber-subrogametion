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
    Health.set(Health.level -1);
}

Health.isEmpty = function() {
    return Health.level == 0;
}