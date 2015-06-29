"use strict";

class IsoDrawer {
    Engine: IsoMetric;
    canvas: IsoCanvas;
    context: any;
    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
        this.canvas = Engine.canvas;
    }

    update() {
        this.canvas.clearScreen();
        this.Engine.layers.sort();
        for (var i = 0; i < this.Engine.layers.layers.length; i++) {
            this.drawLayer(this.Engine.layers.layers[i]);
        }
        new IsoEvent("drawComplete").trigger();
        this.Engine.endLoop();
    }

    drawLayer(layer: IsoLayer) {
        this.drawTileMap(layer.getTileMap());
    }

    drawTileMap(tileMap: IsoTileMap) {
        tileMap.update();
        var tiles = tileMap.getTilesInView();
        for (var y = 0; y < tiles.rowEnd - tiles.rowStart; y++) {
            for (var x = 0; x < tiles.columnEnd - tiles.columnStart; x++) {
                var detail = tiles.tiles[y][x].getRenderDetails();
                this.canvas.context.drawImage(
                    detail.image,
                    detail.offset.x,
                    detail.offset.y,
                    detail.tileSize.width,
                    detail.tileSize.height,
                    detail.position.x + (detail.mapPosition.column * detail.tileSize.width * detail.zoomLevel),
                    detail.position.y + (detail.mapPosition.row * detail.tileSize.height * detail.zoomLevel),
                    detail.renderSize.width,
                    detail.renderSize.height);
            }
        }
    }
} 