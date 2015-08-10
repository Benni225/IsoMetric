///<reference path="IsoSprite.ts" />
"use strict";
/**
 * This sprite type is an animated sprite, which uses frames of a tileset for animations.
 */
class IsoAnimatedSprite extends IsoSprite {
    /** Type of the object. */
    type: string = "IsoAnimatedSprite";
    /**
     * Creats a new frame-animated sprite 
     */
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string) {
        super(Engine, image, tileInfo);
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    /**
     * Create a new frame-based animation. 
     */
    addFrameAnimation(name: string, frames: Array<number>, duration: number, easing: Function = IsoEasing.Linear, type: string = IsoAnimation.ONCE, callbacks: Array<IsoCallback> = new Array()): IsoAnimatedSprite {
        this.Engine.animation.addFrameAnimation(name, this, frames, duration, easing, type, callbacks);
        return this;
    }
    /** Adds a new playlist. The playlist includes animations which animates both: the attributes and/or the frames of an object.*/
    addPlaylist(name: string, animations: Array<IsoAnimation>): IsoMinimalObject {
        this.Engine.animation.addPlaylist(name, this, animations);
        return this;
    }
}
