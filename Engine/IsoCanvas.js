"use strict";
var IsoCanvas = (function () {
    function IsoCanvas(Engine) {
        this.defaultOptions = {
            width: 640,
            height: 480,
            fullscreen: true
        };
        this.Engine = Engine;
    }
    IsoCanvas.prototype.create = function (id) {
        var _this = this;
        this.canvasElement = document.createElement("canvas");
        if (id === undefined) {
            id = "isoMetricCanvas";
        }
        this.canvasElement.id = id;
        this.options = this.defaultOptions;
        if (this.Engine.config.get("windowOptions") !== undefined) {
            this.options = this.Engine.config.get("windowOptions");
        }
        this.canvasElement.width = this.options.width;
        this.canvasElement.height = this.options.height;
        this.canvasElement.style.width = this.options.width + "px";
        this.canvasElement.style.height = this.options.height + "px";
        if (this.options.fullscreen === true) {
            this.canvasElement.width = window.innerWidth;
            this.canvasElement.height = window.innerHeight;
            this.canvasElement.style.width = window.innerWidth + "px";
            this.canvasElement.style.height = window.innerHeight + "px";
            window.onresize = window.onload = function () { return _this.updateScreen(); };
            this.canvasElement.style.overflow = "hidden";
        }
        if (document.body === null) {
            document.body = document.createElement("body");
        }
        document.body.appendChild(this.canvasElement);
        this.context = this.canvasElement.getContext("2d");
        new IsoEvent("IsoCanvasReady").trigger();
        return this;
    };
    IsoCanvas.prototype.set = function (canvas) {
        if (this.canvasElement !== undefined) {
            this.canvasElement.remove();
        }
        this.canvasElement = canvas;
        this.context = this.canvasElement.getContext("2d");
        new IsoEvent("IsoCanvasReady").trigger();
        return this;
    };
    IsoCanvas.prototype.setClass = function (cssClass) {
        this.canvasElement.className = cssClass;
    };
    IsoCanvas.prototype.updateScreen = function () {
        this.canvasElement.width = window.innerWidth;
        this.canvasElement.height = window.innerHeight;
        this.canvasElement.style.width = this.canvasElement.width + "px";
        this.canvasElement.style.height = this.canvasElement.height + "px";
        new IsoEvent("IsoCanvasUpdate").trigger();
        return this;
    };
    IsoCanvas.prototype.updateSize = function (width, height) {
        this.canvasElement.width = width;
        this.canvasElement.height = height;
        this.canvasElement.style.width = width + "px";
        this.canvasElement.style.height = height + "px";
        this.options.height = height;
        this.options.width = width;
    };
    IsoCanvas.prototype.clearScreen = function () {
        this.canvasElement.width = this.canvasElement.width;
        if (this.clearColor === undefined) {
            this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }
        else {
            this.context.fillStyle = this.clearColor;
            this.context.rect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.context.fill();
        }
        new IsoEvent("IsoCanvasClearScreen").trigger();
        return this;
    };
    IsoCanvas.prototype.get = function () {
        return this.canvasElement;
    };
    return IsoCanvas;
})();
