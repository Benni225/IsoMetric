///<reference path="IsoAnimation.ts" />
"use strict";
var IsoAnimationManager = (function () {
    function IsoAnimationManager() {
        this.animations = new Array();
    }
    IsoAnimationManager.prototype.addFrameAnimation = function (name, object, frames, speed, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.animations.push(new IsoAnimation().createFrameAnimation(name, object, frames, speed, easing, type, callbacks));
        return this;
    };
    IsoAnimationManager.prototype.addAnimation = function (name, object, attribute, endValue, speed, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.animations.push(new IsoAnimation().createAnimation(name, object, attribute, endValue, speed, easing, type, callbacks));
        return this;
    };
    IsoAnimationManager.prototype.addPlaylist = function (name, object, animations) {
        this.playLists.push(new IsoAnimationPlaylist(name, object, animations));
        return this;
    };
    IsoAnimationManager.prototype.play = function (name, object) {
        this.get(name, object).play();
    };
    IsoAnimationManager.prototype.stop = function (name, object) {
        this.get(name, object).stop();
    };
    IsoAnimationManager.prototype.resume = function (name, object) {
        this.get(name, object).resume();
    };
    IsoAnimationManager.prototype.pause = function (name, object) {
        this.get(name, object).pause();
    };
    IsoAnimationManager.prototype.isPlaying = function (name, object) {
        return this.get(name, object).isPlaying;
    };
    IsoAnimationManager.prototype.setAdditionType = function (name, object, type) {
        this.get(name, object).setAdditionType(type);
    };
    IsoAnimationManager.prototype.playPlaylist = function (name, object) {
        this.getPlaylist(name, object).play();
    };
    IsoAnimationManager.prototype.stopPlaylist = function (name, object) {
        this.getPlaylist(name, object).stop();
    };
    IsoAnimationManager.prototype.pausePlaylist = function (name, object) {
        this.getPlaylist(name, object).pause();
    };
    IsoAnimationManager.prototype.resumePlaylist = function (name, object) {
        this.getPlaylist(name, object).resume();
    };
    IsoAnimationManager.prototype.isPlayingPlaylist = function (name, object) {
        return this.getPlaylist(name, object).isPlaying;
    };
    IsoAnimationManager.prototype.get = function (name, object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                return this.animations[i];
            }
        }
    };
    IsoAnimationManager.prototype.getPlaylist = function (name, object) {
        for (var i = 0; i < this.playLists.length; i++) {
            if (this.playLists[i].name === name && (this.playLists[i].object === object)) {
                return this.playLists[i];
            }
        }
    };
    return IsoAnimationManager;
})();
