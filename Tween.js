function update() {
    if (cursors.left.isDown && animationRunning === false) {
        tweenLeft = game.add.tween(player).to({x: player.x - 50}, 900, Phaser.Easing.Linear.None, true);
        player.scale.setTo(-1, 1);
        animationRunning = true;
        tweenLeft.onComplete.addOnce(theEnd, this);
        player.animations.play('walk', 20, true);
    } else if (cursors.right.isDown && animationRunning === false) {
        tweenRight = game.add.tween(player).to({x: player.x + 50}, 900, Phaser.Easing.Linear.None, true);
        player.scale.setTo(1, 1);
        animationRunning = true;
        player.animations.play('walk', 20, true);
        tweenRight.onComplete.addOnce(theEnd, this);
    }
};