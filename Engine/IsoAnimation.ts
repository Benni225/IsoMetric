/**
 * A library including all easing-functions.
 * @type {Object}
 */
﻿var IsoEasing = {
    Linear: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * currentIteration / iterationCount + startValue;
    },
    QuadIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        currentIteration = currentIteration / iterationCount;
        return (endValue - startValue) * currentIteration * currentIteration + startValue;
    },
    QuadOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return -(endValue - startValue) * (currentIteration /= iterationCount) * (currentIteration - 2) + startValue;
    },
    QuadInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * currentIteration * currentIteration + startValue;
        }
        return -(endValue - startValue) / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
    },
    CubicIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 3) + startValue;
    },
    CubicOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 3) + 1) + startValue;
    },
    CubicInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 3) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
    },
    QuartIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 4) + startValue;
    },
    QuartOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return -(endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 4) - 1) + startValue;
    },
    QuartInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 4) + startValue;
        }
        return -(endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
    },
    QuintIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 5) + startValue;
    },
    QuintOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 5) + 1) + startValue;
    },
    QuintInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 5) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
    },
    SineIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (1 - Math.cos(currentIteration / iterationCount * (Math.PI / 2))) + startValue;
    },
    SineOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.sin(currentIteration / iterationCount * (Math.PI / 2)) + startValue;
    },
    SineInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) / 2 * (1 - Math.cos(Math.PI * currentIteration / iterationCount)) + startValue;
    },
    ExpoIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(2, 10 * (currentIteration / iterationCount - 1)) + startValue;
    },
    ExpoOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (-Math.pow(2, -10 * currentIteration / iterationCount) + 1) + startValue;
    },
    ExpoInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
        }
        return (endValue - startValue) / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
    },
    CircIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (1 - Math.sqrt(1 - (currentIteration /= iterationCount) * currentIteration)) + startValue;
    },
    CircOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.sqrt(1 - (currentIteration = currentIteration / iterationCount - 1) * currentIteration) + startValue;
    },
    CircInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
    }
};
/**
 * Controls animations.
 * There are two types of animations:
 * 1. "attribute-animation" - animates the attribute of an object. Nearly every object can be animated. The type of the value has to be {number}.
 * 2. "frame-animation" - animates the frames of a sprite or a tile. The type of the animated object has to be {IsoAnimatedSprite} or {IsoTile}.
 */
class IsoAnimation {
    /**
     * See animationType. Plays the animation one time.
     * @type {string}
     */
    static ONCE: string = "once";
    /**
     * See animationType. Plays the animation endless as pingpong.
     * @type {string}
     */
    static PINGPONG: string = "pingpong";
    /**
     * See animationType. Plays the animation endless.
     * @type {string}
     */
    static ENDLESS: string = "endless";

    static ANIMATION_TYPE_FRAME: string = "frame";
    static ANIMATION_TYPE_ATTRIBUTE: string = "attribute";
    /**
     * Name of the animation.
     * @type {string}
     */
    name: string;
    /**
     * Duration of the animation in milliseconds.
     * @type {number}
     */
    duration: number;
    /**
     * Includes all frames of an animation.
     * @type {Array<number>}
     */
    frames: Array<number>;

    framesPerSecond: number = 60;
    /**
     * The initiale value of the animation.
     * @type {number}
     */
    startValue: number;
    /**
     * The target value of the animation.
     * @type {number}
     */
    endValue: number;
    /**
     * The current value of the animation, while playing.
     * @type {number}
     */
    actualValue: number;
    /**
     * The attribute of the specified object, which will be changed.
     * @example
     * var object = {
     * 	position: {x: 0, y: 0},
     *  other: 0
     * };
     * For changing object.position.x:
     * ...createAnimation('name', object, 'position.x', ...);
     * For changing object.other:
     * ...createAnimation('name', object, 'other', ...);
     * @type {string}
     */
    attribute: string;
    type: string;
    easing: Function = IsoEasing.Linear;
    isPlaying: boolean = false;
    callbacks: Array<IsoCallback>;
    object: Object;
    sprite: IsoAnimatedSprite|IsoTile;
    timeEnd: number;
    iterations: number;
    currentIteration: number = 0;

