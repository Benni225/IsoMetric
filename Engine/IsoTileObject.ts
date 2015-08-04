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
    tileOffset: IsoPoint = new IsoPoint(0, 0);
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

    setTileOffset(x: number, y: number): IsoTileObject {
        this.tileOffset.set(x, y);
        return this;
    }

    getTileOffset(): IsoPoint {
        return this.tileOffset;
    }

    getAbsolutePosition(): IsoVector2D {
        var x = 0, y = 0;
        x =
            ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
            - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x);
        y =
            ((this.position.y + this.offset.y + this.scrollPosition.y + this.tileHeight) * this.zoomLevel)
            - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    }

    getRelativeDimension(): IsoDimension {
        return {
            width: this.tileSize.width * this.zoomLevel,
            height: this.tileSize.height * this.zoomLevel
        };
    }

    getRenderDetails(): IIsoRenderDetails {
        var fx = this.anchor.x / this.tileSize.width * this.scale.factorX,
            fy = this.anchor.y / this.tileSize.height * this.scale.factorY;
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: new IsoPoint((this.position.x + (this.tileSize.width * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (this.tileSize.height * this.zoomLevel * fy * this.scale.factorY))),
            image: this.ressource.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel,
            type: "IsoTileObject"
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
            image: this.ressource.get()
        };
    }

    setTile(tile: number): IsoTileObject {
        try {
            this.tileOffset.set(0, 0);
            this.tile = tile + this.startTile;
            this.tileOffset.x =
            (this.tile % (this.width / this.tileSize.width)) * (this.tileSize.width + this.ressource.ressource.offset.x);
            this.tileOffset.y =
            (Math.floor(this.tile / (this.width / this.tileSize.width))) * (this.tileSize.height + this.ressource.ressource.offset.y);
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