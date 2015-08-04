///<reference path="IsoOn.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoAnimationPlaylist = (function (_super) {
    __extends(IsoAnimationPlaylist, _super);
    function IsoAnimationPlaylist(name, object, animations) {
        var _this = this;
        _super.call(this);
        this.isPlaying = false;
        this.animations = new Array();
        this.current = "";
        this.name = name;
        this.object = object;
        this.animations = animations;
        document.addEventListener(IsoAnimation.PLAYED, function (event) { return _this.checkPlaylist(event); });
    }
    IsoAnimationPlaylist.prototype.checkPlaylist = function (event) {
        if (event.detail.object === this.object && this.isPlaying === true) {
            for (var i = 0; i < this.animations.length; i++) {
                if (i < this.animations.length - 1 && event.detail.name === this.current) {
                    this.next(this.animations[i + 1]);
                }
                else if (event.detail.name === this.current) {
                    this.stop();
                }
            }
        }
    };
    IsoAnimationPlaylist.prototype.stop = function () {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].isPlaying === true) {
                this.animations[i].stop();
            }
        }
        this.isPlaying = false;
        this.current = "";
    };
    IsoAnimationPlaylist.prototype.pause = function () {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].isPlaying === true) {
                this.animations[i].pause();
                this.pausedAnimation = this.animations[i].name;
            }
        }
        this.isPlaying = false;
    };
    IsoAnimationPlaylist.prototype.resume = function () {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === this.pausedAnimation) {
                this.animations[i].resume();
            }
        }
    };
    IsoAnimationPlaylist.prototype.next = function (animation) {
        this.current = animation.name;
        animation.play();
    };
    IsoAnimationPlaylist.prototype.play = function () {
        if (this.animations !== undefined && this.animations.length > 0 && this.isPlaying === false) {
            this.isPlaying = true;
            this.animations[0].play();
        }
    };
    return IsoAnimationPlaylist;
})(IsoOn);
