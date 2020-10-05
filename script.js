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
    
    console.log("game.config.width",game.config.width);
    console.log("game.config.height",game.config.height);

    
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

    
    this.area1  = this.add.zone(this.area1.x, this.area1.y,this.area1.width, this.area1.height).setOrigin(0, 0);
    this.area2  = this.add.zone(this.area2.x, this.area2.y,this.area2.width, this.area2.height).setOrigin(0, 0);
    this.area3  = this.add.zone(this.area3.x, this.area3.y,this.area3.width, this.area3.height).setOrigin(0, 0);
    this.area4  = this.add.zone(this.area4.x, this.area4.y,this.area4.width, this.area4.height).setOrigin(0, 0);
    this.center  = this.add.zone(this.center.x, this.center.y,this.center.width, this.center.height).setOrigin(0, 0);
    
    this.physics.world.enable(this.area1)
    this.physics.world.enable(this.area2)
    this.physics.world.enable(this.area3)
    this.physics.world.enable(this.area4)
    this.physics.world.enable(this.center)

    
    
    // make all tiles in obstacles collidable
    const platforms = map.createStaticLayer("ground", tileset, 0, 0);
    // platforms.setCollisionByExclusion([-1]);
    
     
    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(50, 100, "player", 6);
    this.player.setDepth(250)
    
    this.physics.add.overlap(this.player, this.area1, this.inTaha1, null, this);
    this.physics.add.overlap(this.player, this.area2, this.inTaha2, null, this);
    this.physics.add.overlap(this.player, this.area3, this.inTaha3, null, this);
    this.physics.add.overlap(this.player, this.area4, this.inTaha4, null, this);

    this.physics.add.overlap(this.player, this.center, this.inCenter, null, this);
    
    
    // ========== TAHA 1 BAR
    // the energy container. A simple sprite
    let energyContainerTaha1 = this.add.sprite(160, 10, "energycontainer").setScale(0.2)
    // the energy bar. Another simple sprite
    this.energyBarTaha1 = this.add.sprite( energyContainerTaha1.x + (46*0.20), energyContainerTaha1.y, "energybar" ).setScale(0.205);
    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    //energybar width is 500px (at 0.2 scale energybar width is 100px)
    this.energyMaskTaha1 = this.add.sprite( this.energyBarTaha1.x - 100, this.energyBarTaha1.y, "energybar" ).setScale(0.205)
    this.energyMaskTaha1.visible = true;
    // and we assign it as energyBar's mask.
    this.energyBarTaha1.mask = new Phaser.Display.Masks.BitmapMask( this, this.energyMaskTaha1 );
    
    // ========== TAHA 2 BAR
    // the energy container. A simple sprite
    let energyContainerTaha2 = this.add.sprite(490, 10, "energycontainer").setScale(0.2)
    this.energyBarTaha2 = this.add.sprite( energyContainerTaha2.x + (46*0.20), energyContainerTaha2.y, "energybar" ).setScale(0.205)
    this.energyMaskTaha2 = this.add.sprite( this.energyBarTaha2.x -100 , this.energyBarTaha2.y, "energybar" ).setScale(0.205)
    this.energyMaskTaha2.visible = true;
    this.energyBarTaha2.mask = new Phaser.Display.Masks.BitmapMask( this, this.energyMaskTaha2 );

    // ========== TAHA 3 BAR
    // the energy container. A simple sprite
    let energyContainerTaha3 = this.add.sprite(490, 310, "energycontainer").setScale(0.2)
    this.energyBarTaha3 = this.add.sprite( energyContainerTaha3.x + (46*0.20), energyContainerTaha3.y, "energybar" ).setScale(0.205)
    this.energyMaskTaha3 = this.add.sprite( this.energyBarTaha3.x -100, this.energyBarTaha3.y , "energybar" ).setScale(0.205)
    this.energyMaskTaha3.visible = true;
    this.energyBarTaha3.mask = new Phaser.Display.Masks.BitmapMask( this, this.energyMaskTaha3 );

    // ========== TAHA 4 BAR
    // the energy container. A simple sprite
    let energyContainerTaha4 = this.add.sprite(160, 310, "energycontainer").setScale(0.2)
    this.energyBarTaha4 = this.add.sprite( energyContainerTaha4.x + (46*0.20), energyContainerTaha4.y, "energybar" ).setScale(0.205)
    this.energyMaskTaha4 = this.add.sprite( this.energyBarTaha4.x -100, this.energyBarTaha4.y, "energybar" ).setScale(0.205)
    this.energyMaskTaha4.visible = true;
    this.energyBarTaha4.mask = new Phaser.Display.Masks.BitmapMask( this, this.energyMaskTaha4 );

    // create the map
    

    

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
    
    // Follower stuff
    // Followers are a type of Phaser.Sprite
    Follower.prototype = Object.create(Phaser.Sprite.prototype);
    Follower.prototype.constructor = Follower;

    Follower.prototype.update = function() {
        // Calculate distance to target
        var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);

        // If the distance > MIN_DISTANCE then move
        if (distance > this.MIN_DISTANCE) {
            // Calculate the angle to the target
            var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);

            // Calculate velocity vector based on rotation and this.MAX_SPEED
            this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
            this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
        } else {
            this.body.velocity.setTo(0, 0);
        }
    };
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
    gameOptions.taha1Count++
    if (gameOptions.taha1Count <= 100) {
      this.energyMaskTaha1.x++  
    }
  },

  inTaha2: function(player,area) {
    console.log("in taha 2")
    gameOptions.taha2Count++
    if (gameOptions.taha2Count <= 100) {
      this.energyMaskTaha2.x++  
    }
  },

  inTaha3: function(player, area) {
    console.log("in taha 3")
    gameOptions.taha3Count++
    if (gameOptions.taha3Count <= 100) {
      this.energyMaskTaha3.x++  
    }
  },
  
  inTaha4: function(player, area) {
    console.log("in taha 4")
    gameOptions.taha4Count++
    if (gameOptions.taha4Count <= 100) {
      this.energyMaskTaha4.x++  
    }
  },
  
  inCenter: function(player, area) {
    console.log("in the center")
    if (gameOptions.taha1Count > 0) {
      gameOptions.taha1Count--
      this.energyMaskTaha1.x--    
    } else {
      this.energyMaskTaha1.x = this.energyBarTaha1.x - 100
      gameOptions.taha1Count = 0
    }
    if (gameOptions.taha2Count > 0) {
      gameOptions.taha2Count--
      this.energyMaskTaha2.x--    
    } else {
      this.energyMaskTaha2.x = this.energyBarTaha2.x - 100
      gameOptions.taha2Count = 0
    }
    if (gameOptions.taha3Count > 0) {
      gameOptions.taha3Count--
      this.energyMaskTaha3.x--    
    } else {
      this.energyMaskTaha3.x = this.energyBarTaha3.x - 100
      gameOptions.taha3Count = 0
    }
    if (gameOptions.taha4Count > 0) {
      gameOptions.taha4Count--
      this.energyMaskTaha4.x--    
    } else {
      this.energyMaskTaha4.x = this.energyBarTaha4.x - 100
      gameOptions.taha4Count = 0
    }
    
  },
  
  // Follower constructor
  Follower: function(game, x, y, target) {
    
    this.frisk = this.physics.add.sprite(200, 100, "enemies", 1);
    Phaser.Sprite.call(this, game, x, y, 'player');

    // Save the target that this Follower will follow
    // The target is any object with x and y properties
    this.target = target;

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Enable physics on this object
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.MAX_SPEED = 250; // pixels/second
    this.MIN_DISTANCE = 32; // pixels
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


