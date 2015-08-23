/// <reference path="../core/IsoObject.ts" />
class IsoAnimation extends IsoObject {
    /** The play types of an animation. */
    static PLAY_ONCE = "once";
    static PLAY_LOOP = "loop";
    /** The play direction of the animation. */
    static TRACK_NORMAL = "normal";
    static TRACK_PINGPONG = "pingpong";
    /** Repetition type */
    static REPEAT_ENDLESS = "endless";

    /** The name of the animation. */
    private _name: string;
    set name(value: string) {
        this.__propertyChanged("name", value);
        this._name = value;
    }
    get name() {
        return this._name;
    }
    /** The animated object. */
    private _object: Object;
    set object(value: Object) {
        this.__propertyChanged("object", value);
        this._object = value;
    }
    get object() {
        return this._object;
    }
    /** The value the animation starts with. */
    private _startValue: number;
    set startValue(value: number) {
        this.__propertyChanged("startValue", value);
        this._startValue = value;
    }
    get startValue() {
        return this._startValue;
    }
    /** The value the animation ends with.*/
    private _endValue: number;
    set endValue(value: number) {
        this.__propertyChanged("endValue", value);
        this._endValue = value;
    }
    get endValue() {
        return this._endValue;
    }
    /** The current value of the animation. */
    private _currentValue: number;
    set currentValue(value: number) {
        this.__propertyChanged("currentValue", value);
        this._currentValue = value;
    }
    get currentValue() {
        return this._currentValue;
    }
    /** The duraion of the animation in milliseconds. */
    private _duration: number = 1000;
    set duration(value: number) {
        this.__propertyChanged("duration", value);
        this._duration = value;
    }
    get duration() {
        return this._duration;
    }
    /** The time in milliseconds after the animations starts.*/
    private _time: number = 0;
    set time(value: number) {
        this.__propertyChanged("time", value);
        this._time = value;
    }
    get time() {
        return this._time;
    }
    /** Indecates wether the animation played once or loops.*/
    private _playType: string = IsoAnimation.PLAY_ONCE;
    set playType(value: string) {
        this.__propertyChanged("playType", value);
        this._playType = value;
    }
    get playType() {
        return this._playType;
    }
    /** Indecates wether the animation played normal or as ping-pong.*/
    private _trackDirection: string = IsoAnimation.TRACK_NORMAL;
    set trackDirection(value: string) {
        this.__propertyChanged("trackDirection", value);
        this._trackDirection = value;
    }
    get trackDirection() {
        return this._trackDirection;
    }
    /** Indecates how often the animation is played.*/
    private _repetitions: string|number = 1;
    set repetitions(value: string|number) {
        this.__propertyChanged("repetition", value);
        this._repetitions = value;
    }
    get repetitions(): string|number {
        return this._repetitions
    }
    /** The property to animate.*/
    private _property: string;
    set property(value: string) {
        this.__propertyChanged("property", value);
        this._property = value;
    }
    get property(): string {
        return this._property
    }
    /** The easing effect of the animation.*/
    private _effect: Function;
    set effect(value: Function) {
        this.__propertyChanged("effect", value);
        this._effect = value;
    }
    get effect(){
        return this._effect
    }
    /** A function for round a number.*/
    private _round: Function;
    set round(value: Function) {
        this.__propertyChanged("round", value);
        this._round = value;
    }
    get round() {
        return this._effect
    }

    private isPlaying: boolean = false;
    private pingPongFlag: boolean = false;
    private initStartValue: number = 0;
    private currentIteration: number = 0;
    private Engine: IsoMetric;
    private FPS: number = 60;
    private played: number = 0;
    private startTime: number = 0;
    private pauseTime: number = 0;

