///<reference path="IsoMap" />
///<reference path="IsoTile" />
"use strict";
interface IsoTilesInView {
    rowStart: number;
    rowEnd: number;
    columnStart: number;
    columnEnd: number;
    tiles: Array<Array<IsoTile>>;
}

class IsoTileMap {
    map: IsoMap;
    tiles: Array<Array<IsoTile>> = new Array();
    tilesInView: IsoTilesInView;
    tileSize: IsoTileSize;
    image: IsoRessource;
    offset: IsoOffset;
    scrollPosition: IsoScroll;
    speed: number = 1;
    zoomLevel: number = 1;
    zoomStrength: number = 1 / 1000;
    minZoomLevel: number;
    maxZoomLevel: number;
    zoomPoint: IsoPoint = { x: 0, y: 0 };
    name: string;
    Engine: IsoMetric;

    constructor(
        Engine: IsoMetric,
        name?: string,
        tileWidth?: number,
        tileHeight?: number,
        image?: IsoRessource,
        map?: Array<Array<Array<number>>>
        ) {
        this.Engine = Engine;
        if (name !== undefined) {
            this.setName(name);
        }
        if (tileWidth !== undefined && tileHeight !== undefined) {
            this.setTileSize({ width: tileWidth, height: tileHeight });
        }
        if (image !== undefined) {
            this.setImage(image);
        }
        if (map !== undefined) {
            this.setMap(map);
        }
        this.setOffset({ x: 0, y: 0 });
        this.setScroll(0, 0);
        return this;
    }

    setMap(map: Array<Array<Array<number>>>): IsoTileMap {
        this.map = new IsoMap(map);
        return this;
    }

    createMap(numTilesX: number, numTilesY: number, defaultValue?: Array<number>): IsoTileMap {
        if (defaultValue === undefined) {
            defaultValue = new Array(0);
        }
        var map = new Array();
        for (var y = 0; y < numTilesY; y++) {
            for (var x = 0; x < numTilesX; x++) {
                if (map[y] === undefined) {
                    map[y] = new Array();
                }
                map[y][x] = defaultValue;
            }
        }

        return this.setMap(map);
    }

    createTiles(): IsoTileMap {
        try {
            this.tiles = new Array();
            if (this.verify()) {
                var map = this.map.get(),
                    rows = map.length,
                    columns = map[0].length;
                for (var y = 0; y < rows; y++) {
                     for (var x = 0; x < columns; x++) {
                        if (this.tiles[y] === undefined) {
                            this.tiles[y] = new Array();
                        }
                        var tile = map[y][x][0],
                            height = 0;
                        if (map[y][x][1] !== undefined) {
                            height = map[y][x][1];
                        }
                        this.tiles[y][x] = new IsoTile(this.image, {
                            tile: tile,
                            height: height,
                            size: this.tileSize,
                            mapPosition: {
                                column: x,
                                row: y
                            }
                        });
                    }
                }
            } else {
                throw ("The tilemap '" + this.name + "' is not valid. Please check the properties image, map and tileSize.");
            }
            return this;
        } catch (e) {
            console.log(e);
        }
    }

    getTile(name: string) {
        for (var i = 0; i < this.tiles.length; i++) {
            for (var p = 0; p < this.tiles[0].length; p++) {
                if (this.tiles[i][p].name === name) {
                    return this.tiles[i][p];
                }
            }
        }
    }
    /**
     * @todo
     * find a solution for columnStart, columnEnd, rowStart and rowEnd in connection with zooming.
     */
    getTilesInView(): IsoTilesInView {
        if (this.verify()) {
            var canvasWidth = this.Engine.canvas.canvasElement.width,
                canvasHeight = this.Engine.canvas.canvasElement.height,
                map = this.map.get(),
                mapLengthY = map.length,
                mapLengthX = map[0].length,
                columnStart =
                    Math.floor(((this.offset.x + (-this.scrollPosition.x)) * this.zoomLevel) / (this.tileSize.width * this.zoomLevel))
                    - Math.floor(1 / this.zoomLevel),
                columnEnd =
                    columnStart + Math.floor(canvasWidth / (this.tileSize.width * this.zoomLevel)) + 2 * Math.floor(1 / (this.zoomLevel)),
                rowStart =
                    Math.floor(((this.offset.y + (-this.scrollPosition.y)) * this.zoomLevel) / (this.tileSize.height * this.zoomLevel))
                    - Math.floor(1 / this.zoomLevel),
                rowEnd =
                    rowStart + Math.floor(canvasHeight / (this.tileSize.height * this.zoomLevel)) + 2 * Math.floor(1 / this.zoomLevel);
            if (columnStart < 0) {
                columnStart = 0;
            }
            if (rowStart < 0) {
                rowStart = 0;
            }
            if (columnEnd >= mapLengthX) {
                columnEnd = mapLengthX;
            }
            if (rowEnd >= mapLengthY) {
                rowEnd = mapLengthY;
            }

            var tiles = new Array();
            for (var y = 0; y < rowEnd - rowStart; y++) {
                for (var x = 0; x < columnEnd - columnStart; x++) {
                    if (tiles[y] === undefined) {
                        tiles[y] = new Array();
                    }
                    tiles[y][x] = this.tiles[y + rowStart][x + columnStart];
                }
            }
            return {
                rowStart: rowStart,
                rowEnd: rowEnd,
                columnEnd: columnEnd,
                columnStart: columnStart,
                tiles: tiles
            };
        } else {
            throw ("The tilemap '" + this.name + "' is not valid. Please check the properties image, map and tileSize.");
        }
    }

