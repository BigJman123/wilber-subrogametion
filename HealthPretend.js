var HealthPretend = {};

HealthPretend.level = 3;

HealthPretend.assets = function() {
    game.load.spritesheet('health', 'assets/hearts.png', 152, 44);
}

HealthPretend.create = function(x, y) {
    HealthPretend.sprite = game.add.sprite(x, y, 'health');
    HealthPretend.sprite.scale.setTo(.8, .8);
    HealthPretend.set(HealthPretend.level);
}

HealthPretend.set = function(level) {
    HealthPretend.level = level;
    HealthPretend.sprite.frame = level;
}

HealthPretend.hit = function() {
    HealthPretend.set(HealthPretend.level -1);
}

HealthPretend.isEmpty = function() {
    return HealthPretend.level == 0;
}