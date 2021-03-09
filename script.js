// gameintro (pop up intro text dialogs) -> bootscene (loads assets) -> worldscene (the game) -> win or gameover
let gameOptions = {
  initialTime: 60,
  taha1Count: 0,
  taha2Count: 0,
  taha3Count: 0,
  taha4Count: 0
};

var area1;
var area2;
var area3;
var area4;
var center;

var countdownTimer = 60;

/* ==================================
    1) Game Intro Scene (intro text dialogs)
  ================================== */
class gameIntro extends Phaser.Scene {
  constructor() {
    super("GameIntro");
  }
  preload() {
    // map tiles
    this.load.image(
      "tiles",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2FroguelikeSheet_transparent.png?v=1604906816028"
    );
    // map in json format
    this.load.tilemapTiledJSON(
      "map",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Ftane-rpg-no-center.json?v=1604906890167"
      // "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftane-rpg.json?v=1599531265606"
    );

    //taha images
    this.load.image(
      "taha1",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha1.png?v=1601024886010"
    );
    this.load.image(
      "taha2",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha2.png?v=1601024886010"
    );
    this.load.image(
      "taha3",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha3.png?v=1601024886010"
    );
    this.load.image(
      "taha4",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha4.png?v=1601024886010"
    );

    this.load.scenePlugin(
      "rexuiplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      "rexUI",
      "rexUI"
    );
  }
  create() {
    // create map.
    // map
    var map = this.make.tilemap({
      key: "map"
    });
    // first parameter is the name of the tilemap in Tiled
    var tileset = map.addTilesetImage("roguelikeSheet_transparent", "tiles");

    // creating the areas
    this.area1 = map.findObject("areas", obj => obj.name === "area1");
    this.area2 = map.findObject("areas", obj => obj.name === "area2");
    this.area3 = map.findObject("areas", obj => obj.name === "area3");
    this.area4 = map.findObject("areas", obj => obj.name === "area4");
    this.center = map.findObject("areas", obj => obj.name === "center");

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
    // this.center = this.add
    //   .zone(this.center.x, this.center.y, this.center.width, this.center.height)
    //   .setOrigin(0, 0);

    this.physics.world.enable(this.area1);
    this.physics.world.enable(this.area2);
    this.physics.world.enable(this.area3);
    this.physics.world.enable(this.area4);
    // this.physics.world.enable(this.center);

    // make all tiles in obstacles collidable
    const platforms = map.createLayer("ground", tileset, 0, 0);




    // dialog ONE
    this.dialog1 = this.rexUI.add
      .dialog({
        x: game.config.width / 2,
        y: game.config.height / 2,
        width: 100,
        height: 100,
        background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x533d8e),
        content: this.createLabel(
          this,
          "Tane needs to strengthen his \n4 Taha to reach his aspirational \nstate of wellbeing.",
          20,
          20
        ),
        actions: [this.createLabel(this, "NEXT", 10, 10)],
        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
          content: 20,
          toolbarItem: 5,
          choice: 15,
          action: 15
        },
        align: {
          center: "center",
          actions: "right" // 'center'|'left'|'right'
        },
        click: {
          mode: "release"
        }
      })
      .layout()
      .popUp(1000)

    // dialog TWO
    this.dialog2 = this.rexUI.add
      .dialog({
        x: game.config.width / 2,
        y: game.config.height / 2,
        width: 500,
        background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x533d8e),
        content: this.createLabel(
          this,
          "Collect the actions that will help Tane\nreach his aspirational state of wellbeing\nand place them in the correct Wellbeing zone.",
          20,
          20
        ),
        actions: [this.createLabel(this, "NEXT", 10, 10)],
        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
          content: 20,
          toolbarItem: 5,
          choice: 15,
          action: 15
        },
        align: {
          center: "center",
          actions: "right" // 'center'|'left'|'right'
        },

        click: {
          mode: "release"
        }
      })
      .layout()
      .popUp(1000)
      .setVisible(false)

    // dialog THREE
    this.dialog3 = this.rexUI.add
      .dialog({
        x: game.config.width / 2,
        y: game.config.height / 2,
        width: 500,
        background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x533d8e),
        content: this.createLabel(
          this,
          "Watch out there are those that\ndon’t want Tane to succeed and stop\nhim from building his strength.",
          20,
          20
        ),
        actions: [this.createLabel(this, "BEGIN", 10, 10)],
        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
          content: 20,
          toolbarItem: 5,
          choice: 15,
          action: 15
        },
        align: {
          center: "center",
          actions: "right" // 'center'|'left'|'right'
        },

        click: {
          mode: "release"
        }
      })
      .layout()
      .popUp(1000)
      .setVisible(false)

    var tween = this.tweens.add({
      targets: [this.dialog1, this.dialog2, this.dialog3],
      scaleX: 1,
      scaleY: 1,
      ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 1000,
      repeat: 0, // -1: infinity
      yoyo: false
    });

    this.dialog1.on(
      "button.click",
      function (button) {
        if (button.text === "NEXT") {
          this.dialog1.setVisible(false);
          this.dialog2.setVisible(true).popUp(1000)
          tween.play();
        }
      },
      this
    );

    this.dialog2.on(
      "button.click",
      function (button) {
        if (button.text === "NEXT") {
          this.dialog2.setVisible(false);
          this.dialog3.setVisible(true).popUp(1000)
          tween.play();
        }
      },
      this
    );

    this.dialog3.on(
      "button.click",
      function (button) {
        if (button.text === "BEGIN") {
          console.log("starting game");
          this.scene.start("BootScene");
        }
      },
      this
    );
  }

  createLabel(scene, text, spaceTop, spaceBottom) {
    return scene.rexUI.add.label({
      width: 40, // Minimum width of round-rectangle
      height: 40, // Minimum height of round-rectangle

      background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xffffff),

      text: scene.add.text(0, 0, text, {
        fontSize: "20px",
        color: "#533d8e",
        stroke: "#533d8e",
        strokeThickness: 1
      }),

      space: {
        left: 10,
        right: 10,
        top: spaceTop,
        bottom: spaceBottom
      }
    });
  }

  // method to return a random value between index 0 and 1 of a giver array
  randomValue(a) {
    return Phaser.Math.Between(a[0], a[1]);
  }

  // method to be executed at each frame
  update() {}
}

