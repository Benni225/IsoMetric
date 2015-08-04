///<reference path="IsoObject.ts" />
///<reference path="IsoTileObject.ts" />
///<reference path="IsoSprite.ts" />
///<reference path="IsoTileMap.ts" />
"use strict";
var IsoLayer = (function () {
    function IsoLayer(Engine, index, name) {
        this.objects = new Array();
        this.texts = new Array();
        this.billboards = new Array();
        this.hidden = false;
        this.Engine = Engine;
        this.index = index;
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    IsoLayer.prototype.addObject = function (name, image) {
        var o = new IsoObject(this.Engine, image, name);
        this.objects.push(o);
        return o;
    };
    IsoLayer.prototype.addSprite = function (name, image, tileObjectInfo) {
        var s = new IsoSprite(this.Engine, image, tileObjectInfo, name);
        this.objects.push(s);
        return s;
    };
    IsoLayer.prototype.addText = function (name, text) {
        var t = new IsoText(this.Engine, name, text);
        this.texts.push(t);
        return t;
    };
    IsoLayer.prototype.addBillboard = function (name, image) {
        var b = new IsoBillboard(this.Engine, image, name);
        this.billboards.push(b);
        return b;
    };
    IsoLayer.prototype.addEmitter = function (name) {
        var b = new IsoEmitter(this.Engine);
        b.name = name;
        this.objects.push(b);
        return b;
    };
    IsoLayer.prototype.addAnimatedSprite = function (name, image, tileObjectInfo) {
        var s = new IsoAnimatedSprite(this.Engine, image, tileObjectInfo, name);
        this.objects.push(s);
        return s;
    };
    IsoLayer.prototype.addTileMap = function (name, image, tileWidth, tileHeight, map) {
        this.tileMap = new IsoTileMap(this.Engine, name, tileWidth, tileHeight, image, map);
        return this.tileMap;
    };
    IsoLayer.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    IsoLayer.prototype.getBillboard = function (name) {
        for (var i = 0; i < this.billboards.length; i++) {
            if (this.billboards[i].name === name) {
                return this.billboards[i];
            }
        }
        return undefined;
    };
    IsoLayer.prototype.getObject = function (name) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name === name) {
                return this.objects[i];
            }
        }
        return undefined;
    };
    IsoLayer.prototype.getSprite = function (name) {
        return this.getObject(name);
    };
    IsoLayer.prototype.getAnimatedSprite = function (name) {
        return this.getObject(name);
    };
    IsoLayer.prototype.getText = function (name) {
        for (var i = 0; i < this.texts.length; i++) {
            if (this.texts[i].name === name) {
                return this.texts[i];
            }
        }
        return undefined;
    };
    IsoLayer.prototype.getTileMap = function () {
        return this.tileMap;
    };
    IsoLayer.prototype.zoom = function (zoom) {
        if (this.tileMap !== undefined) {
            this.tileMap.zoom(zoom);
        }
        this.tileMap.update();
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].zoom(zoom);
        }
        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].zoom(zoom);
        }
    };
    IsoLayer.prototype.scroll = function (deltaX, deltaY) {
        if (this.tileMap !== undefined) {
            this.tileMap.scroll(deltaX, deltaY);
        }
    };
    IsoLayer.prototype.rotate = function (degrees) {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].rotate(degrees);
        }
        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].rotate(degrees);
        }
    };
    IsoLayer.prototype.setZoomPoint = function (point) {
        if (this.tileMap !== undefined) {
            this.tileMap.setZoomPoint(point);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].zoomPoint.set(point.x, point.y);
        }
        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].zoomPoint.set(point.x, point.y);
        }
    };
    IsoLayer.prototype.setSpeed = function (speed) {
        if (this.tileMap !== undefined) {
            this.tileMap.setSpeed(speed);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].setSpeed(speed);
        }
        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].setSpeed(speed);
        }
    };
    IsoLayer.prototype.hide = function () {
        this.hidden = true;
        return this;
    };
    IsoLayer.prototype.show = function () {
        this.hidden = false;
        return this;
    };
    IsoLayer.prototype.isHidden = function () {
        return this.hidden;
    };
    return IsoLayer;
})();
