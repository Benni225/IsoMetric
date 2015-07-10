"use strict";

class IsoDrawer {
    /** An instance of IsoMetric */
    Engine: IsoMetric;
    /** An instance of IsoCanvas */
    canvas: IsoCanvas;
    /** The context of the canvas-element */
    context: any;
    private __DEBUG_SHOW: boolean = false;
    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
        this.canvas = Engine.canvas;
        this.context = Engine.canvas.context;
    }
    /** Redraw all elements on the screen */
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
    /** Draws a single layer. */
    drawLayer(layer: IsoLayer) {
        if (layer.billboards.length > 0) {
            this.drawBillboards(layer.billboards);
        }
        if (layer.getTileMap() !== undefined) {
            this.drawTileMap(layer.getTileMap());
        }
        if (layer.objects.length > 0) {
            this.drawObjects(layer.objects);
        }
    }
    /** Draws a tilemap of a layer. */
    drawTileMap(tileMap: IsoTileMap) {
        tileMap.update();
        var tiles = tileMap.getTilesInView();
        for (var y = 0; y < tiles.rowEnd - tiles.rowStart; y++) {
            for (var x = 0; x < tiles.columnEnd - tiles.columnStart; x++) {
                tiles.tiles[y][x].updatePosition();
                var detail = tiles.tiles[y][x].getRenderDetails();

                if (tiles.tiles[y][x].rotation !== 0) {
                    this.translate(tiles.tiles[y][x], detail);
                    this.rotate(tiles.tiles[y][x], detail);
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

    /** Draws all given objects. */
    drawBillboards(objects: Array<IsoBillboard>) {
        for (var i = 0; i < objects.length; i++) {
            var o = objects[i];
            if (o.hidden === false) {
                o.updatePosition();
                var renderDetails = o.getRenderDetails();
                if (o.rotation !== 0) {
                    this.translate(o, renderDetails);
                    this.rotate(o, renderDetails);
                    this.resetTranslation(o, renderDetails);
                }
                this.context.globalCompositeOperation = o.blendingMode;
                this.context.globalAlpha = o.alpha;
                if (o.repeat !== IsoBillboard.NOREPEAT) {
                    if (o.repeat === IsoBillboard.REPEAT) {
                        if (o.scrollPosition.x <= -o.width || o.scrollPosition.x >= o.width) {
                            o.scrollPosition.x = 0;
                        }
                        if (o.scrollPosition.y <= -o.height || o.scrollPosition.y >= o.height) {
                            o.scrollPosition.y = 0;
                        }
                    }
                    if (o.repeat === IsoBillboard.REPEATX) {
                        if (o.scrollPosition.x <= -o.width || o.scrollPosition.x >= o.width) {
                            o.scrollPosition.x = 0;
                        }
                    }
                    if (o.repeat === IsoBillboard.REPEATY) {
                        if (o.scrollPosition.y <= -o.height || o.scrollPosition.y >= o.height) {
                            o.scrollPosition.y = 0;
                        }
                    }
                    o.updatePosition();
                    for (var ii = 0; ii < Math.ceil(this.canvas.canvasElement.height / o.height) + 1; ii++) {
                        for (var i = 0; i < Math.ceil(this.canvas.canvasElement.width / o.width) + 1; i++) {
                            var rx = renderDetails.position.x,
                                ry = renderDetails.position.y,
                                fx = o.scrollPosition.x > 0 ? -1 : 1,
                                fy = o.scrollPosition.y > 0 ? -1 : 1;

                            if (o.repeat === IsoBillboard.REPEAT) {
                                rx += i * (fx * renderDetails.renderSize.width);
                                ry += ii * (fy * renderDetails.renderSize.height);
                            }
                            if (o.repeat === IsoBillboard.REPEATX) {
                                rx += i * (fx * renderDetails.renderSize.width);
                            }
                            if (o.repeat === IsoBillboard.REPEATY) {
                                ry += ii * (fy * renderDetails.renderSize.height);
                            }

                            this.context.drawImage(
                                renderDetails.image,
                                renderDetails.offset.x,
                                renderDetails.offset.y,
                                renderDetails.tileSize.width,
                                renderDetails.tileSize.height,
                                rx,
                                ry,
                                renderDetails.renderSize.width,
                                renderDetails.renderSize.height
                                );
                        }
                    }
                } else {
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
                }
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    } 
    /** Draws all given objects. */
    drawObjects(objects: Array<IsoObject>) {
        for (var i = 0; i < objects.length; i++) {
            var o = objects[i];
            if (o.hidden === false) {
                o.updatePosition();
                var renderDetails = o.getRenderDetails();
                if (o.rotation !== 0) {
                    this.translate(o, renderDetails);
                    this.rotate(o, renderDetails);
                    this.resetTranslation(o, renderDetails);
                }
                this.context.globalCompositeOperation = o.blendingMode;
                this.context.globalAlpha = o.alpha;
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
    /** Sets the anchor of an object. */
    private translate(object: IsoObject, renderDetails: any) {
        this.context.translate(renderDetails.anchor.x, renderDetails.anchor.y);
    }
    /** Reset the anchor of an object. */
    private resetTranslation(object: IsoObject, renderDetails: any) {
        this.context.translate(-renderDetails.anchor.x, -renderDetails.anchor.y);
    }
    /** Rotates an object. */
    private rotate(object: IsoObject, renderDetails: any) {
        this.context.rotate(object.rotation * Math.PI / 180);
    }
} 