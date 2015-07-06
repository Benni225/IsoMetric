///<reference path="IsoTileObject.ts" />
"use strict";

interface IsoTileImage {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
}

interface IsoTileInfo {
    tile: number;
    height: number;
    size: IsoTileSize;
    mapPosition: IsoMapPosition;
}

interface IsoMapPosition {
    row: number;
    column: number;
}

class IsoTile extends IsoTileObject {
    static AUTOMATIC: string = "automatic";
    static MANUAL: string = "manual";
    static POSITION: string = "position";
    static ZOOM: string = "zoom";
    tileOffset: IsoOffset;
    tileSize: IsoTileSize;
    tileHeight: number = 0;
    mapPosition: IsoMapPosition;
    tile: number;
    updateType: string = "automatic";
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileInfo) {
        super(Engine, image);
        try {
            if (tileInfo !== undefined) {
                this.set(tileInfo);
            }
            return this;
        } catch (e) {
            throw ("Can not create tile with following error message: " + e);
        }
    }

    setUpdateType(type: string): IsoTile {
        this.updateType = type;
        return this;
    }

    set(tile: IsoTileInfo): IsoTile {
        this.tileHeight = tile.height;
        this.tileSize = tile.size;
        this.mapPosition = tile.mapPosition;
        this.setTile(tile.tile);

        return this;
    }

    getMapPosition(): IsoMapPosition {
        return this.mapPosition;
    }

    getRenderDetails() {
        return {
            position: this.getRelativPosition(),
            mapPosition: this.mapPosition,
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            image: this.image.image.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel
        };
    }
} 