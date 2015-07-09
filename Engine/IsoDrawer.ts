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
        this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
        new IsoEvent("drawComplete").trigger();
        this.Engine.endLoop();
    }

    drawLayer(layer: IsoLayer) {
        this.drawTileMap(layer.getTileMap());
        this.drawSprites(layer.sprites);
    }

    drawTileMap(tileMap: IsoTileMap) {
        tileMap.update();
        var tiles = tileMap.getTilesInView();
        for (var y = 0; y < tiles.rowEnd - tiles.rowStart; y++) {
            for (var x = 0; x < tiles.columnEnd - tiles.columnStart; x++) {
                tiles.tiles[y][x].updatePosition();
                var detail = tiles.tiles[y][x].getRenderDetails();

                if (tiles.tiles[y][x].rotation !== 0) {
                    this.translate(tiles.tiles[y][x], detail);
                    this.rotateTile(tiles.tiles[y][x], detail);
                    this.resetTranslation(tiles.tiles[y][x], detail);
                }
                this.context.globalCompositeOperation = tiles.tiles[y][x].blendingMode;
                this.context.globalAlpha = tiles.tiles[y][x].alpha;
                this.context.drawImage(
                    detail.image,
                    detail.offset.x,
                    detail.offset.y,
                    detail.tileSize.width,
                    detail.tileSize.height,
                    detail.position.x,
                    detail.position.y,
                    detail.renderSize.width,
                    detail.renderSize.height);

                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    }

    drawSprites(sprites: Array<IsoSprite>) {
        for (var i = 0; i < sprites.length; i++) {
            var s = sprites[i];
            if (s.hidden === false) {
                s.updatePosition();
                var renderDetails = s.getRenderDetails();
                if (s.rotation !== 0) {
                    this.translate(s, renderDetails);
                    this.rotate(s, renderDetails);
                    this.resetTranslation(s, renderDetails);
                }
                this.context.globalCompositeOperation = s.blendingMode;
                this.context.globalAlpha = s.alpha;
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
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    }

    translate(object: IsoObject, renderDetails: any) {

        this.context.translate(renderDetails.anchor.x, renderDetails.anchor.y);
    }

    resetTranslation(object: IsoObject, renderDetails: any) {
        this.context.translate(-renderDetails.anchor.x, -renderDetails.anchor.y);
    }

    rotate(object: IsoObject, renderDetails: any) {
        this.context.rotate(object.rotation * Math.PI / 180);
    }

    rotateTile(object: IsoTile, renderDetails: any) {
        this.context.rotate(object.rotation * Math.PI / 180);      
    }
} 