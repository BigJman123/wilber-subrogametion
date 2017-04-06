var SoundFX = {};
SoundFX.sounds = {};

SoundFX.preload = function() {
    game.load.audio('jump', 'assets/audio/Jump_03.ogg');
    game.load.audio('shoot', 'assets/audio/Shoot_01.ogg');
    game.load.audio('collect', 'assets/audio/Collect_Point_01.ogg');
    game.load.audio('hitPlayer', 'assets/audio/Hit_03.ogg');
    game.load.audio('hitCar', 'assets/audio/Hit_01.ogg');
    game.load.audio('win', 'assets/audio/Jingle_Achievement_00.ogg');
    game.load.audio('lose', 'assets/audio/Jingle_Lose_00.ogg');
    game.load.audio('levelbgm', 'assets/audio/SubroHunterLevels.mp3');
    game.load.audio('bossbgm', 'assets/audio/SubroHunterBoss.mp3');
    game.load.audio('splashbgm', 'assets/audio/SubroHunterMain.mp3');
    game.load.audio('credits', 'assets/audio/Credits.mp3');
};

SoundFX.bindAudio = function() {

    // Sound FX
    SoundFX.sounds.jump = game.add.audio('jump', .3, false);
    SoundFX.sounds.shoot = game.add.audio('shoot', .3, false);
    SoundFX.sounds.collect = game.add.audio('collect', .3, false);
    SoundFX.sounds.hitPlayer = game.add.audio('hitPlayer', .3, false);
    SoundFX.sounds.hitCar = game.add.audio('hitCar', .3, false);
    SoundFX.sounds.win = game.add.audio('win', .3, false);
    SoundFX.sounds.lose = game.add.audio('lose', .3, false);

    // BG Music
    SoundFX.sounds.splashBG = game.add.audio('splashbgm', .5, false);
    SoundFX.sounds.levelBG = game.add.audio('levelbgm', .3, true);
    SoundFX.sounds.bossBG = game.add.audio('bossbgm', 1, true);
    SoundFX.sounds.creditsBG = game.add.audio('credits', .3, false);
    SoundFX.sounds.creditsBG.addMarker('start_here', 1, 35, .3, false);

};

SoundFX.jump = function() {SoundFX.sounds.jump.play();};
SoundFX.shoot = function() {SoundFX.sounds.shoot.play();};
SoundFX.collect = function() {SoundFX.sounds.collect.play();};
SoundFX.hitPlayer = function() {SoundFX.sounds.hitPlayer.play();};
SoundFX.hitCar = function() {SoundFX.sounds.hitCar.play();};
SoundFX.win = function() {SoundFX.sounds.win.play();};
SoundFX.lose = function() {SoundFX.sounds.lose.play();};
SoundFX.splashBG = function(method) {
    
    if (typeof method !== 'undefined') {
        SoundFX.sounds.splashBG.stop();
        return;
    }

    SoundFX.sounds.splashBG.play();

};
SoundFX.levelBG = function(method) {

    if (typeof method !== 'undefined') {
        SoundFX.sounds.levelBG.stop();
        return;
    }

    SoundFX.sounds.levelBG.play();

};
SoundFX.bossBG = function(method) {

    if (typeof method !== 'undefined') {
        SoundFX.sounds.bossBG.stop();
        return;
    }

    SoundFX.sounds.bossBG.play();

};

SoundFX.creditsBG = function(method) {

    if (typeof method !== 'undefined') {
        SoundFX.sounds.credits.stop();
        return;
    }

    SoundFX.sounds.creditsBG.play('start_here');
    setTimeout(function() {
        SoundFX.sounds.creditsBG.fadeOut(3500);
    }, 23500);

};