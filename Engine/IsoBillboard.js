"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoBillboard = (function (_super) {
    __extends(IsoBillboard, _super);
    function IsoBillboard() {
        _super.apply(this, arguments);
        this.repeat = IsoBillboard.NOREPEAT;
    }
    IsoBillboard.prototype.setRepeat = function (repeat) {
        this.repeat = repeat;
        return this;
    };
    IsoBillboard.REPEATX = "repeatx";
    IsoBillboard.REPEATY = "repeaty";
    IsoBillboard.REPEAT = "repeat";
    IsoBillboard.NOREPEAT = "norepeat";
    return IsoBillboard;
})(IsoObject);
