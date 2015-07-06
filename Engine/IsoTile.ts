﻿///<reference path="IsoTileObject.ts" />
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

    /**
     * Create a new frame-animation.
     *
     * @param  {string}                name   Name of the new animation.
     * @param  {Array<number>}         frames An array that includes the frame numbers.
     * @param  {number}                duration The duration in milliseconds of the animation.
     * @param  {Function = IsoEasing.Linear}  easing    The animation-easing. For more information see IsoEasing.
     * @param  {string = IsoAnimation.ONCE} type      The playing-type. Possible values are: IsoAnimation.ONCE, IsoAnimation.ENDLESS, IsoAnimation.PINGPONG.
     * @param  {Array<IsoCallback> = new Array()} callbacks An array including callback. The events are 'onPlaying', 'onStop', 'onPause', 'onResume'
     * @return {IsoAnimatedSprite}            The sprite.
     */
    addFrameAnimation(name: string, frames: Array<number>, duration: number, easing: Function = IsoEasing.Linear, type: string = IsoAnimation.ONCE, callbacks: Array<IsoCallback> = new Array()): IsoTile {
        this.Engine.animation.addFrameAnimation(name, this, frames, duration, easing, type, callbacks);
        return this;
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

    getCoords(): IsoCoords {
        var r = this.getRenderDetails();
        return {
            x: r.position.x + (this.mapPosition.column * this.tileSize.width * this.zoomLevel),
            y: r.position.y + (this.mapPosition.row * this.tileSize.height * this.zoomLevel) - this.tileHeight,
            width: this.tileSize.width * this.zoomLevel,
            height: this.tileSize.height * this.zoomLevel
        };
    }

    getMapPosition(): IsoMapPosition {
        return this.mapPosition;
    }

    getRenderDetails() {
        return {
            position: this.getRelativePosition(),
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

    updatePhysics(objects: Array<IsoObject>) {
        if (this.mass !== 0) {

        }
    }
} 