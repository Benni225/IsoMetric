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
    offset: IsoOffset;
    dimension: IsoDimension;
}

class IsoSprite extends IsoTileObject {
    Engine: IsoMetric;

    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string) {
        super(Engine, image, tileInfo);
        this.Engine = Engine;
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
            image: this.image.image.get()
        };
    }

    setFrame(frame: IsoFrame): IsoSprite {
        this.tileSize = frame.dimension;
        this.tileOffset = frame.offset;
        return this;
    }

    set(tile: IsoTileObjectInfo): IsoTileObject {
        this.tileHeight = tile.height;
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
        var fx = this.anchor.x / this.tileSize.width,
            fy = this.anchor.y / this.tileSize.height
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.tileSize,
            renderSize: this.getAbsoluteDimension(),
            anchor: { x: (this.position.x + (this.tileSize.width * this.zoomLevel * fx)), y: (this.position.y + (this.tileSize.height * this.zoomLevel * fy)) },
            image: this.image.image.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel
        };
    }
}