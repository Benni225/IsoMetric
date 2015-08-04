var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="IsoConfig.ts" />
///<reference path="IsoCanvas.ts" />
///<reference path="IsoEvent.ts" />
///<reference path="IsoMap.ts" />
///<reference path="IsoRessourceManager.ts" />
///<reference path="IsoLayers.ts" />
///<reference path="IsoOn.ts" />
///<reference path="IsoDrawer.ts" />
"use strict";
var IsoMetric = (function (_super) {
    __extends(IsoMetric, _super);
    function IsoMetric(windowOptions) {
        var _this = this;
        _super.call(this);
        this.frameCount = 0;
        this.FPS = 0;
        this.defaultWindowOptions = {
            fullscreen: true,
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.config = new IsoConfig(this);
        this.canvas = new IsoCanvas(this);
        this.layers = new IsoLayers(this);
        this.input = new IsoInput(this);
        this.animation = new IsoAnimationManager();
        this.ressources = new IsoRessourceManager(this);
        this.physics = new IsoPhysicsManager();
        if (windowOptions === undefined) {
            windowOptions = this.defaultWindowOptions;
        }
        this.config.set("windowOptions", windowOptions);
        this.canvas.create();
        this.drawer = new IsoDrawer(this);
        this.frameCountInteral = setInterval(function () { return _this.setFPS(); }, 1000);
    }
    IsoMetric.prototype.setFPS = function () {
        this.FPS = this.frameCount;
        this.frameCount = 0;
    };
    IsoMetric.prototype.startLoop = function () {
        this.update();
    };
    IsoMetric.prototype.endLoop = function () {
        var endLoop = new Date();
        this.frameTime = (endLoop.getMilliseconds() - this.startLoopTime.getMilliseconds());
        this.frameCount = this.frameCount + 1;
    };
    IsoMetric.prototype.update = function () {
        this.startLoopTime = new Date();
        this.drawer.update();
    };
    return IsoMetric;
})(IsoOn);
