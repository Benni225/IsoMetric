///<reference path="IsoTile" />
///<reference path="IsoTileMap" />
"use strict";
/** 
 * @interface IsoCollisionBody
 * @static
 */
interface IsoCollisionBody {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface IsoFrame {
    offset: IsoPoint;
    dimension: IsoDimension;
}

class IsoSprite extends IsoTileObject {
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string) {
        super(Engine, image, tileInfo);
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }

    getTileImage(): IsoTileImage {
        var x = this.tileOffset.x;
        var y = this.tileOffset.y;
        var width = this.tileSize.width;
        var height = this.tileSize.height + this.tileHeight;

        return {
            x: x,
            y: y,
            width: width,
            height: height,
            image: this.ressource.get()
        };
    }

    setFrame(frame: IsoFrame): IsoSprite {
        this.tileSize = frame.dimension;
        this.tileOffset.set(frame.offset.x, frame.offset.y);
        return this;
    }

    set(tile: IsoTileObjectInfo): IsoSprite {
        this.tileHeight = tile.height|0;
        this.tileSize = tile.size;
        this.setTile(tile.tile);
        return this;
    }

    /** Gets the dimension of the object on the screen. */
    getAbsoluteDimension(): IsoDimension {
        return {
            width: this.tileSize.width * this.zoomLevel * this.scale.factorX,
            height: this.tileSize.height * this.zoomLevel * this.scale.factorY
        };
    }

    getRenderDetails() {
        var fx = this.anchor.x / this.tileSize.width * this.scale.factorX,
            fy = this.anchor.y / this.tileSize.height * this.scale.factorY;
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.tileSize,
            renderSize: this.getAbsoluteDimension(),
            anchor: new IsoPoint((this.position.x + (this.width * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (this.height * this.zoomLevel * fy * this.scale.factorY))),
            image: this.ressource.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel,
            type: "IsoSprite"
        };
    }
}