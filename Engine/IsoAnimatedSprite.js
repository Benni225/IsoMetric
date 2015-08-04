///<reference path="IsoSprite.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoAnimatedSprite = (function (_super) {
    __extends(IsoAnimatedSprite, _super);
    function IsoAnimatedSprite(Engine, image, tileInfo, name) {
        _super.call(this, Engine, image, tileInfo);
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    IsoAnimatedSprite.prototype.addFrameAnimation = function (name, frames, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = IsoAnimation.ONCE; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.Engine.animation.addFrameAnimation(name, this, frames, duration, easing, type, callbacks);
        return this;
    };
    IsoAnimatedSprite.prototype.addPlaylist = function (name, animations) {
        this.Engine.animation.addPlaylist(name, this, animations);
        return this;
    };
    return IsoAnimatedSprite;
})(IsoSprite);
