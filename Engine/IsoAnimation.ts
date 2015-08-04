///<reference path="IsoEasing.ts" />
///<reference path="IsoOn.ts" />
/**
 * Controls an animations.
 * There are two types of animations:
 * 1. "attribute-animation" - animates the attribute of an object. Nearly every object can be animated. The type of the value has to be a number.
 * 2. "frame-animation" - animates the frames of a sprite or a tile. The type of the animated object has to be an IsoAnimatedSprite or IsoTile.W
 */
class IsoAnimation extends IsoOn {
    static ADDITION_ABSOLUTE = "absolute";
    static ADDTION_RELATIVE = "relative";

    static ONCE: string = "once";
    static PINGPONG: string = "pingpong";
    static ENDLESS: string = "endless";
    static IMPULSE: string = "impulse";
    static ANIMATION_TYPE_FRAME: string = "frame";
    static ANIMATION_TYPE_ATTRIBUTE: string = "attribute";

    // Events
    static PLAYED: string = "played";
    static EVERYPLAYED: string = "everyPlayed";
    static STOPPED: string = "stopped";
    static RESUME: string = "resume";
    static PAUSE: string = "pause";

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
    additionType: string = IsoAnimation.ADDTION_RELATIVE;
    private impulsePlaying: number = 0;

    constructor() {
        super();
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

            if (this.additionType !== IsoAnimation.ADDITION_ABSOLUTE)
                this.setObjectValue(this.actualValue);
            else
                this.setObjectValueAbsolute(this.actualValue);

            if (this.actualValue === this.endValue) {
                switch (this.type) {
                    case IsoAnimation.ONCE:
                        this.fire(IsoAnimation.PLAYED, this);
                        if (this.checkOn(IsoAnimation.PLAYED)) {
                            this.callOn(IsoAnimation.PLAYED);
                        }
                        this.isPlaying = false;
                        this.stop();
                        return;
                        break;
                    case IsoAnimation.PINGPONG:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        var endValue = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.IMPULSE:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        var endValue = this.endValue;
                        this.impulsePlaying++;

                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;

                        if (this.impulsePlaying == 2) {
                            this.stop();
                        }

                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.ENDLESS:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                }
            } else {
                if (this.isPlaying === true)
                    requestAnimationFrame(() => this.__playAttribute());
            }
        } else {
            return;
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
                        this.fire(IsoAnimation.PLAYED, this);
                        if (this.checkOn(IsoAnimation.PLAYED)) {
                            this.callOn(IsoAnimation.PLAYED);
                        }
                        this.stop();
                        break;
                    case IsoAnimation.PINGPONG:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        var endValue = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.IMPULSE:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        var endValue = this.endValue;
                        this.impulsePlaying++;

                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;

                        if (this.impulsePlaying == 2) {
                            this.stop();
                        }

                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.ENDLESS:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
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
        // this.impulsePlaying = 0;
        // this.actualValue = this.startValue;

        // this.fire(IsoAnimation.STOPPED, this);
        return this;
    }
    /**
     * Pause the animation
     */
    pause(): IsoAnimation {
        this.fire(IsoAnimation.PAUSE, this);
        if (this.checkOn(IsoAnimation.PAUSE)) {
            this.callOn(IsoAnimation.PAUSE);
        }
        this.isPlaying = false;
        return this;
    }
    /**
     * Resume the animation.
     */
    resume(): IsoAnimation {
        this.fire(IsoAnimation.RESUME, this);
        if (this.checkOn(IsoAnimation.RESUME)) {
            this.callOn(IsoAnimation.RESUME);
        }
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
     * Parse the object and set the given attribute in a relative way.
     */
    setObjectValue(value: number) {
        var a = this.attribute.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + "+= v;");
        f(this.object, value - this.getObjectValue());
    }

    /**
     * Parse the object and set the given attribute in a absolute way.
     */
    setObjectValueAbsolute(value: number) {
        var a = this.attribute.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + "= v;");
        f(this.object, value);
    }

    setAdditionType(type: string) {
        this.additionType = type;
    }
}
