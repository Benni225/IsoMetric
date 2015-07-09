/**
 * A library including all easing-functions. 
 */
﻿var IsoEasing = {
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    Linear: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * currentIteration / iterationCount + startValue;
     },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    QuadIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        currentIteration = currentIteration / iterationCount;
        return (endValue - startValue) * currentIteration * currentIteration + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuadOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return -(endValue - startValue) * (currentIteration /= iterationCount) * (currentIteration - 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    QuadInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * currentIteration * currentIteration + startValue;
        }
        return -(endValue - startValue) / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    CubicIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 3) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    CubicOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 3) + 1) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    CubicInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 3) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    QuartIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 4) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    QuartOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return -(endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 4) - 1) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    QuartInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 4) + startValue;
        }
        return -(endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    QuintIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 5) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    QuintOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 5) + 1) + startValue;
    },
    /**
     * @method IsoEasing.QuintInOut
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuintInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 5) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    SineIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (1 - Math.cos(currentIteration / iterationCount * (Math.PI / 2))) + startValue;
    },
    /**
     * @method IsoEasing.SineOut
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    SineOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.sin(currentIteration / iterationCount * (Math.PI / 2)) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    SineInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) / 2 * (1 - Math.cos(Math.PI * currentIteration / iterationCount)) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    ExpoIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.pow(2, 10 * (currentIteration / iterationCount - 1)) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    ExpoOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (-Math.pow(2, -10 * currentIteration / iterationCount) + 1) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    ExpoInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
        }
        return (endValue - startValue) / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    CircIn: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * (1 - Math.sqrt(1 - (currentIteration /= iterationCount) * currentIteration)) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    CircOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        return (endValue - startValue) * Math.sqrt(1 - (currentIteration = currentIteration / iterationCount - 1) * currentIteration) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static 
     */
    CircInOut: function (currentIteration: number, startValue: number, endValue: number, iterationCount: number) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
    }
};
/**
 * Controls an animations.
 * There are two types of animations:
 * 1. "attribute-animation" - animates the attribute of an object. Nearly every object can be animated. The type of the value has to be a number.
 * 2. "frame-animation" - animates the frames of a sprite or a tile. The type of the animated object has to be an IsoAnimatedSprite or IsoTile.W
 */
class IsoAnimation {
    static ONCE: string = "once";
    static PINGPONG: string = "pingpong";
    static ENDLESS: string = "endless";
    static ANIMATION_TYPE_FRAME: string = "frame";
    static ANIMATION_TYPE_ATTRIBUTE: string = "attribute";
    name: string;
    duration: number;
    frames: Array<number>;
    startValue: number;
    endValue: number;
    actualValue: number;
    attribute: string;
    type: string;
    easing: Function = IsoEasing.Linear;
    isPlaying: boolean = false;
    callbacks: Array<IsoCallback>;
    object: Object;
    sprite: IsoAnimatedSprite|IsoTile;
    iterations: number;
    currentIteration: number = 0;
    framesPerSecond: number = 60;
    __debug: number = 0;
    animationType: string = "attribute";

    constructor() {
        return this;
    }
    
    /**
     * Creates a new frame-based animation.
     * @param {string} name Name of the new animation.
     * @param {IsoAnimatedSprite|IsoTile} object The animated sprite or tile.
     * @param {Array<number>} frames The frames of the animation.
     * @param {number} duration The duration of the animation in milliseconds.
     * @param {function} [easing=IsoEasing.Linear] The easing of the animation.
     * @param {string} [type=IsoEasing.Linear] Sets if the animation played once, endless or endless in pingpong.
     * @param {Array<IsoCallbacks>} [callbacks=new Array()] Callbacks.
     * @return {IsoAnimation} The new animation.
     */
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
    /**
     * Creates a new frame-based animation.
     * @param {string} name Name of the new animation.
     * @param {object} object The animated object.
     * @param {string} attribute The attribute of the object, that the animation will change.
     * @param {number} endValue The target value of the attribute.
     * @param {number} duration The duration of the animation in milliseconds.
     * @param {function} [easing=IsoEasing.Linear] The easing of the animation.
     * @param {string} [type=IsoEasing.Linear] Sets if the animation played once, endless or endless in pingpong.
     * @param {Array<IsoCallbacks>} [callbacks=new Array()] Callbacks.
     * @return {IsoAnimation} The new animation.
     */
    createAnimation(name: string, object: Object, attribute: string, endValue: number, duration: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoAnimation {
        this.name = name;
        this.object = object;
        this.attribute = attribute;
        this.startValue = this.getObjectValue();
        this.endValue = endValue;
        this.duration = duration;
        this.easing = easing;
        this.type = type;
        this.callbacks = callbacks;
        this.animationType = IsoAnimation.ANIMATION_TYPE_ATTRIBUTE;
        return this;
    }
    /**
     * Starts the animation. 
     * @return {IsoAnimation} The new animation.
     */
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
    /**
     * Starts an animation of the type "attribute". 
     * @private 
     */
    private __playAttribute() {
        if (this.isPlaying === true) {
            if (this.currentIteration === 0) {
                this.actualValue = this.startValue;
            }
            this.currentIteration++;
            this.actualValue = this.easing(this.currentIteration, this.startValue, this.endValue, this.iterations);
            this.setObjectValue(this.actualValue);

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
    /**
     * Starts an animation of the type "frame". 
     * @private 
     */
    private __playFrame() {
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
    /**
     * Stop playing the animation.
     */
    stop(): IsoAnimation {
        this.isPlaying = false;
        this.actualValue = this.startValue;
        return this;
    }
    /**
     * Pause the animation
     */
    pause(): IsoAnimation {
        this.isPlaying = false;
        return this;
    }
    /**
     * Resume the animation.
     */
    resume(): IsoAnimation {
        this.isPlaying = true;
        if (this.animationType === IsoAnimation.ANIMATION_TYPE_ATTRIBUTE) {
            this.__playAttribute();
        } else if (this.animationType === IsoAnimation.ANIMATION_TYPE_FRAME) {
            this.__playFrame();
        }
        return this;
    }
    /**
     * Parse the object and return the given attribute.
     * @private 
     */
    private getObjectValue() {
        var a = this.attribute.split("."),
            s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "return o" + s + ";");
        return f(this.object);
    }
    /**
     * Parse the object and set the given attribute.
     * @private
     */
    setObjectValue(value: number) {
        var a = this.attribute.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + "+=  v;");
        f(this.object, value - this.getObjectValue());
    }

}
