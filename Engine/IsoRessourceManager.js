///<reference path="IsoRessource.ts" />
///<reference path="IsoOn.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoRessourceManager = (function (_super) {
    __extends(IsoRessourceManager, _super);
    function IsoRessourceManager(Engine) {
        var _this = this;
        _super.call(this);
        this.ressources = new Array();
        this.numberAutoload = 0;
        this.autoloaded = 0;
        this.Engine = Engine;
        this.onEvent(IsoRessource.ISO_EVENT_RESSOURCE_LOADED, function (event) { return _this._onProgress(event); });
    }
    IsoRessourceManager.prototype.add = function (name, ressource) {
        this.ressources.push(new IsoRessource(name, ressource));
        this.numberAutoload++;
    };
    IsoRessourceManager.prototype.onBeforeLoad = function (callback) {
        this.__beforeLoad = callback;
    };
    IsoRessourceManager.prototype._onBeforeLoad = function () {
        if (typeof this.__beforeLoad === "function") {
            this.__beforeLoad.call(this);
        }
    };
    IsoRessourceManager.prototype.get = function (name) {
        for (var i = 0; i < this.ressources.length; i++) {
            if (this.ressources[i].name === name) {
                return this.ressources[i];
            }
        }
    };
    IsoRessourceManager.prototype.load = function () {
        for (var i = 0; i < this.ressources.length; i++) {
            this.ressources[i].load();
        }
        return this;
    };
    IsoRessourceManager.prototype.onProgress = function (callback) {
        this.__onProgress = callback;
    };
    IsoRessourceManager.prototype._onProgress = function (event) {
        this.autoloaded++;
        var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS);
        e.trigger();
        if (typeof this.__onProgress === "function") {
            this.__onProgress.call(this, event);
        }
        if (this.autoloaded === this.numberAutoload) {
            this._onProgressAll();
        }
        return this;
    };
    IsoRessourceManager.prototype._then = function () {
        if (typeof this.__then === "function") {
            this.__then.call(this.Engine);
        }
    };
    IsoRessourceManager.prototype.then = function (callback) {
        this.__then = callback;
        return this;
    };
    IsoRessourceManager.prototype._onProgressAll = function () {
        var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS_ALL);
        e.trigger();
        if (typeof this.__onProgressAll === "function") {
            this.__onProgressAll.call(this, event);
        }
        this._then();
    };
    IsoRessourceManager.prototype.onProgressAll = function (callback) {
        this.__onProgressAll = callback;
    };
    return IsoRessourceManager;
})(IsoOn);
