///<reference path="IsoSprite.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IsoAnimatedSprite = (function (_super) {
    __extends(IsoAnimatedSprite, _super);
    function IsoAnimatedSprite(Engine, image, tileInfo, name) {
        _super.call(this, Engine, image, tileInfo);
        this.stripeLength = 1;
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    IsoAnimatedSprite.prototype.setStripeLength = function (stripeLength) {
        this.stripeLength = stripeLength;
        return this;
    };
    IsoAnimatedSprite.prototype.setTile = function (tile) {
        this.tile = tile + this.direction * this.stripeLength + this.startTile;
        this.tileOffset.x =
            (this.tile % (this.width / this.tileSize.width)) * (this.tileSize.width + this.image.image.offset.x);
        this.tileOffset.y =
            (Math.floor(this.tile / (this.width / this.tileSize.width))) * (this.tileSize.height + this.image.image.offset.y);
        return this;
    };
    return IsoAnimatedSprite;
})(IsoSprite);
