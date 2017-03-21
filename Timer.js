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
    timertext = game.add.text(445, 1, 'timer: ');
    timertext.font = 'Press Start 2P';
	timer = game.add.text(525, 3, Timer.timeAvailable);
    timer.font = 'Press Start 2P';
}

Timer.update = function() {
    counter++;
}

Timer.updateDisplay = function() {
	timer.text = Timer.getTimeRemaining();
	
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

Timer.getTimeRemaining = function() {
    return Timer.timeAvailable - counter;
}

Timer.pause = function() {
    game.currentTimer.pause();
}


