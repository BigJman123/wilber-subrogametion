var timer;
var counter = 0;

var Timer = {};

Timer.create = function() {
	game.currentTimer = game.time.create(false);
    game.currentTimer.loop(Phaser.Timer.SECOND, Timer.update, game);
    game.currentTimer.start();
    Timer.addText();
};

Timer.addText = function() {
	timer = game.add.text(100, 100, '90');
}

Timer.update = function() {
    counter++;
}

Timer.updateDisplay = function() {
	timer.text = 90 - counter;
}