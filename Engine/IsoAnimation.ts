///<reference path="IsoEasing.ts" />
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
