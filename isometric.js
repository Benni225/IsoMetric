var IsoBlendingModes = {
    NORMAL: "normal",
    MULTIPLY: "multiply",
    SCREEN: "screen",
    OVERLAY: "overlay",
    DARKEN: "darken",
    LIGHTEN: "lighten",
    COLOR_DODGE: "color-dodge",
    COLOR_BURN: "color-burn",
    HARD_LIGHT: "hard-light",
    SOFT_LIGHT: "soft-light",
    DIFFERENCE: "difference",
    EXCLUSION: "exclusion",
    HUE: "hue",
    SATURATION: "saturation",
    COLOR: "color",
    LUMINOSITY: "luminosity",
    SOURCE_IN: "source-in",
    SOURCE_OVER: "source-over",
    SOURCE_OUT: "source-out",
    SOURCE_ATOP: "source-atop",
    DESTINATION_OVER: "destination-over",
    DESTINATION_IN: "destination-in",
    DESTINATION_OUT: "destination-out",
    DESTINATION_ATOP: "destination-atop",
    LIGHTER: "lighter",
    COPY: "copy",
    XOR: "xor",
};
var IsoLogger = (function () {
    function IsoLogger() {
    }
    IsoLogger.prototype.log = function (error, warnLevel) {
        var e = "";
        if (typeof error === "Error") {
            e = error.message;
        }
        else if (typeof error === "string") {
            e = error;
        }
        if (this.lastError === undefined || this.lastError !== e) {
            switch (warnLevel) {
                case IsoLogger.ERROR:
                    this.debug("This object throws an error:");
                    this.debug(this);
                    console.error(error);
                    break;
                case IsoLogger.WARN:
                    console.warn(error);
                    break;
                case IsoLogger.INFO:
                    console.info(error);
                    break;
            }
            this.lastError = e;
        }
    };
    IsoLogger.prototype.debug = function (o) {
        if (IsoLogger.DEBUG === true) {
            console.debug(o);
        }
    };
    IsoLogger.ERROR = 0;
    IsoLogger.WARN = 1;
    IsoLogger.INFO = 2;
    IsoLogger.DEBUG = false;
    return IsoLogger;
})();
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="IsoLogger.ts" />
var IsoEvent = (function (_super) {
    __extends(IsoEvent, _super);
    function IsoEvent() {
        _super.apply(this, arguments);
        this.__onCallbacks = new Array();
    }
    IsoEvent.prototype.fire = function (type, data, element) {
        try {
            if (CustomEvent !== undefined) {
                var e = new CustomEvent(type);
                e.initCustomEvent(type, true, true, data);
                if (element !== undefined) {
                    element.dispatchEvent(e);
                }
                else {
                    document.dispatchEvent(e);
                }
            }
            else if (document.createEvent !== undefined) {
                var oe = document.createEvent("Events");
                oe.initEvent(type, true, true);
                oe["detail"] = data;
                if (element !== undefined) {
                    element.dispatchEvent(oe);
                }
                else {
                    document.dispatchEvent(oe);
                }
            }
            else if (document["createEventObject"] !== undefined) {
                var oie = document["createEventObject"]();
                oie.initEvent(type, true, true);
                oie["detail"] = data;
                if (element !== undefined) {
                    element.dispatchEvent(oie);
                }
                else {
                    document.dispatchEvent(oie);
                }
            }
            else {
                throw new Error("This browser is not compatible. No events can be fired.");
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    IsoEvent.prototype.bind = function (eventType, callback) {
        document.addEventListener(eventType, callback);
    };
    IsoEvent.prototype.unbind = function (eventType, callback) {
        document.removeEventListener(eventType, callback);
    };
    IsoEvent.prototype.on = function (eventType, callback) {
        this.__onCallbacks[eventType] = callback;
        return this;
    };
    IsoEvent.prototype.call = function (eventType, args) {
        if (args === void 0) { args = new Array(); }
        if (this.__checkOn(eventType))
            this.__onCallbacks[eventType].apply(this, args);
    };
    IsoEvent.prototype.__checkOn = function (eventType) {
        if (this.__onCallbacks[eventType] !== undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    return IsoEvent;
})(IsoLogger);
///<reference path="IsoEvent.ts" />
/** This class helps to observe special values of a class. */
var IsoWatcher = (function (_super) {
    __extends(IsoWatcher, _super);
    function IsoWatcher() {
        _super.apply(this, arguments);
        this.__watch = new Array();
    }
    IsoWatcher.prototype.watch = function (property, callback) {
        var val = this[property];
        if (this.__watch[property] === undefined) {
            this.__watch[property] = {
                callback: new Array(callback),
                oldValue: val
            };
        }
        else {
            this.__watch[property].callback.push(callback);
        }
    };
    IsoWatcher.prototype.__propertyChanged = function (property, value) {
        if (this.__watch[property] !== undefined) {
            for (var i = 0; i < this.__watch[property].callback.length; i++) {
                this.__watch[property].callback[i].call(this, value, this.__watch[property].oldValue);
            }
            this.__watch[property].oldValue = value;
        }
    };
    return IsoWatcher;
})(IsoEvent);
///<reference path="IsoWatcher.ts" />
var IsoObject = (function (_super) {
    __extends(IsoObject, _super);
    function IsoObject() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(IsoObject.prototype, "type", {
        get: function () {
            return "IsoObject";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    ;
    IsoObject.prototype.apply = function (object, to) {
        for (var k in object) {
            if (to === undefined)
                this[k] = object[k];
            else
                to[k] = object[k];
        }
    };
    return IsoObject;
})(IsoWatcher);
///<reference path="../core/IsoObject.ts" />
var IsoColor = (function (_super) {
    __extends(IsoColor, _super);
    function IsoColor(color) {
        _super.call(this);
        this.set(color);
    }
    Object.defineProperty(IsoColor.prototype, "r", {
        get: function () {
            return this._r;
        },
        set: function (value) {
            this.__propertyChanged("r", value);
            this._r = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoColor.prototype, "g", {
        get: function () {
            return this._g;
        },
        set: function (value) {
            this.__propertyChanged("g", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoColor.prototype, "b", {
        get: function () {
            return this._b;
        },
        set: function (value) {
            this.__propertyChanged("b", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoColor.prototype, "type", {
        /** The object type for identification. */
        get: function () {
            return "IsoColor";
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the color with an hex value or an color object like {r: 255,g: 255,b: 255}. */
    IsoColor.prototype.set = function (color) {
        if (typeof color === "Object") {
            this.apply(color);
        }
        else if (typeof color === "string") {
            var rgb = this.hexToRgb(color);
            if (rgb) {
                this.apply(rgb);
            }
        }
    };
    /** Returns the color as a hex-value. */
    IsoColor.prototype.getHex = function () {
        return this.rgbToHex(this.r, this.g, this.b);
    };
    /** Turns a number to a hex-value. */
    IsoColor.prototype.componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    /** Turns 3 numbers to a hex-value. */
    IsoColor.prototype.rgbToHex = function (r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    };
    /** Turns a hex-value to 3 numbers. */
    IsoColor.prototype.hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    return IsoColor;
})(IsoObject);
///<reference path="../core/IsoWatcher.ts" />
var IsoPoint = (function (_super) {
    __extends(IsoPoint, _super);
    function IsoPoint(x, y) {
        _super.call(this);
        if (x !== undefined) {
            this.x = x;
        }
        if (y !== undefined) {
            this.y = y;
        }
    }
    Object.defineProperty(IsoPoint.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this.__propertyChanged("x", value);
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoPoint.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this.__propertyChanged("y", value);
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets or resets the point */
    IsoPoint.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /** Gets the point on the screen. */
    IsoPoint.prototype.get = function () {
        return this;
    };
    return IsoPoint;
})(IsoWatcher);
///<reference path="../core/IsoWatcher.ts" />
var IsoScale = (function (_super) {
    __extends(IsoScale, _super);
    function IsoScale(fx, fy) {
        _super.call(this);
        if (fx !== undefined) {
            this.fx = fx;
        }
        if (fy !== undefined) {
            this.fy = fy;
        }
    }
    Object.defineProperty(IsoScale.prototype, "fx", {
        get: function () {
            return this._fx;
        },
        set: function (value) {
            this.__propertyChanged("fx", value);
            this._fx = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoScale.prototype, "fy", {
        get: function () {
            return this._fy;
        },
        set: function (value) {
            this.__propertyChanged("fy", value);
            this._fy = value;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets or resets the scale */
    IsoScale.prototype.set = function (fx, fy) {
        this.fx = fx;
        this.fy = fy;
    };
    /** Gets the scale. */
    IsoScale.prototype.get = function () {
        return this;
    };
    return IsoScale;
})(IsoWatcher);
///<reference path="../core/IsoWatcher.ts" />
var IsoSize = (function (_super) {
    __extends(IsoSize, _super);
    function IsoSize(width, height) {
        _super.call(this);
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(IsoSize.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this.__propertyChanged("width", value);
            this._width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoSize.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this.__propertyChanged("height", value);
            this._height = value;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets or resets the size */
    IsoSize.prototype.set = function (width, height) {
        this.width = width;
        this.height = height;
    };
    /** Gets the size. */
    IsoSize.prototype.get = function () {
        return this;
    };
    return IsoSize;
})(IsoWatcher);
///<reference path="IsoPoint.ts" />
/**
 * IsoVector2D represents a point on the screen.
 */
var IsoVector2D = (function (_super) {
    __extends(IsoVector2D, _super);
    /** Creates a new vector */
    function IsoVector2D(x, y) {
        _super.call(this, x, y);
    }
    /** Gets the distance between two points */
    IsoVector2D.prototype.getDistance = function (vec) {
        // c2 = a2 + b2 --> c = sqrt(a2 + b2) --> c = is distance
        return Math.sqrt(((this.x - vec.x) * (this.x - vec.x)) + ((this.y - vec.y) * (this.y - vec.y)));
    };
    /** Gets the length of a vector. */
    IsoVector2D.prototype.getMagnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    /** Gets the angle of a vector. */
    IsoVector2D.prototype.getAngle = function () {
        var ratio = 0;
        var offset = 0;
        if (this.x > 0) {
            if (this.y > 0) {
                offset = 0;
                ratio = this.y / this.x;
            }
            else {
                offset = (3 * Math.PI) / 2;
                ratio = this.x / this.y;
            }
        }
        else {
            if (this.y > 0) {
                offset = Math.PI / 2;
                ratio = this.x / this.y;
            }
            else {
                offset = Math.PI;
                ratio = this.y / this.x;
            }
        }
        var angle = Math.atan(Math.abs(ratio)) + offset;
        return angle;
    };
    IsoVector2D.prototype.getAngleDegrees = function () {
        return this.getAngle() * 180 / Math.PI;
    };
    /** Sets the vector from an angle and a length.*/
    IsoVector2D.prototype.createFromAngle = function (angle, length) {
        this.x = length * Math.cos(angle);
        this.y = length * Math.sin(angle);
    };
    /** Add a second vector to the vector. */
    IsoVector2D.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };
    return IsoVector2D;
})(IsoPoint);
/// <reference path="../core/IsoObject.ts" />
var IsoAnimation = (function (_super) {
    __extends(IsoAnimation, _super);
    function IsoAnimation(name, options) {
        _super.call(this);
        /** The duraion of the animation in milliseconds. */
        this._duration = 1000;
        /** The time in milliseconds after the animations starts.*/
        this._time = 0;
        /** Indecates wether the animation played once or loops.*/
        this._playType = IsoAnimation.PLAY_ONCE;
        /** Indecates wether the animation played normal or as ping-pong.*/
        this._trackDirection = IsoAnimation.TRACK_NORMAL;
        /** Indecates how often the animation is played.*/
        this._repetitions = 1;
        this.isPlaying = false;
        this.pingPongFlag = false;
        this.initStartValue = 0;
        this.currentIteration = 0;
        this.FPS = 60;
        this.played = 0;
        this.startTime = 0;
        this.pauseTime = 0;
        this.endValue = options.endValue;
        this.duration = options.duration || 1000;
        this.time = options.time || 0;
        this.trackDirection = options.trackDirection || IsoAnimation.TRACK_NORMAL;
        this.playType = options.playType || IsoAnimation.PLAY_ONCE;
        this.repetitions = options.repetitions || 1;
        this.property = options.property;
        this.effect = options.effect || IsoEasing.Linear;
        this.round = options.round || function (n) { return n; };
        this.object = options.object;
        this.startValue = options.startValue || this.getObjectValue();
        this.initStartValue = this.startValue;
        this.currentValue = this.startValue;
        this.Engine = IsoMetric.self;
    }
    Object.defineProperty(IsoAnimation.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this.__propertyChanged("name", value);
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "object", {
        get: function () {
            return this._object;
        },
        set: function (value) {
            this.__propertyChanged("object", value);
            this._object = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "startValue", {
        get: function () {
            return this._startValue;
        },
        set: function (value) {
            this.__propertyChanged("startValue", value);
            this._startValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "endValue", {
        get: function () {
            return this._endValue;
        },
        set: function (value) {
            this.__propertyChanged("endValue", value);
            this._endValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "currentValue", {
        get: function () {
            return this._currentValue;
        },
        set: function (value) {
            this.__propertyChanged("currentValue", value);
            this._currentValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "duration", {
        get: function () {
            return this._duration;
        },
        set: function (value) {
            this.__propertyChanged("duration", value);
            this._duration = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (value) {
            this.__propertyChanged("time", value);
            this._time = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "playType", {
        get: function () {
            return this._playType;
        },
        set: function (value) {
            this.__propertyChanged("playType", value);
            this._playType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "trackDirection", {
        get: function () {
            return this._trackDirection;
        },
        set: function (value) {
            this.__propertyChanged("trackDirection", value);
            this._trackDirection = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "repetitions", {
        get: function () {
            return this._repetitions;
        },
        set: function (value) {
            this.__propertyChanged("repetition", value);
            this._repetitions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "property", {
        get: function () {
            return this._property;
        },
        set: function (value) {
            this.__propertyChanged("property", value);
            this._property = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "effect", {
        get: function () {
            return this._effect;
        },
        set: function (value) {
            this.__propertyChanged("effect", value);
            this._effect = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoAnimation.prototype, "round", {
        get: function () {
            return this._effect;
        },
        set: function (value) {
            this.__propertyChanged("round", value);
            this._round = value;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the name of the animation. */
    IsoAnimation.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /** Returns the name of the animation. */
    IsoAnimation.prototype.getName = function () {
        return this.name;
    };
    /** Updates the animation. */
    IsoAnimation.prototype.update = function () {
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
                        if (this.pingPongFlag === false) {
                            this.pingPongFlag = true;
                        }
                        else {
                            this.pingPongFlag = false;
                            if (this.time > 0)
                                this.startTime = new Date().getTime() + this.time;
                        }
                        var e = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = e;
                        this.currentIteration = 0;
                        this.currentValue = this.startValue;
                    }
                    else if (this.trackDirection === IsoAnimation.TRACK_NORMAL) {
                        this.currentValue = this.startValue;
                        this.currentIteration = 0;
                        if (this.time > 0)
                            this.startTime = new Date().getTime() + this.time;
                    }
                }
                else {
                    this.stop();
                }
            }
        }
    };
    /** Plays the animation. */
    IsoAnimation.prototype.play = function () {
        this.isPlaying = true;
        this.startTime = new Date().getTime() + this.time;
        this.call("play");
    };
    /** Stops the animation. */
    IsoAnimation.prototype.stop = function () {
        this.isPlaying = false;
        this.played = 0;
        if (this.startValue === this.initStartValue) {
            this.currentValue = this.startValue;
        }
        else {
            this.endValue = this.startValue;
            this.startValue = this.initStartValue;
            this.currentValue = this.startValue;
        }
        this.call("stop");
    };
    /** Pause the animation. */
    IsoAnimation.prototype.pause = function () {
        this.isPlaying = false;
        this.pauseTime = new Date().getTime();
        this.call("pause");
    };
    /** Resumes the animation.*/
    IsoAnimation.prototype.resume = function () {
        this.isPlaying = true;
        this.startTime += new Date().getTime() - this.pauseTime;
        this.call("resume");
    };
    /** Sets a value to the object. */
    IsoAnimation.prototype.setValue = function (value) {
        var a = this.property.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + " = v;");
        f(this.object, value);
    };
    /** Parse the object and return the given attribute. */
    IsoAnimation.prototype.getObjectValue = function () {
        var a = this.property.split("."), s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "return o" + s + ";");
        return f(this.object);
    };
    /** The play types of an animation. */
    IsoAnimation.PLAY_ONCE = "once";
    IsoAnimation.PLAY_LOOP = "loop";
    /** The play direction of the animation. */
    IsoAnimation.TRACK_NORMAL = "normal";
    IsoAnimation.TRACK_PINGPONG = "pingpong";
    /** Repetition type */
    IsoAnimation.REPEAT_ENDLESS = "endless";
    return IsoAnimation;
})(IsoObject);
///<reference path="../core/IsoObject.ts" />
var IsoAnimationManager = (function (_super) {
    __extends(IsoAnimationManager, _super);
    function IsoAnimationManager(object) {
        _super.call(this);
        this.animations = new Array();
        this.object = object;
    }
    IsoAnimationManager.prototype.add = function (name, animation) {
        animation["object"] = this.object;
        var a = new IsoAnimation(name, animation);
        this.animations.push(a);
        return a;
    };
    IsoAnimationManager.prototype.remove = function (name) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name) {
                for (var l = i; l < this.animations.length; l++) {
                    this.animations[l] = null;
                    this.animations[l] = this.animations[l + 1];
                }
                this.animations.pop();
                return this;
            }
        }
    };
    IsoAnimationManager.prototype.play = function (name) {
        this.get(name).play();
        return this.get(name);
    };
    IsoAnimationManager.prototype.pause = function (name) {
        this.get(name).pause();
        return this.get(name);
    };
    IsoAnimationManager.prototype.resume = function (name) {
        this.get(name).resume();
        return this.get(name);
    };
    IsoAnimationManager.prototype.stop = function (name) {
        this.get(name).stop();
        return this.get(name);
    };
    IsoAnimationManager.prototype.get = function (name) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name) {
                return this.animations[i];
            }
        }
        this.log("Can not find the animation: '" + name + "'. :(", IsoLogger.WARN);
    };
    IsoAnimationManager.prototype.update = function () {
        for (var i = 0; i < this.animations.length; i++) {
            this.animations[i].update();
        }
    };
    return IsoAnimationManager;
})(IsoObject);
/**
 * A library including all easing-functions.
 */
var IsoEasing = {
    Linear: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * currentIteration / iterationCount + startValue;
    },
    QuadIn: function (currentIteration, startValue, endValue, iterationCount) {
        currentIteration = currentIteration / iterationCount;
        return (endValue - startValue) * currentIteration * currentIteration + startValue;
    },
    QuadOut: function (currentIteration, startValue, endValue, iterationCount) {
        return -(endValue - startValue) * (currentIteration /= iterationCount) * (currentIteration - 2) + startValue;
    },
    QuadInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * currentIteration * currentIteration + startValue;
        }
        return -(endValue - startValue) / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
    },
    CubicIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 3) + startValue;
    },
    CubicOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 3) + 1) + startValue;
    },
    CubicInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 3) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
    },
    QuartIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 4) + startValue;
    },
    QuartOut: function (currentIteration, startValue, endValue, iterationCount) {
        return -(endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 4) - 1) + startValue;
    },
    QuartInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 4) + startValue;
        }
        return -(endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
    },
    QuintIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 5) + startValue;
    },
    QuintOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 5) + 1) + startValue;
    },
    QuintInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 5) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
    },
    SineIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (1 - Math.cos(currentIteration / iterationCount * (Math.PI / 2))) + startValue;
    },
    SineOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.sin(currentIteration / iterationCount * (Math.PI / 2)) + startValue;
    },
    SineInOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) / 2 * (1 - Math.cos(Math.PI * currentIteration / iterationCount)) + startValue;
    },
    ExpoIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(2, 10 * (currentIteration / iterationCount - 1)) + startValue;
    },
    ExpoOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (-Math.pow(2, -10 * currentIteration / iterationCount) + 1) + startValue;
    },
    ExpoInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
        }
        return (endValue - startValue) / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
    },
    CircIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (1 - Math.sqrt(1 - (currentIteration /= iterationCount) * currentIteration)) + startValue;
    },
    CircOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.sqrt(1 - (currentIteration = currentIteration / iterationCount - 1) * currentIteration) + startValue;
    },
    CircInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
    }
};
///<reference path="../core/IsoObject.ts" />
var IsoBaseEntity = (function (_super) {
    __extends(IsoBaseEntity, _super);
    /** Creates a new entity by its name. */
    function IsoBaseEntity(name) {
        _super.call(this);
        /** Name of the entity. */
        this._name = "";
        /** The friction of the entity. */
        this._friction = 1;
        /** The mass of the entity. */
        this._mass = 0;
        /** The acceleration of the entity. */
        this.acceleration = new IsoVector2D(0, 0);
        /** The velocity of the entity. */
        this.velocity = new IsoVector2D(0, 0);
        /** The position of the entity. */
        this.position = new IsoVector2D(0, 0);
        /** The rotation in degrees of the entity. */
        this._rotation = 0;
        /** The size of the entity. */
        this.size = new IsoSize(0, 0);
        /** The anchor of the entity. */
        this.anchor = new IsoPoint(0, 0);
        /** Includes all animations of the entity. */
        this.animations = new IsoAnimationManager(this);
        /** Indicates if an entity could be deleted.*/
        this._isFree = false;
        /** Hide or show an entity. */
        this._hidden = false;
        /** The drawing index of the entity. */
        this._index = 0;
        this.chache = new IsoTextureCache();
        this.setName(name);
        this.physics = new IsoPhysics();
        this.setIndex(0);
        return this;
    }
    Object.defineProperty(IsoBaseEntity.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this.__propertyChanged("name", value);
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoBaseEntity.prototype, "friction", {
        get: function () {
            return this._friction;
        },
        set: function (value) {
            this.__propertyChanged("friction", value);
            this._friction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoBaseEntity.prototype, "mass", {
        get: function () {
            return this._mass;
        },
        set: function (value) {
            this.__propertyChanged("mass", value);
            this._mass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoBaseEntity.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            this.__propertyChanged("rotation", value);
            this._rotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoBaseEntity.prototype, "isFree", {
        get: function () {
            return this._isFree;
        },
        set: function (value) {
            this.__propertyChanged("isFree", value);
            this._isFree = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoBaseEntity.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (value) {
            this.__propertyChanged("hidden", value);
            this._hidden = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoBaseEntity.prototype, "type", {
        /** The type of the object for identification. */
        get: function () {
            return "IsoBaseEntity";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoBaseEntity.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this.__propertyChanged("index", value);
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the name of the entity. */
    IsoBaseEntity.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /** Gets the name of the entity. */
    IsoBaseEntity.prototype.getName = function () {
        return this.name;
    };
    /** Sets the rotation of the entity. */
    IsoBaseEntity.prototype.setRotation = function (rotation) {
        this.rotation = rotation;
    };
    /** Gets the rotation of the entity. */
    IsoBaseEntity.prototype.getRotation = function () {
        return this.rotation;
    };
    /** Sets the friction of the entity. */
    IsoBaseEntity.prototype.setFriction = function (friction) {
        this.friction = friction;
        return this;
    };
    /** Gets the friction of the entity. */
    IsoBaseEntity.prototype.getFriction = function () {
        return this.friction;
    };
    /** Updates the position of the entity. */
    IsoBaseEntity.prototype.updatePosition = function () {
        this.acceleration.x *= this.friction;
        this.acceleration.y *= this.friction;
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        return this;
    };
    /** Updates the entity. */
    IsoBaseEntity.prototype.update = function () {
        this.updatePosition();
        this.animations.update();
        this.physics.updateEntity();
    };
    /** Free the memory. */
    IsoBaseEntity.prototype.free = function () {
        this.hide();
        this.isFree = true;
    };
    /** Hides the entity. */
    IsoBaseEntity.prototype.hide = function () {
        this.hidden = true;
        return this;
    };
    /** Shows the entity. */
    IsoBaseEntity.prototype.show = function () {
        this.hidden = false;
        return this;
    };
    /** Checks if the entity is hidden. */
    IsoBaseEntity.prototype.isHidden = function () {
        return this.hidden;
    };
    /** Sets the index of the entity. */
    IsoBaseEntity.prototype.setIndex = function (index) {
        this.index = index;
        return this;
    };
    /** returns the index of the entity. */
    IsoBaseEntity.prototype.getIndex = function () {
        return this.index;
    };
    /** Returns the render data. */
    IsoBaseEntity.prototype.getRenderData = function () {
        try {
            return {
                position: this.position,
                anchor: this.anchor,
                rotation: this.rotation,
                size: this.size
            };
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Checks if this entity intersects with another entity. */
    IsoBaseEntity.prototype.isBoxIntersection = function (entityB) {
        var dataA = this.getRenderData();
        var dataB = entityB.getRenderData();
        if ((dataA.position.x < dataB.position.x && dataA.position.x + dataA.size.width > dataB.position.x ||
            dataA.position.x < dataB.position.x + dataB.size.width && dataA.position.x + dataA.size.width > dataB.position.x) &&
            (dataA.position.y < dataB.position.y + dataB.size.height && dataA.position.y + dataA.size.height > dataB.position.y)) {
            return true;
        }
        else {
            return false;
        }
    };
    return IsoBaseEntity;
})(IsoObject);
///<reference path="IsoBaseEntity.ts" />
var IsoEntityGroup = (function (_super) {
    __extends(IsoEntityGroup, _super);
    function IsoEntityGroup(name) {
        var _this = this;
        _super.call(this, name);
        /** Includes all entities of a group. */
        this._entities = new Array();
        this.position.watch("x", function () { return _this.updateEntitiesPositionX; });
        this.position.watch("y", function () { return _this.updateEntitiesPositionY; });
    }
    Object.defineProperty(IsoEntityGroup.prototype, "entities", {
        get: function () {
            return this._entities;
        },
        set: function (value) {
            this.__propertyChanged("entities", value);
            this._entities = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoEntityGroup.prototype, "type", {
        /** The type of the object for identification. */
        get: function () {
            return "IsoEntityGroup";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Adds a new entity to the group. */
    IsoEntityGroup.prototype.add = function (entity) {
        try {
            this.entities.push(entity);
        }
        catch (e) {
            if (this.entities === undefined) {
                this.entities = new Array(entity);
                this.log(e, IsoLogger.WARN);
                this.log("Created a new array for you.", IsoLogger.INFO);
            }
            else {
                throw new Error("There is an big fat unknown error.");
            }
        }
        finally {
            this.log(new Error("There is an big fat unknown error."), IsoLogger.ERROR);
        }
    };
    /** Removes a entity to the group. */
    IsoEntityGroup.prototype.remove = function (entity) {
        try {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i] === entity) {
                    this.entities[i] = null;
                    for (var l = i + 1; l < this.entities.length - 1; l++) {
                        this.entities[l - 1] = this.entities[l];
                    }
                    this.entities.pop();
                    return true;
                }
            }
        }
        catch (e) {
            if (this.entities === undefined) {
                this.entities = new Array();
            }
            this.log("Can not remove an entity, when entities is undefined. I created an new empty array.", IsoLogger.WARN);
        }
        finally {
            this.log(new Error("There is a real big fat unknown error."), IsoLogger.ERROR);
        }
        return false;
    };
    /** Updates the entity group. */
    IsoEntityGroup.prototype.update = function () {
        try {
            this.updatePosition();
            this.sort();
            this.animations.update();
            this.physics.updateEntity();
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Updates the position on the x-axis of all including entities, when the position changed. */
    IsoEntityGroup.prototype.updateEntitiesPositionX = function (value, oldValue) {
        try {
            var d = value - oldValue;
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].position.add(new IsoVector2D(d, 0));
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Updates the position on the y-axis of all including entities, when the position changed. */
    IsoEntityGroup.prototype.updateEntitiesPositionY = function (value, oldValue) {
        try {
            var d = value - oldValue;
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].position.add(new IsoVector2D(0, d));
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Sorts the entities by there indizies. */
    IsoEntityGroup.prototype.sort = function () {
        this.entities.sort(_sort);
        function _sort(entityA, entityB) {
            if (entityA.index > entityB.index) {
                return 1;
            }
            else if (entityA.index < entityB.index) {
                return -1;
            }
            else {
                return 0;
            }
        }
    };
    return IsoEntityGroup;
})(IsoBaseEntity);
///<reference path="IsoBaseEntity.ts" />
var IsoSprite = (function (_super) {
    __extends(IsoSprite, _super);
    function IsoSprite(name) {
        _super.call(this, name);
        /** The texture of the box. */
        this._texture = new Array();
        /** The scale of the texture. */
        this.scale = new IsoScale(1, 1);
        this.texture = new Array();
        this.animations = new IsoAnimationManager(this);
    }
    Object.defineProperty(IsoSprite.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        set: function (value) {
            this.__propertyChanged("texture", value);
            this._texture = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoSprite.prototype, "mask", {
        get: function () {
            return this._mask;
        },
        set: function (value) {
            this.__propertyChanged("texture", value);
            this._mask = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoSprite.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoSprite";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Gets the absolute width dimension. */
    IsoSprite.prototype.getAbsoluteWidth = function () {
        return this.size.width * this.scale.fx;
    };
    /** Gets the absolute height dimension. */
    IsoSprite.prototype.getAbsoluteHeight = function () {
        return this.size.height * this.scale.fy;
    };
    /** Add a texture to the box. */
    IsoSprite.prototype.addTexture = function (texture) {
        try {
            this.texture.push(texture);
        }
        catch (e) {
            if (this.texture === undefined) {
                this.texture = new Array(texture);
                this.log("Can not add a texture to undefined. I created a new array for you.", IsoLogger.WARN);
            }
        }
        return this;
    };
    /** Get a texture by its name. */
    IsoSprite.prototype.getTexture = function (name) {
        try {
            if (this.texture === undefined) {
                this.log("The textures are undefined. I created a new array for you.", IsoLogger.WARN);
            }
            for (var i = 0; i < this.texture.length; i++) {
                if (this.texture[i].name === name) {
                    return this.texture[i];
                }
            }
            this.log("I am sorry. The texture '" + name + "' can not be found.", IsoLogger.WARN);
            return undefined;
        }
        catch (e) {
            this.texture = new Array();
            this.log(e, IsoLogger.WARN);
        }
    };
    /** Sets the mask of the sprite. */
    IsoSprite.prototype.setMask = function (mask) {
        this.mask = mask;
        return this;
    };
    /** Gets the mask of the sprite. */
    IsoSprite.prototype.getMask = function () {
        return this.mask;
    };
    /** Removes a texture by its name. */
    IsoSprite.prototype.removeTexture = function (name) {
        try {
            if (this.texture === undefined) {
                this.log("The textures are undefined. I created a new array for you.", IsoLogger.WARN);
            }
            for (var i = 0; i < this.texture.length; i++) {
                if (this.texture[i].name === name) {
                    for (var l = i; l < this.texture.length; l++) {
                        this.texture[l] = this.texture[l + 1];
                    }
                    this.texture.pop();
                    return this;
                }
            }
        }
        catch (e) {
            this.texture = new Array();
            this.log(e, IsoLogger.WARN);
        }
    };
    /** Returns the render data. */
    IsoSprite.prototype.getRenderData = function () {
        try {
            var maskData = null;
            if (this.texture === undefined || this.texture.length === 0) {
                this.log("Can not return render data, because nothing to return. Texture is undefined or null.", IsoLogger.WARN);
            }
            else {
                if (this.getMask() !== undefined) {
                    maskData = this.getMask().getTextureData();
                }
                var textureData = new Array();
                for (var i = 0; i < this.texture.length; i++) {
                    textureData.push(this.texture[i].getTextureData());
                }
                return {
                    maskData: maskData,
                    textureData: textureData,
                    position: this.position,
                    anchor: this.anchor,
                    rotation: this.rotation,
                    size: new IsoSize(this.size.width * this.scale.fx, this.size.height * this.scale.fy)
                };
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    return IsoSprite;
})(IsoBaseEntity);
///<reference path="../core/IsoObject.ts" />
var IsoImage = (function (_super) {
    __extends(IsoImage, _super);
    function IsoImage(src) {
        _super.call(this);
        /** Indicates if the image was loaded. */
        this.isLoaded = false;
        /** The size of the image. */
        this.size = new IsoSize(0, 0);
        if (name !== undefined && src !== undefined) {
            this.create(src);
        }
    }
    Object.defineProperty(IsoImage.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoImage";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Sets the element to an existing HTML element. */
    IsoImage.prototype.setElement = function (image) {
        this.element = image;
        this.setSize(new IsoSize(image.width, image.height));
        this.isLoaded = true;
        return this;
    };
    /** Creates a new image. */
    IsoImage.prototype.create = function (src) {
        this.src = src;
        this.element = new Image();
        return this;
    };
    /** Loads the image for further work. */
    IsoImage.prototype.load = function () {
        var _this = this;
        this.element.addEventListener("load", function (event) { return _this._onLoad(event); }, true);
        this.element["src"] = this.src;
    };
    /** Called when the image file was loaded. */
    IsoImage.prototype._onLoad = function (event) {
        this.size = new IsoSize(this.element.width, this.element.height);
        this.isLoaded = true;
        this.call("load");
    };
    /**  Returns the image. */
    IsoImage.prototype.get = function () {
        return this.element;
    };
    /** Gets the width of the image. */
    IsoImage.prototype.getWidth = function () {
        return this.element.width;
    };
    /** Gets the height of the image. */
    IsoImage.prototype.getHeight = function () {
        return this.element.height;
    };
    /** Returns the size. */
    IsoImage.prototype.getSize = function () {
        return this.size;
    };
    /** Sets the width of the image. */
    IsoImage.prototype.setWidth = function (width) {
        this.size.width = width;
        return this;
    };
    /** Sets the height of the image. */
    IsoImage.prototype.setHeight = function (height) {
        this.size.height = height;
        return this;
    };
    /** Sets the size of the image. */
    IsoImage.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    /** Resizes the video. */
    IsoImage.prototype.resize = function () {
        if (this.element !== undefined && this.size.width !== undefined && this.size.height !== undefined) {
            this.element.width = this.size.width;
            this.element.height = this.size.height;
        }
        return this;
    };
    return IsoImage;
})(IsoObject);
///<reference path="../core/IsoObject.ts" />
var IsoAudio = (function (_super) {
    __extends(IsoAudio, _super);
    function IsoAudio(src) {
        _super.call(this);
        /** Indicates if the audio was loaded. */
        this.isLoaded = false;
        /** Sets if the audio load completly or stream it. */
        this.loadType = IsoAudio.LOAD;
        if (name !== undefined && src !== undefined) {
            this.create(src);
        }
    }
    Object.defineProperty(IsoAudio.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoAudio";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Creates a new audio. */
    IsoAudio.prototype.create = function (src) {
        this.src = src;
        return this;
    };
    /** Loads the audio for further work. */
    IsoAudio.prototype.load = function () {
        var _this = this;
        this.element = document.createElement("audio");
        if (this.loadType === IsoAudio.STREAM)
            this.element.addEventListener("canplay", function (e) { return _this._onLoad(e); }, false);
        else if (this.loadType === IsoAudio.LOAD)
            this.element.addEventListener("canplaythrough", function (e) { return _this._onLoad(e); }, false);
        else {
            this.log(new Error("An unknown loadType for the audio " + this.src[0] + "!"), IsoLogger.WARN);
            this.log("Set the loadType to default.", IsoLogger.INFO);
            this.element.addEventListener("canplaythrough", function (e) { return _this._onLoad(e); }, false);
        }
        for (var i = 0; i < this.src.length; i++) {
            var fileParts = this.src[i].split("."), source = document.createElement("source");
            source.src = this.src[i];
            source.type = "audio/" + fileParts[fileParts.length - 1];
            this.element.appendChild(source);
        }
    };
    /** Called when the audio file was loaded. */
    IsoAudio.prototype._onLoad = function (event) {
        this.isLoaded = true;
        this.call("load");
    };
    /**  Returns the audio. */
    IsoAudio.prototype.get = function () {
        return this.element;
    };
    /** Sets the loadType to "LOAD" the audio load completly. */
    IsoAudio.LOAD = "LOAD";
    /** Sets the loadType to "STREAM" the audio streamed. */
    IsoAudio.STREAM = "STREAM";
    return IsoAudio;
})(IsoObject);
///<reference path="../core/IsoObject.ts" />
var IsoResource = (function (_super) {
    __extends(IsoResource, _super);
    function IsoResource(name) {
        _super.call(this);
        this.setName(name);
    }
    Object.defineProperty(IsoResource.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoResource";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Sets the name of a resource. */
    IsoResource.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /** Gets the name of the resource. */
    IsoResource.prototype.getName = function () {
        return this.name;
    };
    IsoResource.prototype.get = function () {
        return undefined;
    };
    return IsoResource;
})(IsoObject);
///<reference path="IsoResource.ts" />
var IsoImageResource = (function (_super) {
    __extends(IsoImageResource, _super);
    function IsoImageResource(name, source) {
        _super.call(this, name);
        this.setSource(source);
        return this;
    }
    Object.defineProperty(IsoImageResource.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoImageResource";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Sets the source of a resource. */
    IsoImageResource.prototype.setSource = function (source) {
        this.source = source;
        return this;
    };
    /** Gets the source. */
    IsoImageResource.prototype.get = function () {
        return this.source;
    };
    return IsoImageResource;
})(IsoResource);
///<reference path="../core/IsoObject.ts" />
var IsoTexture = (function (_super) {
    __extends(IsoTexture, _super);
    function IsoTexture(name) {
        _super.call(this);
        /** The alpha of the texture. */
        this._alpha = 1;
        this.__changed = false;
        this.blendingMode = IsoBlendingModes.NORMAL;
        this.animations = new IsoAnimationManager(this);
        this.setName(name);
        return this;
    }
    Object.defineProperty(IsoTexture.prototype, "animations", {
        get: function () {
            return this._animations;
        },
        set: function (value) {
            this.__propertyChanged("animations", value);
            this._animations = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoTexture.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            this.__propertyChanged("alpha", value);
            this._alpha = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoTexture.prototype, "blendingMode", {
        get: function () {
            return this._blendingMode;
        },
        set: function (value) {
            this.__propertyChanged("blendingMode", value);
            this._blendingMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoTexture.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this.__propertyChanged("name", value);
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoTexture.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoTexture";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Sets the name of the texture. */
    IsoTexture.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /** Retruns the texture data. */
    IsoTexture.prototype.getTextureData = function () {
        return {
            blendingMode: this.blendingMode,
            alpha: this.alpha
        };
    };
    /** Sets if a texture needs a redraw. */
    IsoTexture.prototype.changed = function () {
        this.__changed = true;
    };
    IsoTexture.prototype.unchanged = function () {
        this.__changed = false;
    };
    return IsoTexture;
})(IsoObject);
///<reference path="IsoTexture.ts" />
var IsoColorTexture = (function (_super) {
    __extends(IsoColorTexture, _super);
    function IsoColorTexture(name, color) {
        _super.call(this, name);
        this.set(color);
    }
    Object.defineProperty(IsoColorTexture.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this.__propertyChanged("color", value);
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoColorTexture.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoColorTexture";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Sets the color of the texture. */
    IsoColorTexture.prototype.set = function (color) {
        this.color = color;
        return this;
    };
    /** Resets the color of the texture. */
    IsoColorTexture.prototype.resetColor = function () {
        this.color = undefined;
        return this;
    };
    /** Returns the color data. */
    IsoColorTexture.prototype.getColorData = function () {
        return {
            r: this.color.r,
            g: this.color.g,
            b: this.color.b,
            hex: this.color.getHex()
        };
    };
    /** Returns the texture data. */
    IsoColorTexture.prototype.getTextureData = function () {
        return {
            colorData: this.getColorData(),
            blendingMode: this.blendingMode,
            alpha: this.alpha
        };
    };
    return IsoColorTexture;
})(IsoTexture);
///<reference path="IsoTexture.ts" />
var IsoImageTexture = (function (_super) {
    __extends(IsoImageTexture, _super);
    function IsoImageTexture(name, src) {
        _super.call(this, name);
        this.set(src);
    }
    Object.defineProperty(IsoImageTexture.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (value) {
            this.__propertyChanged("src", value);
            this._src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoImageTexture.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoImageTexture";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Sets the image of the texture. */
    IsoImageTexture.prototype.set = function (src) {
        this.src = src;
        return this;
    };
    /** Resets the image of the texture. */
    IsoImageTexture.prototype.reset = function () {
        this.src = undefined;
        return this;
    };
    /** Returns the imagedata. */
    IsoImageTexture.prototype.getImageData = function () {
        return {
            x: 0,
            y: 0,
            width: this.src.get().size.width,
            height: this.src.get().size.height,
            image: this.src.get().get()
        };
    };
    /** Returns the texture data. */
    IsoImageTexture.prototype.getTextureData = function () {
        return {
            imageData: this.getImageData(),
            blendingMode: this.blendingMode,
            alpha: this.alpha
        };
    };
    return IsoImageTexture;
})(IsoTexture);
/** Include the core. */
///<reference path="core/IsoLogger.ts" />
///<reference path="core/IsoEvent.ts" />
///<reference path="core/IsoWatcher.ts" />
/** Include 2d */
///<reference path="2d/IsoPoint.ts" />
///<reference path="2d/IsoVector2d.ts" />
///<reference path="2d/IsoColor.ts" />
///<reference path="2d/IsoBlendingModes.ts" />
/** Include resources */
///<reference path="resources/IsoImage.ts" />
///<reference path="resources/IsoAudio.ts" />
///<reference path="resources/IsoResource.ts" />
///<reference path="resources/IsoImageResource.ts" />
/** Include objects. */
///<reference path="texture/IsoTexture.ts" />
///<reference path="texture/IsoColorTexture.ts" />
///<reference path="texture/IsoImageTexture.ts" />
/** include animation. */
///<reference path="animation/IsoEasing.ts" /> 
;
"use strict";
///<reference path="include.ts" />
/**
 * IsoMetric is the main class. It includes all needed references and libs.
 */
var IsoMetric = (function (_super) {
    __extends(IsoMetric, _super);
    function IsoMetric(config) {
        var _this = this;
        _super.call(this);
        /** A counter for frames */
        this.frameCount = 0;
        /** The frames per second */
        this.FPS = 0;
        /** Optimal FPS. */
        this.optimalFPS = 60;
        /** The default canvas configuration. */
        this.defaultWindowOptions = {
            fullscreen: true,
            width: window.innerWidth,
            height: window.innerHeight
        };
        try {
            this.log("Initialize IsoMetric.", IsoLogger.INFO);
            IsoMetric.self = this;
            this.config = config;
            if (!this.config.has("windowOptions")) {
                this.log("Could not find any options for the window. The window configuration is default, now.", IsoLogger.INFO);
                this.config.setProperty("windowOptions", this.defaultWindowOptions);
            }
            this.canvas = new IsoCanvas(this.config.get("windowOptions").width, this.config.get("windowOptions").height, this.config.get("windowOptions")["fullscreen"], this.config.get("windowOptions")["autoResize"]);
            this.drawer = new IsoDrawer();
            this.input = new IsoInput();
            this.canvas.load();
            this.canvas.append(document.querySelector("body"));
            this.resources = new IsoResourceManager();
            this.layers = new IsoLayerManager();
            this.physics = new IsoPhysicsManager();
            this.frameCountInteral = setInterval(function () { return _this.setFPS(); }, 1000);
            this.log("Finished the initialization of IsoMetric.", IsoLogger.INFO);
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Reset and set the FPS */
    IsoMetric.prototype.setFPS = function () {
        this.FPS = this.frameCount;
        this.frameCount = 0;
    };
    /** Starts the game- and drawing-loop. */
    IsoMetric.prototype.startLoop = function () {
        this.update();
    };
    /** Sets the FPS after the drawing-loop completed. */
    IsoMetric.prototype.endLoop = function () {
        var endLoop = new Date();
        this.frameTime = (endLoop.getMilliseconds() - this.startLoopTime.getMilliseconds());
        this.frameCount = this.frameCount + 1;
    };
    /** The game- and drawing-loop. */
    IsoMetric.prototype.update = function () {
        this.startLoopTime = new Date();
        this.drawer.update(this.layers);
    };
    return IsoMetric;
})(IsoObject);
///<reference path="../core/IsoObject.ts" />
var IsoLayer = (function (_super) {
    __extends(IsoLayer, _super);
    function IsoLayer(name) {
        var _this = this;
        _super.call(this);
        this._name = "";
        this._entities = new Array();
        /** Indicates if the layer drawn or not. */
        this._hidden = false;
        /** Indicates if the layer should deleted or not. */
        this._isFree = false;
        /** The index of the layer. */
        this._index = 0;
        this.setName(name);
        this.hidden = false;
        this.isFree = false;
        this.watch("entities", function () { return _this.sort(); });
    }
    Object.defineProperty(IsoLayer.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this.__propertyChanged("name", value);
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoLayer.prototype, "entities", {
        get: function () {
            return this._entities;
        },
        set: function (value) {
            this.__propertyChanged("entities", value);
            this._entities = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoLayer.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (value) {
            this.__propertyChanged("hidden", value);
            this._hidden = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoLayer.prototype, "isFree", {
        get: function () {
            return this._isFree;
        },
        set: function (value) {
            this.__propertyChanged("isFree", value);
            this._isFree = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoLayer.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this.__propertyChanged("index", value);
            this._index = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoLayer.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoLayer";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Adds a new entity to the layer. */
    IsoLayer.prototype.add = function (entity) {
        try {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].isFree) {
                    this.entities[i] = null;
                    this.entities[i] = entity;
                    return this;
                }
            }
            this.entities.push(entity);
            return this;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Get an entity by its name. */
    IsoLayer.prototype.get = function (name) {
        try {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].name === name) {
                    return this.entities[i];
                }
            }
            return undefined;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Sets the name of the layer. */
    IsoLayer.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /** Updates the layer. */
    IsoLayer.prototype.update = function () {
        try {
            if (this.entities === undefined || this.entities.length === 0) {
                this.log("Nothing to do, because there are no entities.", IsoLogger.WARN);
            }
            else {
                for (var i = 0; i < this.entities.length; i++) {
                    this.entities[i].update();
                }
            }
            return this;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Get all entities of the layer. */
    IsoLayer.prototype.getAll = function () {
        return this.entities;
    };
    /** Deletes the layer from the memory. */
    IsoLayer.prototype.free = function () {
        this.hide();
        this.isFree = true;
    };
    /** Hides the layer. */
    IsoLayer.prototype.hide = function () {
        this.hidden = true;
    };
    /** Shows the layer. */
    IsoLayer.prototype.show = function () {
        this.hidden = false;
    };
    /** Indicates wether a layer is hidden or not. */
    IsoLayer.prototype.isHidden = function () {
        return this.hidden;
    };
    /** Sorts the entities by there indizies. */
    IsoLayer.prototype.sort = function () {
        this.entities.sort(_sort);
        function _sort(entityA, entityB) {
            if (entityA.index > entityB.index) {
                return 1;
            }
            else if (entityA.index < entityB.index) {
                return -1;
            }
            else {
                return 0;
            }
        }
    };
    return IsoLayer;
})(IsoObject);
///<reference path="../core/IsoObject.ts" />
var IsoLayerManager = (function (_super) {
    __extends(IsoLayerManager, _super);
    function IsoLayerManager() {
        _super.call(this);
        this._layers = new Array();
    }
    Object.defineProperty(IsoLayerManager.prototype, "layers", {
        get: function () {
            return this._layers;
        },
        set: function (value) {
            this.__propertyChanged("layers", value);
            this._layers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoLayerManager.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoLayerManager";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Adds a new layer to the layer manager. */
    IsoLayerManager.prototype.add = function (layer) {
        try {
            for (var i = 0; i < this.layers.length; i++) {
                if (this.layers[i].isFree === true) {
                    this.layers[i] = null;
                    this.layers[i] = layer;
                    return layer;
                }
            }
            this.layers.push(layer);
            return layer;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Removes a layer. */
    IsoLayerManager.prototype.remove = function (layer) {
        try {
            for (var i = 0; i < this.layers.length; i++) {
                if (this.layers[i] === layer) {
                    for (var l = i; l < this.layers.length - 1; l++) {
                        this.layers[l] = this.layers[l + 1];
                    }
                    this.layers.pop();
                }
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Returns a layer by its name. */
    IsoLayerManager.prototype.get = function (name) {
        try {
            for (var i = 0; i < this.layers.length; i++) {
                if (this.layers[i].name === name) {
                    return this.layers[i];
                }
            }
            this.log("Sorry, I can not find the layer with name: " + name, IsoLogger.WARN);
            return undefined;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Sorts the layers by there indizies. */
    IsoLayerManager.prototype.sort = function () {
        this.layers.sort(_sort);
        function _sort(layerA, layerB) {
            if (layerA.index > layerB.index) {
                return 1;
            }
            else if (layerA.index < layerB.index) {
                return -1;
            }
            else {
                return 0;
            }
        }
    };
    /** Sort and updates all layers. */
    IsoLayerManager.prototype.update = function () {
        try {
            if (this.layers === undefined || this.layers.length === 0) {
                this.log("There is nothing to update, because there are no layers.", IsoLogger.WARN);
            }
            else {
                this.sort();
                for (var i = 0; i < this.layers.length; i++) {
                    this.layers[i].update();
                }
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    return IsoLayerManager;
})(IsoObject);
/// <reference path="../core/IsoObject.ts" />
var IsoConfig = (function (_super) {
    __extends(IsoConfig, _super);
    function IsoConfig(config) {
        _super.call(this);
        /** Including the whole configuration. */
        this._config = new Object;
        if (config !== undefined) {
            this.set(config);
        }
    }
    Object.defineProperty(IsoConfig.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this.__propertyChanged("config", value);
            this._config = value;
        },
        enumerable: true,
        configurable: true
    });
    IsoConfig.prototype.set = function (config) {
        this.log("I set the configuration.", IsoLogger.INFO);
        this.config = config;
        return this;
    };
    IsoConfig.prototype.get = function (name) {
        try {
            if (this.config.hasOwnProperty(name)) {
                return this.config[name];
            }
            else {
                this.log("I could not find the configuration setting '" + name + "'. :(", IsoLogger.WARN);
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Checks the existing of a property. */
    IsoConfig.prototype.has = function (name) {
        if (this.config === undefined) {
            this.log("The configuration is undefined. I created a new for you.", IsoLogger.WARN);
            this.config = new Object;
        }
        return this.config.hasOwnProperty(name);
    };
    /** Sets a property to a specified value. */
    IsoConfig.prototype.setProperty = function (name, value) {
        this.config[name] = value;
        return this;
    };
    return IsoConfig;
})(IsoObject);
///<reference path="../core/IsoObject.ts" />
var IsoDrawer = (function (_super) {
    __extends(IsoDrawer, _super);
    function IsoDrawer() {
        _super.call(this);
        this.Engine = IsoMetric.self;
        this.log("Initialized the drawer.", IsoLogger.INFO);
    }
    /** Updates the whole scene. */
    IsoDrawer.prototype.update = function (layers) {
        this.Engine.canvas.clear();
        try {
            layers.update();
            for (var i = 0; i < layers.layers.length; i++) {
                var layer = layers.layers[i];
                if (!layer.isHidden()) {
                    this.prepareEntities(layer.getAll());
                }
            }
            this.Engine.endLoop();
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Prepare a number of entities. */
    IsoDrawer.prototype.prepareEntities = function (entities) {
        try {
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                if (!entity.isHidden()) {
                    this.drawEntity(entity);
                }
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Draws a single entity. */
    IsoDrawer.prototype.drawEntity = function (entity) {
        try {
            var renderData = entity.getRenderData();
            if (renderData.maskData !== null) {
                var texture = new IsoTextureProcessor(entity.name);
                texture.addMask(new IsoImageTexture(entity.name, new IsoImageResource(entity.name, renderData.maskData.getTextureData().imageData.image)));
                for (var i = 0; i < renderData.textureData.length; i++) {
                    if (renderData.textureData[i].imageData !== undefined) {
                        var _i = new IsoImage(entity.name);
                        _i.setElement(renderData.textureData[i].imageData.image);
                        texture.addTexture(new IsoImageTexture(entity.name, new IsoImageResource(entity.name, _i)));
                    }
                    else if (renderData.textureData[i].colorData !== undefined) {
                        var _c = new IsoColor(renderData.textureData[i].colorData);
                        texture.addTexture(new IsoColorTexture(entity.name, _c));
                    }
                }
                renderData.textureData = new Array(texture.getTextureData());
            }
            this.draw(entity, renderData);
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    IsoDrawer.prototype.draw = function (entity, renderData) {
        try {
            var image = entity.chache.cache(renderData);
            this.translate(new IsoPoint(renderData.position.x, renderData.position.y));
            this.rotate(renderData.rotation);
            this.resetTranslation(new IsoPoint(renderData.position.x, renderData.position.y));
            if (entity instanceof IsoEmitter) {
                this.drawEmitter(image, entity);
            }
            else {
                this.drawImage(image, renderData);
            }
            this.Engine.canvas.context.setTransform(1, 0, 0, 1, 0, 0);
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    IsoDrawer.prototype.drawEmitter = function (image, entity) {
        var data = entity.getRenderData();
        if (entity.blendingMode !== IsoBlendingModes.NORMAL) {
            this.Engine.canvas.context.globalCompositeOperation = entity.blendingMode;
        }
        for (var i = 0; i < entity.particles.length; i++) {
            entity.particles[i].animations.update();
            entity.particles[i].update();
            var renderData = entity.particles[i].getRenderData();
            this.Engine.canvas.context.globalAlpha = renderData.alpha;
            this.Engine.canvas.context.drawImage(image.get(), 0, 0, Math.floor(data.size.width), Math.floor(data.size.height), renderData.position.x - (renderData.size.width * renderData.anchor.x), renderData.position.y - (renderData.size.height * renderData.anchor.y), renderData.size.width, renderData.size.height);
        }
        this.Engine.canvas.context.globalAlpha = 1;
        this.Engine.canvas.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
    };
    IsoDrawer.prototype.drawImage = function (image, renderData) {
        this.Engine.canvas.context.drawImage(image.get(), 0, 0, Math.floor(renderData.size.width), Math.floor(renderData.size.height), renderData.position.x - (renderData.size.width * renderData.anchor.x), renderData.position.y - (renderData.size.height * renderData.anchor.y), renderData.size.width, renderData.size.height);
    };
    /** Sets the anchor of an object. */
    IsoDrawer.prototype.translate = function (anchor) {
        this.Engine.canvas.context.translate(anchor.x, anchor.y);
    };
    /** Reset the anchor of an object. */
    IsoDrawer.prototype.resetTranslation = function (anchor) {
        this.Engine.canvas.context.translate(-anchor.x, -anchor.y);
    };
    /** Rotates an object. */
    IsoDrawer.prototype.rotate = function (rotation) {
        this.Engine.canvas.context.rotate(rotation * Math.PI / 180);
    };
    return IsoDrawer;
})(IsoObject);
/// <reference path="../core/IsoObject.ts" />
var IsoInput = (function (_super) {
    __extends(IsoInput, _super);
    function IsoInput() {
        var _this = this;
        _super.call(this);
        this.isKeyEvent = false;
        this.isMouseEvent = false;
        this.isTouchEvent = false;
        this.Engine = IsoMetric.self;
        IsoMetric.self.canvas.on("load", function () { return _this.addEvents(); });
    }
    IsoInput.prototype.addEvents = function () {
        var _this = this;
        var el = IsoMetric.self.canvas.element;
        el.onkeydown = function (event) { return _this.checkKeyboard(event); };
        el.onkeypress = function (event) { return _this.checkKeyboard(event); };
        el.onkeyup = function (event) { return _this.checkKeyboard(event); };
        el.onmousedown = function (event) { return _this.checkMouse(event); };
        el.onmousemove = function (event) { return _this.checkMouse(event); };
        el.onmouseup = function (event) { return _this.checkMouse(event); };
        el.onmousewheel = function (event) { return _this.checkMouse(event); };
        this.log("Added the input events to the main canvas.", IsoLogger.INFO);
    };
    IsoInput.prototype.checkKeyboard = function (event) {
        this.oldEvent = event;
        this.isKeyEvent = true;
        this.keyEventType = event.type;
        this.keyEvent = event;
        this.keyCode = event.which;
        this.keyChar = String.fromCharCode(this.keyCode);
        this.call(event.type, [event]);
    };
    IsoInput.prototype.checkMouse = function (event) {
        this.oldEvent = event;
        this.isMouseEvent = true;
        this.mouseEvent = event;
        this.mouseEventType = event.type;
        this.mouseCode = event.which;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.mouseWheelDelta = event.wheelDelta || -event.detail;
        this.call(event.type, [event]);
    };
    IsoInput.prototype.checkTouch = function (event) {
        this.oldEvent = event;
        this.isTouchEvent = true;
        this.touches = event.touches;
        this.touchEventType = event.type;
        this.call(event.type, [event]);
    };
    IsoInput.prototype.reset = function () {
        this.isKeyEvent = false;
        this.isMouseEvent = false;
        this.isTouchEvent = false;
        this.keyChar = "";
        this.keyCode = undefined;
        this.keyEventType = undefined;
        this.mouseCode = 0;
        this.keyEvent = undefined;
        this.mouseEvent = undefined;
        this.mouseEventType = undefined;
        this.mouseWheelDelta = undefined;
        this.touches = undefined;
        this.touchEvent = undefined;
        this.touchEventType = "";
    };
    IsoInput.KEYDOWN = 40;
    IsoInput.KEYUP = 38;
    IsoInput.KEYLEFT = 37;
    IsoInput.KEYRIGHT = 39;
    IsoInput.KEYTAB = 9;
    IsoInput.KEYESCAPE = 27;
    IsoInput.KEYSPACE = 32;
    IsoInput.KEYENTER = 13;
    IsoInput.KEYCTRL = 17;
    IsoInput.KEYSHIFT = 16;
    IsoInput.KEYALT = 18;
    IsoInput.KEYBACKSPACE = 8;
    IsoInput.EVENT_KEYPRESS = "keypress";
    IsoInput.EVENT_KEYDOWN = "keydown";
    IsoInput.EVENT_KEYUP = "keyup";
    IsoInput.EVENT_MOUSEDOWN = "mousedown";
    IsoInput.EVENT_MOUSEUP = "mouseup";
    IsoInput.EVENT_MOUSEWHEEL = "mousewheel";
    return IsoInput;
})(IsoObject);
///<reference path="../entities/IsoSprite.ts" />
var IsoEmitter = (function (_super) {
    __extends(IsoEmitter, _super);
    /** Creates a new particle emitter. */
    function IsoEmitter(name, spread) {
        if (spread === void 0) { spread = Math.PI / 32; }
        _super.call(this, name);
        this.speed = new IsoVector2D(1, 0);
        this.blendingMode = IsoBlendingModes.NORMAL;
        /** An array including all particles. */
        this.particles = new Array();
        /** The possible angle where particles spreaded to. */
        this.spread = Math.PI / 50;
        /** The maximal particle count. */
        this.maxParticles = 100;
        /** Indecates if the scale of the particles effected during the lifetime. */
        this.effectScale = true;
        /** Indecates if the alpha of the particles effected during the lifetime. */
        this.effectAlpha = true;
        /** The liftime of a particle. Notice, that the lifetime is also effected by the randomseed */
        this.lifetime = 1000;
        /** The emissionrate of the emitter. */
        this.emissionRate = 10;
        /** Indecates wether the emitter emits or not. */
        this.isEmitting = false;
        this.spread = spread;
    }
    /** Adds a new particles to the emitter. */
    IsoEmitter.prototype.add = function (particle) {
        try {
            if (this.particles === undefined) {
                this.log("The property particles of IsoEmitter should not be undefined. I created a new Array for you.", IsoLogger.WARN);
                this.particles = new Array();
            }
            for (var i = 0; i < this.particles.length; i++) {
                if (this.particles[i].isFree === true) {
                    this.particles[i] = null;
                    this.particles[i] = particle;
                    return this;
                }
            }
            if (this.particles.length < this.maxParticles) {
                this.particles.push(particle);
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Sets the spread angle of the emitter. */
    IsoEmitter.prototype.setSpread = function (spread) {
        this.spread = spread / Math.PI;
        return this;
    };
    /** Gets the spread angle of the emitter. */
    IsoEmitter.prototype.getSpread = function () {
        return this.spread;
    };
    /** Updates the emitter. */
    IsoEmitter.prototype.update = function () {
        this.updatePosition();
        this.emitParticles();
    };
    /** Emits a particle. */
    IsoEmitter.prototype.emitParticle = function () {
        var angle = this.speed.getAngle() + (Math.random() * (this.spread - (-2 * this.spread)) + (-2 * this.spread));
        var magnitude = this.speed.getMagnitude();
        var render = this.getRenderData();
        var position = new IsoVector2D(this.position.x, this.position.y);
        var size = new IsoSize(render.size.width, render.size.height);
        var scale = new IsoScale(this.scale.fx, this.scale.fy);
        var v = new IsoVector2D(0, 0);
        var renderData = this.getRenderData();
        v.createFromAngle(angle, magnitude);
        this.add(new IsoParticle(v, position, scale, size, this.alpha, this.lifetime, this.effectScale, this.effectAlpha));
    };
    /** Sets the emission rate. */
    IsoEmitter.prototype.setEmissionRate = function (rate) {
        this.emissionRate = rate;
        return this;
    };
    /** Returns the emission rate. */
    IsoEmitter.prototype.getEmissionRate = function () {
        return this.emissionRate;
    };
    /** Start emitting. */
    IsoEmitter.prototype.emit = function () {
        this.isEmitting = true;
        return this;
    };
    /** Stops emitting. */
    IsoEmitter.prototype.stopEmitting = function () {
        this.isEmitting = false;
        return this;
    };
    /** Emits particles */
    IsoEmitter.prototype.emitParticles = function () {
        if (this.isEmitting === true) {
            for (var i = 0; i < this.emissionRate; i++) {
                this.emitParticle();
            }
        }
    };
    return IsoEmitter;
})(IsoSprite);
///<reference path="../entities/IsoBaseEntity.ts" />
var IsoParticle = (function (_super) {
    __extends(IsoParticle, _super);
    function IsoParticle(velocity, position, scale, size, alpha, lifetime, effectScale, effectAlpha) {
        if (velocity === void 0) { velocity = new IsoVector2D(0, 0); }
        if (position === void 0) { position = new IsoVector2D(0, 0); }
        if (alpha === void 0) { alpha = 1; }
        if (lifetime === void 0) { lifetime = 1000; }
        if (effectScale === void 0) { effectScale = false; }
        if (effectAlpha === void 0) { effectAlpha = false; }
        _super.call(this, "particle");
        this.scale = new IsoScale(1, 1);
        this.position = position;
        this.velocity = velocity;
        this.lifetime = lifetime;
        this.size = size;
        this.startLife = new Date().getTime();
        this.effectAlpha = effectAlpha;
        this.effectScale = effectScale;
        if (effectScale === true) {
            this.animations.add("scaleX", {
                property: "scale.fx",
                startValue: 0.01,
                endValue: scale.fx,
                duration: lifetime
            }).play();
            this.animations.add("scaleY", {
                property: "scale.fy",
                startValue: 0.01,
                endValue: scale.fy,
                duration: lifetime
            }).play();
        }
        else {
            this.size = size;
        }
        if (effectAlpha === true) {
            this.alpha = 1;
            this.animations.add("alpha", {
                property: "alpha",
                startValue: 1,
                endValue: 0,
                duration: lifetime
            }).play();
        }
        else {
            this.alpha = alpha;
        }
    }
    IsoParticle.prototype.updatePosition = function () {
        this.position.add(this.velocity);
        return this;
    };
    IsoParticle.prototype.update = function () {
        this.currentTime = new Date().getTime();
        this.updatePosition();
        this.currentTime = new Date().getTime();
        if (this.currentTime - this.startLife > this.lifetime) {
            this.free();
        }
        // After all.
        this.oldTime = this.currentTime;
    };
    IsoParticle.prototype.getRenderData = function () {
        return {
            position: this.position,
            alpha: this.alpha,
            size: new IsoSize(this.size.width * this.scale.fx, this.size.height * this.scale.fy),
            rotation: 0,
            anchor: new IsoPoint(0, 0)
        };
    };
    return IsoParticle;
})(IsoBaseEntity);
var IsoPhysics = (function (_super) {
    __extends(IsoPhysics, _super);
    function IsoPhysics() {
        _super.call(this);
        this.body = null;
    }
    IsoPhysics.prototype.addBody = function (options) {
        try {
            if (!Matter) {
                this.log("I have problems with the physics. I can not find Matter.js. You need to bind in it by yourself. :(", IsoLogger.WARN);
                this.log("You can find information about Matter.js here: https://github.com/liabru/matter-js", IsoLogger.INFO);
                this.log("The library is located in the directory 'external/matterJs'.", IsoLogger.INFO);
                return this;
            }
            switch (options.type) {
                case "rectangle":
                    this.body = Matter.Bodies.rectangle(options.x || this.entity.position.x, options.y || this.entity.position.y, options.width || this.entity.size.width, options.height || this.entity.size.height, options.options);
                    break;
                case "circle":
                    this.body = Matter.Bodies.circle(options.x || this.entity.position.x, options.y || this.entity.position.y, options.radius, options.options, options.maxSides || undefined);
                    break;
                case "fromVertices":
                    this.body = Matter.Bodies["fromVertices"](options.x || this.entity.position.x, options.y || this.entity.position.y, options.vertices, options.flagInternal || false, options.removeCollinear || 0.01, options.minimumArea || 10);
                    break;
                case "polygon":
                    this.body = Matter.Bodies.polygon(options.x || this.entity.position.x, options.y || this.entity.position.y, options.sides, options.radius, options.options);
                    break;
                case "trapezoid":
                    this.body = Matter.Bodies.trapezoid(options.x || this.entity.position.x, options.y || this.entity.position.y, options.width || this.entity.size.width, options.height || this.entity.size.height, options.slope, options.options);
                    break;
            }
            Matter.World.add(IsoMetric.self.physics.physicsEngine.world, this.body);
            return this;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    IsoPhysics.prototype.updateEntity = function () {
        if (this.hasBody()) {
            this.entity.rotation = this.body.angle / 180 * Math.PI;
            this.entity.position = new IsoVector2D(this.body.position.x, this.body.position.y);
        }
    };
    IsoPhysics.prototype.hasBody = function () {
        if (this.body !== null) {
            return true;
        }
        else {
            return false;
        }
    };
    return IsoPhysics;
})(IsoObject);
/// <reference path="../core/IsoObject.ts" />
/// <reference path="../typings/matterJs.d.ts" />
/**
 * This class is a bridge to the javascript physics engine 'MatterJs'.
 * Matter.js is licensed under The MIT License (MIT)
 * Copyright (c) 2014 Liam Brummitt
 * https://github.com/liabru/matter-js/
 */
var IsoPhysicsManager = (function (_super) {
    __extends(IsoPhysicsManager, _super);
    function IsoPhysicsManager() {
        _super.call(this);
        this.physicsEngine = null;
        this.turnedOn = false;
    }
    IsoPhysicsManager.prototype.create = function () {
        try {
            this.turnedOn = true;
            this.physicsEngine = Matter.Engine.create();
        }
        catch (e) {
            this.log("I have problems with the physics. I can not find Matter.js. You need to bind in it by yourself. :(", IsoLogger.WARN);
            this.log("You can find information about Matter.js here: https://github.com/liabru/matter-js", IsoLogger.INFO);
            this.log("The library is located in the directory 'external/matterJs'.", IsoLogger.INFO);
        }
    };
    IsoPhysicsManager.prototype.turnOn = function () {
        this.turnedOn = true;
    };
    IsoPhysicsManager.prototype.turnOff = function () {
        this.turnedOn = false;
        this.physicsEngine = null;
    };
    IsoPhysicsManager.prototype.isTurnedOn = function () {
        return this.turnedOn;
    };
    return IsoPhysicsManager;
})(IsoObject);
///<reference path="IsoResource.ts" />
var IsoAudioResource = (function (_super) {
    __extends(IsoAudioResource, _super);
    function IsoAudioResource(name, source) {
        _super.call(this, name);
        return this;
    }
    Object.defineProperty(IsoAudioResource.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoAudioResource";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Sets the source of a resource. */
    IsoAudioResource.prototype.setSource = function (source) {
        this.source = source;
        return this;
    };
    /** Gets the source. */
    IsoAudioResource.prototype.get = function () {
        return this.source;
    };
    return IsoAudioResource;
})(IsoResource);
///<reference path="../core/IsoObject.ts" />
var IsoCanvas = (function (_super) {
    __extends(IsoCanvas, _super);
    function IsoCanvas(width, height, fullscreen, autoResize) {
        if (fullscreen === void 0) { fullscreen = false; }
        if (autoResize === void 0) { autoResize = true; }
        _super.call(this);
        /** The size of the canvas. */
        this.size = new IsoSize(0, 0);
        this.size = new IsoSize(width, height);
        this.autoResize = autoResize;
        this.fullscreen = fullscreen;
    }
    Object.defineProperty(IsoCanvas.prototype, "element", {
        get: function () {
            return this._element;
        },
        set: function (value) {
            this.__propertyChanged("element", value);
            this._element = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoCanvas.prototype, "context", {
        get: function () {
            return this._context;
        },
        set: function (value) {
            this.__propertyChanged("context", value);
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoCanvas.prototype, "autoResize", {
        get: function () {
            return this._autoResize;
        },
        set: function (value) {
            this.__propertyChanged("autoResize", value);
            this._autoResize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoCanvas.prototype, "fullscreen", {
        get: function () {
            return this._fullscreen;
        },
        set: function (value) {
            this.__propertyChanged("fullscreen", value);
            this._fullscreen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoCanvas.prototype, "type", {
        get: function () {
            return "IsoCanvas";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Creates a new canvas element. */
    IsoCanvas.prototype.load = function () {
        var _this = this;
        this.element = document.createElement("canvas");
        this.element.width = this.size.width;
        this.element.height = this.size.height;
        if (this.fullscreen === true) {
            this.element.width = window.innerWidth;
            this.element.height = window.innerHeight;
        }
        this.context = this.element.getContext("2d");
        window.onresize = function () { return _this.resize(); };
        this.fire("load", {}, this.element);
        this.call("load", [this]);
    };
    /** Appends the canvas element to a given HTML element. */
    IsoCanvas.prototype.append = function (element) {
        element.appendChild(this.element);
        return this;
    };
    /** Remove the canvas element from a given HTML element. */
    IsoCanvas.prototype.remove = function (element) {
        element.removeChild(this.element);
        return this;
    };
    /** Resize the canvas in case of fullscreen and autoResize is true. */
    IsoCanvas.prototype.resize = function () {
        if (this.autoResize === true && this.fullscreen === true) {
            this.element.width = window.innerWidth;
            this.element.height = window.innerHeight;
        }
    };
    /** Refreshes the canvas size. */
    IsoCanvas.prototype.refresh = function () {
        this.element.width = this.size.width;
        this.element.height = this.size.height;
    };
    /** Clears the canvas. */
    IsoCanvas.prototype.clear = function () {
        try {
            if (this.context !== undefined) {
                this.context.clearRect(0, 0, this.element.width, this.element.height);
            }
            else {
                this.log(new Error("I could not clear the canvas, because its context was undefined."), IsoLogger.WARN);
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /**  Returns the image. */
    IsoCanvas.prototype.get = function () {
        return this.element;
    };
    /** Gets the width of the image. */
    IsoCanvas.prototype.getWidth = function () {
        return this.size.width;
    };
    /** Gets the height of the image. */
    IsoCanvas.prototype.getHeight = function () {
        return this.size.height;
    };
    /** Returns the size. */
    IsoCanvas.prototype.getSize = function () {
        return this.size;
    };
    /** Sets the width of the image. */
    IsoCanvas.prototype.setWidth = function (width) {
        this.size.width = width;
        return this;
    };
    /** Sets the height of the image. */
    IsoCanvas.prototype.setHeight = function (height) {
        this.size.height = height;
        return this;
    };
    /** Sets the size of the image. */
    IsoCanvas.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    return IsoCanvas;
})(IsoObject);
/// <reference path="../core/IsoObject.ts" />
var IsoResourceManager = (function (_super) {
    __extends(IsoResourceManager, _super);
    function IsoResourceManager() {
        _super.apply(this, arguments);
        this._resources = new Array();
        this.loaded = 0;
    }
    Object.defineProperty(IsoResourceManager.prototype, "resources", {
        get: function () {
            return this._resources;
        },
        set: function (value) {
            this.__propertyChanged("resource", value);
            this._resources = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoResourceManager.prototype, "type", {
        get: function () {
            return "IsoResourceManager";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Adds a resource. */
    IsoResourceManager.prototype.add = function (resource) {
        try {
            if (this.resources === undefined) {
                this.resources = new Array();
                this.log("Resources should not be undefined. I created a new array for you.", IsoLogger.WARN);
            }
            this.resources.push(resource);
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Removes a resource. */
    IsoResourceManager.prototype.remove = function (resource) {
        try {
            for (var i = 0; i < this.resources.length; i++) {
                if (this.resources[i] === resource) {
                    for (var l = i; l < this.resources.length - 1; i++) {
                        this.resources[l] = this.resources[l + 1];
                    }
                    this.resources.pop();
                    return this;
                }
            }
            this.log(new Error("I can not find the requested resource. I am so sorry!"), IsoLogger.WARN);
            return this;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Returns a resource by its name. */
    IsoResourceManager.prototype.get = function (name) {
        try {
            for (var i = 0; i < this.resources.length; i++) {
                if (this.resources[i].name === name) {
                    return this.resources[i];
                }
            }
            this.log(new Error("I can not find the requested resource '" + name + "'"), IsoLogger.WARN);
            return undefined;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Loads all resources. */
    IsoResourceManager.prototype.load = function () {
        var _this = this;
        this.log("Lets start loading the resources.", IsoLogger.INFO);
        if (this.resources === undefined || this.resources.length === 0) {
            this.log("Nothing to load, because there are no resources.", IsoLogger.WARN);
        }
        else {
            for (var i = 0; i < this.resources.length; i++) {
                if (this.resources[i].type === "IsoImageResource" || this.resources[i].type === "IsoVideoResource") {
                    this.resources[i].get().on("load", function () { return _this.process(); });
                    this.resources[i].get().load();
                }
            }
        }
        return this;
    };
    /** Checks the process of loading. */
    IsoResourceManager.prototype.process = function () {
        this.loaded++;
        this.log("Loaded resource - " + this.loaded + " of " + this.resources.length, IsoLogger.INFO);
        if (this.loaded === this.resources.length) {
            this.log("Finished loading of all resources.", IsoLogger.INFO);
            this.call("load");
        }
    };
    /** Get the percent of the loading process. */
    IsoResourceManager.prototype.getPercent = function () {
        if (this.resources !== undefined && this.resources.length > 0) {
            return this.resources.length / 100 * this.loaded;
        }
        else {
            this.log(new Error("Sorry. I can not get you the percentage, because there is nothing to load."), IsoLogger.WARN);
        }
    };
    return IsoResourceManager;
})(IsoObject);
///<reference path="../core/IsoObject.ts" />
var IsoVideo = (function (_super) {
    __extends(IsoVideo, _super);
    function IsoVideo(src) {
        _super.call(this);
        /** Indicates if the video was loaded. */
        this.isLoaded = false;
        /**  The size of the video. */
        this.size = new IsoSize(0, 0);
        /** Sets if the video load completly or stream it. */
        this.loadType = IsoVideo.LOAD;
        if (src !== undefined) {
            this.create(src);
        }
    }
    Object.defineProperty(IsoVideo.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoVideo";
        },
        enumerable: true,
        configurable: true
    });
    /** Creates a new video. */
    IsoVideo.prototype.create = function (src) {
        this.src = src;
        this.element = document.createElement("video");
        return this;
    };
    /** Loads the video for further work. */
    IsoVideo.prototype.load = function () {
        var _this = this;
        try {
            this.element.muted = true;
            if (this.loadType === IsoVideo.STREAM)
                this.element.oncanplay = function (e) { return _this._onLoad(e); };
            else if (this.loadType === IsoVideo.LOAD)
                this.element.oncanplaythrough = function (e) { return _this._onLoad(e); };
            else {
                this.log("An unknown loadType for the video " + this.src[0] + "!", IsoLogger.WARN);
                this.log("Set the loadType to default.", IsoLogger.INFO);
                this.element.oncanplaythrough = function (e) { return _this._onLoad(e); };
            }
            if (this.size.width !== undefined && this.size.height !== undefined) {
                this.resize();
            }
            this.element.src = this.src[0];
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Called when the video file was loaded. */
    IsoVideo.prototype._onLoad = function (event) {
        try {
            this.size.width = this.element.width;
            this.size.height = this.element.height;
            this.isLoaded = true;
            this.call("load");
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /**  Returns the video. */
    IsoVideo.prototype.get = function () {
        return this.element;
    };
    /** Gets the width of the video. */
    IsoVideo.prototype.getWidth = function () {
        return this.size.width;
    };
    /** Gets the height of the video. */
    IsoVideo.prototype.getHeight = function () {
        return this.size.height;
    };
    /** Gets the size of the video. */
    IsoVideo.prototype.getSize = function () {
        return this.size;
    };
    /** Sets the width of the video. */
    IsoVideo.prototype.setWidth = function (width) {
        this.size.width = width;
        return this;
    };
    /** Sets the height of the video. */
    IsoVideo.prototype.setHeight = function (height) {
        this.size.height = height;
        return this;
    };
    /** Sets the size of the video. */
    IsoVideo.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    /** Resizes the video. */
    IsoVideo.prototype.resize = function () {
        try {
            if (this.element !== undefined && this.size.width !== undefined && this.size.height !== undefined) {
                this.element.width = this.size.width;
                this.element.height = this.size.height;
            }
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
        return this;
    };
    /** Sets the loadType to "LOAD" the video load completly. */
    IsoVideo.LOAD = "LOAD";
    /** Sets the loadType to "STREAM" the video streamed. */
    IsoVideo.STREAM = "STREAM";
    return IsoVideo;
})(IsoObject);
///<reference path="IsoResource.ts" />
var IsoVideoResource = (function (_super) {
    __extends(IsoVideoResource, _super);
    function IsoVideoResource(name, source) {
        _super.call(this, name);
        this.setSource(source);
        return this;
    }
    Object.defineProperty(IsoVideoResource.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoVideoResource";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Sets the source of a resource. */
    IsoVideoResource.prototype.setSource = function (source) {
        this.source = source;
        return this;
    };
    /** Gets the source. */
    IsoVideoResource.prototype.get = function () {
        return this.source;
    };
    /** Gets the HTMLElement. */
    IsoVideoResource.prototype.getElement = function () {
        return this.source.get();
    };
    return IsoVideoResource;
})(IsoResource);
///<reference path="IsoTexture.ts" />
var IsoStripeTexture = (function (_super) {
    __extends(IsoStripeTexture, _super);
    function IsoStripeTexture(name, src, tileSize) {
        _super.call(this, name, src);
        /** The tilesize. */
        this._tileSize = new IsoSize(0, 0);
        this.tileSize = tileSize;
        this.tile = 1;
    }
    Object.defineProperty(IsoStripeTexture.prototype, "tile", {
        get: function () {
            return this._tile;
        },
        set: function (value) {
            this.__propertyChanged("tile", value);
            this._tile = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoStripeTexture.prototype, "tileOffset", {
        get: function () {
            return this._tileOffset;
        },
        set: function (value) {
            this.__propertyChanged("tileOffset", value);
            this._tileOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoStripeTexture.prototype, "tileSize", {
        get: function () {
            return this._tileSize;
        },
        set: function (value) {
            this.__propertyChanged("tileSize", value);
            this._tileSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoStripeTexture.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoStripeTexture";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Sets the image of the texture. */
    IsoStripeTexture.prototype.set = function (src) {
        this.src = src;
        return this;
    };
    /** Returns the current tile. */
    IsoStripeTexture.prototype.getTile = function () {
        return this.tile;
    };
    /** Returns the tile offset */
    IsoStripeTexture.prototype.getTileOffset = function () {
        return this.tileOffset;
    };
    /** Returns the absolute tile, which means the tile number plus the tile offset. */
    IsoStripeTexture.prototype.getAbsoluteTile = function () {
        return this.tileOffset + this.tile;
    };
    /** Resets the image of the texture. */
    IsoStripeTexture.prototype.reset = function () {
        this.src = undefined;
        return this;
    };
    /** Retruns the imagedata. */
    IsoStripeTexture.prototype.getImageData = function () {
        var ox = (this.tile % (this.src.source.size.width / this.tileSize.width)) * this.tileSize.width;
        var oy = Math.floor(this.tile / this.src.source.size.width / this.tileSize.width) * this.tileSize.height;
        return {
            x: ox,
            y: oy,
            width: this.tileSize.width,
            height: this.tileSize.height,
            image: this.src.get().get()
        };
    };
    /** Returns the texture data. */
    IsoStripeTexture.prototype.getTextureData = function () {
        return {
            imageData: this.getImageData(),
            blendingMode: this.blendingMode,
            alpha: this.alpha
        };
    };
    return IsoStripeTexture;
})(IsoImageTexture);
/// <reference path="../core/IsoObject" />
var IsoTextureCache = (function (_super) {
    __extends(IsoTextureCache, _super);
    function IsoTextureCache() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(IsoTextureCache.prototype, "renderData", {
        get: function () {
            return this._renderData;
        },
        set: function (value) {
            this.__propertyChanged("renderData", value);
            this._renderData = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoTextureCache.prototype, "type", {
        get: function () {
            return "IsoTextureCache";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    IsoTextureCache.prototype.needRedraw = function (renderData) {
        if (this.renderData === undefined) {
            this.renderData = renderData;
            return true;
        }
        else {
            var playVideo = false;
            for (var i = 0; i < renderData.textureData.length; i++) {
                if (renderData.textureData[i].imageData.image["paused"] !== undefined && renderData.textureData[i].imageData.image["paused"] === false) {
                    playVideo = true;
                }
            }
            if (JSON.stringify(renderData.maskData) != JSON.stringify(this.renderData.maskData) || JSON.stringify(renderData.textureData) != JSON.stringify(this.renderData.textureData) || playVideo === true) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    IsoTextureCache.prototype.cache = function (renderData) {
        if (this.needRedraw(renderData)) {
            this.canvas = null;
            this.canvas = this.render(renderData);
            this.renderData = renderData;
        }
        return this.canvas;
    };
    IsoTextureCache.prototype.render = function (renderData) {
        try {
            var canvas = new IsoCanvas(renderData.size.width, renderData.size.height, false, false);
            canvas.load();
            canvas.clear();
            for (var i = 0; i < renderData.textureData.length; i++) {
                var t = renderData.textureData[i];
                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    canvas.context.globalCompositeOperation = t.blendingMode;
                }
                canvas.context.globalAlpha = t.alpha;
                if (t.imageData !== undefined) {
                    canvas.context.drawImage(t.imageData.image, t.imageData.x, t.imageData.y, t.imageData.width, t.imageData.height, 0, 0, renderData.size.width, renderData.size.height);
                }
                else if (t.colorData !== undefined) {
                    canvas.context.fillStyle = t.colorData.hex;
                    canvas.context.fillRect(0, 0, renderData.size.width, renderData.size.height);
                }
                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    canvas.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                }
            }
            return canvas;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    IsoTextureCache.prototype.getImageData = function () {
        try {
            return this.canvas.context.getImageData(0, 0, this.canvas.element.width, this.canvas.element.height);
        }
        catch (e) {
            this.log("Can not return the image data :(. Maybe the script runs locally?!", IsoLogger.WARN);
            return null;
        }
    };
    return IsoTextureCache;
})(IsoObject);
///<reference path="IsoTexture.ts" />
var IsoTextureProcessor = (function (_super) {
    __extends(IsoTextureProcessor, _super);
    function IsoTextureProcessor(name) {
        _super.call(this, name);
        this.mask = new Array();
        this.textures = new Array();
    }
    Object.defineProperty(IsoTextureProcessor.prototype, "mask", {
        get: function () {
            return this._mask;
        },
        set: function (value) {
            this.__propertyChanged("mask", value);
            this._mask = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoTextureProcessor.prototype, "textures", {
        get: function () {
            return this._textures;
        },
        set: function (value) {
            this.__propertyChanged("textures", value);
            this._textures = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoTextureProcessor.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (value) {
            this.__propertyChanged("src", value);
            this._src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoTextureProcessor.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoTextureProcessor";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Adds a new mask to the texture. */
    IsoTextureProcessor.prototype.addMask = function (mask) {
        try {
            if (this.mask === undefined) {
                this.log(new Error("Mask was undefined but should not. I created a new array for you."), IsoLogger.WARN);
            }
            this.mask.push(mask);
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Adds a new textue to the texture. */
    IsoTextureProcessor.prototype.addTexture = function (texture) {
        try {
            if (this.textures === undefined) {
                this.log(new Error("Textures was undefined but should not. I created a new array for you."), IsoLogger.WARN);
            }
            this.textures.push(texture);
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Removes a mask from the texture. */
    IsoTextureProcessor.prototype.removeMask = function (mask) {
        try {
            if (this.mask === undefined) {
                this.log(new Error("Mask was undefined but should not. I created a new array for you."), IsoLogger.WARN);
                this.mask = new Array();
            }
            for (var i = 0; i < this.mask.length; i++) {
                if (this.mask[i] === mask) {
                    this.mask[i] = null;
                    for (var l = 0; l < this.mask.length - 1; l++) {
                        this.mask[l] = this.mask[l + 1];
                    }
                    this.mask.pop();
                    return this;
                }
            }
            this.log(new Error("I could not find the mask, you wanted to remove."), IsoLogger.WARN);
            return this;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Removes a texture from the texture. */
    IsoTextureProcessor.prototype.removeTexture = function (texture) {
        try {
            if (this.textures === undefined) {
                this.log(new Error("Textures was undefined but should not. I created a new array for you."), IsoLogger.WARN);
                this.textures = new Array();
            }
            for (var i = 0; i < this.textures.length; i++) {
                if (this.textures[i] === texture) {
                    this.textures[i] = null;
                    for (var l = 0; l < this.textures.length - 1; l++) {
                        this.textures[l] = this.textures[l + 1];
                    }
                    this.textures.pop();
                    return this;
                }
            }
            this.log(new Error("I could not find the texture, you wanted to remove."), IsoLogger.WARN);
            return this;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    };
    /** Proceed the new texture and save the result as the texture source.*/
    IsoTextureProcessor.prototype.render = function () {
        var maskData = new Array();
        var widthM = 0, heightM = 0, widthT = 0, heightT = 0, width = 0, height = 0;
        var textureData = new Array();
        for (var i = 0; i < this.mask.length; i++) {
            maskData[i] = this.mask[i].getImageData();
            if (maskData[i].width > widthM) {
                widthM = maskData[i].width;
            }
            if (maskData[i].height > heightM) {
                heightM = maskData[i].height;
            }
        }
        for (var i = 0; i < this.textures.length; i++) {
            textureData[i] = this.textures[i].getTextureData();
            if (textureData[i].imageData.width > widthT) {
                widthT = textureData[i].imageData.width;
            }
            if (textureData[i].imageData.height > heightT) {
                heightT = textureData[i].imageData.height;
            }
        }
        // Render the texture to a new canvas.
        // Render at first the mask, if a mask is given.
        var canvasMask = new IsoCanvas(widthM, heightM);
        canvasMask.load();
        if (maskData.length > 0) {
            for (var i = 0; i < maskData.length; i++) {
                var m = maskData[i];
                canvasMask.context.drawImage(m.image, 0, 0, m.width, m.height);
            }
        }
        // Render the texture if a texture is given.
        var canvasTex = new IsoCanvas(widthT, heightT);
        canvasTex.load();
        if (textureData.length > 0) {
            for (var i = 0; i < textureData.length; i++) {
                var t = textureData[i];
                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    canvasTex.context.globalCompositeOperation = t.blendingMode;
                }
                canvasTex.context.globalAlpha = t.alpha;
                if (t.imageData !== undefined) {
                    canvasTex.context.drawImage(t.imageData.image, 0, t.imageData.width, t.imageData.height);
                }
                if (t.colorData !== undefined) {
                    canvasTex.context.fillStyle = t.colorData.hex;
                    canvasTex.context.fillRect(0, 0, canvasTex.size.width, canvasTex.size.height);
                }
                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    canvasTex.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                }
            }
        }
        // And put it all together.
        if (widthM > 0) {
            width = widthM;
        }
        else {
            width = widthT;
        }
        if (heightM > 0) {
            height = heightM;
        }
        else {
            height = heightT;
        }
        var canvas = new IsoCanvas(width, height);
        canvas.load();
        if (maskData.length > 0) {
            canvas.context.drawImage(canvasMask.element, 0, 0, canvasMask.size.width, canvasMask.size.height);
        }
        if (textureData.length > 0) {
            if (maskData.length > 0) {
                canvas.context.globalCompositeOperation = IsoBlendingModes.SOURCE_IN;
            }
            canvas.context.drawImage(canvasTex.element, 0, 0, canvasTex.size.width, canvasTex.size.height);
        }
        this.src = new IsoImageResource(this.name, canvas);
    };
    return IsoTextureProcessor;
})(IsoTexture);
///<reference path="IsoTexture.ts" />
var IsoVideoTexture = (function (_super) {
    __extends(IsoVideoTexture, _super);
    function IsoVideoTexture(name, src) {
        _super.call(this, name);
        this.set(src);
    }
    Object.defineProperty(IsoVideoTexture.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (value) {
            this.__propertyChanged("src", value);
            this._src = value;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the image of the texture. */
    IsoVideoTexture.prototype.set = function (src) {
        this.src = src;
        return this;
    };
    Object.defineProperty(IsoVideoTexture.prototype, "type", {
        /** Type of the object for identification. */
        get: function () {
            return "IsoVideoTexture";
        },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    /** Resets the image of the texture. */
    IsoVideoTexture.prototype.reset = function () {
        this.src = null;
        return this;
    };
    /** Plays or resumes the video. */
    IsoVideoTexture.prototype.play = function () {
        try {
            this.src.getElement().play();
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
        return this;
    };
    /** Stops the video. */
    IsoVideoTexture.prototype.stop = function () {
        try {
            this.src.getElement().pause();
            this.src.getElement().currentTime = 0;
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
        return this;
    };
    /** Pause the video. */
    IsoVideoTexture.prototype.pause = function () {
        try {
            this.src.getElement().pause();
        }
        catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
        return this;
    };
    /** Sets the current time in seconds of the video. */
    IsoVideoTexture.prototype.setCurrentTime = function (time) {
        try {
            if (this.src.getElement().duration > time) {
                this.src.getElement().currentTime = time;
            }
            else {
                this.log(new Error("Can not set the time of IsoVideoTexture '" + this.name + "'. The request time is bigger than the duration."), IsoLogger.WARN);
            }
        }
        catch (e) {
            this.log(e, IsoLogger.WARN);
        }
        return this;
    };
    /** Returns the imagedata. */
    IsoVideoTexture.prototype.getImageData = function () {
        return {
            x: 0,
            y: 0,
            width: this.src.get().size.width,
            height: this.src.get().size.height,
            image: this.src.get().get()
        };
    };
    /** Returns the texture data. */
    IsoVideoTexture.prototype.getTextureData = function () {
        return {
            imageData: this.getImageData(),
            blendingMode: this.blendingMode,
            alpha: this.alpha
        };
    };
    return IsoVideoTexture;
})(IsoTexture);
//# sourceMappingURL=IsoMetric.js.map