///<reference path="IsoOn.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoImage = (function (_super) {
    __extends(IsoImage, _super);
    function IsoImage(src, local) {
        if (local === void 0) { local = false; }
        _super.call(this);
        this.isLoaded = false;
        this.offset = new IsoPoint(0, 0);
        this.type = IsoRessource.IMAGE;
        if (name !== undefined && src !== undefined) {
            this.create(src);
        }
    }
    IsoImage.prototype.create = function (src) {
        this.src = src;
        return this;
    };
    IsoImage.prototype.load = function () {
        var _this = this;
        this.image = new Image();
        this.image.addEventListener("load", function (e) { return _this._onLoad(e); }, false);
        this.image.src = this.src;
    };
    IsoImage.prototype._onLoad = function (event) {
        this.width = this.image.width;
        this.height = this.image.height;
        this.isLoaded = true;
        this.callOn("load");
    };
    IsoImage.prototype.get = function () {
        return this.image;
    };
    IsoImage.prototype.free = function () {
        this.image = null;
        delete (this);
    };
    IsoImage.prototype.getWidth = function () {
        return this.width;
    };
    IsoImage.prototype.getHeight = function () {
        return this.height;
    };
    IsoImage.prototype.getOffset = function () {
        return this.offset;
    };
    IsoImage.prototype.setOffset = function (x, y) {
        this.offset.set(x, y);
    };
    return IsoImage;
})(IsoOn);
