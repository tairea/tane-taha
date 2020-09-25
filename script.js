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
  },

  create: function() {
    this.timeLeft = 100;
    

    console.log(game.config.width);
    console.log(game.config.height);

    // ========== TAHA 1 BAR
    // the energy container. A simple sprite
    let energyContainerTaha1 = this.add.sprite(160, 10, "energycontainer");
    energyContainerTaha1.setDepth(100);
    energyContainerTaha1.setScale(0.25);
    
    // the energy bar. Another simple sprite
    let energyBarTaha1 = this.add.sprite(
      energyContainerTaha1.x + (46*0.25),
      energyContainerTaha1.y-0.25,
      "energybar"
    );
    energyBarTaha1.setDepth(150);
    energyBarTaha1.setScale(0.25)
    
    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    this.energyMaskTaha1 = this.add.sprite(
      energyBarTaha1.x - 125,
      energyBarTaha1.y,
      "energybar"
    );
    this.energyMaskTaha1.setScale(0.25)
    //energybar width is 500px (at 0.25 scale energybar width is 125px)
    
    
    console.log("this.energyMaskTaha1",this.energyMaskTaha1)
    
    // ...it's not visible...
    this.energyMaskTaha1.visible = true;
    // and we assign it as energyBar's mask.
    energyBarTaha1.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyMaskTaha1
    );
    

    // ========== TAHA 2 BAR
    // the energy container. A simple sprite
    let energyContainerTaha2 = this.add.sprite(160, 310, "energycontainer");
    energyContainerTaha2.setDepth(100);
    energyContainerTaha2.setScale(0.2);
    // the energy bar. Another simple sprite
    let energyBarTaha2 = this.add.sprite(
      energyContainerTaha2.x + 46,
      energyContainerTaha2.y,
      "energybar"
    );
    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    this.energyMaskTaha2 = this.add.sprite(
      energyBarTaha2.x,
      energyBarTaha2.y,
      "energybar"
    );
    // ...it's not visible...
    this.energyMaskTaha2.visible = false;
    // and we assign it as energyBar's mask.
    energyBarTaha2.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyMaskTaha2
    );

    // ========== TAHA 3 BAR
    // the energy container. A simple sprite
    let energyContainerTaha3 = this.add.sprite(490, 10, "energycontainer");
    energyContainerTaha3.setDepth(100);
    energyContainerTaha3.setScale(0.2);
    // the energy bar. Another simple sprite
    let energyBarTaha3 = this.add.sprite(
      energyContainerTaha3.x + 46,
      energyContainerTaha3.y,
      "energybar"
    );
    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    this.energyMaskTaha3 = this.add.sprite(
      energyBarTaha3.x,
      energyBarTaha3.y,
      "energybar"
    );
    // ...it's not visible...
    this.energyMaskTaha3.visible = false;
    // and we assign it as energyBar's mask.
    energyBarTaha3.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyMaskTaha3
    );

    // ========== TAHA 4 BAR
    // the energy container. A simple sprite
    let energyContainerTaha4 = this.add.sprite(490, 310, "energycontainer");
    energyContainerTaha4.setDepth(100);
    energyContainerTaha4.setScale(0.2);
    // the energy bar. Another simple sprite
    let energyBarTaha4 = this.add.sprite(
      energyContainerTaha4.x + 46,
      energyContainerTaha4.y,
      "energybar"
    );
    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    this.energyMaskTaha4 = this.add.sprite(
      energyBarTaha4.x,
      energyBarTaha4.y,
      "energybar"
    );
    // ...it's not visible...
    this.energyMaskTaha4.visible = false;
    // and we assign it as energyBar's mask.
    energyBarTaha4.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyMaskTaha4
    );

    // set step with of mask bars
    // this.stepWidth = this.energyMaskTaha1.displayWidth / 100;
    
    console.log('this.energyMaskTaha1.width',this.energyMaskTaha1.width)
    console.log('this.energyMaskTaha1.x',this.energyMaskTaha1.x)
    
    

    // create the map
    var map = this.make.tilemap({ key: "map" });

    // first parameter is the name of the tilemap in tiled
    var tileset = map.addTilesetImage("roguelikeSheet_transparent", "tiles");

    // creating the areas
    this.area1 = map.findObject("areas", obj => obj.name === "area1");
    this.area2 = map.findObject("areas", obj => obj.name === "area2");
    this.area3 = map.findObject("areas", obj => obj.name === "area3");
    this.area4 = map.findObject("areas", obj => obj.name === "area4");
    this.center = map.findObject("areas", obj => obj.name === "center");
    

    this.items = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    
    this.area1  = this.items.create(this.area1.x, this.area1.y - this.area1.height).setOrigin(0, 0);
    this.area2  = this.items.create(this.area2.x, this.area2.y - this.area2.height).setOrigin(0, 0);
    this.area3  = this.items.create(this.area3.x, this.area3.y - this.area3.height).setOrigin(0, 0);
    this.area4  = this.items.create(this.area4.x, this.area4.y - this.area4.height).setOrigin(0, 0);
    

    // make all tiles in obstacles collidable
    const platforms = map.createStaticLayer("ground", tileset, 0, 0);
    


    // platforms.setCollisionByExclusion([-1]);

    //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { frames: [0, 4] }),
      frameRate: 10,
      repeat: -1
    });

    // animation with key 'right'
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { frames: [3, 7] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { frames: [2, 6] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { frames: [1, 5] }),
      frameRate: 10,
      repeat: -1
    });

    // frisk
    this.anims.create({
      key: "friskDown",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [0, 2] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "friskLeft",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [7, 9] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "friskUp",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [21, 33] }),
      frameRate: 10,
      repeat: -1
    });
     this.anims.create({
      key: "friskRight",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [14, 16] }),
      frameRate: 10,
      repeat: -1
    });
    // sans
    this.anims.create({
      key: "sansDown",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [3, 5] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "sansLeft",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [10, 12] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "sansUp",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [24, 26] }),
      frameRate: 10,
      repeat: -1
    });
     this.anims.create({
      key: "sansRight",
      frames: this.anims.generateFrameNumbers("enemies", { frames: [17, 19] }),
      frameRate: 10,
      repeat: -1
    });
    // chara

    
    
    
    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(50, 100, "player", 6);
    
    this.physics.add.overlap(this.player, this.area1, this.inTaha1, null, this);
    this.physics.add.overlap(this.player, this.area2, this.inTaha2, null, this);
    this.physics.add.overlap(this.player, this.area3, this.inTaha3, null, this);
    this.physics.add.overlap(this.player, this.area4, this.inTaha4, null, this);
    
    console.log("this.area1",this.area1)
    console.log("this.area2",this.area2)
    console.log("this.area3",this.area3)
    console.log("this.area4",this.area4)
    
    
    // this.frisk = this.physics.add.sprite(200, 100, "enemies", 1);
    // this.frisk.play("friskDown")
    
    

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on trees
    // this.physics.add.collider(this.player, obstacles);

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();

    // where the enemies will be
    // this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    // for(var i = 0; i < 30; i++) {
    //     var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    //     var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    //     // parameters are x, y, width, height
    //     this.spawns.create(x, y, 20, 20);
    // }
    // // add collider
    // this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    //
  },

  update: function(time, delta) {
    
    //    this.controls.update(delta);

    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-180);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(180);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-180);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(180);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play("left", true);
      // this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right", true);
      this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }
    
    //FRISK CONTROLS
    // Horizontal movement
   
    // check if player in area 1
    // if (
    //   this.player.x > area1.x &&
    //   this.player.x < area1.x + area1.width &&
    //   this.player.y > area1.y &&
    //   this.player.y < area1.y + area1.height
    // ) {
    //   console.log("player is in TAHA 1");
      // ======== MAKE TIMERS MOVE
      // dividing enery bar width by the number of seconds gives us the amount
      // of pixels we need to move the energy bar each second
      
      // increase the mask
