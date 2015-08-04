///<reference path="IsoAnimation.ts" />
"use strict";

class IsoAnimationManager {
    /** Includes all object animations. */
    animations: Array<IsoAnimation> = new Array();
    /** Includes all playlists. */
    playLists: Array<IsoAnimationPlaylist>;
    /** Adds a new frame-based animation. */
    addFrameAnimation(name: string, object: IsoAnimatedSprite|IsoTile, frames: Array<number>, speed: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoAnimationManager {
        this.animations.push(new IsoAnimation().createFrameAnimation(name, object, frames, speed, easing, type, callbacks));
        return this;
    }
    /** Adds a new attribute-based animation. */
    addAnimation(name: string, object: Object, attribute: string, endValue: number, speed: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoAnimationManager {
        this.animations.push(new IsoAnimation().createAnimation(name, object, attribute, endValue, speed, easing, type, callbacks));
        return this;
    }
    /** Adds a new playlist. */
    addPlaylist(name: string, object: IsoMinimalObject|IsoText|IsoSprite, animations: Array<IsoAnimation>): IsoAnimationManager {
        this.playLists.push(new IsoAnimationPlaylist(name, object, animations));
        return this;
    }
    /** Plays an animation given by its name and the animated object.*/
    play(name: string, object: Object) {
        this.get(name, object).play();
    }
    /** Stops an animation given by its name and the animated object.*/
    stop(name: string, object: Object) {
        this.get(name, object).stop();
    }
    /** Resumes an animation given by its name and the animated object.*/
    resume(name: string, object: Object) {
        this.get(name, object).resume();
    }
    /** Pauses an animation given by its name and the animated object.*/
    pause(name: string, object: Object) {
        this.get(name, object).pause();
    }
    /** Checks if an animation is playing given by its name and the animated object.*/
    isPlaying(name: string, object: Object): boolean {
        return this.get(name, object).isPlaying
    }
    /** Sets the addiion type of the animation. */
    setAdditionType(name: string, object: Object, type: string) {
        this.get(name, object).setAdditionType(type);
    }
    /** Plays a playlist given by its name and the animated object.*/
    playPlaylist(name: string, object: IsoMinimalObject|IsoSprite|IsoText) {
        this.getPlaylist(name, object).play();
    }
    /** Stops a playlist given by its name and the animated object.*/
    stopPlaylist(name: string, object: IsoMinimalObject|IsoSprite|IsoText) {
        this.getPlaylist(name, object).stop();
    }
    /** Pauses a playlist given by its name and the animated object.*/
    pausePlaylist(name: string, object: IsoMinimalObject|IsoSprite|IsoText) {
        this.getPlaylist(name, object).pause();
    }
    /** Resumes a playlist given by its name and the animated object.*/
    resumePlaylist(name: string, object: IsoMinimalObject|IsoSprite|IsoText) {
        this.getPlaylist(name, object).resume();
    }
    /** Checks if a playlist is playing given by its name and the animated object.*/
    isPlayingPlaylist(name: string, object: IsoMinimalObject|IsoSprite|IsoText) {
        return this.getPlaylist(name, object).isPlaying;
    }
    /** Returns a specified animation given by its name and the animated object.*/
    get(name: string, object: Object): IsoAnimation {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                return this.animations[i];
            }
        }
    }
    /** Returns a specified playlist given by its name and the animated object.*/
    getPlaylist(name: string, object: Object): IsoAnimationPlaylist {
        for (var i = 0; i < this.playLists.length; i++) {
            if (this.playLists[i].name === name && (this.playLists[i].object === object)) {
                return this.playLists[i];
            }
        }
    }
}