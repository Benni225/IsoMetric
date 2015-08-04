var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="IsoEasing.ts" />
///<reference path="IsoOn.ts" />
var IsoAnimation = (function (_super) {
    __extends(IsoAnimation, _super);
    function IsoAnimation() {
        _super.call(this);
        this.easing = IsoEasing.Linear;
        this.isPlaying = false;
        this.currentIteration = 0;
        this.framesPerSecond = 60;
        this.__debug = 0;
        this.animationType = "attribute";
        this.additionType = IsoAnimation.ADDTION_RELATIVE;
        this.impulsePlaying = 0;
        return this;
    }
    IsoAnimation.prototype.createFrameAnimation = function (name, object, frames, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
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
    };
    IsoAnimation.prototype.createAnimation = function (name, object, attribute, endValue, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
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
    };
    IsoAnimation.prototype.play = function () {
        if (this.isPlaying === false) {
            this.iterations = (this.duration / 1000) * this.framesPerSecond;
            this.currentIteration = 0;
            this.isPlaying = true;
            if (this.animationType === IsoAnimation.ANIMATION_TYPE_ATTRIBUTE) {
                this.__playAttribute();
            }
            else if (this.animationType === IsoAnimation.ANIMATION_TYPE_FRAME) {
                this.__playFrame();
            }
        }
        return this;
    };
    IsoAnimation.prototype.__playAttribute = function () {
        var _this = this;
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
            }
            else {
                if (this.isPlaying === true)
                    requestAnimationFrame(function () { return _this.__playAttribute(); });
            }
        }
    };
    IsoAnimation.prototype.__playFrame = function () {
        var _this = this;
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
            }
            else {
                if (this.isPlaying === true)
                    requestAnimationFrame(function () { return _this.__playFrame(); });
            }
        }
    };
    IsoAnimation.prototype.stop = function () {
        this.fire(IsoAnimation.STOPPED, this);
        if (this.checkOn(IsoAnimation.STOPPED)) {
            this.callOn(IsoAnimation.STOPPED);
        }
        this.isPlaying = false;
        this.impulsePlaying = 0;
        this.actualValue = this.startValue;
        return this;
    };
    IsoAnimation.prototype.pause = function () {
        this.fire(IsoAnimation.PAUSE, this);
        if (this.checkOn(IsoAnimation.PAUSE)) {
            this.callOn(IsoAnimation.PAUSE);
        }
        this.isPlaying = false;
        return this;
    };
    IsoAnimation.prototype.resume = function () {
        this.fire(IsoAnimation.RESUME, this);
        if (this.checkOn(IsoAnimation.RESUME)) {
            this.callOn(IsoAnimation.RESUME);
        }
        this.isPlaying = true;
        if (this.animationType === IsoAnimation.ANIMATION_TYPE_ATTRIBUTE) {
            this.__playAttribute();
        }
        else if (this.animationType === IsoAnimation.ANIMATION_TYPE_FRAME) {
            this.__playFrame();
        }
        return this;
    };
    IsoAnimation.prototype.getObjectValue = function () {
        var a = this.attribute.split("."), s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "return o" + s + ";");
        return f(this.object);
    };
    IsoAnimation.prototype.setObjectValue = function (value) {
        var a = this.attribute.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + "+= v;");
        f(this.object, value - this.getObjectValue());
    };
    IsoAnimation.prototype.setObjectValueAbsolute = function (value) {
        var a = this.attribute.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + "= v;");
        f(this.object, value);
    };
    IsoAnimation.prototype.setAdditionType = function (type) {
        this.additionType = type;
    };
    IsoAnimation.ADDITION_ABSOLUTE = "absolute";
    IsoAnimation.ADDTION_RELATIVE = "relative";
    IsoAnimation.ONCE = "once";
    IsoAnimation.PINGPONG = "pingpong";
    IsoAnimation.ENDLESS = "endless";
    IsoAnimation.IMPULSE = "impulse";
    IsoAnimation.ANIMATION_TYPE_FRAME = "frame";
    IsoAnimation.ANIMATION_TYPE_ATTRIBUTE = "attribute";
    IsoAnimation.PLAYED = "played";
    IsoAnimation.EVERYPLAYED = "everyPlayed";
    IsoAnimation.STOPPED = "stopped";
    IsoAnimation.RESUME = "resume";
    IsoAnimation.PAUSE = "pause";
    return IsoAnimation;
})(IsoOn);
