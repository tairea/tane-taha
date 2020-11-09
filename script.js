

var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: "BootScene" });
  },

  preload: function() {
    // map tiles
    this.load.image("tiles","https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2FroguelikeSheet_transparent.png?v=1599531315183");
    // map in json format
    this.load.tilemapTiledJSON( "map", "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftane-rpg.json?v=1599531265606" );
    
    //taha images
    this.load.image("taha1","https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha1.png?v=1601024886010");
    this.load.image("taha2","https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha2.png?v=1601024886010");
    this.load.image("taha3","https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha3.png?v=1601024886010");
    this.load.image("taha4","https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha4.png?v=1601024886010");
    
    // our two characters
    this.load.spritesheet(
      "player",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Frpg-girl-sprite.png?v=1599531666710",
      { frameWidth: 17, frameHeight: 17 }
    );

    // our two characters
    this.load.spritesheet(
      "enemies",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2FFour-monsters%20copy.png?v=1600733851161",
      { frameWidth: 32, frameHeight: 32 }
    );
    
    // ariki creative's Tane sprite
    // this.load.spritesheet("tane", "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2F128-Run-Sprite.png?v=1602580715217", {
    this.load.spritesheet("tane", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2FRun-Strips.png?v=1604390804895", {
      frameWidth: 128,
      frameHeight: 128,
    });
    
  },

  create: function() {
    // start the WorldScene
    this.scene.start("WorldScene");
  }
});

var area1;
var area2;
var area3;
var area4;
var center;

let gameOptions = {
  initialTime: 60,
  taha1Count: 0,
  taha2Count: 0,
  taha3Count: 0,
  taha4Count: 0,
};

var countdownTime = 10

var WorldScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function WorldScene() {
    Phaser.Scene.call(this, { key: "WorldScene" });
  },

  preload: function() {
    this.load.image(
      "energycontainer",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Fenergycontainer.png?v=1600124415790"
    );
    this.load.image(
      "energybar",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Fenergybar.png?v=1600124420212"
    );
    
    //  Load the Google WebFont Loader script
  this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    
  },

  create: function () {
    
    
    
    
        WebFont.load({
        google: {
            families: [ 'Freckle Face', 'Finger Paint', 'Nosifer' ]
        },
        active:  () =>
        {
          //this.time.delayedCall(1000, this.loadTimer, null, this);  // delay in ms  
          this.timer = this.add.text(game.config.width/2,20, countdownTime, { fontFamily: 'Freckle Face', fontSize: 50, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
          
          this.time.addEvent({
              delay: 1000,                // ms
              callback: this.loadTimer,
              //args: [],
              callbackScope: this,
              loop: true
          });                  
        }
    
    });


    // game size
    console.log("game.config.width", game.config.width);
    console.log("game.config.height", game.config.height);

    // map
    var map = this.make.tilemap({ key: "map" });

    // first parameter is the name of the tilemap in Tiled
    var tileset = map.addTilesetImage("roguelikeSheet_transparent", "tiles");

    // creating the areas
    this.area1 = map.findObject("areas", (obj) => obj.name === "area1");
    this.area2 = map.findObject("areas", (obj) => obj.name === "area2");
    this.area3 = map.findObject("areas", (obj) => obj.name === "area3");
    this.area4 = map.findObject("areas", (obj) => obj.name === "area4");
    this.center = map.findObject("areas", (obj) => obj.name === "center");

    this.area1 = this.add
      .zone(this.area1.x, this.area1.y, this.area1.width, this.area1.height)
      .setOrigin(0, 0);
    this.area2 = this.add
      .zone(this.area2.x, this.area2.y, this.area2.width, this.area2.height)
      .setOrigin(0, 0);
    this.area3 = this.add
      .zone(this.area3.x, this.area3.y, this.area3.width, this.area3.height)
      .setOrigin(0, 0);
    this.area4 = this.add
      .zone(this.area4.x, this.area4.y, this.area4.width, this.area4.height)
      .setOrigin(0, 0);
    this.center = this.add
      .zone(this.center.x, this.center.y, this.center.width, this.center.height)
      .setOrigin(0, 0);

    this.physics.world.enable(this.area1);
    this.physics.world.enable(this.area2);
    this.physics.world.enable(this.area3);
    this.physics.world.enable(this.area4);
    this.physics.world.enable(this.center);

    // make all tiles in obstacles collidable
    const platforms = map.createStaticLayer("ground", tileset, 0, 0);
    // platforms.setCollisionByExclusion([-1]);

    // our player sprite created through the physics system
    // this.player = this.physics.add.sprite(
    //   game.config.width / 2,
    //   game.config.height / 2,
    //   "player",
    //   6
    // );
    // this.player.setDepth(250);

    // TANE!!!
    this.tane = this.physics.add.sprite(
      game.config.width / 2,
      game.config.height / 2,
      "tane",
      6
    );
    this.tane.setScale(0.7);
    // this.tane.anims.play("taneLeft")
    this.tane.setDepth(250);

    // player touching taha events
    this.physics.add.overlap(this.tane, this.area1, this.inTaha1, null, this);
    this.physics.add.overlap(this.tane, this.area2, this.inTaha2, null, this);
    this.physics.add.overlap(this.tane, this.area3, this.inTaha3, null, this);
    this.physics.add.overlap(this.tane, this.area4, this.inTaha4, null, this);
    this.physics.add.overlap(this.tane, this.center, this.inCenter, null, this);
    // this.physics.add.overlap(this.player, this.area1, this.inTaha1, null, this);
    // this.physics.add.overlap(this.player, this.area2, this.inTaha2, null, this);
    // this.physics.add.overlap(this.player, this.area3, this.inTaha3, null, this);
    // this.physics.add.overlap(this.player, this.area4, this.inTaha4, null, this);
    // this.physics.add.overlap(
    //   this.player,
    //   this.center,
    //   this.inCenter,
    //   null,
    //   this
    // );
    
    // ========== Countdown


    // ========== TAHA 1 BAR
    // the energy container. A simple sprite
    let energyContainerTaha1 = this.add
      .sprite(160, 10, "energycontainer")
      .setScale(0.2);
    // the energy bar. Another simple sprite
    this.energyBarTaha1 = this.add
      .sprite(
        energyContainerTaha1.x + 46 * 0.2,
        energyContainerTaha1.y,
        "energybar"
      )
      .setScale(0.205);
    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    //energybar width is 500px (at 0.2 scale energybar width is 100px)
    this.energyMaskTaha1 = this.add
      .sprite(this.energyBarTaha1.x - 100, this.energyBarTaha1.y, "energybar")
      .setScale(0.205);
    this.energyMaskTaha1.visible = true;
    // and we assign it as energyBar's mask.
    this.energyBarTaha1.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyMaskTaha1
    );

    // ========== TAHA 2 BAR
    let energyContainerTaha2 = this.add
      .sprite(490, 10, "energycontainer")
      .setScale(0.2);
    this.energyBarTaha2 = this.add
      .sprite(
        energyContainerTaha2.x + 46 * 0.2,
        energyContainerTaha2.y,
        "energybar"
      )
      .setScale(0.205);
    this.energyMaskTaha2 = this.add
      .sprite(this.energyBarTaha2.x - 100, this.energyBarTaha2.y, "energybar")
      .setScale(0.205);
    this.energyMaskTaha2.visible = true;
    this.energyBarTaha2.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyMaskTaha2
    );

    // ========== TAHA 3 BAR
    let energyContainerTaha3 = this.add
      .sprite(490, 310, "energycontainer")
      .setScale(0.2);
    this.energyBarTaha3 = this.add
      .sprite(
        energyContainerTaha3.x + 46 * 0.2,
        energyContainerTaha3.y,
        "energybar"
      )
      .setScale(0.205);
    this.energyMaskTaha3 = this.add
      .sprite(this.energyBarTaha3.x - 100, this.energyBarTaha3.y, "energybar")
      .setScale(0.205);
    this.energyMaskTaha3.visible = true;
    this.energyBarTaha3.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyMaskTaha3
    );

    // ========== TAHA 4 BAR
    let energyContainerTaha4 = this.add
      .sprite(160, 310, "energycontainer")
      .setScale(0.2);
    this.energyBarTaha4 = this.add
      .sprite(
        energyContainerTaha4.x + 46 * 0.2,
        energyContainerTaha4.y,
        "energybar"
      )
      .setScale(0.205);
    this.energyMaskTaha4 = this.add
      .sprite(this.energyBarTaha4.x - 100, this.energyBarTaha4.y, "energybar")
      .setScale(0.205);
    this.energyMaskTaha4.visible = true;
    this.energyBarTaha4.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyMaskTaha4
    );

    // ========== ANIMATIONS
    // Player
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { frames: [0, 4] }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { frames: [3, 7] }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { frames: [2, 6] }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { frames: [1, 5] }),
      frameRate: 12,
      repeat: -1,
    });
    // Frisk
    this.anims.create({
      key: "friskDown",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [0, 1, 2] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "friskLeft",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [6, 7] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "friskUp",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [18, 19, 20],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "friskRight",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [12, 13] }),
      frameRate: 10,
      repeat: -1,
    });
    // Sans
    this.anims.create({
      key: "sansDown",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [3, 4, 5] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "sansLeft",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [9, 10] }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "sansUp",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [21, 22, 23],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "sansRight",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [15, 16] }),
      frameRate: 10,
      repeat: -1,
    });
    // Chara
    this.anims.create({
      key: "charaLeft",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [30, 31, 32],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "charaRight",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [36, 37, 38],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "charaUp",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [42, 43, 44],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "charaDown",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [24, 25, 26],
      }),
      frameRate: 10,
      repeat: -1,
    });
    // Temmie
    this.anims.create({
      key: "temmieLeft",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [33, 34, 35],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "temmieRight",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [39, 40, 41],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "temmieUp",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [45, 46, 47],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "temmieDown",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [27, 28, 29],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // TODO: add other enemies.
    // TODO: create distance between them so they don't bunch up on top of each other

    // TANE!!!
    this.anims.create({
      key: "taneDown",
      frames: this.anims.generateFrameNumbers("tane", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "taneUp",
      frames: this.anims.generateFrameNumbers("tane", {
        frames: [8, 9, 10, 11, 12, 13, 14, 15],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "taneLeft",
      frames: this.anims.generateFrameNumbers("tane", {
        frames: [16, 17, 18, 19, 20, 21, 22, 23],
      }),
      frameRate: 10,
      repeat: -1,
    });

    // add Frisk
    this.frisk = this.physics.add.sprite(
      -50,
      game.config.height / 2,
      "enemies",
      1
    );
    // add Sans
    this.sans = this.physics.add.sprite(
      game.config.width / 2,
      -50,
      "enemies",
      3
    );
    // add Chara
    this.chara = this.physics.add.sprite(
      game.config.width + 50,
      game.config.height / 2,
      "enemies",
      30
    );
    // add Temmie
    this.temmie = this.physics.add.sprite(
      game.config.width / 2,
      game.config.height + 50,
      "enemies",
      27
    );

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    // this.player.setCollideWorldBounds(true);
    this.tane.setCollideWorldBounds(true);

    // don't walk on trees
    // this.physics.add.collider(this.player, obstacles);

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.tane);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  /* =============================================
                      UPDATE
     ============================================= */

  update: function (time, delta) {
    //    this.controls.update(delta);

    this.tane.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.tane.body.setVelocityX(-180);
    } else if (this.cursors.right.isDown) {
      this.tane.body.setVelocityX(180);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.tane.body.setVelocityY(-180);
    } else if (this.cursors.down.isDown) {
      this.tane.body.setVelocityY(180);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.tane.anims.play("taneLeft", true);
      this.tane.flipX = false;
    } else if (this.cursors.right.isDown) {
      this.tane.anims.play("taneLeft", true);
      this.tane.flipX = true;
    } else if (this.cursors.up.isDown) {
      this.tane.anims.play("taneUp", true);
    } else if (this.cursors.down.isDown) {
      this.tane.anims.play("taneDown", true);
    } else {
      this.tane.anims.stop();
    }

    // ================== Enemy follow tane movement
    this.physics.moveToObject(this.frisk, this.tane, 60);
    this.physics.moveToObject(this.sans, this.tane, 80);
    this.physics.moveToObject(this.chara, this.tane, 100);
    this.physics.moveToObject(this.temmie, this.tane, 120);

    // log character movement
    //console.log(this.frisk.body.velocity)

    // frisk movement animations
    if (
      this.frisk.body.velocity.y > 1 &&
      this.frisk.body.velocity.y > Math.abs(this.frisk.body.velocity.x)
    ) {
      this.frisk.anims.play("friskDown", true);
    } else if (
      this.frisk.body.velocity.y < -1 &&
      Math.abs(this.frisk.body.velocity.y) >
        Math.abs(this.frisk.body.velocity.x)
    ) {
      this.frisk.anims.play("friskUp", true);
    } else if (
      this.frisk.body.velocity.x < -1 &&
      Math.abs(this.frisk.body.velocity.x) >
        Math.abs(this.frisk.body.velocity.y)
    ) {
      this.frisk.anims.play("friskLeft", true);
    } else if (
      this.frisk.body.velocity.x > 1 &&
      Math.abs(this.frisk.body.velocity.x) >
        Math.abs(this.frisk.body.velocity.y)
    ) {
      this.frisk.anims.play("friskRight", true);
    }
    // sans movement animations
    if (
      this.sans.body.velocity.y > 1 &&
      this.sans.body.velocity.y > Math.abs(this.sans.body.velocity.x)
    ) {
      this.sans.anims.play("sansDown", true);
    } else if (
      this.sans.body.velocity.y < -1 &&
      Math.abs(this.sans.body.velocity.y) > Math.abs(this.sans.body.velocity.x)
    ) {
      this.sans.anims.play("sansUp", true);
    } else if (
      this.sans.body.velocity.x < -1 &&
      Math.abs(this.sans.body.velocity.x) > Math.abs(this.sans.body.velocity.y)
    ) {
      this.sans.anims.play("sansLeft", true);
    } else if (
      this.sans.body.velocity.x > 1 &&
      Math.abs(this.sans.body.velocity.x) > Math.abs(this.sans.body.velocity.y)
    ) {
      this.sans.anims.play("sansRight", true);
    }
    // chara movement animations
    if (
      this.chara.body.velocity.y > 1 &&
      this.chara.body.velocity.y > Math.abs(this.chara.body.velocity.x)
    ) {
      this.chara.anims.play("charaDown", true);
    } else if (
      this.chara.body.velocity.y < -1 &&
      Math.abs(this.chara.body.velocity.y) >
        Math.abs(this.chara.body.velocity.x)
    ) {
      this.chara.anims.play("charaUp", true);
    } else if (
      this.chara.body.velocity.x < -1 &&
      Math.abs(this.chara.body.velocity.x) >
        Math.abs(this.chara.body.velocity.y)
    ) {
      this.chara.anims.play("charaLeft", true);
    } else if (
      this.chara.body.velocity.x > 1 &&
      Math.abs(this.chara.body.velocity.x) >
        Math.abs(this.chara.body.velocity.y)
    ) {
      this.chara.anims.play("charaRight", true);
    }
    // temmie movement animations
    if (
      this.temmie.body.velocity.y > 1 &&
      this.temmie.body.velocity.y > Math.abs(this.temmie.body.velocity.x)
    ) {
      this.temmie.anims.play("temmieDown", true);
    } else if (
      this.temmie.body.velocity.y < -1 &&
      Math.abs(this.temmie.body.velocity.y) >
        Math.abs(this.temmie.body.velocity.x)
    ) {
      this.temmie.anims.play("temmieUp", true);
    } else if (
      this.temmie.body.velocity.x < -1 &&
      Math.abs(this.temmie.body.velocity.x) >
        Math.abs(this.temmie.body.velocity.y)
    ) {
      this.temmie.anims.play("temmieLeft", true);
    } else if (
      this.temmie.body.velocity.x > 1 &&
      Math.abs(this.temmie.body.velocity.x) >
        Math.abs(this.temmie.body.velocity.y)
    ) {
      this.temmie.anims.play("temmieRight", true);
    }
  }, //end of update

  inTaha1: function (player, area) {
    console.log("in taha 1");
    gameOptions.taha1Count++;
    if (gameOptions.taha1Count <= 100) {
      this.energyMaskTaha1.x++;
    }
  },

  inTaha2: function (player, area) {
    console.log("in taha 2");
    gameOptions.taha2Count++;
    if (gameOptions.taha2Count <= 100) {
      this.energyMaskTaha2.x++;
    }
  },

  inTaha3: function (player, area) {
    console.log("in taha 3");
    gameOptions.taha3Count++;
    if (gameOptions.taha3Count <= 100) {
      this.energyMaskTaha3.x++;
    }
  },

  inTaha4: function (player, area) {
    console.log("in taha 4");
    gameOptions.taha4Count++;
    if (gameOptions.taha4Count <= 100) {
      this.energyMaskTaha4.x++;
    }
  },

  inCenter: function (player, area) {
    // deplenish taha bars
    console.log("in the center");
    if (gameOptions.taha1Count > 0) {
      gameOptions.taha1Count--;
      this.energyMaskTaha1.x--;
    } else {
      this.energyMaskTaha1.x = this.energyBarTaha1.x - 100;
      gameOptions.taha1Count = 0;
    }
    if (gameOptions.taha2Count > 0) {
      gameOptions.taha2Count--;
      this.energyMaskTaha2.x--;
    } else {
      this.energyMaskTaha2.x = this.energyBarTaha2.x - 100;
      gameOptions.taha2Count = 0;
    }
    if (gameOptions.taha3Count > 0) {
      gameOptions.taha3Count--;
      this.energyMaskTaha3.x--;
    } else {
      this.energyMaskTaha3.x = this.energyBarTaha3.x - 100;
      gameOptions.taha3Count = 0;
    }
    if (gameOptions.taha4Count > 0) {
      gameOptions.taha4Count--;
      this.energyMaskTaha4.x--;
    } else {
      this.energyMaskTaha4.x = this.energyBarTaha4.x - 100;
      gameOptions.taha4Count = 0;
    }
  },
  
  loadTimer: function() {
     var add = this.add;
    var input = this.input;
    countdownTime -= 1
    
    
    this.timer.setText(countdownTime);
          this.timer.setAlign('center')
          this.timer.setOrigin()
          console.log(this.timer.text)
    },
  
  
});

/* ==================================
           PHASER GAME CONIG
  ================================== */
var config = {
  type: Phaser.AUTO,
  parent: "content",
  width: 640,
  height: 320,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false, // set to true to view zones
    },
  },
  scene: [BootScene, WorldScene],
};

var game = new Phaser.Game(config);