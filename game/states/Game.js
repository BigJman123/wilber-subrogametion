var Game = function(game) {};

Game.prototype = {

  setupBG: function() {
      var sky = game.add.sprite(0, 0, 'sky');
      sky.scale.setTo(2, 2);

      this.platforms = game.add.group();
      this.platforms.enableBody = true;

      var ground = this.platforms.create(0, game.world.height - 64, 'ground');
      ground.body.immovable = true;
      ground.scale.setTo(3, 2);
  },

  setupPlayer: function() {
      var player = game.add.sprite(475, game.world.height - 110, 'ken');
      player.scale.setTo(0.75, 0.75);

      //  Player physics properties. Give the little guy a slight bounce.
      game.physics.arcade.enable(player);
      player.body.bounce.y = 0.0;
      player.body.gravity.y = 425;
      player.body.collideWorldBounds = true;

      player.animations.add('left', [4, 3, 2, 1], 10, true);
      player.animations.add('right', [7, 8, 9, 10], 10, true);
      player.animations.add('jumpleft', [0], 10, true);
      player.animations.add('jumpright', [11], 10, true);
      player.animations.add('standleft', [5], 10, true);
      player.animations.add('standright', [6], 10, true);

      this.player = player;
  },

  createLedge: function(x,y) {
      var ledge = this.platforms.create(x, y, 'ground2');
      ledge.body.immovable = true;
      ledge.scale.setTo(1.3, 1);
  },

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

    this.createLedge(110, 170);
    this.createLedge(110, 315);
    this.createLedge(110, 455);

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