//        this.gameTimer = this.time.addEvent({
//             delay: 1000,
//             callback: () => {
//               gameOptions.taha1Count++;
//               if (gameOptions.taha1Count !== 125) {
//                 console.log("taha1: ",gameOptions.taha1Count)
//                 this.energyMaskTaha1.x++;  
//               } else {
//                 gameOptions.taha1Count = 0;
//                 this.gameTimer.remove()
//               }  
//             },
//             callbackScope: this,
//             loop: true
//         });
//     }
//     else {
      
//       if (this.gameTimer) {
//         console.log("stopping timer")
//         this.gameTimer.paused = true;

//       }
//     }
    // if (
    //   this.player.x > area2.x &&
    //   this.player.x < area2.x + area2.width &&
    //   this.player.y > area2.y &&
    //   this.player.y < area2.y + area2.height
    // ) {
    //   console.log("player is in TAHA 2");
    // }
    // if (
    //   this.player.x > area3.x &&
    //   this.player.x < area3.x + area3.width &&
    //   this.player.y > area3.y &&
    //   this.player.y < area3.y + area3.height
    // ) {
    //   console.log("player is in TAHA 3");
    // }
    // if (
    //   this.player.x > area4.x &&
    //   this.player.x < area4.x + area4.width &&
    //   this.player.y > area4.y &&
    //   this.player.y < area4.y + area4.height
    // ) {
    //   console.log("player is in TAHA 4");
    // }
    // if (
    //   this.player.x > center.x &&
    //   this.player.x < center.x + center.width &&
    //   this.player.y > center.y &&
    //   this.player.y < center.y + center.height
    // ) {
    //   console.log("player is in CENTER");
    // }

    //
  },

  onMeetEnemy: function(player, zone) {
    // we move the zone to some other location
    // zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    // zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    // shake the world
    //this.cameras.main.shake(300);
    // start battle
  },
  
  inTaha1: function(player,area) {
    console.log("in taha 1")
  },

  inTaha2: function(player,area) {
    console.log("in taha 2")
  },

  inTaha3: function(player, area) {
    console.log("in taha 3")
  },
  
  inTaha4: function(player, area) {
    console.log("in taha 4")
  }
    
  
    
    
});

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
      debug: true // set to true to view zones
    }
  },
  scene: [BootScene, WorldScene]
};

var game = new Phaser.Game(config);


