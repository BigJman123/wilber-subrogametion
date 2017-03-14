var timer;
var counter = 0;

var Timer = {};

Timer.timeAvailable = 90;

Timer.create = function() {
	game.currentTimer = game.time.create(false);
    game.currentTimer.loop(Phaser.Timer.SECOND, Timer.update, game);
    game.currentTimer.start();
    Timer.addText();
};

Timer.addText = function() {
	timer = game.add.text(250, 20, Timer.timeAvailable);
}

Timer.update = function() {
    counter++;
}

Timer.updateDisplay = function() {
	timer.text = Timer.timeAvailable - counter;
	
	if (timer.text == 0 && youlose == false) {
	    youlose = true;
	    timer.kill();
        
        music.stop();
        lose.play();
        player.kill();
        store.set('score', 0);
        setTimeout(() => game.add.text(425, 10, 'Game Over', { fontSize: '30px', fill: '#000' }), 500);
        setTimeout(() => location.reload(), 3000);
    }
}