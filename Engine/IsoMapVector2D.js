"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoMapVector2D = (function (_super) {
    __extends(IsoMapVector2D, _super);
    function IsoMapVector2D(row, column) {
        _super.call(this, row, column);
    }
    IsoMapVector2D.prototype.getDistance = function (vec) {
        return Math.sqrt(((this.column - vec.column) * (this.column - vec.column)) + ((this.row - vec.row) * (this.row - vec.row)));
    };
    return IsoMapVector2D;
})(IsoMapPoint);
