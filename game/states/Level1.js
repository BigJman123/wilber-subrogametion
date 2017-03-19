var Level1 = function(game) {};

Level1.prototype = {
  
  loadLevelScripts: function() {
    game.load.script('player', 'js/player.js');
    game.load.script('platforms', 'js/platforms.js');
    game.load.script('bullet', 'js/bullet.js');
    game.load.script('slime', 'js/slime.js');
    game.load.script('music', 'js/music.js');
    game.load.script('health', 'js/health.js');
  },
  
  preload: function() {
    this.loadLevelScripts();
  },

  setupBG: function() {
      var sky = game.add.sprite(0, 0, 'sky');
      sky.scale.setTo(2, 2);

      // this.Platforms.create();
  },

  // setupPlayer: function() {
  //     this.playerCreate();
  // },

  // createLedge: function(x,y) {
  //     var ledge = this.platforms.create(x, y, 'ground2');
  //     ledge.body.immovable = true;
  //     ledge.scale.setTo(1.3, 1);
  // },

  create: function () {
    // this.game.soundfx = {};
    // this.game.soundfx.jump = game.add.audio('jump');
    // this.game.soundfx.shoot = game.add.audio('shoot');
    // this.game.soundfx.collect = game.add.audio('collect');
    // this.game.soundfx.hitplayer = game.add.audio('hitplayer');
    // this.game.soundfx.hitcar = game.add.audio('hitcar');
    // this.game.soundfx.win = game.add.audio('win');
    // this.game.soundfx.lose = game.add.audio('lose');
    // this.game.soundfx.bgm = game.add.audio('bgm');
      
    // the bullet group contains all bullets and enables physics on them.
    bullets = game.add.group();
    bullets.enableBody = true;
    
    // the slime group contains all slimes and enables physics on them. The for loop adds slimes to the game.
    slimes = game.add.group();
    slimes.enableBody = true;
    
    // makes a stars group and enables physics
    stars = game.add.group();
    stars.enableBody = true;
      
    gameMusic();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();

    this.setupBG();
    
    Platforms.create();

    // this.createLedge(110, 170);
    // this.createLedge(110, 315);
    // this.createLedge(110, 455);
    
    Platforms.add(110, 170, 'ground2', 2.6, 1);
    Platforms.add(110, 315, 'ground2', 2.6, 1);
    Platforms.add(110, 455, 'ground2', 2.6, 1);

    playerCreate();
    console.info('player setup');
  },

  update: function() {
      playerUpdate();
  }
};