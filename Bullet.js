Bullet = function (game, x, y, direction, speed) {
    Phaser.Sprite.call(this, game, x, y, "gavel");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.xSpeed = direction * speed;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.875, 0.875);
    this.myRotation = direction * 10;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {

    // bullet animations
    // let animation = direction == 1 ? 'rightbatarang' : 'leftbatarang';
    // this.animations.play(animation);
    this.angle += this.myRotation;

    game.physics.arcade.overlap(this, platforms, function (bullet) {
        setTimeout(() => bullet.destroy(), 1)
    });

    game.physics.arcade.overlap(this, slimes, function (bullet, slime) {
        slime.destroy();
        setTimeout(() => bullet.destroy(), 1);
    });

    if (this.body == null) {
        return;
    } else {
        this.body.velocity.y = 0;
        this.body.velocity.x = this.xSpeed;
    }

    if(this.x < 0 || this.x > 1000) {
        this.destroy();
    }

};

function shootBullet() {
    if (bullets.length < 5) {
        shoot.play();
        var bullet = new Bullet(game, player.x + 10, player.y + 25, direction, bulletXSpeed);
        bullets.add(bullet);
    }
}