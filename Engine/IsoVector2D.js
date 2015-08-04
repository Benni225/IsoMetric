"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoVector2D = (function (_super) {
    __extends(IsoVector2D, _super);
    function IsoVector2D(x, y) {
        _super.call(this, x, y);
    }
    IsoVector2D.prototype.getDistance = function (vec) {
        return Math.sqrt(((this.x - vec.x) * (this.x - vec.x)) + ((this.y - vec.y) * (this.y - vec.y)));
    };
    IsoVector2D.prototype.getMagnitude = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    IsoVector2D.prototype.getAngle = function () {
        return Math.atan2(this.y, this.x);
    };
    IsoVector2D.prototype.createFromAngle = function (angle, length) {
        this.x = length * Math.cos(angle);
        this.y = length * Math.sin(angle);
    };
    IsoVector2D.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };
    return IsoVector2D;
})(IsoPoint);
