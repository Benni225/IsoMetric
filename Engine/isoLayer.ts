///<reference path="IsoObject.ts" />
///<reference path="IsoTileObject.ts" />
///<reference path="IsoSprite.ts" />
///<reference path="IsoTileMap.ts" />
"use strict";
class IsoLayer {
    objects: Array<IsoObject> = new Array();
    tileMap: IsoTileMap;
    sprites: Array<IsoSprite> = new Array();
    billboards: any; // isoBillboards

    name: string;
    index: number;
    Engine: IsoMetric;

    constructor(Engine: IsoMetric, index: number, name?: string) {
        this.Engine = Engine;
        this.index = index;
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    addObject(name: string, image: IsoRessource): IsoObject {
        var o = new IsoObject(image, name);
        this.objects.push(o);
        return o;
    }

    addSprite(name: string, image: IsoRessource, tileObjectInfo: IsoTileObjectInfo): IsoSprite {
        var s = new IsoSprite(this.Engine, image, tileObjectInfo, name);
        this.sprites.push(s);
        return s;
    }

    addAnimatedSprite(name: string, image: IsoRessource, tileObjectInfo: IsoTileObjectInfo): IsoAnimatedSprite {
        var s = new IsoAnimatedSprite(this.Engine, image, tileObjectInfo, name);
        this.sprites.push(s);
        return s;
    }

    addTileMap(name: string, image: IsoRessource, tileWidth: number, tileHeight: number, map?: Array<Array<Array<number>>>): IsoTileMap {
        this.tileMap = new IsoTileMap(this.Engine, name, tileWidth, tileHeight, image, map);
        return this.tileMap;
    }

    setName(name: string): IsoLayer {
        this.name = name;
        return this;
    }

    getObject(name: string): IsoObject {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name === name) {
                return this.objects[i];
            }
        }
        return undefined;
    }

    getSprite(name: string): IsoSprite {
        for (var i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i].name === name) {
                return this.sprites[i];
            }
        }
        return undefined;
    }

    getTileMap(): IsoTileMap {
        return this.tileMap;
    }
} 