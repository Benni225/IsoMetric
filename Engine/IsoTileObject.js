///<reference path="IsoObject.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoTileObject = (function (_super) {
    __extends(IsoTileObject, _super);
    function IsoTileObject(Engine, image, tileInfo) {
        _super.call(this, Engine, image);
        this.tileOffset = new IsoPoint(0, 0);
        this.tileHeight = 0;
        this.startTile = 0;
        try {
            if (tileInfo !== undefined) {
                this.set(tileInfo);
            }
            return this;
        }
        catch (e) {
            throw (e);
        }
    }
    IsoTileObject.prototype.setTileOffset = function (x, y) {
        this.tileOffset.set(x, y);
        return this;
    };
    IsoTileObject.prototype.getTileOffset = function () {
        return this.tileOffset;
    };
    IsoTileObject.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x =
            ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
                - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x);
        y =
            ((this.position.y + this.offset.y + this.scrollPosition.y + this.tileHeight) * this.zoomLevel)
                - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    };
    IsoTileObject.prototype.getRelativeDimension = function () {
        return {
            width: this.tileSize.width * this.zoomLevel,
            height: this.tileSize.height * this.zoomLevel
        };
    };
    IsoTileObject.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.tileSize.width * this.scale.factorX, fy = this.anchor.y / this.tileSize.height * this.scale.factorY;
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: new IsoPoint((this.position.x + (this.tileSize.width * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (this.tileSize.height * this.zoomLevel * fy * this.scale.factorY))),
            image: this.ressource.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel,
            type: "IsoTileObject"
        };
    };
    IsoTileObject.prototype.getTileImage = function () {
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
    IsoTileObject.prototype.setTile = function (tile) {
        try {
            this.tileOffset.set(0, 0);
            this.tile = tile + this.startTile;
            this.tileOffset.x =
                (this.tile % (this.width / this.tileSize.width)) * (this.tileSize.width + this.ressource.ressource.offset.x);
            this.tileOffset.y =
                (Math.floor(this.tile / (this.width / this.tileSize.width))) * (this.tileSize.height + this.ressource.ressource.offset.y);
            return this;
        }
        catch (e) {
            throw (e);
        }
    };
    IsoTileObject.prototype.set = function (tile) {
        this.tileHeight = tile.height;
        this.tileSize = tile.size;
        this.rigidBody.width = tile.size.width;
        this.rigidBody.height = tile.size.height;
        this.setTile(tile.tile);
        return this;
    };
    return IsoTileObject;
})(IsoObject);
