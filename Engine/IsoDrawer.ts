"use strict";

interface IIsoRenderDetails {
    image?: HTMLImageElement;
    shape?: Function;
    offset: IsoPoint;
    tileSize?: IsoDimension;
    position: IsoVector2D;
    mapPosition?: IsoMapVector2D;
    renderSize: IsoDimension;
    text?: string;
    align?: string;
    direction?: string;
    filled?: boolean;
    color?: string;
    backgroundColor?: string;
    baseline?: string;
    size?: number;
    font?: string;
    strokeColor?: string;
    strokeWidth?: number;
    zoomLevel: number;
    type: string;
    anchor: IsoPoint;
}

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
            if (!this.Engine.layers.layers[i].isHidden()) {
                this.drawLayer(this.Engine.layers.layers[i]);
            }
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
        if (layer.texts.length > 0) {
            this.drawTexts(layer.texts);
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
                    for (var ii = -1; ii < Math.ceil(this.canvas.canvasElement.height / o.height) + 1; ii++) {
                        for (var i = -1; i < Math.ceil(this.canvas.canvasElement.width / o.width) + 1; i++) {
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

                            this.drawImage({
                                image: renderDetails.image,
                                offset: new IsoPoint(renderDetails.offset.x, renderDetails.offset.y),
                                tileSize: renderDetails.tileSize,
                                position: new IsoVector2D(rx, ry),
                                renderSize: renderDetails.renderSize
                            });
                        }
                    }
                } else {
                    this.drawImage(renderDetails);
                }
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    } 
    /** Draws all given objects. */
    drawObjects(objects: Array<IsoObject|IsoEmitter>) {
        for (var i = 0; i < objects.length; i++) {
            var o: any = objects[i];
            if (o.hidden === false) {
                o.updatePosition();
                var renderDetails: IIsoRenderDetails = o.getRenderDetails();
                if (o.rotation !== 0) {
                    this.translate(o, renderDetails);
                    this.rotate(o, renderDetails);
                    this.resetTranslation(o, renderDetails);
                }
                this.context.globalCompositeOperation = o.blendingMode;
                this.context.globalAlpha = o.alpha;
                if (renderDetails.type === "IsoObject" || renderDetails.type === "IsoSprite") {
                    if (o.ressource.ressource.type === IsoRessource.IMAGE) {
                        this.drawImage(renderDetails);
                    }
                } else if (renderDetails.type === "IsoEmitter") {
                    this.drawParticles(renderDetails, o);
                }
                
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    }
    /** Draws the particles of an emitter. */
    drawParticles(renderDetails: IIsoRenderDetails, emitter: IsoEmitter) {
    }
    /** Draws all given texts. */
    drawTexts(objects: Array<IsoText>) {
        for (var i = 0; i < objects.length; i++) {
            var o: IsoText = objects[i];
            if (o.hidden === false) {
                o.updatePosition();
                var renderDetails: IIsoRenderDetails = o.getRenderDetails();
                if (o.rotation !== 0) {
                    this.translate(o, renderDetails);
                    this.rotate(o, renderDetails);
                    this.resetTranslation(o, renderDetails);
                }
                this.context.globalCompositeOperation = o.blendingMode;
                this.context.globalAlpha = o.alpha;

                this.drawText(renderDetails);

                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    }

    private drawImage(renderDetails) {
        if (renderDetails["alpha"] !== undefined) {
            this.context.globalAlpha = renderDetails["alpha"];
        }
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

    private drawText(renderDetails: IIsoRenderDetails) {
        var actualColor = this.canvas.context.fillStyle;
        var actualFont = this.canvas.context.font;
        var actualAlign = this.canvas.context.textAlign;
        var actualBaseline = this.canvas.context.textBaseline;
        var actualDirection = this.canvas.context.direction;

        if (typeof renderDetails.size === "string")
            this.canvas.context.font = renderDetails.size + " " + renderDetails.font;
        else
            this.canvas.context.font = renderDetails.size + "px " + renderDetails.font;

        if (renderDetails.backgroundColor !== null && renderDetails.backgroundColor !== "transparent") {
            this.canvas.context.beginPath();
            var x = renderDetails.position.x;
            var y = renderDetails.position.y;

            if (renderDetails.align === IsoText.CENTER) {
                x = x - (renderDetails.renderSize.width / 2);
            } else if (renderDetails.align === IsoText.RIGHT) {
                x = x  + renderDetails.renderSize.width;
            }
            this.canvas.context.rect(x, y, renderDetails.renderSize.width, renderDetails.renderSize.height);
            this.canvas.context.fillStyle = renderDetails.backgroundColor;
            this.canvas.context.fill();
        }

        this.canvas.context.direction = renderDetails.direction;
        this.canvas.context.textAlign = renderDetails.align;
        this.canvas.context.textBaseline = renderDetails.baseline;

        if (renderDetails.filled === true) {
            this.canvas.context.fillStyle = renderDetails.color;
            this.canvas.context.fontStyle = renderDetails.size + "px " + renderDetails.font;
            this.canvas.context.fillText(renderDetails.text, renderDetails.position.x, renderDetails.position.y);
        }

        if (renderDetails.filled === false || renderDetails.strokeWidth > 0 && renderDetails.strokeColor !== null && renderDetails.strokeColor !== "transparent") {
            this.canvas.context.fontStyle = renderDetails.size + "px " + renderDetails.font;
            this.canvas.context.lineWidth = renderDetails.strokeWidth;
            this.canvas.context.strokeStyle = renderDetails.strokeColor;
            this.canvas.context.strokeText(renderDetails.text, renderDetails.position.x, renderDetails.position.y);

        }

        this.canvas.context.fillStyle = actualColor;
        this.canvas.context.font = actualFont;
        this.canvas.context.textAlign = actualAlign;
        this.canvas.context.textBaseline = actualBaseline;
        this.canvas.context.direction = actualDirection;
    }

    /** Sets the anchor of an object. */
    private translate(object: IsoObject|IsoText|IsoTile|IsoEmitter, renderDetails: any) {
        this.context.translate(renderDetails.anchor.x, renderDetails.anchor.y);
    }
    /** Reset the anchor of an object. */
    private resetTranslation(object: IsoObject|IsoText|IsoTile|IsoEmitter, renderDetails: any) {
        this.context.translate(-renderDetails.anchor.x, -renderDetails.anchor.y);
    }
    /** Rotates an object. */
    private rotate(object: IsoObject|IsoText|IsoTile|IsoEmitter, renderDetails: any) {
        this.context.rotate(object.rotation * Math.PI / 180);
    }
} 