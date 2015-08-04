///<reference path="IsoOn.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoAudio = (function (_super) {
    __extends(IsoAudio, _super);
    function IsoAudio(src) {
        _super.call(this);
        this.type = IsoRessource.AUDIO;
        this.src = "";
        this.isLoaded = false;
        this.create(src);
    }
    IsoAudio.prototype.create = function (src) {
        this.src = src;
    };
    IsoAudio.prototype.load = function () {
        var _this = this;
        this.audio = document.createElement("audio");
        this.audio.addEventListener("canplaythrough", function (event) { return _this._onLoad(event); }, false);
        this.audio.src = this.src;
    };
    IsoAudio.prototype._onLoad = function (event) {
        this.isLoaded = true;
        this.callOn("load");
    };
    IsoAudio.prototype.get = function () {
        return this.audio;
    };
    return IsoAudio;
})(IsoOn);
