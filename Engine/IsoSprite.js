///<reference path="IsoTile" />
///<reference path="IsoTileMap" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoSprite = (function (_super) {
    __extends(IsoSprite, _super);
    function IsoSprite(Engine, image, tileInfo, name) {
        _super.call(this, Engine, image, tileInfo);
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    IsoSprite.prototype.getTileImage = function () {
        var x = this.tileOffset.x;
        var y = this.tileOffset.y;
        var width = this.tileSize.width;
        var height = this.tileSize.height + this.tileHeight;
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            image: this.ressource.get()
        };
    };
    IsoSprite.prototype.setFrame = function (frame) {
        this.tileSize = frame.dimension;
        this.tileOffset.set(frame.offset.x, frame.offset.y);
        return this;
    };
    IsoSprite.prototype.set = function (tile) {
        this.tileHeight = tile.height | 0;
        this.tileSize = tile.size;
        this.setTile(tile.tile);
        return this;
    };
    IsoSprite.prototype.getAbsoluteDimension = function () {
        return {
            width: this.tileSize.width * this.zoomLevel * this.scale.factorX,
            height: this.tileSize.height * this.zoomLevel * this.scale.factorY
        };
    };
    IsoSprite.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.tileSize.width * this.scale.factorX, fy = this.anchor.y / this.tileSize.height * this.scale.factorY;
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.tileSize,
            renderSize: this.getAbsoluteDimension(),
            anchor: new IsoPoint((this.position.x + (this.width * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (this.height * this.zoomLevel * fy * this.scale.factorY))),
            image: this.ressource.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel,
            type: "IsoSprite"
        };
    };
    return IsoSprite;
})(IsoTileObject);
