"use strict";
class IsoTileMap {
    tileSizeX: number;
    tileSizeY: number;
    tileSet: IsoTileSet;
    map: IsoMap;
    heightMap: IsoHeightMap;
    heightTile: number;
    scrollX: number = 0;
    scrollY: number = 0;
    scrollSpeed: number = 1;
    height: number;
    width: number;
    offsetX: number = 0;
    offsetY: number = 0;
    Engine: IsoMetric;

    constructor(Engine: IsoMetric, width?: number, height?: number, tileSizeX?: number, tileSizeY?: number) {
        this.Engine = Engine;
        if (width !== undefined && height !== undefined && tileSizeX !== undefined && tileSizeY !== undefined) {
            this.create(width, height, tileSizeX, tileSizeY);
        }
    }

    create(width: number, height: number, tileSizeX: number, tileSizeY: number): IsoTileMap {
        this.width = width;
        this.height = height;
        this.tileSizeX = tileSizeX;
        this.tileSizeY = tileSizeY;
        this.map = new IsoMap(this);
        this.heightMap = new IsoHeightMap(this);
        return this;
    }

    setTileSet(tileSet: IsoTileSet): IsoTileMap {
        this.tileSet = tileSet;
        this.tileSet.setTileSize(this.tileSizeX, this.tileSizeY);
        return this;
    }

    getTileSet(): IsoTileSet {
        return this.tileSet;
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

    setScrollSpeed(speed: number): IsoTileMap {
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

    getTilesInRadius(x: number, y: number, width: number, height: number): Array<ITile> {
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
                    tile: this.map.get()[iy][ix],
                    tileHeight: this.heightMap.getHeight(ix, iy)
                });
            }
        }
        return tiles;
    }
} 