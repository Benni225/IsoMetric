///<reference path="IsoImage.ts" />
///<reference path="IsoOn.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
;
var IsoRessource = (function (_super) {
    __extends(IsoRessource, _super);
    function IsoRessource(name, ressource) {
        _super.call(this);
        this.loaded = false;
        this.name = name;
        this.ressource = ressource;
        this.type = this.ressource.type;
    }
    IsoRessource.prototype.load = function () {
        var _this = this;
        this.ressource.on("load", function () { return _this.onload(); });
        this.ressource.load();
    };
    IsoRessource.prototype.onload = function () {
        this.loaded = true;
        this.fire(IsoRessource.ISO_EVENT_RESSOURCE_LOADED, this);
    };
    IsoRessource.prototype.get = function () {
        return this.ressource.get();
    };
    IsoRessource.ISO_EVENT_RESSOURCE_LOADED = "ISO_EVENT_RESSOURCE_LOADED";
    IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS = "ISO_EVENT_RESSOURCE_PROGRESS";
    IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS_ALL = "ISO_EVENT_RESSOURCE_PROGRESS_ALL";
    IsoRessource.IMAGE = "image";
    IsoRessource.AUDIO = "audio";
    IsoRessource.SHAPE = "SHAPE";
    return IsoRessource;
})(IsoOn);
