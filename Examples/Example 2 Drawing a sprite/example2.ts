///<reference path="../isometric.d.ts" />
var App: IsoMetric, firstLayer: IsoLayer;
window.onload = function () {
    //Init IsoMetric
    App = new IsoMetric({
        fullscreen: true
    });
    //Adding a new layer with the dimension 1920x1920 and a tilewidth and -height of 64x64 
    App.layers.add("firstLayer", 1920, 1920, 64, 64);
    //Add infomation about the tileset
    App.tileSets.add("firstTileSet", "../images/ground.png");
    firstLayer = App.layers.getByName("firstLayer");
    //After loading all tilesets...
    App.tileSets.load().then(function () {
        //... setup the layer and the tileset
        firstLayer.setTileSet(App.tileSets.getByName("firstTileSet"));
        firstLayer.setScrollSpeed(8);
        //Loading a new sprite to the layer and setting it up
        firstLayer.sprites.add("grandpa", "../images/grandpa.png", 30, 48);
        firstLayer.sprites.getByName("grandpa")
            .setDirection(IsoMetric.RIGHT)
            .addAnimation("walk", 1, 3)
            .setX(50)
            .setY(50)
            .setSpeed(8)
            .setDefaultFrame(2)
            .setDefaultAnimation("walk")
            .animations.getByName("walk")
                .setFramesPerSecond(10)
                .setAnimationType(IsoSpriteAnimation.PINGPONG);
        //After all sprites loaded, starting the game
        firstLayer.sprites.load().then(() => gameExample2());
    });
}
// The gameloop
function gameExample2() {
    var grandpa: IsoSprite = firstLayer.sprites.getByName("grandpa");
    // Check if a key is down
    if (App.input.keyEventType === IsoInput.EVENT_KEYDOWN) {
        // starting the walking animation
        grandpa.animations.getByName("walk").play();
        // checking wich key is pressed and move the sprite
        switch (App.input.keyCode) {
            case IsoInput.KEYUP:
                grandpa.move(0, -1).setDirection(IsoMetric.BACK);
                break;
            case IsoInput.KEYDOWN:
                grandpa.move(0, 1).setDirection(IsoMetric.FRONT);
                break;
            case IsoInput.KEYLEFT:
                grandpa.move(-1, 0).setDirection(IsoMetric.LEFT);
                break;
            case IsoInput.KEYRIGHT:
                grandpa.move(1, 0).setDirection(IsoMetric.RIGHT);
        }
    }
    // If the keyup-event was fired stopping the animation
    if (App.input.keyEventType === IsoInput.EVENT_KEYUP) {
        grandpa.animations.getByName("walk").stop();
    }
    // Draw all the layers and sprites
    App.update();
    //After drawing the maps and sprites:
    App.canvas.context.fillStyle = "#fff";
    App.canvas.context.font = "20px Arial";
    //Draw ing the FPS to the screen
    App.canvas.context.fillText("FPS: " + App.FPS, 10, 30);
    // Restart the game loop
    requestAnimationFrame(() => gameExample2());
};