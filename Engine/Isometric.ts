/**
 * IsoMetric
 * =========
 * IsoMetric is a small and simple tileengine. This software is a pre-alpha.
 */
///<reference path="IsoConfig.ts" />
///<reference path="IsoCanvas.ts" />
///<reference path="IsoEvent.ts" />
///<reference path="IsoMap.ts" />
///<reference path="IsoTileSet.ts" />
"use strict";
/**
 * The mainclass of IsoMetric and the starting point for the gameloop.
 */
class IsoMetric {
    static FRONT: number = 1;
    static RIGHT: number = 3;
    static BACK: number = 4;
    static LEFT: number = 2;
    /**
     * The configuration.
     * @see IsoConfig
     */
    config: IsoConfig;
    /**
     * The canvas object
     * @see IsoCanvas
     */
    canvas: IsoCanvas;
    /**
     * All layers of the actual game
     * @see IsoLayers
     */
    layers: IsoLayers;
    /**
     * @Todo:
     * Maybe deprecated
     */
    tileSets: IsoTileSets;
    /**
     * The drawing lib.
     * @see IsoDrawer
     */
    drawer: IsoDrawer;
    /**
     * The input library.
     * @see IsoInput
     */
    input: IsoInput;
    /**
     * [deprecated] The global direction of all layers.
     */
    direction: number;
    /**
     * The time one frames needs to draw.
     */
    frameTime: number;
    /**
     * A counter for frames.
     */
    frameCount: number = 0;
    /**
     * An inteval for reseting the FPS
     */
    frameCountInteral: any;
    /**
     * The time in milliseconds at the begin of a loop.
     */
    startLoopTime: Date;
    /**
     * The frames per second
     */
    FPS: number = 0;
    /**
     * The default canvas configuration.
     */
    defaultWindowOptions: IIsoConfigWindowOptions = {
        fullscreen: true,
        width: window.innerWidth,
        height: window.innerHeight
    };
    /**
     * An inteval for the drawing and game loop
     */
    interval: Object;
    /**
     * 
     */
    animationFrame: Object;
    /**
     * Creates a new instance of IsoMetric
     * @param windowOptions (optional) The canvas configuration.
     */
    constructor(windowOptions?: Object) {
        this.config = new IsoConfig(this);
        this.canvas = new IsoCanvas(this);
        this.layers = new IsoLayers(this);
        this.input = new IsoInput(this);
        this.tileSets = new IsoTileSets(this);
        this.drawer = new IsoDrawer(this);

        if (windowOptions === undefined) {
            windowOptions = this.defaultWindowOptions;
        }
        this.config.set("windowOptions", windowOptions);

        this.canvas.create();
        this.frameCountInteral = setInterval(() => this.setFPS(), 1000);
    }
    /**
     * Reset and set the FPS
     */
    setFPS() {
        this.FPS = this.frameCount;
        this.frameCount = 0;
    }
    /**
     * Starts the game- and drawing-loop.
     */
    startLoop() {
        this.animationFrame = window.requestAnimationFrame || null;
        if (this.animationFrame === null) {
            this.interval = setInterval(() => this.update(), 1000.0 / 60.0);
        } else {
            this.update();
        }
    }
    /**
     * The game- and drawing-loop.
     */
    update() {
        this.startLoopTime = new Date();
        this.drawer.draw();
        if (this.animationFrame !== null) {
            requestAnimationFrame(() => this.update());
        }
    }
    /**
     * [deprecated] Sets the global direction.
     */
    setDirection(direction: number) {
        this.direction = direction;
    }
}