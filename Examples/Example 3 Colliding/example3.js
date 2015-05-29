///<reference path="../isometric.d.ts" />
var App, firstLayer, unpassableTileNumber = 1;
window.onload = function () {
    // Init IsoMetric
    App = new IsoMetric({
        fullscreen: true
    });
    // Adding a new layer with the dimension 1920x1920 and a tilewidth and -height of 64x64 
    App.layers.add("firstLayer").tileMap.create(1920, 1920, 64, 64);
    // Edit the map
    // Setup some tiles that aren't passable.
    App.layers.getByName("firstLayer").tileMap.map
        .edit(3, 4, unpassableTileNumber)
        .edit(8, 1, unpassableTileNumber)
        .edit(2, 9, unpassableTileNumber);
    // Add infomation about the tileset
    App.tileSets.add("firstTileSet", "../images/ground.png");
    firstLayer = App.layers.getByName("firstLayer");
    // After loading all tilesets...
    App.tileSets.load().then(function () {
        //... setup the layer and the tileset
        firstLayer.tileMap.setTileSet(App.tileSets.getByName("firstTileSet"));
        firstLayer.tileMap.setScrollSpeed(8);
        // Loading a new sprite to the layer and setting it up
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
        // For a better result you can edit the collision-body of a sprite.
        // The collision-body is the region of a sprite that detects the collision with anonther object.
        firstLayer.sprites.getByName("grandpa").setCollisionBody({
            relativX: 10,
            relativY: 28,
            width: 5,
            height: 10
        });
        // After all sprites loaded, starting the game
        firstLayer.sprites.load().then(function () { return gameExample3(); });
    });
};
// The gameloop
function gameExample3() {
    var grandpa = firstLayer.sprites.getByName("grandpa");
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
    // Check the collision
    checkCollision(grandpa);
    // If the keyup-event was fired stopping the animation
    if (App.input.keyEventType === IsoInput.EVENT_KEYUP) {
        grandpa.animations.getByName("walk").stop();
    }
    // Draw all the layers and sprites
    App.update();
    // After drawing the maps and sprites:
    App.canvas.context.fillStyle = "#fff";
    App.canvas.context.font = "20px Arial";
    // Draw ing the FPS to the screen
    App.canvas.context.fillText("FPS: " + App.FPS, 10, 30);
    // Restart the game loop
    requestAnimationFrame(function () { return gameExample3(); });
}
;
function checkCollision(sprite) {
    // Returns all the tiles of the layer 'firstLayer' the sprite collids with.
    var collidingTiles = sprite.getCollidingTiles()["firstLayer"];
    // Check if a tile has the unpassable value we setted up at the beginning.
    for (var i = 0; i < collidingTiles.length; i++) {
        // We reset the movement...
        if (collidingTiles[i].tile === unpassableTileNumber) {
            switch (sprite.direction) {
                case IsoMetric.FRONT:
                    sprite.move(0, -1);
                    break;
                case IsoMetric.BACK:
                    sprite.move(0, 1);
                    break;
                case IsoMetric.LEFT:
                    sprite.move(1, 0);
                    break;
                case IsoMetric.RIGHT:
                    sprite.move(-1, 0);
                    break;
            }
            // and stop the animation
            sprite.animations.getByName("walk").stop();
        }
    }
}
//# sourceMappingURL=example3.js.map