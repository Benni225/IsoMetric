"use strict";

class IsoDrawer {
    Engine: IsoMetric;
    canvas: IsoCanvas;
    context: any;
    __DEBUG_SHOW: boolean = false;
    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
        this.canvas = Engine.canvas;
        this.context = Engine.canvas.context;
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
        this.drawSprites(layer.sprites);
    }

    drawTileMap(tileMap: IsoTileMap) {
        var tiles = tileMap.getTilesInView();
        for (var y = 0; y < tiles.rowEnd - tiles.rowStart; y++) {
            for (var x = 0; x < tiles.columnEnd - tiles.columnStart; x++) {
                var detail = tiles.tiles[y][x].getRenderDetails();
                this.context.drawImage(
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

    drawSprites(sprites: Array<IsoSprite>) {
        for (var i = 0; i < sprites.length; i++) {
            var s = sprites[i];
            var renderDetails = s.getRenderDetails();
            this.context.translate(renderDetails.position.x + s.anchor.x, renderDetails.position.y + s.anchor.y);
            this.context.rotate(s.rotation * Math.PI / 180);
            this.context.translate(-(renderDetails.position.x + (renderDetails.renderSize.width / 2)), -(renderDetails.position.y + (renderDetails.renderSize.height /2)));
            this.context.drawImage(
                renderDetails.image,
                renderDetails.offset.x,
                renderDetails.offset.y,
                renderDetails.tileSize.width,
                renderDetails.tileSize.height,
                renderDetails.position.x,
                renderDetails.position.y,
                renderDetails.renderSize.width,
                renderDetails.renderSize.height
                );

            this.context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
} 