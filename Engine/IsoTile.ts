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

    /**
     * Create a new frame-animation.
     *
     * @param  {string}                name   Name of the new animation.
     * @param  {Array<number>}         frames An array that includes the frame numbers.
     * @param  {number}                duration The duration in milliseconds of the animation.
     * @param  {Function}  easing    The animation-easing. For more information see IsoEasing. By default: IsoEasing.Linear.
     * @param  {string} type      The playing-type. Possible values are: IsoAnimation.ONCE, IsoAnimation.ENDLESS, IsoAnimation.PINGPONG. By Default: IsoAnimation.ONCE.
     * @param  {Array<IsoCallback>} callbacks An array including callback. The events are 'onPlaying', 'onStop', 'onPause', 'onResume'
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
            x: r.position.x + (r.mapPosition.column * r.tileSize.width * r.zoomLevel),
            y: r.position.y + (r.mapPosition.row * r.tileSize.height * r.zoomLevel) - this.tileHeight,
            width: this.tileSize.width * this.zoomLevel,
            height: this.tileSize.height * this.zoomLevel
        };
    }

    getMapPosition(): IsoMapPosition {
        return this.mapPosition;
    }

    getRelativePosition(): IsoPoint {
        var x = 0, y = 0;
        x =
        ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
        - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x) + (this.mapPosition.column * this.tileSize.width * this.zoomLevel);
        y =
        ((this.position.y + this.offset.y + this.scrollPosition.y + this.tileHeight) * this.zoomLevel)
        - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y) + (this.mapPosition.row * this.tileSize.height * this.zoomLevel) - this.tileHeight;
        return {
            x: x,
            y: y
        };
    }

    getRenderDetails() {
        var fx = this.anchor.x / this.tileSize.width,
            fy = this.anchor.y / this.tileSize.height;
        return {
            position: this.getRelativePosition(),
            mapPosition: this.mapPosition,
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: { x: (this.getRelativePosition().x + (this.tileSize.width * this.zoomLevel * fx)), y: (this.getRelativePosition().y + (this.tileSize.height * this.zoomLevel * fy)) },
            image: this.image.image.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel
        };
    }

    updatePosition() {
        this.velocity.x *= this.friction;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rigidBody = this.getCoords();

    }
} 