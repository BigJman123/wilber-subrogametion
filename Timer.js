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
	timer = game.add.text(175, 20, '90');
}

Timer.update = function() {
    counter++;
}

Timer.updateDisplay = function() {
	timer.text = 90 - counter;
	
	if (timer.text == 0 && youlose == false) {
	    youlose == true;
	    timer.kill();
        player.kill();
        
        youlose = true;
        music.stop();
        lose.play();
        player.kill();
        store.set('score', 0);
        setTimeout(() => game.add.text(425, 10, 'Game Over', { fontSize: '30px', fill: '#000' }), 500);
        setTimeout(() => location.reload(), 3000);
    }
}