/* ==================================
  2) Boot Scene (loads assets)
================================== */
var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function BootScene() {
    Phaser.Scene.call(this, {
      key: "BootScene"
    });
  },
  preload: function () {
    // map tiles
    this.load.image(
      "tiles",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2FroguelikeSheet_transparent.png?v=1604906816028"
    );
    // map in json format
    this.load.tilemapTiledJSON(
      "map",
      // "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftane-rpg.json?v=1599531265606"
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Ftane-rpg-no-center.json?v=1604903866637"
    );

    //taha images
    this.load.image(
      "taha1",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha1.png?v=1601024886010"
    );
    this.load.image(
      "taha2",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha2.png?v=1601024886010"
    );
    this.load.image(
      "taha3",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha3.png?v=1601024886010"
    );
    this.load.image(
      "taha4",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Ftaha4.png?v=1601024886010"
    );

    // coins
    this.load.image("blue-coin-1", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fblue_coin_round_diamond_1.png");
    this.load.image("blue-coin-2", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fblue_coin_round_diamond_2.png");
    this.load.image("blue-coin-3", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fblue_coin_round_diamond_3.png");
    this.load.image("blue-coin-4", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fblue_coin_round_diamond_4.png");
    this.load.image("blue-coin-5", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fblue_coin_round_diamond_5.png");
    this.load.image("blue-coin-6", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fblue_coin_round_diamond_6.png");
    this.load.image("bronze-coin-1", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fbronze_coin_round_diamond_1.png");
    this.load.image("bronze-coin-2", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fbronze_coin_round_diamond_2.png");
    this.load.image("bronze-coin-3", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fbronze_coin_round_diamond_3.png");
    this.load.image("bronze-coin-4", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fbronze_coin_round_diamond_4.png");
    this.load.image("bronze-coin-5", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fbronze_coin_round_diamond_5.png");
    this.load.image("bronze-coin-6", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fbronze_coin_round_diamond_6.png");
    this.load.image("gold-coin-1", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fgold_coin_round_diamond_1.png");
    this.load.image("gold-coin-2", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fgold_coin_round_diamond_2.png");
    this.load.image("gold-coin-3", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fgold_coin_round_diamond_3.png");
    this.load.image("gold-coin-4", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fgold_coin_round_diamond_4.png");
    this.load.image("gold-coin-5", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fgold_coin_round_diamond_5.png");
    this.load.image("gold-coin-6", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fgold_coin_round_diamond_6.png");
    this.load.image("silver-coin-1", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fsilver_coin_round_diamond_1.png");
    this.load.image("silver-coin-2", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fsilver_coin_round_diamond_2.png");
    this.load.image("silver-coin-3", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fsilver_coin_round_diamond_3.png");
    this.load.image("silver-coin-4", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fsilver_coin_round_diamond_4.png");
    this.load.image("silver-coin-5", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fsilver_coin_round_diamond_5.png");
    this.load.image("silver-coin-6", "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fsilver_coin_round_diamond_6.png");

    // our two characters
    this.load.spritesheet(
      "player",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Frpg-girl-sprite.png?v=1599531666710", {
        frameWidth: 17,
        frameHeight: 17
      }
    );

    // our two characters
    this.load.spritesheet(
      "enemies",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2FFour-monsters%20copy.png?v=1600733851161", {
        frameWidth: 32,
        frameHeight: 32
      }
    )

    // ariki creative's Tane sprite
    // this.load.spritesheet("tane", "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2F128-Run-Sprite.png?v=1602580715217", {
    this.load.spritesheet(
      "tane",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2FRun-Strips.png?v=1604390804895", {
        frameWidth: 128,
        frameHeight: 128
      }
    );

    this.load.image(
      "kowhaiwhai",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fkowhaiwhai.png?v=1610787910877"
    );
    this.load.audio(
      "end-music",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fgameover-music.mp3?v=1610787946833"
    );
    this.load.audio(
      "cheer",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fcheer.wav?v=1610787946546"
    );
    this.load.audio(
      "music",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fmusic-edited.ogg?v=1610787948971"
    );
    this.load.audio(
      "good",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fgood.ogg?v=1610787946688"
    );
    this.load.audio(
      "powerUp",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2FpowerUp.ogg?v=1610787947623"
    );
    this.load.audio(
      "bad",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fbad.ogg?v=1610787945497"
    );
    this.load.audio(
      "die",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fdie.ogg?v=1610787945949"
    );

    // this.load.image(
    //   "energycontainer-blue",
    //   "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergycontainer-blue.png?v=1604907305559"
    // );
    // this.load.image(
    //   "energycontainer-gold",
    //   "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergycontainer-gold.png?v=1604907305277"
    // );
    // this.load.image(
    //   "energycontainer-silver",
    //   "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergycontainer-silver.png?v=1604907305263"
    // );
    // this.load.image(
    //   "energycontainer-bronze",
    //   "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergycontainer-bronze.png?v=1604907305012"
    // );

    this.load.image(
      "energybar",
      "https://cdn.glitch.com/f12fb306-ee68-4209-aac1-9db831f7a2b9%2Fenergybar.png?v=1600124420212"
    );
    this.load.image(
      "energybar-blue",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergybar-blue.png?v=1604907882480"
    );
    this.load.image(
      "energybar-gold",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergybar-gold.png?v=1604907882803"
    );
    this.load.image(
      "energybar-silver",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergybar-silver.png?v=1604907882531"
    );
    this.load.image(
      "energybar-bronze",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergybar-bronze.png?v=1604907883034"
    );
    this.load.image(
      "energycontainer",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergycontainer.png?v=1610787948530"
    );
    this.load.image(
      "energybar-empty",
      "https://cdn.glitch.com/ac36cc02-7b80-46b7-9cad-fe737d8b49ab%2Fenergybar-empty.png?v=1610787948077"
    );

    //  Load the Google WebFont Loader script
    this.load.script(
      "webfont",
      "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"
    );
  },

  create: function () {
    // stop all sound
    this.sound.stopAll()
    // reset
    gameOptions.initialTime = 60
    gameOptions.taha1Count = 0
    gameOptions.taha2Count = 0
    gameOptions.taha3Count = 0
    gameOptions.taha4Count = 0
    // start the WorldScene
    this.scene.start("WorldScene");
  }
});

/* ==================================
    3) World Scene (this is the main game)
  ================================== */
var WorldScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function WorldScene() {
    Phaser.Scene.call(this, {
      key: "WorldScene"
    });
  },

  create: function () {
    // reset
    this.tokenInHandEquals = ""
    this.tokenInHand = false
    // reset timer
    countdownTimer = 90;
    // reset taha
    gameOptions.taha1Count = 0
    gameOptions.taha2Count = 0
    gameOptions.taha3Count = 0
    gameOptions.taha4Count = 0
    this.taha1Completed = false
    this.taha2Completed = false
    this.taha3Completed = false
    this.taha4Completed = false

    console.log("timer reset. Countdown starting at: ", countdownTimer)

    // play music
    this.sound.stopAll()
    // load song
    const musicConfig = {
      volume: 0.5,
      loop: true,
      delay: 3000
    }
    this.music = this.sound.add("music", musicConfig);
    this.music.play();

    // load google font
    WebFont.load({
      google: {
        families: ["Freckle Face", "Finger Paint", "Nosifer"]
      },
      active: () => {
        this.timer = this.add
          .text(game.config.width / 2, 20, countdownTimer, {
            fontFamily: "Freckle Face",
            fontSize: 50,
            color: "#ffffff"
          })
          .setShadow(2, 2, "#333333", 2, false, true);
        this.timer.setAlign("center");
        this.timer.setOrigin();

        this.time.addEvent({
          delay: 1000, // ms
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
    var map = this.make.tilemap({
      key: "map"
    });

    // first parameter is the name of the tilemap in Tiled
    var tileset = map.addTilesetImage("roguelikeSheet_transparent", "tiles");

    // getting the corner areas from the tiled map
    this.area1 = map.findObject("areas", obj => obj.name === "area1");
    this.area2 = map.findObject("areas", obj => obj.name === "area2");
    this.area3 = map.findObject("areas", obj => obj.name === "area3");
    this.area4 = map.findObject("areas", obj => obj.name === "area4");
    // this.center = map.findObject("areas", obj => obj.name === "center");

    // create the zones based off the areas from tiled map
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
    // this.center = this.add
    //   .zone(this.center.x, this.center.y, this.center.width, this.center.height)
    //   .setOrigin(0, 0);
    this.physics.world.enable(this.area1);
    this.physics.world.enable(this.area2);
    this.physics.world.enable(this.area3);
    this.physics.world.enable(this.area4);
    // this.physics.world.enable(this.center);

    // get the platforms from tiled map in the "ground" layer
    const platforms = map.createLayer("ground", tileset, 0, 0);

    // TANE!!!
    this.tane = this.physics.add.sprite(
      game.config.width / 2,
      game.config.height / 2,
      "tane",
      6
    );
    // resize
    this.tane.setScale(0.7);
    // set z depth
    this.tane.setDepth(250);
    // reshape hit box
    this.tane.body
      .setSize(this.tane.width - 100, this.tane.height - 60)
      .setOffset(this.tane.width - 75, 30);

    // player touching taha events
    this.physics.add.overlap(this.tane, this.area1, this.inTaha1, null, this);
    this.physics.add.overlap(this.tane, this.area2, this.inTaha2, null, this);
    this.physics.add.overlap(this.tane, this.area3, this.inTaha3, null, this);
    this.physics.add.overlap(this.tane, this.area4, this.inTaha4, null, this);
    this.physics.add.overlap(this.tane, this.center, this.inCenter, null, this);

    /* ======================================
                TAHA METERS
     ======================================*/
    const tokenValue = 10;
    this.barIncrement = 101 / tokenValue
    // ========== TAHA 1 BAR
    this.taha1Max = 50
    this.taha1Group = this.add.group()
    // the energy container. A simple sprite
    let energyContainerTaha1 = this.add
      .sprite(this.area1.x + this.area1.width, 10, "energycontainer")
      .setScale(0.2)
    // .setOrigin(0.5,0.5)
    energyContainerTaha1.displayWidth = this.taha1Max
    // the energy bar. Another simple sprite
    this.energyBarTaha1 = this.add
      .sprite(
        energyContainerTaha1.x,
        energyContainerTaha1.y,
        "energybar-empty"
      )
      .setScale(0.205)
      .setOrigin(0.5, 0.5)
    this.energyBarTaha1.displayWidth = this.taha1Max
    // a copy of the energy bar to be used as a mask. Another simple sprite but...
    //energybar width is 500px (at 0.2 scale energybar width is 100px)
    this.energyMaskTaha1 = this.add
      .sprite(this.energyBarTaha1.x - this.taha1Max, this.energyBarTaha1.y - 1, "energybar-blue")
      .setScale(0.205);
    this.energyMaskTaha1.displayWidth = this.taha1Max
    // this.energyMaskTaha1.visible = true;
    // and we assign it as energyBar's mask.
    this.energyMaskTaha1.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyBarTaha1
    );
    // add container, bar and mask to taha group
    this.taha1Group.addMultiple([energyContainerTaha1, this.energyBarTaha1, this.energyMaskTaha1])
    // move group over 50px;
    this.taha1Group.children.each(child => child.x += (this.taha1Max/2 + 30))
    // add coin as bar label
    this.add
      .sprite(energyContainerTaha1.x - this.taha1Max / 2 - 6, 10, "blue-coin-1")
      .setScale(0.5);

    // ========== TAHA 2 BAR
    this.taha2Max = 70 // customisable max amount
    this.taha2Group = this.add.group()
    // container
    let energyContainerTaha2 = this.add
      .sprite(this.area2.x, 10, "energycontainer")
      .setScale(0.2);
    energyContainerTaha2.displayWidth = this.taha2Max
    // bar
    this.energyBarTaha2 = this.add
      .sprite(
        energyContainerTaha2.x,
        energyContainerTaha2.y,
        "energybar-empty"
      )
      .setScale(0.205);
    this.energyBarTaha2.displayWidth = this.taha2Max
    // mask
    this.energyMaskTaha2 = this.add
      .sprite(this.energyBarTaha2.x - this.taha2Max, this.energyBarTaha2.y - 1, "energybar-silver")
      .setScale(0.205);
    this.energyMaskTaha2.displayWidth = this.taha2Max
    this.energyMaskTaha2.visible = true;
    this.energyMaskTaha2.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyBarTaha2);
    // add container, bar and mask to taha group
    this.taha2Group.addMultiple([energyContainerTaha2, this.energyBarTaha2, this.energyMaskTaha2])
    // move group over 50px;
    this.taha2Group.children.each(child => child.x -= (this.taha2Max/2 + 20))
    this.add
      .sprite(energyContainerTaha2.x - this.taha2Max / 2 - 6, 10, "silver-coin-1")
      .setScale(0.5);



    // ========== TAHA 3 BAR
    this.taha3Max = 20 // customisable max amount
    // container
    let energyContainerTaha3 = this.add
      .sprite(this.area3.x, game.config.height - 10, "energycontainer")
      .setScale(0.2);
    energyContainerTaha3.displayWidth = this.taha3Max
    // bar
    this.energyBarTaha3 = this.add
      .sprite(
        energyContainerTaha3.x,
        energyContainerTaha3.y,
        "energybar-empty"
      )
      .setScale(0.205);
    this.energyBarTaha3.displayWidth = this.taha3Max
    // mask
    this.energyMaskTaha3 = this.add
      .sprite(this.energyBarTaha3.x - this.taha3Max, this.energyBarTaha3.y - 1, "energybar-bronze")
      .setScale(0.205);
    this.energyMaskTaha3.displayWidth = this.taha3Max
    this.energyMaskTaha3.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyBarTaha3
    );
    // add container, bar and mask to taha group
    this.taha3Group = this.add.group()
    this.taha3Group.addMultiple([energyContainerTaha3, this.energyBarTaha3, this.energyMaskTaha3])
    // move group over 50px;
    this.taha3Group.children.each(child => child.x -= (this.taha3Max/2 + 20))
    this.add
      .sprite(energyContainerTaha3.x - this.taha3Max / 2 - 6, game.config.height - 10, "bronze-coin-1")
      .setScale(0.5);

    // ========== TAHA 4 BAR
    this.taha4Max = 100 // customisable max amount
    // container
    let energyContainerTaha4 = this.add
      .sprite(this.area4.x + this.area4.width, game.config.height - 10, "energycontainer")
      .setScale(0.2);
    energyContainerTaha4.displayWidth = this.taha4Max
    // bar
    this.energyBarTaha4 = this.add
      .sprite(
        energyContainerTaha4.x,
        energyContainerTaha4.y,
        "energybar-empty"
      )
      .setScale(0.205);
    this.energyBarTaha4.displayWidth = this.taha4Max
    // mask
    this.energyMaskTaha4 = this.add
      .sprite(this.energyBarTaha4.x - this.taha4Max, this.energyBarTaha4.y - 1, "energybar-gold")
      .setScale(0.205);
    this.energyMaskTaha4.displayWidth = this.taha4Max
    this.energyMaskTaha4.mask = new Phaser.Display.Masks.BitmapMask(
      this,
      this.energyBarTaha4
    );
    // add container, bar and mask to taha group
    this.taha4Group = this.add.group()
    this.taha4Group.addMultiple([energyContainerTaha4, this.energyBarTaha4, this.energyMaskTaha4])
    // move group over 50px;
    this.taha4Group.children.each(child => child.x += (this.taha4Max/2 + 30))
    // add coin
    this.add
      .sprite(energyContainerTaha4.x - this.taha4Max / 2 - 6, game.config.height - 10, "gold-coin-1")
      .setScale(0.5);

    // ========== ANIMATIONS
    // Player
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 4]
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [3, 7]
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [2, 6]
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [1, 5]
      }),
      frameRate: 12,
      repeat: -1
    });
    // Frisk
    this.anims.create({
      key: "friskDown",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [0, 1, 2]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "friskLeft",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [6, 7]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "friskUp",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [18, 19, 20]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "friskRight",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [12, 13]
      }),
      frameRate: 10,
      repeat: -1
    });
    // Sans
    this.anims.create({
      key: "sansDown",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [3, 4, 5]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "sansLeft",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [9, 10]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "sansUp",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [21, 22, 23]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "sansRight",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [15, 16]
      }),
      frameRate: 10,
      repeat: -1
    });
    // Chara
    this.anims.create({
      key: "charaLeft",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [30, 31, 32]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "charaRight",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [36, 37, 38]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "charaUp",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [42, 43, 44]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "charaDown",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [24, 25, 26]
      }),
      frameRate: 10,
      repeat: -1
    });
    // Temmie
    this.anims.create({
      key: "temmieLeft",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [33, 34, 35]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "temmieRight",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [39, 40, 41]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "temmieUp",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [45, 46, 47]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "temmieDown",
      frames: this.anims.generateFrameNumbers("enemies", {
        frames: [27, 28, 29]
      }),
      frameRate: 10,
      repeat: -1
    });

    // TODO: create different enemy behaviours so they dont all follow in the same path
    // TODO: add other advanced enemies.

    // TANE!!!
    this.anims.create({
      key: "taneDown",
      frames: this.anims.generateFrameNumbers("tane", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "taneUp",
      frames: this.anims.generateFrameNumbers("tane", {
        frames: [8, 9, 10, 11, 12, 13, 14, 15]
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "taneLeft",
      frames: this.anims.generateFrameNumbers("tane", {
        frames: [16, 17, 18, 19, 20, 21, 22, 23]
      }),
      frameRate: 10,
      repeat: -1
    });

    //coins anims
    this.anims.create({
      key: "blueCoin",
      frames: [{
          key: "blue-coin-1",
          frame: 0
        },
        {
          key: "blue-coin-2",
          frame: 0
        },
        {
          key: "blue-coin-3",
          frame: 0
        },
        {
          key: "blue-coin-4",
          frame: 0
        },
        {
          key: "blue-coin-5",
          frame: 0
        },
        {
          key: "blue-coin-6",
          frame: 0
        },
      ],
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "goldCoin",
      frames: [{
          key: "gold-coin-1",
          frame: 0
        },
        {
          key: "gold-coin-2",
          frame: 0
        },
        {
          key: "gold-coin-3",
          frame: 0
        },
        {
          key: "gold-coin-4",
          frame: 0
        },
        {
          key: "gold-coin-5",
          frame: 0
        },
        {
          key: "gold-coin-6",
          frame: 0
        },
      ],
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "silverCoin",
      frames: [{
          key: "silver-coin-1",
          frame: 0
        },
        {
          key: "silver-coin-2",
          frame: 0
        },
        {
          key: "silver-coin-3",
          frame: 0
        },
        {
          key: "silver-coin-4",
          frame: 0
        },
        {
          key: "silver-coin-5",
          frame: 0
        },
        {
          key: "silver-coin-6",
          frame: 0
        },
      ],
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "bronzeCoin",
      frames: [{
          key: "bronze-coin-1",
          frame: 0
        },
        {
          key: "bronze-coin-2",
          frame: 0
        },
        {
          key: "bronze-coin-3",
          frame: 0
        },
        {
          key: "bronze-coin-4",
          frame: 0
        },
        {
          key: "bronze-coin-5",
          frame: 0
        },
        {
          key: "bronze-coin-6",
          frame: 0
        },
      ],
      frameRate: 12,
      repeat: -1
    });

    // add Frisk
    this.frisk = this.physics.add.sprite(
      -50,
      game.config.height / 2,
      "enemies",
      1
    );
    // resize frisks collider box
    this.frisk.body
      .setSize(this.frisk.width - 20, this.frisk.height - 20)
      .setOffset(this.frisk.width - 20, this.frisk.height - 20);
    // add Sans
    this.sans = this.physics.add.sprite(
      game.config.width / 2,
      -50,
      "enemies",
      3
    );
    // resize sans collider box
    this.sans.body
      .setSize(this.sans.width - 20, this.sans.height - 20)
      .setOffset(this.sans.width - 20, this.sans.height - 20);
    // add Chara
    this.chara = this.physics.add.sprite(
      game.config.width + 50,
      game.config.height / 2,
      "enemies",
      30
    );
    // resize chara collider box
    this.chara.body
      .setSize(this.chara.width - 20, this.chara.height - 20)
      .setOffset(this.chara.width - 20, this.chara.height - 20);
    // add Temmie
    this.temmie = this.physics.add.sprite(
      game.config.width / 2,
      game.config.height + 50,
      "enemies",
      27
    );
    // resize temmie collider box
    this.temmie.body
      .setSize(this.temmie.width - 20, this.temmie.height - 20)
      .setOffset(this.temmie.width - 20, this.temmie.height - 20);

    // create group for enemies
    this.enemies = this.physics.add.group();
    this.enemies.add(this.frisk)
    this.enemies.add(this.sans)
    this.enemies.add(this.chara)
    this.enemies.add(this.temmie)


    // collider event for tane and enemies
    this.physics.add.overlap(
      this.tane,
      this.enemies,
      this.gotHitByEnemy,
      false,
      this
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

    // tokens
    this.tokens = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    // randomly place tokens
    for (var i = 0; i < 4; i++) {
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height

      switch (i) {
        case 0:
          this.blueToken = this.tokens.create(x, y, "blue-coin-1");
          this.blueToken.setScale(0.5)
          this.blueToken.play("blueCoin", true)
          this.blueToken.name = "blue"
          break;
        case 1:
          this.goldToken = this.tokens.create(x, y, "gold-coin-1");
          this.goldToken.setScale(0.5)
          this.goldToken.play("goldCoin", true)
          this.goldToken.name = "gold"
          break;
        case 2:
          this.bronzeToken = this.tokens.create(x, y, "bronze-coin-1");
          this.bronzeToken.setScale(0.5)
          this.bronzeToken.play("bronzeCoin", true)
          this.bronzeToken.name = "bronze"
          break;
        case 3:
          this.silverToken = this.tokens.create(x, y, "silver-coin-1");
          this.silverToken.setScale(0.5)
          this.silverToken.play("silverCoin", true)
          this.silverToken.name = "silver"
          break;
      }
    }

    // tane touches tokens event
    this.physics.add.overlap(
      this.tane,
      this.tokens,
      this.gotToken,
      false,
      this
    );

    // ========== add coin above tanes head
    this.blueTokenHud = this.add.image(this.tane.x, this.tane.y - 40, "blue-coin-1").setScale(0.25).setVisible(false)
    this.goldTokenHud = this.add.image(0, 0, "gold-coin-1").setScale(0.25).setVisible(false)
    this.silverTokenHud = this.add.image(0, 0, "silver-coin-1").setScale(0.25).setVisible(false)
    this.bronzeTokenHud = this.add.image(0, 0, "bronze-coin-1").setScale(0.25).setVisible(false)


    const hudCoins = [this.blueTokenHud, this.goldTokenHud, this.silverTokenHud, this.bronzeTokenHud]

    this.playerContainer = this.add.container(0, 0)
    this.playerContainer.add(this.tane)
    this.playerContainer.add(this.blueTokenHud)


  },

  /* =============================================
                      UPDATE
     ============================================= */

  update: function (time, delta) {
    //    this.controls.update(delta);

    this.blueTokenHud.x = this.tane.x
    this.goldTokenHud.x = this.tane.x
    this.silverTokenHud.x = this.tane.x
    this.bronzeTokenHud.x = this.tane.x
    this.blueTokenHud.y = this.tane.y - 40
    this.goldTokenHud.y = this.tane.y - 40
    this.silverTokenHud.y = this.tane.y - 40
    this.bronzeTokenHud.y = this.tane.y - 40

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

  /* =============================================
                    GAME METHODS
   ============================================= */
   didYouWin: function () {
     // check if won
    if (this.taha1Completed == true && this.taha2Completed == true && this.taha3Completed == true && this.taha4Completed == true) {
      this.scene.start("game-win");
    }
   },

  inTaha1: function (player, area) {
    console.log("in taha blue");
    if (gameOptions.taha1Count < 100 & this.tokenInHandEquals == "blue") {
      this.sound.play("powerUp");
      // TODO: increase time and taha based on how many seconds have passed.
      // if already full. dont increase anymore
    if (!this.taha1Completed) {
      gameOptions.taha1Count += 10;
      this.energyMaskTaha1.x += this.barIncrement;
    }
      this.tokenInHandEquals = ""
      this.tokenInHand = false
      this.blueTokenHud.setVisible(false)

      // add new coin
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      this.blueToken = this.tokens.create(x, y, "blue-coin-1");
      this.blueToken.setScale(0.5)
      this.blueToken.play("blueCoin", true)
      this.blueToken.name = "blue"
    } else if (gameOptions.taha1Count >= this.taha1Max) {
      console.log('won from blue')
      console.log('gameOptions.taha1Count:',gameOptions.taha1Count,'this.taha1Max:',this.taha1Max)
      // this.scene.start("game-win");
      this.taha1Completed = true
    }

    this.didYouWin()
  },

  inTaha2: function (player, area) {
    console.log("in taha silver");
    if (gameOptions.taha2Count < 100 & this.tokenInHandEquals == "silver") {
      this.sound.play("powerUp");
      // TODO: increase time and taha based on how many seconds have passed.
      if (!this.taha2Completed) {
        gameOptions.taha2Count += 10;
        this.energyMaskTaha2.x += this.barIncrement;
      }
      this.tokenInHandEquals = ""
      this.tokenInHand = false
      this.silverTokenHud.setVisible(false)

      // add new coin
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      this.silverToken = this.tokens.create(x, y, "silver-coin-1");
      this.silverToken.setScale(0.5)
      this.silverToken.play("silverCoin", true)
      this.silverToken.name = "silver"
    } else if (gameOptions.taha2Count >= this.taha2Max) {
      // this.scene.start("game-win");
      this.taha2Completed = true
    }

    this.didYouWin()
  },

  inTaha3: function (player, area) {
    console.log("in taha bronze");
    if (gameOptions.taha3Count < 100 & this.tokenInHandEquals == "bronze") {
      this.sound.play("powerUp");
      // TODO: increase time and taha based on how many seconds have passed.
      if (!this.taha3Completed) {
        gameOptions.taha3Count += 10;
        this.energyMaskTaha3.x += this.barIncrement;
      }
      this.tokenInHandEquals = ""
      this.tokenInHand = false
      this.bronzeTokenHud.setVisible(false)

      // add new coin
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      this.bronzeToken = this.tokens.create(x, y, "bronze-coin-1");
      this.bronzeToken.setScale(0.5)
      this.bronzeToken.play("bronzeCoin", true)
      this.bronzeToken.name = "bronze"
    } else if (gameOptions.taha3Count >=  this.taha3Max) {
      // this.scene.start("game-win");
      this.taha3Completed = true
    }

    this.didYouWin()
  },

  inTaha4: function (player, area) {
    console.log("in taha gold");

    if (gameOptions.taha4Count < 100 & this.tokenInHandEquals == "gold") {
      this.sound.play("powerUp");
      // TODO: increase time and taha based on how many seconds have passed.
      if (!this.taha4Completed) {
        gameOptions.taha4Count += 10;
        this.energyMaskTaha4.x += this.barIncrement;
      }
      this.tokenInHandEquals = ""
      this.tokenInHand = false
      this.goldTokenHud.setVisible(false)

      // add new coin
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      this.goldToken = this.tokens.create(x, y, "gold-coin-1");
      this.goldToken.setScale(0.5)
      this.goldToken.play("goldCoin", true)
      this.goldToken.name = "gold"
    } else if (gameOptions.taha4Count >=  this.taha4Max) {
      // this.scene.start("game-win");
      this.taha4Completed = true
    }

    this.didYouWin()
  },

  // no longer used. not center feature anymore
  // inCenter: function (player, area) {
  //   // deplenish taha bars

  //   if (gameOptions.taha1Count > 0) {
  //     gameOptions.taha1Count--;
  //     this.energyMaskTaha1.x--;
  //   } else {
  //     this.energyMaskTaha1.x = this.energyBarTaha1.x - 100;
  //     gameOptions.taha1Count = 0;
  //   }
  //   if (gameOptions.taha2Count > 0) {
  //     gameOptions.taha2Count--;
  //     this.energyMaskTaha2.x--;
  //   } else {
  //     this.energyMaskTaha2.x = this.energyBarTaha2.x - 100;
  //     gameOptions.taha2Count = 0;
  //   }
  //   if (gameOptions.taha3Count > 0) {
  //     gameOptions.taha3Count--;
  //     this.energyMaskTaha3.x--;
  //   } else {
  //     this.energyMaskTaha3.x = this.energyBarTaha3.x - 100;
  //     gameOptions.taha3Count = 0;
  //   }
  //   if (gameOptions.taha4Count > 0) {
  //     gameOptions.taha4Count--;
  //     this.energyMaskTaha4.x--;
  //   } else {
  //     this.energyMaskTaha4.x = this.energyBarTaha4.x - 100;
  //     gameOptions.taha4Count = 0;
  //   }
  // },

  loadTimer: function () {
    var add = this.add;
    var input = this.input;

    // times up
    if (countdownTimer === 0) {
      console.log("end");
      this.scene.start("game-over");
    } else {
      countdownTimer -= 1;
      this.timer.setText(countdownTimer);
    }
  },
  gotToken: function (player, item) {
    // already has a token in hand
    if (this.tokenInHand == true) {
      return
    } else {
      // picked up a new token
      // play good sound
      this.sound.play("good");
      console.log("got token", item.name);
      // destroy token on ground as it has been 'picked up'
      item.destroy();
      // depending on token got. show the token above tanes head.
      switch (item.name) {
        case "blue":
          this.tokenInHand = true
          this.tokenInHandEquals = "blue"
          this.blueTokenHud.setVisible(true)
          this.goldTokenHud.setVisible(false)
          this.silverTokenHud.setVisible(false)
          this.bronzeTokenHud.setVisible(false)
          break;
        case "gold":
          this.tokenInHand = true
          this.tokenInHandEquals = "gold"
          this.blueTokenHud.setVisible(false)
          this.goldTokenHud.setVisible(true)
          this.silverTokenHud.setVisible(false)
          this.bronzeTokenHud.setVisible(false)
          break;
        case "silver":
          this.tokenInHand = true
          this.tokenInHandEquals = "silver"
          this.blueTokenHud.setVisible(false)
          this.goldTokenHud.setVisible(false)
          this.silverTokenHud.setVisible(true)
          this.bronzeTokenHud.setVisible(false)
          break;
        case "bronze":
          this.tokenInHand = true
          this.tokenInHandEquals = "bronze"
          this.blueTokenHud.setVisible(false)
          this.goldTokenHud.setVisible(false)
          this.silverTokenHud.setVisible(false)
          this.bronzeTokenHud.setVisible(true)
          break;
        default:
          this.tokenInHand = false
          this.tokenInHandEquals = ""
          this.blueTokenHud.setVisible(false)
          this.goldTokenHud.setVisible(false)
          this.silverTokenHud.setVisible(false)
          this.bronzeTokenHud.setVisible(false)
      }
    }
  },
  gotHitByEnemy: function (player, enemy) {

    this.scene.start("game-over")
  }
});



/* ==================================
    GAME OVER SCENE
  ================================== */
class GameOver extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  create() {
    this.sound.stopAll()
    this.sound.play("die");
    // load song
    const musicConfig = {
      volume: 0.5,
      loop: true,
      delay: 3000
    }
    this.endMusic = this.sound.add("end-music", musicConfig);
    this.endMusic.play();

    const width = this.scale.width;
    const height = this.scale.height;

    this.add.tileSprite(game.config.width / 2, game.config.height / 2 + 500, game.config.width, 3000, "kowhaiwhai").setScrollFactor(0, 0.25).setAlpha(0.2).setScale(1);

    WebFont.load({
      google: {
        families: ["Freckle Face", "Finger Paint", "Nosifer"]
      },
      active: () => {

        this.gameOver = this.add
          .text(game.config.width / 2, game.config.height / 2 - 25, "Game Over", {
            fontFamily: "Freckle Face",
            fontSize: 50,
            color: "#ffffff"
          })
          .setShadow(2, 2, "#333333", 2, false, true);
        this.gameOver.setAlign("center");
        this.gameOver.setOrigin();
        this.gameOver.setScrollFactor(0)

        this.pressRestart = this.add
          .text(game.config.width / 2, game.config.height / 2 + 25, "Press Space to Restart", {
            fontFamily: "Finger Paint",
            fontSize: 20,
            color: "#ffffff"
          })
          .setShadow(2, 2, "#333333", 2, false, true);
        this.pressRestart.setAlign("center");
        this.pressRestart.setOrigin();
        this.pressRestart.setScrollFactor(0)

      }
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("BootScene");
    });
  }
}

/* ==================================
    WIN SCENE
  ================================== */
class GameWin extends Phaser.Scene {
  constructor() {
    super("game-win");
  }

  create() {
    this.cameras.main.setBackgroundColor("#533d8e");

    this.sound.stopAll()
    // load song
    const musicConfig = {
      volume: 0.5,
      loop: false,
      delay: 3000
    }
    this.cheer = this.sound.add("cheer", musicConfig);
    this.cheer.play();

    const width = this.scale.width;
    const height = this.scale.height;

    this.add.tileSprite(game.config.width / 2, game.config.height / 2 + 500, game.config.width, 3000, "kowhaiwhai").setScrollFactor(0, 0.25).setAlpha(0.2).setScale(1);

    WebFont.load({
      google: {
        families: ["Freckle Face", "Finger Paint", "Nosifer"]
      },
      active: () => {

        this.gameOver = this.add
          .text(game.config.width / 2, game.config.height / 2 - 100, "You Win!", {
            fontFamily: "Freckle Face",
            fontSize: 50,
            color: "#ffffff"
          })
          .setShadow(2, 2, "#333333", 2, false, true);
        this.gameOver.setAlign("center");
        this.gameOver.setOrigin();
        this.gameOver.setScrollFactor(0)

        this.add.text(game.config.width / 2, game.config.height / 2, "Tino pai to mahi.", {
            fontFamily: "Finger Paint",
            fontSize: 20,
            color: "#ffffff"
          })
          .setShadow(2, 2, "#333333", 2, false, true)
          .setAlign("center")
          .setOrigin()
          .setScrollFactor(0)
        this.add.text(game.config.width / 2, game.config.height / 2 + 100, "You completely strengthed all of your taha!!!", {
            fontFamily: "Finger Paint",
            fontSize: 20,
            color: "#ffffff"
          })
          .setShadow(2, 2, "#333333", 2, false, true)
          .setAlign("center")
          .setOrigin()
          .setScrollFactor(0)

      }
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("BootScene");
    });
  }
}

/* ==================================
    PHASER GAME CONIG
  ================================== */
var config = {
  type: Phaser.AUTO,
  parent: "content",
  backgroundColor: 0x444444,
  width: 640,
  height: 320,
  zoom: 1,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      },
      debug: false // set to true to view zones
    }
  },
  scene: [gameIntro, BootScene, WorldScene, GameOver, GameWin]
  // scene: [BootScene, WorldScene]
};

var game = new Phaser.Game(config);