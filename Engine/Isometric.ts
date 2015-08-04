///<reference path="IsoConfig.ts" />
///<reference path="IsoCanvas.ts" />
///<reference path="IsoEvent.ts" />
///<reference path="IsoMap.ts" />
///<reference path="IsoRessourceManager.ts" />
// <reference path="IsoTileSet.ts" />
///<reference path="IsoLayers.ts" />
///<reference path="IsoOn.ts" />
///<reference path="IsoDrawer.ts" />
interface IsoCallback {
    eventType: string;
    callback: EventListener;
}
"use strict";
/**
 * The mainclass of IsoMetric and the starting point for the gameloop.
 * @class IsoMetric
 * @constructor 
 * 
 */
class IsoMetric extends IsoOn{
    /**
     * The configuration.
     */
    config: IsoConfig;
    /**
     * The canvas object
     */
    canvas: IsoCanvas;
    /** Includes all layers */
    layers: IsoLayers;
    /** The drawing lib. */
    drawer: IsoDrawer;
    /** The physics library */
    physics: IsoPhysicsManager;
    /** The animation library */
    animation: IsoAnimationManager;
    /** The input library */
    input: IsoInput;
    /** Handles all ressources of a project. */
    ressources: IsoRessourceManager;
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
    /** The default canvas configuration. */
    defaultWindowOptions: IIsoConfigWindowOptions = {
        fullscreen: true,
        width: window.innerWidth,
        height: window.innerHeight
    };
    /**  An inteval for the drawing and game loop */
    interval: Object;
    animationFrame: Object;
    /** Creates a new instance of IsoMetric */
    constructor(windowOptions?: Object) {
        super();
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
        this.frameCountInteral = setInterval(() => this.setFPS(), 1000);
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
        this.drawer.update();
    }
}