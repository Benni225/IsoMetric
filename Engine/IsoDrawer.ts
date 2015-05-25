"use strict";
class IsoDrawer {
    Engine: IsoMetric;
    Layers: IsoLayers;
    Canvas: IsoCanvas;
    TileSets: IsoTileSets;
    onDrawLayer: Function;
    onDrawComplete: Function;
    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
        this.Layers = Engine.layers;
        this.Canvas = Engine.canvas;
        this.TileSets = Engine.tileSets;
    }

    draw() {
        this.Canvas.clearScreen();
        this.Layers.sortLayers();
        for (var i = 0; i < this.Layers.layers.length; i++) {
            if (this.Layers.layers[i].hidden !== true) {
                this.drawLayer(this.Layers.layers[i]);
                this.drawSprites(this.Layers.layers[i].sprites.get());
            }
        }
        if (this.onDrawComplete !== undefined) {
            this.onDrawComplete(this.Engine);
        }
        new IsoEvent("drawComplete").trigger();
    }

    drawLayer(layer: IsoLayer) {
        for (var row = 0; row < layer.map.get().length; row++) {
            for (var column = 0; column < layer.map.get()[row].length; column++) {
                var tile = layer.map.get()[row][column],
                    tileSet = this.TileSets.getByName(layer.tileSet),
                    image = tileSet.get(),
                    offset = tileSet.getTileOffset(tile);
                this.Canvas.context.drawImage(
                    image,
                    offset.offsetX,
                    offset.offsetY,
                    tileSet.width,
                    tileSet.height,
                    column * tileSet.width + layer.offsetX + layer.scrollX,
                    row * tileSet.height + layer.offsetY + layer.scrollY,
                    tileSet.width,
                    tileSet.height);
            }
        }
        if (this.onDrawLayer !== undefined) {
            this.onDrawLayer(this.Engine, layer);
        }
        var endLoop = new Date();
        this.Engine.frameTime = (endLoop.getMilliseconds() - this.Engine.startLoopTime.getMilliseconds());
        this.Engine.frameCount = this.Engine.frameCount + 1;

        new IsoEvent("drawLayerComplete").addData(layer).trigger();
    }

    drawSprites(sprites: Array<IsoSprite>) {
        if (sprites !== undefined) {
            for (var i = 0; i < sprites.length; i++) {
                var sprite = sprites[i],
                    offset = sprite.getTileOffset(sprite.getTile()),
                    image = sprite.get();

                this.Canvas.context.drawImage(
                    image,
                    offset.offsetX,
                    offset.offsetY,
                    sprite.width,
                    sprite.height,
                    sprite.x,
                    sprite.y,
                    sprite.width,
                    sprite.height);
            }
        }
    }
} 