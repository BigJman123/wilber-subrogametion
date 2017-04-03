var score;
var scoreText;

var Score = {};

Score.levelEnd = false;

Score.reset = function() {
	store.set('score', 0);
}

Score.create = function() {
	// only on level 1
	// store.set('score', 0);
	score = store.get('score') || 0;

	scoreText = game.add.text(8, 8, 'Score: ' + score, { fontSize: '20px', fill: '#000' });
	scoreText.font = 'Press Start 2P';
}

Score.add = function(value) {
	score += value;
    scoreText.text = 'Score: ' + score;
}

Score.handleLevelEnd = function() {
	if (youwin == true && Score.levelEnd == false) {

		Score.levelEnd = true;

		// show any time bonus
		var timeBonus = this.timeBonus();

		// show any health bonus
		var healthBonus = this.healthBonus();

		// figure out total score and show it

		// now we know the total score
		score = score + timeBonus + healthBonus;
		store.set('score', score);

		this.showScoreCard(timeBonus, healthBonus, score);


		// scoreText.text = 'Score: ' + score;

		// Store the score in the store.set('score', score);

	}
}

Score.showScoreCard = function(time, health, total) {
	
	setTimeout(function () {Score.dimGame();}, 1500);

    setTimeout(function() {game.add.sprite(game.world.centerX, game.world.centerY, 'bgimage3').anchor.setTo(.5);}, 1500);
        
    setTimeout(function() {timertext = game.add.text(420, 220, 'Time Bonus!', { fontSize: '15px', fill: '#000', font: 'Press Start 2P' });}, 2000);
    setTimeout(function() {game.add.text(425, 250, '+ ' + time + ' pts', { fontSize: '15px', fill: '#000', font: 'Press Start 2P' });}, 2000);
        
    setTimeout(function() {game.add.text(377, 320, 'Full Health Bonus!', { fontSize: '14px', fill: '#000', font: 'Press Start 2P' });}, 2500);
    setTimeout(function() {game.add.text(425, 350, '+ ' + health + ' pts', { fontSize: '15px', fill: '#000', font: 'Press Start 2P' });}, 2500);

    setTimeout(function() {game.add.text(415, 420, 'Total score: ', { fontSize: '15px', fill: '#000', font: 'Press Start 2P' });}, 3000);
    setTimeout(function() {game.add.text(455, 450,  total + ' pts', { fontSize: '15px', fill: '#000', font: 'Press Start 2P' });}, 3000);
}

Score.dimGame = function() {
	var graphicOverlay = new Phaser.Graphics(game, 0, 0);
        graphicOverlay.beginFill(0x000000, 0.35);
        graphicOverlay.drawRect(0, 0, 1000, 650);
        graphicOverlay.endFill();
        game.add.image(0, 0, graphicOverlay.generateTexture());
}

Score.timeBonus = function() {
		
	Timer.pause();

	return Timer.getTimeRemaining() * 5;
}

Score.healthBonus = function() {

	return (Health.level == 3) ? 300 : 0;
}