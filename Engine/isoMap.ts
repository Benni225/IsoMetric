///<reference path="IsoLayer.ts" />
"use strict";
class IsoMap {
    map: Array<Array<number>>;
    shadowMap: Array<Array<number>>;
    isSimpleShadowMap: boolean = false;
    Layer: IsoLayer;

    constructor(Layer: IsoLayer, map?: Array<Array<number>>) {
        this.Layer = Layer;
        if (map !== undefined) {
            this.create(map);
        } else {
            var _mapArray = new Array();
            for (var y = 0; y < Math.floor(this.Layer.height / this.Layer.tileSizeY); y++) {
                for (var x = 0; x < Math.floor(this.Layer.width / this.Layer.tileSizeX); x++) {
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

    createShadowMap(map: Array<Array<number>>): IsoMap {
        this.shadowMap = map;
        return this;
    }

    createSimpleShadowMap() {
        this.isSimpleShadowMap = true;
        var _shadowMapArray = new Array();
        for (var y = 0; y < Math.round(this.Layer.height / this.Layer.tileSizeY); y++) {
            for (var x = 0; x < Math.round(this.Layer.width / this.Layer.tileSizeX); x++) {
                _shadowMapArray[y][x] = 255;
            }
        }
    }

    edit(x: number, y: number, value: number): IsoMap {
        this.map[y][x] = value;
        return this;
    }

    editShadowMap(x: number, y: number, value: number): IsoMap {
        this.shadowMap[y][x] = value;
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