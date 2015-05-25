///<reference path="IsoMap.ts" />
"use strict";
interface ITile {
    x: number;
    y: number;
    width: number;
    height: number;
    tile: number;
}
class IsoTileSet extends IsoBaseTileImage {
    constructor(Engine: IsoMetric, name: string, src: string) {
        super(Engine, name, src);
        this.prefix = "TILESET_";
    }
}

class IsoTileSets extends IsoBaseTileImages {
    constructor(Engine: IsoMetric) {
        super(Engine);
    }
}