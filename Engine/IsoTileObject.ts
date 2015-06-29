///<reference path="IsoObject.ts" />
"use strict";
interface IsoTileObjectInfo {
    tile: number;
    height: number;
    size: IsoTileSize;
}

class IsoTileObject extends IsoObject {
    tileOffset: IsoOffset;
    tileSize: IsoTileSize;
    tileHeight: number = 0;
    tile: number;
    startTile: number = 0;
    constructor(image: IsoRessource, tileInfo?: IsoTileObjectInfo) {
        super(image);
        try {
            if (tileInfo !== undefined) {
                this.set(tileInfo);
            }
            return this;
        } catch (e) {
            throw ("Can not create tileObject with error message: " + e);
        }
    }

    setTileOffset(offset: IsoOffset): IsoTileObject {
        this.tileOffset = offset;
        return this;
    }

    getRelativPosition(): IsoPoint {
        var x = 0, y = 0;
        x =
            ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
            + ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x);/* (this.position.x * this.zoomLevel) +
        (this.offset.x * this.zoomLevel) +
        (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x) + this.scrollPosition.x; */
        y =
            ((this.position.y + this.offset.y + this.scrollPosition.y + this.height) * this.zoomLevel)
            + ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y); /*(this.position.y * this.zoomLevel) +
        (this.offset.y * this.zoomLevel) +
        (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y) -
        (this.tileHeight * this.zoomLevel) + this.scrollPosition.y;*/
        return {
            x: x,
            y: y
        };
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

    setTile(tile: number): IsoTileObject {
        try {
            this.tileOffset = {x: 0, y: 0};
            this.tile = tile + this.startTile;
            this.tileOffset.x =
            (this.tile % (this.width / this.tileSize.width)) * (this.tileSize.width + this.image.image.offset.x);
            this.tileOffset.y =
            (Math.floor(this.tile / (this.width / this.tileSize.width))) * (this.tileSize.height + this.image.image.offset.y);
            return this;
        } catch (e) {
            throw (e);
        }
    }

    set(tile: IsoTileObjectInfo): IsoTileObject {
        this.setTile(tile.tile);
        this.tileHeight = tile.height;
        this.tileSize = tile.size;
        return this;
    }
}  