"use strict";
interface IIsoDrawObject {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    imageOffsetX: number;
    imageOffsetY: number;
    type?: string;
    tileHeight?: number;
    layer?: IsoLayer;
    imageUrl?: string;
}

"use strict";
class IsoDrawObject {
    objects: Array<IIsoDrawObject> = new Array();
    add(object: IIsoDrawObject) {
        this.objects.push(object);
    }

    clear() {
        this.objects = null;
        this.objects = new Array();
    }
}

class IsoDrawer {
    Engine: IsoMetric;
    Layers: IsoLayers;
    Canvas: IsoCanvas;
    TileSets: IsoTileSets;
    onDrawLayer: Function;
    onDrawComplete: Function;
    objects: IsoDrawObject;
    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
        this.Layers = Engine.layers;
        this.Canvas = Engine.canvas;
        this.TileSets = Engine.tileSets;
        this.objects = new IsoDrawObject;
    }

    draw() {
        this.Canvas.clearScreen();
        this.Layers.sortLayers();
        this.objects.clear();
        for (var i = 0; i < this.Layers.layers.length; i++) {
            if (this.Layers.layers[i].hidden !== true) {
                this.drawLayer(this.Layers.layers[i]);
            }
        }
        this.drawObject();
        if (this.onDrawComplete !== undefined) {
            this.onDrawComplete(this.Engine);
        }
        new IsoEvent("drawComplete").trigger();
        this.Engine.endLoop();
    }

    drawObject() {
        this.objects.objects.sort(this.sortPriorities);
        for (var i = 0; i < this.objects.objects.length; i++) {
            if (this.objects.objects[i].tileHeight > 0) {
                var heightMapImageOffset =
                    this.objects.objects[i].layer.tileMap.tileSet.getTileOffset(this.objects.objects[i].layer.tileMap.heightTile);
                for (var p = 0; p <= this.objects.objects[i].tileHeight; p++) {
                    this.Canvas.context.drawImage(
                        this.objects.objects[i].image,
                        heightMapImageOffset.offsetX,
                        heightMapImageOffset.offsetY,
                        this.objects.objects[i].width,
                        this.objects.objects[i].height,
                        this.objects.objects[i].x,
                        this.objects.objects[i].y - (p * this.objects.objects[i].height),
                        this.objects.objects[i].width,
                        this.objects.objects[i].height);
                }
                this.Canvas.context.drawImage(
                    this.objects.objects[i].image,
                    this.objects.objects[i].imageOffsetX,
                    this.objects.objects[i].imageOffsetY,
                    this.objects.objects[i].width,
                    this.objects.objects[i].height,
                    this.objects.objects[i].x,
                    this.objects.objects[i].y - (this.objects.objects[i].tileHeight * this.objects.objects[i].height),
                    this.objects.objects[i].width,
                    this.objects.objects[i].height);
            } else {

                this.Canvas.context.drawImage(
                    this.objects.objects[i].image,
                    this.objects.objects[i].imageOffsetX,
                    this.objects.objects[i].imageOffsetY,
                    this.objects.objects[i].width,
                    this.objects.objects[i].height,
                    this.objects.objects[i].x,
                    this.objects.objects[i].y,
                    this.objects.objects[i].width,
                    this.objects.objects[i].height);
            }
        }
    }

    drawLayer(layer: IsoLayer) {
        var tileSet = layer.tileMap.getTileSet();
        for (var row = 0; row < layer.tileMap.map.get().length; row++) {
            for (var column = 0; column < layer.tileMap.map.get()[row].length; column++) {
                var x1 = column * tileSet.tileWidth + layer.tileMap.offsetX + layer.tileMap.scrollX;
                var y1 = row * tileSet.tileHeight + layer.tileMap.offsetY + layer.tileMap.scrollY;
                var x2 = x1 + tileSet.tileWidth;
                var y2 = y1 + tileSet.tileHeight;
                var tile = layer.tileMap.map.get()[row][column], offset = tileSet.getTileOffset(tile);
                var sprites = layer.sprites.sprites;

                var priorities: Array<IIsoDrawObject> = new Array();
                priorities.push({
                    x: x1,
                    y: y1,
                    width: layer.tileMap.tileSizeX,
                    height: layer.tileMap.tileSizeY,
                    image: layer.tileMap.tileSet.get(),
                    imageOffsetX: offset.offsetX,
                    imageOffsetY: offset.offsetY,
                    tileHeight: layer.tileMap.heightMap.getHeight(column, row),
                    layer: layer
                });
                for (var i = 0; i < sprites.length; i++) {
                    if ((sprites[i].x) > x1 && (sprites[i].x) < x2 && (sprites[i].y) > y1 && (sprites[i].y) < y2) {
                        var offset = sprites[i].getTileOffset(sprites[i].getTile());
                        priorities.push({
                            x: sprites[i].x,
                            y: sprites[i].y,
                            width: sprites[i].tileWidth,
                            height: sprites[i].tileHeight,
                            image: sprites[i].image,
                            imageOffsetX: offset.offsetX,
                            imageOffsetY: offset.offsetY,
                            tileHeight: 0,
                            type: "sprite"
                        });
                    }
                }

                for (var i = 0; i < priorities.length; i++) {
                    this.objects.add(priorities[i]);
                }
            }
        }
        for (var i = 0; i < layer.billboards.collection.length; i++) {
            var billboard = layer.billboards.collection[i];
            this.objects.add({
                x: billboard.x + (billboard.scrollable === true ? billboard.scrollX : 0),
                y: billboard.y + (billboard.scrollable === true ? billboard.scrollY : 0),
                width: billboard.width,
                height: billboard.height,
                image: billboard.image,
                imageOffsetX: billboard.offsetX,
                imageOffsetY: billboard.offsetY,
                tileHeight: 0,
                type: "billboard"
            });
        }

        if (this.onDrawLayer !== undefined) {
            this.onDrawLayer(this.Engine, layer);
        }
        new IsoEvent("drawLayerComplete").addData(layer).trigger();
    }

    sortPriorities(a: IIsoDrawObject, b: IIsoDrawObject) {
        //bringing billbords in the foreground
        if (a.type === "billboard" || b.type === "billboard") {
            if (a.type === "billboard" && b.type === "billboard") {
                return 0;
            } else if (a.type === "billboard" && b.type !== "billboard") {
                return 1;
            } else {
                return -1;
            }
        } else {
            var ax, ay, bx, by;
            if (a.type === "sprite") {
                ax = a.x + a.width;
                ay = a.y + a.height;
            } else {
                ax = a.x;
                ay = a.y;
            }

            if (b.type === "sprite") {
                bx = b.x + b.width;
                by = b.y + b.height;
            } else {
                bx = b.x;
                by = b.y;
            }
            if (ay > by + 1) {
                return 1;
            }

            if (ay < by + 1) {
                return -1;
            }

            if (ax > bx) {
                return 1;
            }

            if (ax < bx) {
                return -1;
            }
            if (a.tileHeight > b.tileHeight) {
                return 1;
            }

            if (a.tileHeight < b.tileHeight) {
                return -1;
            }
            return 0;
        }
    }
}   