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
                this.drawBillboards(this.Layers.layers[i].billboards.get());
                this.drawLayer(this.Layers.layers[i]);
                this.drawSprites(this.Layers.layers[i].sprites.get());
            }
        }
        if (this.onDrawComplete !== undefined) {
            this.onDrawComplete(this.Engine);
        }
        new IsoEvent("drawComplete").trigger();
    }

    drawBillboards(billboards: Array<IsoBillboard>) {
        if (billboards !== undefined) {
            for (var i = 0; i < billboards.length; i++) {
                var billboard = billboards[i],
                    image = billboard.get();
                this.Canvas.context.drawImage(
                    image,
                    0,
                    0,
                    billboard.width,
                    billboard.height,
                    billboard.x + billboard.offsetX + billboard.scrollX,
                    billboard.y + billboard.offsetY + billboard.scrollY,
                    billboard.width,
                    billboard.height);
            }
        }
    }

    drawLayer(layer: IsoLayer) {
        var tileSet = layer.getTileSet(),
            image = tileSet.get();
        
        for (var row = 0; row < layer.map.get().length; row++) {
            for (var column = 0; column < layer.map.get()[row].length; column++) {
                var tile = layer.map.get()[row][column], offset = tileSet.getTileOffset(tile);
                this.Canvas.context.drawImage(
                    image,
                    offset.offsetX,
                    offset.offsetY,
                    tileSet.tileWidth,
                    tileSet.tileHeight,
                    column * tileSet.tileWidth + layer.offsetX + layer.scrollX,
                    row * tileSet.tileHeight + layer.offsetY + layer.scrollY,
                    tileSet.tileWidth,
                    tileSet.tileHeight);
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
                    sprite.tileWidth,
                    sprite.tileHeight,
                    sprite.x,
                    sprite.y,
                    sprite.tileWidth,
                    sprite.tileHeight);
            }
        }
    }
} 