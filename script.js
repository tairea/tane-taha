var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function BootScene() {
    Phaser.Scene.call(this, { key: "BootScene" });
  },

  preload: function() {
    // map tiles
    this.load.image(
      "tiles",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Fspritesheet.png?v=1597101329592"
    );

    // map in json format
    this.load.tilemapTiledJSON("map", "map.json");

    // our two characters
    this.load.spritesheet(
      "player",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2FRPG_assets.png?v=1597101406898",
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );
  },

  create: function() {
    this.scene.start("WorldScene");
    1;
    var map = this.make.tilemap({ key: "map" });
    var tiles = map.addTilesetImage("spritesheet", "tiles");

    var grass = map.createStaticLayer("Grass", tiles, 0, 0);
    var obstacles = map.createStaticLayer("Obstacles", tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);
  }
});

var WorldScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function WorldScene() {
    Phaser.Scene.call(this, { key: "WorldScene" });
  },
  preload: function() {},
  create: function() {
    // create your world here
  }
});

var config = {
  type: Phaser.AUTO,
  parent: "content",
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [BootScene, WorldScene]
};
var game = new Phaser.Game(config);
