"use strict";
///<reference path="include.ts" />
/** 
 * IsoMetric is the main class. It includes all needed references and libs.
 */
class IsoMetric extends IsoObject {
    static self: IsoMetric;
    /** The main canvas element. */
    canvas: IsoCanvas;
    /** The drawing library. */
    drawer: IsoDrawer;
    /** The configuration. */
    config: IsoConfig;
    /** The input library. */
    input: IsoInput;
    /** Includes all layers */
    layers: IsoLayerManager;
    /** Includes all physics objects. */
    physics: IsoPhysicsManager;
    /** Handles all ressources of a project. */
    resources: IsoResourceManager;
    /** The time one frames needs to drawn. */
    frameTime: number;
    /** A counter for frames */
    frameCount: number = 0;
    /** An inteval for reseting the FPS */
    frameCountInteral: any;
    /** The time in milliseconds at the begin of a loop. */
    startLoopTime: Date;
    /** The frames per second */
    FPS: number = 0;
    /** Optimal FPS. */
    optimalFPS = 60;
    /** The default canvas configuration. */
    defaultWindowOptions = {
        fullscreen: true,
        width: window.innerWidth,
        height: window.innerHeight
    };
    /**  An inteval for the drawing and game loop */
    interval: Object;
    animationFrame: Object;
    constructor(config: IsoConfig) {
        super();
        try {
            this.log("Initialize IsoMetric.", IsoLogger.INFO);
            IsoMetric.self = this;
            this.config = config;
            if (!this.config.has("windowOptions")) {
                this.log("Could not find any options for the window. The window configuration is default, now.", IsoLogger.INFO);
                this.config.setProperty("windowOptions", this.defaultWindowOptions);
            }
            this.canvas = new IsoCanvas(this.config.get("windowOptions").width, this.config.get("windowOptions").height, this.config.get("windowOptions")["fullscreen"], this.config.get("windowOptions")["autoResize"]);
            this.drawer = new IsoDrawer();
            this.input = new IsoInput();          
            this.canvas.load();
            this.canvas.append(document.querySelector("body"));
            this.resources = new IsoResourceManager();
            this.layers = new IsoLayerManager();
            this.physics = new IsoPhysicsManager();
            this.frameCountInteral = setInterval(() => this.setFPS(), 1000);

            this.log("Finished the initialization of IsoMetric.", IsoLogger.INFO);
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Reset and set the FPS */
    setFPS() {
        this.FPS = this.frameCount;
        this.frameCount = 0;
    }
    /** Starts the game- and drawing-loop. */
    startLoop() {
        this.update();
    }
    /** Sets the FPS after the drawing-loop completed. */
    endLoop() {
        var endLoop = new Date();
        this.frameTime = (endLoop.getMilliseconds() - this.startLoopTime.getMilliseconds());
        this.frameCount = this.frameCount + 1;
    }
    /** The game- and drawing-loop. */
    update() {
        this.startLoopTime = new Date();
        this.drawer.update(this.layers);
    }
}