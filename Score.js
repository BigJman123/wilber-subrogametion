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
    scoreText = game.add.text(16, 16, 'score: ' + score, { fontSize: '32px', fill: '#000' });
}

Score.add = function(value) {
	score += value;
    scoreText.text = 'score: ' + score;
}

Score.finalScore = function() {
	if (youwin == true && Score.levelEnd == false) {
		Score.levelEnd = true;
		
		game.currentTimer.pause();
		final = Timer.timeAvailable - counter;
		score += final * 5;
		scoreText.text = 'score: ', + score;
	}
}

// Score.checkBonus = function() {
// 	if (youwin == true && Score.levelEnd == false) {
// 		Score.levelEnd = true;

// 		if (timer.text >= 60) {
// 	        setTimeout(() => game.add.text(365, 50, 'Time Bonus! +250 points!', { fontSize: '25px', fill: '#000' }), 100);
// 	        score += 250;
// 	    }
	    
// 	    if (playerHealth == 100) {
// 	        setTimeout(() => game.add.text(335, 80, 'Full Health Bonus! +250 points!', { fontSize: '25px', fill: '#000' }), 100);
// 	        score += 250;
// 	    }	

// 	    scoreText.text = 'score: ' + score;
//         store.set('score', score);
// 	}
// }