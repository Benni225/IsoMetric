///<reference path="IsoTileObject.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoTile = (function (_super) {
    __extends(IsoTile, _super);
    function IsoTile(Engine, image, tileInfo) {
        _super.call(this, Engine, image);
        this.tileOffset = new IsoPoint(0, 0);
        this.tileHeight = 0;
        this.mapPosition = new IsoMapVector2D(0, 0);
        this.updateType = "automatic";
        try {
            if (tileInfo !== undefined) {
                this.set(tileInfo);
            }
            return this;
        }
        catch (e) {
            throw ("Can not create tile with following error message: " + e);
        }
    }
    IsoTile.prototype.addFrameAnimation = function (name, frames, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = IsoAnimation.ONCE; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.Engine.animation.addFrameAnimation(name, this, frames, duration, easing, type, callbacks);
        return this;
    };
    IsoTile.prototype.setUpdateType = function (type) {
        this.updateType = type;
        return this;
    };
    IsoTile.prototype.set = function (tile) {
        this.tileHeight = tile.height;
        this.tileSize = tile.size;
        this.mapPosition = tile.mapPosition;
        this.setTile(tile.tile);
        return this;
    };
    IsoTile.prototype.getCoords = function () {
        var r = this.getRenderDetails();
        return {
            x: r.position.x + (r.mapPosition.column * r.tileSize.width * r.zoomLevel),
            y: r.position.y + (r.mapPosition.row * r.tileSize.height * r.zoomLevel) - this.tileHeight,
            width: this.tileSize.width * this.zoomLevel,
            height: this.tileSize.height * this.zoomLevel
        };
    };
    IsoTile.prototype.getMapPosition = function () {
        return this.mapPosition;
    };
    IsoTile.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x =
            ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
                - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x) + (this.mapPosition.column * this.tileSize.width * this.zoomLevel);
        y =
            ((this.position.y + this.offset.y + this.scrollPosition.y + this.tileHeight) * this.zoomLevel)
                - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y) + (this.mapPosition.row * this.tileSize.height * this.zoomLevel) - this.tileHeight;
        return new IsoVector2D(x, y);
    };
    IsoTile.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.tileSize.width, fy = this.anchor.y / this.tileSize.height;
        return {
            position: this.getAbsolutePosition(),
            mapPosition: this.mapPosition,
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: new IsoPoint((this.getAbsolutePosition().x + (this.tileSize.width * this.zoomLevel * fx)), (this.getAbsolutePosition().y + (this.tileSize.height * this.zoomLevel * fy))),
            image: this.ressource.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel,
            type: "IsoTile"
        };
    };
    IsoTile.prototype.updatePosition = function () {
        this.velocity.x *= this.friction;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rigidBody = this.getCoords();
    };
    IsoTile.AUTOMATIC = "automatic";
    IsoTile.MANUAL = "manual";
    IsoTile.POSITION = "position";
    IsoTile.ZOOM = "zoom";
    return IsoTile;
})(IsoTileObject);
