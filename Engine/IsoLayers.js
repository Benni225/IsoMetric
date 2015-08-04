///<reference path="IsoLayer.ts" />
"use strict";
var IsoLayers = (function () {
    function IsoLayers(Engine) {
        this.layers = new Array();
        this.Engine = Engine;
    }
    IsoLayers.prototype.add = function (name, index) {
        this.length++;
        if (index === undefined) {
            index = this.length - 1;
        }
        var l = new IsoLayer(this.Engine, index, name);
        this.layers.push(l);
        return l;
    };
    IsoLayers.prototype.get = function (name) {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].name === name) {
                return this.layers[i];
            }
        }
    };
    IsoLayers.prototype.sort = function () {
        this.layers.sort(this._sort);
    };
    IsoLayers.prototype._sort = function (layerA, layerB) {
        if (layerA.index > layerB.index) {
            return 1;
        }
        else if (layerA.index < layerB.index) {
            return -1;
        }
        else {
            return 0;
        }
    };
    IsoLayers.prototype.getByIndex = function (index) {
        return this.layers[index];
    };
    return IsoLayers;
})();
