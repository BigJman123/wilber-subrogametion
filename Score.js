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

Score.timeBonus = function() {
	if (youwin == true && Score.levelEnd == false) {
		Score.levelEnd = true;
		
		Timer.pause();
		
		var timeBonus = Timer.getTimeRemaining() * 5;
		score += timeBonus;
		scoreText.text = 'Score: ' + score;

		return timeBonus;
	}
	
	store.set('score', score);
}

// Score.healthBonus = function() {
// 	if (youwin == true && Score.levelEnd == false) {
// 		Score.levelEnd = true;
	    
// 	    if (playerHealth == 100) {
// 	        healthBonus = Health.level * 100;
// 	        score += healthBonus;
// 	        scoreText.text = 'Score: ' + score;
	        
// 	        return healthBonus;
// 	    }	
	    
//         store.set('score', score);
// 	}
// }