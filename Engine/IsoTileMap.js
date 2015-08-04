///<reference path="IsoMap" />
///<reference path="IsoTile" />
"use strict";
var IsoTileMap = (function () {
    function IsoTileMap(Engine, name, tileWidth, tileHeight, image, map) {
        this.tiles = new Array();
        this.offset = new IsoPoint(0, 0);
        this.scrollPosition = new IsoVector2D(0, 0);
        this.speed = 1;
        this.zoomLevel = 1;
        this.zoomStrength = 1 / 1000;
        this.zoomPoint = new IsoPoint(0, 0);
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
        this.offset.set(0, 0);
        this.scrollPosition.set(0, 0);
        return this;
    }
    IsoTileMap.prototype.setMap = function (map) {
        this.map = new IsoMap(map);
        return this;
    };
    IsoTileMap.prototype.createMap = function (numTilesX, numTilesY, defaultValue) {
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
    };
    IsoTileMap.prototype.createTiles = function () {
        try {
            this.tiles = new Array();
            if (this.verify()) {
                var map = this.map.get(), rows = map.length, columns = map[0].length;
                for (var y = 0; y < rows; y++) {
                    for (var x = 0; x < columns; x++) {
                        if (this.tiles[y] === undefined) {
                            this.tiles[y] = new Array();
                        }
                        var tile = map[y][x][0], height = 0;
                        if (map[y][x][1] !== undefined) {
                            height = map[y][x][1];
                        }
                        this.tiles[y][x] = new IsoTile(this.Engine, this.image, {
                            tile: tile,
                            height: height,
                            size: this.tileSize,
                            mapPosition: new IsoMapVector2D(y, x)
                        });
                    }
                }
            }
            else {
                throw ("The tilemap '" + this.name + "' is not valid. Please check the properties image, map and tileSize.");
            }
            return this;
        }
        catch (e) {
            console.log(e);
        }
    };
    IsoTileMap.prototype.getTile = function (name) {
        for (var i = 0; i < this.tiles.length; i++) {
            for (var p = 0; p < this.tiles[0].length; p++) {
                if (this.tiles[i][p].name === name) {
                    return this.tiles[i][p];
                }
            }
        }
    };
    IsoTileMap.prototype.getTilesInView = function () {
        if (this.verify()) {
            var canvasWidth = this.Engine.canvas.canvasElement.width, canvasHeight = this.Engine.canvas.canvasElement.height, map = this.map.get(), mapLengthY = map.length, mapLengthX = map[0].length, startPointX = (((this.offset.x - this.scrollPosition.x) * this.zoomLevel)
                + ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x)), startPointY = (((this.offset.y - this.scrollPosition.y) * this.zoomLevel)
                + ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y)), columnStart = Math.floor(startPointX / (this.tileSize.width * this.zoomLevel)), columnEnd = Math.floor((canvasWidth + startPointX) / (this.tileSize.width * this.zoomLevel)) + 1, rowStart = Math.floor(startPointY / (this.tileSize.height * this.zoomLevel)), rowEnd = Math.floor((canvasHeight + startPointY) / (this.tileSize.height * this.zoomLevel)) + 1;
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
        }
        else {
            throw ("The tilemap '" + this.name + "' is not valid. Please check the properties image, map and tileSize.");
        }
    };
    IsoTileMap.prototype.getTilesInRadius = function (x, y, width, height) {
        x = x - (((this.offset.x + this.scrollPosition.x) * this.zoomLevel)
            - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x));
        y = y - (((this.offset.y + this.scrollPosition.y) * this.zoomLevel)
            - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y));
        var map = this.map.get(), mapLengthY = map.length, mapLengthX = map[0].length, rowStart = rowStart = Math.floor(y / (this.tileSize.height * this.zoomLevel)), columnStart = Math.floor(x / (this.tileSize.width * this.zoomLevel)), columnEnd = Math.floor((x + width) / (this.tileSize.width * this.zoomLevel)), rowEnd = Math.floor((y + height) / (this.tileSize.height * this.zoomLevel));
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
    };
    IsoTileMap.prototype.getTileOnPosition = function (position) {
        if (this.map.get() !== undefined) {
            var mapLengthY = this.map.map.length, mapLengthX = this.map.map[0].length;
            if (position.x > (mapLengthX * (this.tileSize.width * this.zoomLevel)) ||
                position.y > (mapLengthY * (this.tileSize.height * this.zoomLevel)) ||
                typeof position.x === "NaN" ||
                typeof position.y === "NaN" ||
                position.x === undefined ||
                position.y === undefined) {
                return null;
            }
            else {
                position.x = position.x - (((this.offset.x + this.scrollPosition.x) * this.zoomLevel)
                    - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x));
                position.y = position.y - (((this.offset.y + this.scrollPosition.y) * this.zoomLevel)
                    - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y));
                if (position.y > 0 && position.x > 0) {
                    var row = Math.floor(position.y / (this.tileSize.height * this.zoomLevel)), column = Math.floor(position.x / (this.tileSize.width * this.zoomLevel));
                    return this.tiles[row][column];
                }
                else {
                    return null;
                }
            }
        }
        else {
            return undefined;
        }
    };
    IsoTileMap.prototype.setImage = function (image) {
        this.image = image;
        return this;
    };
    IsoTileMap.prototype.setMaxZoomLevel = function (zoomLevel) {
        this.maxZoomLevel = zoomLevel;
        return this;
    };
    IsoTileMap.prototype.setMinZoomLevel = function (zoomLevel) {
        this.minZoomLevel = zoomLevel;
        return this;
    };
    IsoTileMap.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    IsoTileMap.prototype.setOffset = function (x, y) {
        this.offset.set(x, y);
        return this;
    };
    IsoTileMap.prototype.setScroll = function (x, y) {
        this.scrollPosition.set(x, y);
        return this;
    };
    IsoTileMap.prototype.setSpeed = function (speed) {
        this.speed = speed;
        return this;
    };
    IsoTileMap.prototype.scroll = function (x, y) {
        x = x + this.scrollPosition.x;
        y = y + this.scrollPosition.y;
        this.scrollPosition.set(x, y);
        return this;
    };
    IsoTileMap.prototype.setTileSize = function (size) {
        this.tileSize = size;
        return this;
    };
    IsoTileMap.prototype.setZoomLevel = function (zoomLevel) {
        this.zoomLevel = zoomLevel;
        return this;
    };
    IsoTileMap.prototype.setZoomPoint = function (point) {
        this.zoomPoint = point;
        return this;
    };
    IsoTileMap.prototype.setZoomStrength = function (zoomStrength) {
        this.zoomStrength = zoomStrength / 1000;
        return this;
    };
    IsoTileMap.prototype.update = function () {
        if (this.tiles === undefined || this.tiles.length === 0) {
            this.createTiles();
        }
        for (var y = 0; y < this.tiles.length; y++) {
            for (var x = 0; x < this.tiles[0].length; x++) {
                this.updateTile(this.tiles[y][x]);
            }
        }
    };
    IsoTileMap.prototype.updateTile = function (tile) {
        if (tile !== undefined) {
            if (tile.updateType === IsoTile.AUTOMATIC) {
                tile.offset = this.offset;
                tile.scrollPosition = this.scrollPosition;
                tile.setZoomLevel(this.zoomLevel);
                tile.zoomPoint.set(this.zoomPoint.x, this.zoomPoint.y);
            }
            else if (tile.updateType === IsoTile.POSITION) {
                tile.offset = this.offset;
                tile.scrollPosition = this.scrollPosition;
            }
            else if (tile.updateType === IsoTile.ZOOM) {
                tile.setZoomLevel(this.zoomLevel);
                tile.zoomPoint.set(this.zoomPoint.x, this.zoomPoint.y);
            }
            if (tile.tileHeight === undefined || typeof tile.tileHeight === "NaN") {
                tile.tileHeight = 0;
            }
        }
    };
    IsoTileMap.prototype.verify = function () {
        if (this.image === undefined || this.image.loaded === false) {
            return false;
        }
        if (this.tileSize === undefined) {
            return false;
        }
        if (this.map === undefined && this.map.get() === undefined && this.map.get()[0] === undefined) {
            return false;
        }
        return true;
    };
    IsoTileMap.prototype.zoom = function (zoom) {
        var zoomLevel = this.zoomLevel + (this.zoomStrength * zoom);
        if (this.maxZoomLevel !== undefined && this.minZoomLevel !== undefined) {
            if (zoomLevel >= this.minZoomLevel && zoomLevel <= this.maxZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        }
        else if (this.maxZoomLevel !== undefined) {
            if (zoomLevel <= this.maxZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        }
        else if (this.minZoomLevel !== undefined) {
            if (zoomLevel >= this.minZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        }
        else {
            this.setZoomLevel(zoomLevel);
        }
        return this;
    };
    return IsoTileMap;
})();
