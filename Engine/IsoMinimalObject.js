var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="IsoOn.ts" />
var IsoMinimalObject = (function (_super) {
    __extends(IsoMinimalObject, _super);
    function IsoMinimalObject(Engine) {
        _super.call(this);
        this.position = new IsoVector2D(0, 0);
        this.scrollPosition = new IsoVector2D(0, 0);
        this.offset = new IsoPoint(0, 0);
        this.scale = { factorX: 1, factorY: 1 };
        this.zoomLevel = 1;
        this.zoomStrength = 1 / 1000;
        this.zoomPoint = new IsoVector2D(0, 0);
        this.rotation = 0;
        this.speed = 1;
        this.anchor = new IsoPoint(0, 0);
        this.blendingMode = IsoBlendingModes.NORMAL;
        this.alpha = 1;
        this.hidden = false;
        this.properties = {};
        this.friction = 1;
        this.velocity = new IsoVector2D(0, 0);
        this.Engine = Engine;
    }
    IsoMinimalObject.prototype.addAnimation = function (name, attribute, endValue, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.Engine.animation.addAnimation(name, this, attribute, endValue, duration, easing, type, callbacks);
        return this;
    };
    IsoMinimalObject.prototype.addPlaylist = function (name, animations) {
        this.Engine.animation.addPlaylist(name, this, animations);
        return this;
    };
    IsoMinimalObject.prototype.getProperty = function (name) {
        return this.properties[name];
    };
    IsoMinimalObject.prototype.getProperties = function () {
        return this.properties;
    };
    IsoMinimalObject.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    };
    IsoMinimalObject.prototype.getRotation = function () {
        return this.rotation;
    };
    IsoMinimalObject.prototype.move = function (deltaX, deltaY) {
        this.velocity.x += deltaX;
        this.velocity.y += deltaY;
        if (this.velocity.x > this.speed) {
            this.velocity.x = this.speed;
        }
        if (this.velocity.x < -this.speed) {
            this.velocity.x = -this.speed;
        }
        if (this.velocity.y > this.speed) {
            this.velocity.y = this.speed;
        }
        if (this.velocity.y < -this.speed) {
            this.velocity.y = -this.speed;
        }
        return this;
    };
    IsoMinimalObject.prototype.rotate = function (degrees) {
        this.rotation = this.rotation + degrees;
        return this;
    };
    IsoMinimalObject.prototype.scroll = function (deltaX, deltaY) {
        this.scrollPosition.set(this.scrollPosition.x + (deltaX * this.speed), this.scrollPosition.y + (deltaY * this.speed));
        return this;
    };
    IsoMinimalObject.prototype.setAlpha = function (alpha) {
        this.alpha = alpha;
        return this;
    };
    IsoMinimalObject.prototype.setBlendingMode = function (blendingMode) {
        this.blendingMode = blendingMode;
        return this;
    };
    IsoMinimalObject.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    IsoMinimalObject.prototype.setProperty = function (name, value) {
        this.properties[name] = value;
        return this;
    };
    IsoMinimalObject.prototype.setProperties = function (properties) {
        this.properties = properties;
        return this;
    };
    IsoMinimalObject.prototype.setRotation = function (degrees) {
        this.rotation = degrees;
        return this;
    };
    IsoMinimalObject.prototype.setScale = function (factorX, factorY) {
        this.scale.factorX = factorX;
        this.scale.factorY = factorY;
        return this;
    };
    IsoMinimalObject.prototype.setSpeed = function (speed) {
        this.speed = speed;
        return this;
    };
    IsoMinimalObject.prototype.setZoomLevel = function (zoomLevel) {
        this.zoomLevel = zoomLevel;
        return this;
    };
    IsoMinimalObject.prototype.setZoomStrength = function (zoomStrength) {
        this.zoomStrength = this.zoomStrength / 1000;
        return this;
    };
    IsoMinimalObject.prototype.zoom = function (zoom) {
        this.setZoomLevel(this.zoomLevel + (zoom * this.zoomStrength));
        return this;
    };
    IsoMinimalObject.prototype.play = function (name) {
        this.Engine.animation.play(name, this);
        return this;
    };
    IsoMinimalObject.prototype.stop = function (name) {
        this.Engine.animation.stop(name, this);
        return this;
    };
    IsoMinimalObject.prototype.resume = function (name) {
        this.Engine.animation.resume(name, this);
        return this;
    };
    IsoMinimalObject.prototype.pause = function (name) {
        this.Engine.animation.pause(name, this);
        return this;
    };
    IsoMinimalObject.prototype.isPlaying = function (name) {
        return this.Engine.animation.isPlaying(name, this);
        ;
    };
    IsoMinimalObject.prototype.setAdditionType = function (name, type) {
        this.Engine.animation.setAdditionType(name, this, type);
    };
    IsoMinimalObject.prototype.updatePosition = function () {
        this.velocity.x *= this.friction;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    return IsoMinimalObject;
})(IsoOn);
