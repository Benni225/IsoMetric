"use strict";
class IsoCanvas {
    private canvasElement: HTMLCanvasElement;
    context: any;
    private defaultOptions: IIsoConfigWindowOptions = {
        width: 640,
        height: 480,
        fullscreen: true
    };
    options: IIsoConfigWindowOptions;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
    }

    create(id?: string) : IsoCanvas {
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
        if (this.options.fullscreen === true) {
            this.canvasElement.width = window.innerWidth;
            this.canvasElement.height = window.innerHeight;
            window.onresize = window.onload = () => this.updateScreen();
        }

        document.body.appendChild(this.canvasElement);

        this.context = this.canvasElement.getContext("2d");
        new IsoEvent("IsoCanvasReady").trigger();
        return this;
    }

    set(canvas: HTMLCanvasElement) {
        this.canvasElement = canvas;
        this.context = this.canvasElement.getContext("2d");
        new IsoEvent("IsoCanvasReady").trigger();
        return this;
    }

    updateScreen() : IsoCanvas {
        this.canvasElement.width = window.innerWidth;
        this.canvasElement.height = window.innerWidth;
        new IsoEvent("IsoCanvasUpdate").trigger();
        return this;
    }

    clearScreen() : IsoCanvas {
        /**
         * @todo: 
         * Finding a better solution for redraw the canvas.
         */
        this.canvasElement.width = this.canvasElement.width;
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        //console.log(this.canvasElement.width + " x " + this.canvasElement.height)

        new IsoEvent("IsoCanvasClearScreen").trigger();
        return this;
    }

    get() : HTMLCanvasElement {
        return this.canvasElement;
    }
} 