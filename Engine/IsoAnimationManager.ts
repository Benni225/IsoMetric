///<reference path="IsoAnimation.ts" />
"use strict";

class IsoAnimationManager {
    animations: Array<IsoAnimation> = new Array();

    addFrameAnimation(name: string, object: IsoAnimatedSprite|IsoTile, frames: Array<number>, speed: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoAnimationManager {
        this.animations.push(new IsoAnimation().createFrameAnimation(name, object, frames, speed, easing, type, callbacks));
        return this;
    }

    addAnimation(name: string, object: Object, attribute: string, endValue: number, speed: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoAnimationManager {
        this.animations.push(new IsoAnimation().createAnimation(name, object, attribute, endValue, speed, easing, type, callbacks));
        return this;
    }

    play(name: string, object: Object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                this.animations[i].play();
            }
        }
    }

    stop(name: string, object: Object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                this.animations[i].stop();
            }
        }
    }

    resume(name: string, object: Object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                this.animations[i].resume();
            }
        }
    }

    pause(name: string, object: Object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                this.animations[i].pause();
            }
        }
    }

    isPlaying(name: string, object: Object): boolean {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                return this.animations[i].isPlaying
            }
        }
    }

}