    /**
     * Gets all tiles in specified area
     * @param x The position on the X-axis of the area
     * @param y The position on the Y-axis of the area
     * @param width The width of the area
     * @param height The height of the area
     * @retrurn An object with information of all tiles
     */
    getTilesInRadius(x: number, y: number, width: number, height: number): Array<IsoTile> {
        x = x - this.offset.x + this.scrollPosition.x;
        y = y - this.offset.y + this.scrollPosition.y;

        var map = this.map.get(),
            mapLengthY = map.length,
            mapLengthX = map[0].length,
            columnStart = (x - (x % this.tileSize.width)) / this.tileSize.width,
            columnEnd = ((x + width) - ((x + width) % this.tileSize.width)) / this.tileSize.width,
            rowStart = (y - (y % this.tileSize.height)) / this.tileSize.height,
            rowEnd = ((y + height) - ((y + height) % this.tileSize.height)) / this.tileSize.height;

        if (columnStart < 0) {
            columnStart = 0;
        }
        if (rowStart < 0) {
            rowStart = 0;
        }
        if (columnEnd >= mapLengthX) {
            columnEnd = mapLengthX;
        }
        if (rowEnd >= mapLengthY) {
            rowEnd = mapLengthY;
        }

        var tiles = new Array();
        for (var row = rowStart; row < rowEnd; row++) {
            for (var column = columnStart; column < columnEnd; column++) {
                tiles[row][column] = this.tiles[row][column];
            }
        }
        return tiles;
    }

    setImage(image: IsoRessource): IsoTileMap {
        this.image = image;
        return this;
    }

    setMaxZoomLevel(zoomLevel: number): IsoTileMap {
        this.maxZoomLevel = zoomLevel;
        return this;
    }

    setMinZoomLevel(zoomLevel: number): IsoTileMap {
        this.minZoomLevel = zoomLevel;
        return this;
    }

    setName(name: string): IsoTileMap {
        this.name = name;
        return this;
    }

    setOffset(o: IsoOffset): IsoTileMap {
        this.offset = o;
        return this;
    }

    setScroll(x: number, y: number): IsoTileMap {
        this.scrollPosition = { x: x, y: y };
        return this;
    }

    setSpeed(speed: number): IsoTileMap {
        this.speed = speed;
        return this;
    }

    scroll(x: number, y: number): IsoTileMap {
        x = (x * this.speed) + this.scrollPosition.x;
        y = (y * this.speed) + this.scrollPosition.y;
        this.scrollPosition = {
            x: x,
            y: y
        };
        return this;
    }

    setTileSize(size: IsoTileSize): IsoTileMap {
        this.tileSize = size;
        return this;
    }

    setZoomLevel(zoomLevel: number): IsoTileMap {
        this.zoomLevel = zoomLevel;
        return this;
    }

    setZoomPoint(point: IsoPoint): IsoTileMap {
        this.zoomPoint = point;
        return this;
    }

    setZoomStrength(zoomStrength: number): IsoTileMap {
        this.zoomStrength = zoomStrength / 1000;
        return this;
    }

    update() {
        if (this.tiles === undefined || this.tiles.length === 0) {
            this.createTiles();
        }
        this.tilesInView = this.getTilesInView();
        for (var y = 0; y < this.tiles.length; y++) {
            for (var x = 0; x < this.tiles[0].length; x++) {
                this.updateTile(this.tiles[y][x]);
            }
        }
    }

    updateTile(tile: IsoTile) {
        if (tile !== undefined) {
            if (tile.updateType === IsoTile.AUTOMATIC) {
                tile.offset = this.offset;
                tile.scrollPosition = this.scrollPosition;
                tile.setZoomLevel(this.zoomLevel);
                tile.setZoomPoint(this.zoomPoint);
            } else if (tile.updateType === IsoTile.POSITION) {
                tile.offset = this.offset;
                tile.scrollPosition = this.scrollPosition;
            } else if (tile.updateType === IsoTile.ZOOM) {
                tile.setZoomLevel(this.zoomLevel);
                tile.setZoomPoint(this.zoomPoint);
            }

            tile.tile = this.map.get()[tile.mapPosition.row][tile.mapPosition.column][0];
            tile.height = 0;
            if (this.map.get()[tile.mapPosition.row][tile.mapPosition.column][0][1] !== undefined) {
                tile.height = this.map.get()[tile.mapPosition.row][tile.mapPosition.column][0][1];
            }
        }
    }

    verify() {
        if (this.image === undefined || this.image.image.isLoaded === false) {
            return false;
        }

        if (this.tileSize === undefined) {
            return false;
        }

        if (this.map === undefined && this.map.get() === undefined && this.map.get()[0] === undefined) {
            return false;
        }
        return true;
    }

    zoom(zoom: number): IsoTileMap {
        var zoomLevel = this.zoomLevel + (this.zoomStrength * zoom);
        if (this.maxZoomLevel !== undefined && this.minZoomLevel !== undefined) {
            if (zoomLevel >= this.minZoomLevel && zoomLevel <= this.maxZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        } else if (this.maxZoomLevel !== undefined) {
            if (zoomLevel <= this.maxZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        } else if (this.minZoomLevel !== undefined) {
            if (zoomLevel >= this.minZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        } else {
            this.setZoomLevel(zoomLevel);
        }
        return this;
    }
} 