    constructor(name: string, options: IAnimationOptions) {
        super();
        this.endValue = options.endValue;
        this.duration = options.duration || 1000;
        this.time = options.time || 0;
        this.trackDirection = options.trackDirection || IsoAnimation.TRACK_NORMAL;
        this.playType = options.playType || IsoAnimation.PLAY_ONCE;
        this.repetitions = options.repetitions || 1;
        this.property = options.property;
        this.effect = options.effect || IsoEasing.Linear;
        this.round = options.round || function (n: number) { return n; }
        this.object = options.object;
        this.startValue = options.startValue || this.getObjectValue();

        this.initStartValue = this.startValue;
        this.currentValue = this.startValue;
        this.Engine = IsoMetric.self;
    }

    /** Sets the name of the animation. */
    setName(name: string): IsoAnimation {
        this.name = name;
        return this;
    }
    /** Returns the name of the animation. */
    getName(): string {
        return this.name;
    }
    /** Updates the animation. */
    update() {
        if (this.isPlaying === false) {
            return;
        }
        if (this.startTime > new Date().getTime()) {
           return;
        }
        this.currentIteration++;
        var iterations = this.duration * (this.FPS / 1000);
            this.currentValue = this.effect(this.currentIteration, this.startValue, this.endValue, iterations);
        this.setValue(this.currentValue);
        // Trigger the new frame
        this.call("frame", [this.currentValue]);
        if (this.currentIteration === iterations) {
            this.played++;
            if (this.playType === IsoAnimation.PLAY_ONCE) {
                if (this.trackDirection === IsoAnimation.TRACK_NORMAL || this.trackDirection === IsoAnimation.TRACK_PINGPONG && this.pingPongFlag === true) {
                    this.stop();
                }
                if (this.trackDirection === IsoAnimation.TRACK_PINGPONG && this.pingPongFlag === false) {
                    this.pingPongFlag = true;
                    var e = this.endValue;
                    this.endValue = this.startValue;
                    this.startValue = e;
                    this.currentIteration = 0;
                    this.currentValue = this.startValue;
                }
            }
            if (this.playType === IsoAnimation.PLAY_LOOP) {
                if (this.repetitions === IsoAnimation.REPEAT_ENDLESS || this.repetitions >= this.played) {
                    if (this.trackDirection === IsoAnimation.TRACK_PINGPONG) {
                        if (this.pingPongFlag === false){
                            this.pingPongFlag = true;
                        } else {
                            this.pingPongFlag = false;
                            if (this.time > 0)
                                this.startTime = new Date().getTime() + this.time;
                        }
                        var e = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = e;
                        this.currentIteration = 0;
                        this.currentValue = this.startValue;
                    } else if (this.trackDirection === IsoAnimation.TRACK_NORMAL) {
                        this.currentValue = this.startValue;
                        this.currentIteration = 0;
                        if (this.time > 0)
                            this.startTime = new Date().getTime() + this.time;
                    }
                } else {
                    this.stop();
                }
            }
        }
    }
    /** Plays the animation. */
    play() {
        this.isPlaying = true;
        this.startTime = new Date().getTime() + this.time;
        this.call("play");
    }
    /** Stops the animation. */
    stop() {
        this.isPlaying = false;
        this.played = 0;
        if (this.startValue === this.initStartValue) {
            this.currentValue = this.startValue;
        } else {
            this.endValue = this.startValue;
            this.startValue = this.initStartValue;
            this.currentValue = this.startValue;
        }
        this.call("stop");
    }
    /** Pause the animation. */
    pause() {
        this.isPlaying = false;
        this.pauseTime = new Date().getTime();
        this.call("pause");
    }
    /** Resumes the animation.*/
    resume() {
        this.isPlaying = true;
        this.startTime += new Date().getTime() - this.pauseTime;
        this.call("resume");
    }
    /** Sets a value to the object. */
    setValue(value: number) {
        var a = this.property.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + " = v;");
        f(this.object, value);
    }
    /** Parse the object and return the given attribute. */
    private getObjectValue() {
        var a = this.property.split("."),
            s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "return o" + s + ";");
        return f(this.object);
    }
}