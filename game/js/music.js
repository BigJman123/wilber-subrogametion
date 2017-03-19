function gameMusic () {
	main = game.add.audio('main');
    main.volume = 0.3;
    // music.play();
    
    level = game.add.audio('level');
    level.volume = 0.3;
    level.play();
    
    jump = game.add.audio('jump');
    jump.loop = false;
    jump.volume = 0.2;
    
    shoot = game.add.audio('shoot');
    shoot.loop = false;
    shoot.volume = 0.2;
    
    collect = game.add.audio('collect');
    collect.loop = false;
    collect.volume = 0.2;
    
    hitplayer = game.add.audio('hitplayer');
    hitplayer.loop = false;
    hitplayer.volume = 0.2;
    
    hitcar = game.add.audio('hitcar');
    hitcar.loop = false;
    hitcar.volume = 0.2;
    
    win = game.add.audio('win')
    win.loop = false;
    win.totalDuration = 2;
    win.volume = 0.2;
    
    lose = game.add.audio('lose');
    lose.loop = false;
    lose.totalDuratio = 3;
    lose.volume = 0.2;
}