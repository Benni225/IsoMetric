///<reference path="IsoObject.ts" />
"use strict";
interface IsoTileSize {
    width: number;
    height: number;
}

interface IsoTileObjectInfo {
    tile: number;
    height?: number;
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

    getAbsolutePosition(): IsoPoint {
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

    getRenderDetails() {
        var fx = this.anchor.x / this.tileSize.width * this.scale.factorX,
            fy = this.anchor.y / this.tileSize.height * this.scale.factorY;
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: { x: (this.position.x + (this.tileSize.width * this.zoomLevel * fx * this.scale.factorX)), y: (this.position.y + (this.tileSize.height * this.zoomLevel * fy * this.scale.factorY)) },
            image: this.image.image.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel
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
}  