    __debug: number = 0;


    animationType: string = "attribute";
    constructor() {
        return this;
    }

    createFrameAnimation(name: string, object: IsoAnimatedSprite|IsoTile, frames: Array<number>, duration: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoAnimation {
        this.name = name;
        this.sprite = object;
        this.frames = frames;
        this.startValue = frames[0] - 1;
        this.endValue = frames[frames.length - 1];
        this.duration = duration;
        this.easing = easing;
        this.type = type;
        this.callbacks = callbacks;
        this.animationType = IsoAnimation.ANIMATION_TYPE_FRAME;
        return this;
    }

    createAnimation(name: string, object: Object, attribute: string, endValue: number, duration: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoAnimation {
        this.name = name;
        this.object = object;
        this.attribute = attribute;
        this.startValue = object[attribute]|0;
        this.endValue = endValue;
        this.duration = duration;
        this.easing = easing;
        this.type = type;
        this.callbacks = callbacks;
        this.animationType = IsoAnimation.ANIMATION_TYPE_ATTRIBUTE;
        return this;
    }

    play(): IsoAnimation {
        if (this.isPlaying === false) {
            this.iterations = (this.duration / 1000) * this.framesPerSecond;
            this.currentIteration = 0;
            this.isPlaying = true;
            if (this.animationType === IsoAnimation.ANIMATION_TYPE_ATTRIBUTE) {
                this.__playAttribute();
            } else if (this.animationType === IsoAnimation.ANIMATION_TYPE_FRAME) {
                this.__playFrame();
            }
        }
        return this;
    }

    __playAttribute() {
        if (this.isPlaying === true) {
            if (this.currentIteration === 0) {
                this.actualValue = this.startValue;
            }
            this.currentIteration++;
            this.actualValue = this.easing(this.currentIteration, this.startValue, this.endValue, this.iterations);

            var a = this.attribute.split(".");
            var s = "";
            for (var i = 0; i < a.length; i++) {
                s += "['" + a[i] + "']";
            }
            var f = new Function("o", "v", "o" + s + "=  v;");
            f(this.object, this.actualValue);

            if (this.actualValue === this.endValue) {
                switch (this.type) {
                    case IsoAnimation.ONCE:
                        this.stop();
                        break;
                    case IsoAnimation.PINGPONG:
                        var endValue = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.ENDLESS:
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                }
            } else {
                if (this.isPlaying === true)
                    requestAnimationFrame(() => this.__playAttribute());
            }
        }
    }

    __playFrame() {
        if (this.isPlaying === true) {
            if (this.currentIteration === 0) {
                this.actualValue = this.startValue;
            }
            this.currentIteration++;

            var __t = Math.floor(this.easing(this.currentIteration, this.startValue, this.endValue, this.iterations));
            this.actualValue = Math.floor(__t);

            if (this.actualValue !== this.sprite.tile) {
                this.sprite.setTile(Math.round(this.actualValue));
            }

            if (__t === this.endValue) {
                switch (this.type) {
                    case IsoAnimation.ONCE:
                        this.stop();
                        break;
                    case IsoAnimation.PINGPONG:
                        var endValue = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.ENDLESS:
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                }
            } else {
                if (this.isPlaying === true)
                    requestAnimationFrame(() => this.__playFrame());
            }
        }
    }

    stop(): IsoAnimation {
        this.isPlaying = false;
        this.actualValue = this.startValue;
        return this;
    }

    pause(): IsoAnimation {
        this.isPlaying = false;
        return this;
    }

    resume(): IsoAnimation {
        this.isPlaying = true;
        if (this.animationType === IsoAnimation.ANIMATION_TYPE_ATTRIBUTE) {
            this.__playAttribute();
        } else if (this.animationType === IsoAnimation.ANIMATION_TYPE_FRAME) {
            this.__playFrame();
        }
        return this;
    }

}
