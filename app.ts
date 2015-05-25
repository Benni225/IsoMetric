/**
 * This is a simple test file for checking out some features.
 * Copyright 2015 Benjamin Werner
 */
///<reference path="Engine/IsoCanvas.ts" />
///<reference path="Engine/IsoConfig.ts" />
window.onload = function () {
    var app = new IsoMetric();
    app.layers.add("ground", 1920, 1920, 64, 64).setScrollSpeed(8);
    app.tileSets
        .add("ground", "images/ground.png")
        .load().then(function () {
            app.layers.getByName("ground")
            .setTileSet("ground")
            .sprites.add("grandpa", "images/grandpa.png", 30, 48).load().then(function () {
                app.layers.getByName("ground").sprites.getByName("grandpa")
                    .setDirection(IsoMetric.RIGHT)
                    .addAnimation("walk", 1, 3)
                    .setX(50)
                    .setY(50)
                    .setSpeed(8)
                    .setDefaultFrame(2)
                    .setDefaultAnimation("walk")
                    .setCollisionBody({
                        relativX: 10,
                        relativY: 28,
                        width: 5,
                        height: 10
                    })
                    .animations.getByName("walk")
                        .setFramesPerSecond(10)
                        .setAnimationType(IsoSpriteAnimation.PINGPONG);

                app.drawer.onDrawLayer = (Engine: IsoMetric, layer: IsoLayer) => drawMark(Engine, layer);
                app.input.onKeyboard = function () {
                        app.layers.getByName("ground")
                            .sprites.getByName("grandpa")
                            .animations.getByName("walk")
                            .setFramesPerSecond(3)
                            .play();
                        var grandPa = app.layers.getByName("ground").sprites.getByName("grandpa");
                        var input = app.input;
                        if (input.keyChar === "s") {
                            grandPa.setDirection(IsoMetric.FRONT).move(0, 1);
                            var collidedTiles = app.layers.getByName("ground").sprites.getByName("grandpa").getCollidingTiles()["ground"];
                            for (var i = 0; i < collidedTiles.length; i++) {
                                if (collidedTiles[i].tile === 1) {
                                    grandPa.move(0, -1);
                                }
                            }
                        }
                        if (input.keyChar === "w") {
                            grandPa.setDirection(IsoMetric.BACK).move(0, -1);
                            var collidedTiles = app.layers.getByName("ground").sprites.getByName("grandpa").getCollidingTiles()["ground"];
                            for (var i = 0; i < collidedTiles.length; i++) {
                                if (collidedTiles[i].tile === 1) {
                                    grandPa.move(0, 1);
                                }
                            }
                        }
                        if (input.keyChar === "a") {
                            grandPa.setDirection(IsoMetric.LEFT).move(-1, 0);
                            var collidedTiles = app.layers.getByName("ground").sprites.getByName("grandpa").getCollidingTiles()["ground"];
                            for (var i = 0; i < collidedTiles.length; i++) {                               
                                if (collidedTiles[i].tile === 1) {
                                    grandPa.move(1, 0);
                                }
                            }
                        }
                        if (input.keyChar === "d") {
                            grandPa.setDirection(IsoMetric.RIGHT).move(1, 0);
                            var collidedTiles = app.layers.getByName("ground").sprites.getByName("grandpa").getCollidingTiles()["ground"];
                            for (var i = 0; i < collidedTiles.length; i++) {
                                if (collidedTiles[i].tile === 1) {
                                    grandPa.move(-1, 0);
                                }
                            }
                        }

                        if (input.keyEventType === IsoInput.EVENT_KEYUP) {
                            app.layers.getByName("ground").sprites.getByName("grandpa").animations.getByName("walk").stop();
                        }
                };
                app.input.onMouse = function (Engine: IsoMetric, event: MouseEvent) {
                    if (event.type === "mouseup") {
                        var tile: ITile = app.layers.mouseOver("ground");
                        if (tile !== null) {
                            app.layers.getByName("ground").map.edit(tile.x / tile.width, tile.y / tile.height, 1);
                        }
                    }
                }
                app.startLoop();
            });
    });

    function drawMark(Engine: IsoMetric, layer: IsoLayer) {
        var mouseTile: ITile = app.layers.mouseOver("ground");
        if (mouseTile !== null) {
            app.canvas.context.rect(mouseTile.x, mouseTile.y, mouseTile.width, mouseTile.height);
            app.canvas.context.stroke();
        }

        var tiles = app.layers.getByName("ground").sprites.getByName("grandpa").getCollidingTiles()["ground"];
        var collide = false;
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            app.canvas.context.rect(tile.x, tile.y, tile.width, tile.height);
            app.canvas.context.stroke();
        }

        app.canvas.context.fillStyle = "#fff";
        app.canvas.context.font = "20px Arial";
        app.canvas.context.fillText("FPS: " + app.FPS, 10, 30);
    }
};