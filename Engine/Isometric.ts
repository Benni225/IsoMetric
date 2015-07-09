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
class IsoMetric {
    /**
     * @property config
     * The configuration.
     * @type {IsoConfig}
     */
    config: IsoConfig;
    /**
     * @property canvas
     * @type {IsoCanvas} 
     * The canvas object
     */
    canvas: IsoCanvas;
    /**
    * @property layers
     * @description All layers of the actual game
     * @type {IsoLayers}
     */
     layers: IsoLayers;
    /**
     * @property drawer
     * @type {IsoDrawer}  
     * The drawing lib.
     */
     drawer: IsoDrawer;
    /**
     * @property physics
     * @type {IsoPhysicsManager}
     */
     physics: IsoPhysicsManager;
    /**
     * @property animation
     * @type {IsoAnimationManager}
     */
     animation: IsoAnimationManager;
    /**
     * @property input
     * @type {IsoInput} 
     */
     input: IsoInput;
    /** 
     * Handles all ressources of a project.
     * @property ressource 
     * @type {IsoRessourceManager} 
     * @see IsoRessourceManager
     */
     ressources: IsoRessourceManager;
    /**
     * The time one frames needs to draw.
     * @property frameTime
     * @type {number}  
     */
    frameTime: number;
    /**
     * A counter for frames.
     * @property frameCount
     * @type {number}
     * @default 0   
     */
    frameCount: number = 0;
    /**
     * An inteval for reseting the FPS
     * @property frameCountInterval
     * @type {any}   
     */
    frameCountInteral: any;
    /**
     * The time in milliseconds at the begin of a loop.
     * @property startLoopTime
     * @type {Date}  
     */
    startLoopTime: Date;
    /**
     * The frames per second
     * @property FPS
     * @type {number}
     * @default 0   
     */
    FPS: number = 0;
    /**
     * @property on
     * @type {IsoOn}
     */
    on: IsoOn;
    /**
     * The default canvas configuration.
     * @property defaultWIndowOptions
     * @type {IIsoConfigWindowOptions}
     * @default {fullscreen: true, width: window.innerWidth, height: window.innerHeight}
     */
    defaultWindowOptions: IIsoConfigWindowOptions = {
        fullscreen: true,
        width: window.innerWidth,
        height: window.innerHeight
    };
    /**
     * An inteval for the drawing and game loop
     * @property interval
     * @type {Object} 
     */
    interval: Object;
    /**
     * @property animationFrame
     * @type {Object} 
     */
    animationFrame: Object;
    /**
     * Creates a new instance of IsoMetric
     * @method constructor
     * @param {object} [windowOptions] The canvas configuration.
     */
    constructor(windowOptions?: Object) {
        this.config = new IsoConfig(this);
        this.canvas = new IsoCanvas(this);
        this.layers = new IsoLayers(this);
        this.input = new IsoInput(this);
        this.animation = new IsoAnimationManager();
        this.on = new IsoOn();
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
    /**
     * Reset and set the FPS
     * @method setFPS 
     */
    setFPS() {
        this.FPS = this.frameCount;
        this.frameCount = 0;
    }
    /**
     * Starts the game- and drawing-loop.
     * @method startLoop 
     */
    startLoop() {
        this.update();
    }
    /**
     * Sets the FPS after the drawing-loop completed.
     * @method endLoop
     */
    endLoop() {
        var endLoop = new Date();
        this.frameTime = (endLoop.getMilliseconds() - this.startLoopTime.getMilliseconds());
        this.frameCount = this.frameCount + 1;
    }
    /**
     * The game- and drawing-loop.
     * @method update() 
     */
    update() {
        this.startLoopTime = new Date();
        this.drawer.update();
    }
}