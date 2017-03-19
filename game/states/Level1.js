var Level1 = function(game) {};

Level1.prototype = {
  
  loadLevelScripts: function() {
    game.load.script('player', 'js/player.js');
    game.load.script('platforms', 'js/platforms.js');
    game.load.script('bullet', 'js/bullet.js');
    game.load.script('slime', 'js/slime.js');
    game.load.script('health', 'js/health.js');
    game.load.script('health', 'js/health.js');
  },
  
  preload: function() {
    this.loadLevelScripts();
  },

  setupBG: function() {
      var sky = game.add.sprite(0, 0, 'sky');
      sky.scale.setTo(2, 2);

      this.Platforms.create();
  },

  setupPlayer: function() {
      this.playerCreate();
  },

  // createLedge: function(x,y) {
  //     var ledge = this.platforms.create(x, y, 'ground2');
  //     ledge.body.immovable = true;
  //     ledge.scale.setTo(1.3, 1);
  // },

  create: function () {
      this.game.soundfx = {};
      this.game.soundfx.jump = game.add.audio('jump');
      this.game.soundfx.shoot = game.add.audio('shoot');
      this.game.soundfx.collect = game.add.audio('collect');
      this.game.soundfx.hitplayer = game.add.audio('hitplayer');
      this.game.soundfx.hitcar = game.add.audio('hitcar');
      this.game.soundfx.win = game.add.audio('win');
      this.game.soundfx.lose = game.add.audio('lose');
      this.game.soundfx.bgm = game.add.audio('bgm');

    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursors = game.input.keyboard.createCursorKeys();

    this.setupBG();

    // this.createLedge(110, 170);
    // this.createLedge(110, 315);
    // this.createLedge(110, 455);
    
    this.Platforms.add(110, 170, 2.6, 1);
    this.Platforms.add(110, 315, 2.6, 1);
    this.Platforms.add(110, 455, 2.6, 1);

    this.setupPlayer();
    console.info('player setup');
  },

  update: function() {
      var hitPlatform = game.physics.arcade.collide(this.player, this.platforms);
      var player = this.player;
      var cursors = this.cursors;

      function playerIsOnGround() {
          return player.body.touching.down && hitPlatform;
      }

      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;

      if (cursors.left.isDown) {
          player.direction = -1;
          player.body.velocity.x = -225;
          var animation = playerIsOnGround() ? 'left' : 'jumpleft';
          player.animations.play(animation);

      } else if (cursors.right.isDown) {
          player.direction = 1;
          player.body.velocity.x = 225;
          var animation = playerIsOnGround() ? 'right' : 'jumpright';
          player.animations.play(animation);

      } else if (cursors.right.onUp || cursors.left.onUp) {
          //  Stand still
          player.animations.stop();

          if (playerIsOnGround()) {
              var animation = player.direction == 1 ? 'standright' : 'standleft';
              player.animations.play(animation);
          }
      }
      // Allow the player to jump if they are touching the ground.
      if (cursors.up.isDown && player.body.touching.down && hitPlatform)
      {
          this.game.soundfx.jump.play();
          player.frame = player.direction == 1 ? 11 : 0;
          player.body.velocity.y = -350;
      }
  }
};