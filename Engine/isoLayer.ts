"use strict";
class IsoLayer {
    width: number;
    height: number;
    index: number;
    map: IsoMap;
    tileSizeX: number;
    tileSizeY: number;
    tileSet: IsoTileSet;
    shadowTileSet: HTMLImageElement;
    shadowStrength: number = 0.5;
    name: string;
    hidden: boolean = false;
    Engine: IsoMetric;
    offsetX: number = 0;
    offsetY: number = 0;
    scrollX: number = 0;
    scrollY: number = 0;
    scrollSpeed: number = 1;
    sprites: IsoSprites;
    billboards: IsoBillboards;

    constructor(Engine: IsoMetric, name: string, width: number, height: number, index: number, tileSizeX: number, tileSizeY: number) {
        this.Engine = Engine;
        this.sprites = new IsoSprites(this.Engine, this);
        this.billboards = new IsoBillboards(this.Engine, this);
        this.create(name, width, height, index, tileSizeX, tileSizeY);
    }

    create(name: string, width: number, height: number, index: number, tileSizeX: number, tileSizeY: number): IsoLayer {
        this.width = width;
        this.height = height;
        this.index = index;
        this.tileSizeX = tileSizeX;
        this.tileSizeY = tileSizeY;
        this.name = name;
        this.map = new IsoMap(this);

        return this;
    }

    setTileSet(tileSet: IsoTileSet) : IsoLayer {
        this.tileSet = tileSet;
        this.tileSet.setTileSize(this.tileSizeX, this.tileSizeY);
        return this;
    }

    getTileSet(): IsoTileSet {
        return this.tileSet;
    }

    setShadowTileSet(image: HTMLImageElement): IsoLayer {
        if (this.map.isSimpleShadowMap) {
            console.warn("Layer '" + this.name + "' includes a simple shadowmap, so you can not set a shadowmap-tileset!");
        }
        this.shadowTileSet = image;
        return this;
    }


    hide() : IsoLayer {
        this.hidden = true;
        return this;
    }

    show() : IsoLayer {
        this.hidden = false;
        return this;
    }

    setDeltaScroll(x: number, y: number) {
        this.scrollX = this.scrollX + (this.scrollSpeed * -(x));
        this.scrollY = this.scrollY + (this.scrollSpeed * (y));
        if (this.scrollX > 0) {
            this.scrollX = 0;
        }
        if (this.scrollY > 0) {
            this.scrollY = 0;
        }
        if (-(this.scrollX) + this.Engine.config.get("windowOptions").width + this.offsetX > (this.width - (this.width % this.tileSizeX))) {
            this.scrollX =
                -((this.width - (this.width % this.tileSizeX)) + this.offsetX - this.Engine.config.get("windowOptions").width);
        }
        if (
            -(this.scrollY) + this.Engine.config.get("windowOptions").height + this.offsetY > (this.height - (this.height % this.tileSizeY))
          ) {
            this.scrollY =
                -((this.height - (this.height % this.tileSizeY)) + this.offsetY - this.Engine.config.get("windowOptions").height);
        }
    }

    setScrollSpeed(speed: number) : IsoLayer {
        this.scrollSpeed = speed;
        return this;
    }

    mouseOver(): ITile {
        var mouseX = this.Engine.input.mouseX,
            mouseY = this.Engine.input.mouseY;
        if (
                mouseX > this.width ||
                mouseY > this.height ||
                typeof mouseX === "NaN" ||
                typeof mouseY === "NaN" ||
                mouseX === undefined ||
                mouseY === undefined
            ) {
            return null;
        } else {
            mouseX = mouseX - this.offsetX;
            mouseY = mouseY - this.offsetY;
            if (mouseY > 0 && mouseX > 0) {
                var row = Math.floor((mouseY + (-this.scrollY)) / this.tileSizeY),
                    column = Math.floor((mouseX + (-this.scrollX)) / this.tileSizeX),
                    x = Math.floor(column * this.tileSizeX) + this.scrollX + this.offsetX,
                    y = Math.floor(row * this.tileSizeY) + this.scrollY + this.offsetY;
                return {
                    x: x,
                    y: y,
                    width: this.tileSizeX,
                    height: this.tileSizeY,
                    tile: this.map.get()[row][column]
                };
            } else {
                return null;
            }
        }
    }

    setOffset(x: number, y: number) : IsoLayer {
        this.offsetX = x;
        this.offsetY = y;
        return this;
    }

    getTilesInRadius(x: number, y: number, width: number, height: number) : Array<ITile>{
        x = x - this.offsetX;
        y = y - this.offsetY;
        var tiles = new Array(),
            toX = x + width,
            toY = y + height,
            rowStart = (y - (y % this.tileSizeY)) / this.tileSizeY,
            rowEnd = (toY - (toY % this.tileSizeY)) / this.tileSizeY,
            colStart = (x - (x % this.tileSizeX)) / this.tileSizeX,
            colEnd = (toX - (toX % this.tileSizeX)) / this.tileSizeX;

        for (var iy = rowStart; iy <= rowEnd; iy++) {
            for (var ix = colStart; ix <= colEnd; ix++) {
                var tileX = ix * this.tileSizeX,
                    tileY = iy * this.tileSizeY,
                    tileX2 = tileX + this.tileSizeX,
                    tileY2 = tileY + this.tileSizeY;
                tiles.push({
                    x: ix * this.tileSizeX,
                    y: iy * this.tileSizeY,
                    width: this.tileSizeX,
                    height: this.tileSizeY,
                    tile: this.map.get()[iy][ix]
                });
            }
        }

        return tiles;
    }
}

class IsoLayers {
    layers: Array<IsoLayer> = new Array();
    private lastIndex: number = 0;
    tileset: string;
    Engine: IsoMetric;

    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
    }

    add(name: string, width: number, height: number, tileSizeX: number, tileSizeY: number) : IsoLayer {
        this.layers.push(new IsoLayer(this.Engine, name, width, height, this.lastIndex, tileSizeX, tileSizeY));
        this.lastIndex++;
        return this.getByName(name);
    }

    getByName(name: string) : IsoLayer {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].name === name) {
                return this.layers[i];
            }
        }
        return undefined;
    }

    getByIndex(index: number): IsoLayer {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].index === index) {
                return this.layers[i];
            }
        }
        return undefined;
    }

    layerUp(name: string) : IsoLayers {
        var oldIndex = this.getByName(name).index;
        this.getByIndex(oldIndex + 1).index = oldIndex;
        this.getByName(name).index = oldIndex + 1;
        return this;
    }

    layerDown(name: string) : IsoLayers {
        var oldIndex = this.getByName(name).index;
        this.getByIndex(oldIndex - 1).index = oldIndex;
        this.getByName(name).index = oldIndex - 1;
        return this;
    }

    swapLayers(nameLayer1: string, nameLayer2: string): IsoLayers {
        var oldIndex = this.getByName(nameLayer2).index;
        this.getByName(nameLayer2).index = this.getByName(nameLayer1).index;
        this.getByName(nameLayer1).index = oldIndex;
        return this;
    }

    sortLayers() : IsoLayers {
        this.layers.sort(this.sortLayerByIndex);
        return this;
    }

    sortLayerByIndex(a: IsoLayer, b: IsoLayer) : number {
        return a.index - b.index;
    }

    setTileset(name : string): IsoLayers {
        this.tileset = name;
        return this;
    }

    mouseOver(name: string) {
        return this.getByName(name).mouseOver();
    }
} 