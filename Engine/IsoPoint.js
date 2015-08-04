"use strict";
var IsoPoint = (function () {
    function IsoPoint(x, y) {
        if (x !== undefined) {
            this.x = x;
        }
        if (y !== undefined) {
            this.y = y;
        }
    }
    IsoPoint.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    IsoPoint.prototype.get = function () {
        return this;
    };
    return IsoPoint;
})();
