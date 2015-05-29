///<reference path="IsoMap.ts" />
"use strict";
class IsoHeightMap extends IsoMap {
    strength: number = 1;

    constructor(tileMap: IsoTileMap, map?: Array<Array<number>>) {
        super(tileMap, map);
    }

    getHeight(x: number, y: number): number {
        return this.map[y][x];
    }

    setStrength(strength: number): IsoHeightMap {
        this.strength = strength;
        return this;
    }
} 