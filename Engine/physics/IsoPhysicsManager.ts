/// <reference path="../core/IsoObject.ts" />
/// <reference path="../typings/matterJs.d.ts" />
/** 
 * This class is a bridge to the javascript physics engine 'MatterJs'.
 * Matter.js is licensed under The MIT License (MIT) 
 * Copyright (c) 2014 Liam Brummitt
 * https://github.com/liabru/matter-js/
 */
class IsoPhysicsManager extends IsoObject {
    physicsEngine: Matter.Engine = null;

    turnedOn: boolean = false;

    constructor() {
        super();
    }

    create() {
        try {
            this.turnedOn = true;
            this.physicsEngine = Matter.Engine.create();
        } catch (e) {
            this.log("I have problems with the physics. I can not find Matter.js. You need to bind in it by yourself. :(", IsoLogger.WARN);
            this.log("You can find information about Matter.js here: https://github.com/liabru/matter-js", IsoLogger.INFO);
            this.log("The library is located in the directory 'external/matterJs'.", IsoLogger.INFO);
        }
    }

    turnOn() {
        this.turnedOn = true;
    }

    turnOff() {
        this.turnedOn = false;
        this.physicsEngine = null;
    }

    isTurnedOn(): boolean {
        return this.turnedOn;
    }
}