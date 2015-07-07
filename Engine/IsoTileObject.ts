///<reference path="IsoObject.ts" />
"use strict";
interface IsoTileSize {
    width: number;
    height: number;
}

interface IsoTileObjectInfo {
    tile: number;
    height: number;
    size: IsoTileSize;
}

class IsoTileObject extends IsoObject {
    tileOffset: IsoOffset = {x: 0, y: 0};
    tileSize: IsoTileSize;
    tileHeight: number = 0;
    tile: number;
    startTile: number = 0;
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo?: IsoTileObjectInfo) {
        super(Engine, image);
        try {
            if (tileInfo !== undefined) {
                this.set(tileInfo);
            }
            return this;
        } catch (e) {
            throw (e);
        }
    }

    setTileOffset(offset: IsoOffset): IsoTileObject {
        this.tileOffset = offset;
        return this;
    }

    getTileOffset(): IsoOffset {
        return this.tileOffset;
    }

    getRelativePosition(): IsoPoint {
        var x = 0, y = 0;
        x =
            ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
            - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x);
        y =
            ((this.position.y + this.offset.y + this.scrollPosition.y + this.tileHeight) * this.zoomLevel)
            - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y);
        return {
            x: x,
            y: y
        };
    }

    getRelativeDimension(): IsoDimension {
        return {
            width: this.tileSize.width * this.zoomLevel,
            height: this.tileSize.height * this.zoomLevel
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
        this.tileHeight = tile.height;
        this.tileSize = tile.size;
        this.rigidBody.width = tile.size.width;
        this.rigidBody.height = tile.size.height;
        this.setTile(tile.tile);
        return this;
    }

    updatePosition() {
        this.velocity.x *= this.friction;
        if (this.mass === 0) {
            this.velocity.y *= this.friction;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rigidBody = this.getCoords();
    }
}  