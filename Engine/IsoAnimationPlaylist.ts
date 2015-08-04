///<reference path="IsoOn.ts" />
"use strict";

class IsoAnimationPlaylist extends IsoOn {
    /** Name of the playlist. */
    name: string;
    /** The referencing object of the animation. */
    object: IsoMinimalObject|IsoText|IsoSprite;
    /** True, if the playlist is playing, else if not.*/
    isPlaying: boolean = false;
    /** All the animations of the playlist.*/
    animations: Array<IsoAnimation> = new Array();
    /** The current playing animation.*/
    current: string = "";
    /** The name of paused animation */
    pausedAnimation: string;
    /** Creates a new playlist.*/
    constructor(name: string, object: IsoMinimalObject|IsoText|IsoSprite, animations: Array<IsoAnimation>) {
        super();
        this.name = name;
        this.object = object;
        this.animations = animations;
        document.addEventListener(IsoAnimation.PLAYED, (event: CustomEvent) => this.checkPlaylist(event));
    }
    
    private checkPlaylist(event: CustomEvent) {
        if (event.detail.object === this.object && this.isPlaying === true) {
            for (var i = 0; i < this.animations.length; i++) {
                if (i < this.animations.length - 1 && event.detail.name === this.current) {
                    this.next(this.animations[i + 1]);
                } else if (event.detail.name === this.current) {
                    this.stop();
                }
            }
        }
    }
    /** Stops the playlist. */
    stop() {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].isPlaying === true) {
                this.animations[i].stop();
            }
        }
        this.isPlaying = false;
        this.current = "";
    }
    /** Pause the playlist and saves the current animation.*/
    pause() {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].isPlaying === true) {
                this.animations[i].pause();
                this.pausedAnimation = this.animations[i].name;
            }
        }
        this.isPlaying = false;
    }
    /** Resumes the playlist. */
    resume() {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === this.pausedAnimation) {
                this.animations[i].resume();
            }
        }
    }
    /** Plays the next animation. */
    next(animation: IsoAnimation) {
        this.current = animation.name;
        animation.play();
    }
    /** Plays the playlist from the beginning. */
    play() {
        if (this.animations !== undefined && this.animations.length > 0 && this.isPlaying === false) {
            this.isPlaying = true;
            this.animations[0].play();
        }
    }
}