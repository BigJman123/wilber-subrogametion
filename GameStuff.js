var GameStuff = {};

GameStuff.levelUpdate = function(x, y) {
	if (stars.countLiving() == 0 && youwin == false) {
        youwin = true;
        SoundFX.levelBG('stop');
        SoundFX.win();

        setTimeout(() => game.add.text(x, y, loadingLevel, { fontSize: '13px', fill: '#ffd799', font: 'Press Start 2P'}), 5000);
        setTimeout(() => {window.location = nextLevel}, 6000);
    }
}

GameStuff.bossUpdate = function(x, y) {
	// if joe is dead... end the game
	// if ken is dead... end the game
	if(HealthPretend.isEmpty() && youwin == false) {
		youwin = true;
		SoundFX.bossBG('stop');
		SoundFX.win();
		player2.kill();
		bullets2.destroy();

		setTimeout(() => game.add.text(x, y, loadingLevel, { fontSize: '13px', fill: '#ffd799', font: 'Press Start 2P'}), 5000);
        setTimeout(() => {window.location = nextLevel}, 6000);
	}
}