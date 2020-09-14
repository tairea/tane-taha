var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: "BootScene" });
  },

  preload: function() {
    // map tiles
    this.load.image(
      "tiles",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2FroguelikeSheet_transparent.png?v=1599531315183"
    );
    // map in json format
    this.load.tilemapTiledJSON(
      "map",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftane-rpg.json?v=1599531265606"
    );
    // our two characters
    this.load.spritesheet(
      "player",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Frpg-girl-sprite.png?v=1599531666710",
      { frameWidth: 17, frameHeight: 17 }
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
    initialTime: 60
}

var WorldScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function WorldScene() {
    Phaser.Scene.call(this, { key: "WorldScene" });
  },

  preload: function() {
    this.load.image("energycontainer", "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Fenergycontainer.png?v=1600124415790");
    this.load.image("energybar", "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Fenergybar.png?v=1600124420212");
    
  },

  create: function() {

    this.timeLeft = gameOptions.initialTime;
 
        // the energy container. A simple sprite
        let energyContainer = this.add.sprite(game.config.width / 2, game.config.height / 2, "energycontainer");
 
        // the energy bar. Another simple sprite
        let energyBar = this.add.sprite(energyContainer.x + 46, energyContainer.y, "energybar");
 
        // a copy of the energy bar to be used as a mask. Another simple sprite but...
        this.energyMask = this.add.sprite(energyBar.x, energyBar.y, "energybar");
 
        // ...it's not visible...
        this.energyMask.visible = false;
 
        // and we assign it as energyBar's mask.
        energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);
 
        // a boring timer.
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: function(){
                this.timeLeft --;
 
                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;
 
                // moving the mask
                this.energyMask.x -= stepWidth;
                if(this.timeLeft == 0){
                    this.scene.start("PlayGame")
                }
            },
            callbackScope: this,
            loop: true
        });
                  
                  
    // create the map
    var map = this.make.tilemap({ key: "map" });

    // first parameter is the name of the tilemap in tiled
    var tileset = map.addTilesetImage("roguelikeSheet_transparent", "tiles");

    // creating the areas
    area1 = map.findObject("areas", obj => obj.name === "area1");
    area2 = map.findObject("areas", obj => obj.name === "area2");
    area3 = map.findObject("areas", obj => obj.name === "area3");
    area4 = map.findObject("areas", obj => obj.name === "area4");
    center = map.findObject("areas", obj => obj.name === "center");

    this.items = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });

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

    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(50, 100, "player", 6);

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

    // check if player in area 1
    if (
      this.player.x > area1.x &&
      this.player.x < area1.x + area1.width &&
      this.player.y > area1.y &&
      this.player.y < area1.y + area1.height
    ) {
      console.log("player is in TAHA 1");
    }
    if (
      this.player.x > area2.x &&
      this.player.x < area2.x + area2.width &&
      this.player.y > area2.y &&
      this.player.y < area2.y + area2.height
    ) {
      console.log("player is in TAHA 2");
    }
    if (
      this.player.x > area3.x &&
      this.player.x < area3.x + area3.width &&
      this.player.y > area3.y &&
      this.player.y < area3.y + area3.height
    ) {
      console.log("player is in TAHA 3");
    }
    if (
      this.player.x > area4.x &&
      this.player.x < area4.x + area4.width &&
      this.player.y > area4.y &&
      this.player.y < area4.y + area4.height
    ) {
      console.log("player is in TAHA 4");
    }
    if (
      this.player.x > center.x &&
      this.player.x < center.x + center.width &&
      this.player.y > center.y &&
      this.player.y < center.y + center.height
    ) {
      console.log("player is in CENTER");
    }

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
      debug: false // set to true to view zones
    }
  },
  scene: [BootScene, WorldScene]
};
var game = new Phaser.Game(config);

