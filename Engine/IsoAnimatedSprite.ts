///<reference path="IsoSprite.ts" />
"use strict";
/**
 * This sprite type is an animated sprite, which uses frames of a tileset for animations.
 */
class IsoAnimatedSprite extends IsoSprite {
    /**
     * Creats a new frame-animated sprite 
     * @param  {IsoMetric} Engine An instance of IsoMetric
     * @param  {IsoRessource} image  A Ressource file including an image
     * @param  {IsoTileObjectInfo} tileInfoObject Including all information about the tile. See IsoTileObjectInfo.
     * @param  {string} name Name of the new Sprite.
     * @return {IsoAnimatedSprite} The Sprite.
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
     * @param  {string} name Name of the new animation.
     * @param  {Array<number>} frames An array that includes the frame numbers.
     * @param  {number} duration The duration in milliseconds of the animation.
     * @param  {Function} easing The animation-easing. For more information see IsoEasing. By default: IsoEasing.Linear.
     * @param  {string} type The playing-type. Possible values are: IsoAnimation.ONCE, IsoAnimation.ENDLESS, IsoAnimation.PINGPONG. By Default: IsoAnimation.ONCE.
     * @param  {Array<IsoCallback>} callbacks An array including callback. The events are 'onPlaying', 'onStop', 'onPause', 'onResume'
     * @return {IsoAnimatedSprite} The sprite.
     */
    addFrameAnimation(name: string, frames: Array<number>, duration: number, easing: Function = IsoEasing.Linear, type: string = IsoAnimation.ONCE, callbacks: Array<IsoCallback> = new Array()): IsoAnimatedSprite {
        this.Engine.animation.addFrameAnimation(name, this, frames, duration, easing, type, callbacks);
        return this;
    }
    /**
     * Plays an animation given by its name. 
     * @param  {string} name Name of th animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    play(name: string): IsoAnimatedSprite {
        this.Engine.animation.play(name, this);
        return this;
    }
    /**
     * Stops an animation given by its name. 
     * @param  {string} name Name of the animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    stop(name: string): IsoAnimatedSprite {
        this.Engine.animation.stop(name, this);
        return this;
    }
    /**
     * Resumes an animation given by its name.
     * @param  {string} name Name of the animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    resume(name: string): IsoAnimatedSprite {
        this.Engine.animation.resume(name, this);
        return this;
    }
    /**
     * Pause an animation given by its name. 
     * @param  {string} name  Name of the animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    pause(name: string): IsoAnimatedSprite {
        this.Engine.animation.pause(name, this);
        return this;
    }
}
