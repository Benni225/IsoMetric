///<reference path="IsoLayer.ts" />
"use strict";
class IsoMap {
    map: Array<Array<number>>;
    TileMap: IsoTileMap;

    constructor(TileMap: IsoTileMap, map?: Array<Array<number>>) {
        this.TileMap = TileMap;
        if (map !== undefined) {
            this.create(map);
        } else {
            var _mapArray = new Array();
            for (var y = 0; y < Math.floor(this.TileMap.height / this.TileMap.tileSizeY); y++) {
                for (var x = 0; x < Math.floor(this.TileMap.width / this.TileMap.tileSizeX); x++) {
                    if (_mapArray[y] === undefined) {
                        _mapArray[y] = new Array();
                    }
                    _mapArray[y].push(0);
                }
            }
            this.map = _mapArray;
        }
    }

    create(map: Array<Array<number>>): IsoMap {
        this.map = map;
        return this;
    }

    edit(x: number, y: number, value: number): IsoMap {
        this.map[y][x] = value;
        return this;
    }

    set(map: Array<Array<number>>): IsoMap {
        this.map = map;
        return this;
    }

    get(): Array<Array<number>> {
        return this.map;
    }
} 