var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    // game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','states/GameMenu.js');
    game.load.script('game', 'states/Level1.js');
    game.load.script('gameover','states/GameOver.js');
    game.load.script('credits', 'states/Credits.js');
    game.load.script('options', 'states/Options.js');
  },

  loadBgm: function () {
    game.load.audio('jump', 'assets/bgm/Jump_03.ogg');
    game.load.audio('shoot', 'assets/bgm/Shoot_01.ogg');
    game.load.audio('collect', 'assets/bgm/Collect_Point_01.ogg');
    game.load.audio('hitplayer', 'assets/bgm/Hit_03.ogg');
    game.load.audio('hitcar', 'assets/bgm/Hit_01.ogg');
    game.load.audio('win', 'assets/bgm/Jingle_Achievement_00.ogg');
    game.load.audio('lose', 'assets/bgm/Jingle_Lose_00.ogg');
    game.load.audio('bgm', 'assets/bgm/SubroHunterMain.mp3');
  },

  loadImages: function () {
    game.load.image('sky', 'assets/images/sky.png');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('ground2', 'assets/images/platform6.png');

    game.load.image('gavel', 'assets/images/gavel.png', 32, 32);
    game.load.image('slime', 'assets/images/car1 66x24.png', 66, 24);
    game.load.image('money1', 'assets/images/money1 30x36.png');
    game.load.image('money2', 'assets/images/money2 48x54.png');
  },

  // loadFonts: function () {
  //   WebFontConfig = {
  //     custom: {
  //       families: ['TheMinion'],
  //       urls: ['assets/style/theminion.css']
  //     }
  //   }
  // },

  loadSpriteSheet: function() {
    game.load.spritesheet('ken', 'assets/sprites/ken.png', 64, 64);
  },

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {
    // game.add.sprite(0, 0, 'stars');
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadSpriteSheet();
    // this.loadFonts();
    this.loadBgm();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Level1",Level1);
    game.state.add("GameOver",GameOver);
    game.state.add("Credits",Credits);
    game.state.add("Options",Options);
  },

  addGameMusic: function () {
    music = game.add.audio('bgm');
    music.loop = true;
    // music.play();
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};