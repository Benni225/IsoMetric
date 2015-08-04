///<reference path="IsoOn.ts" />
class IsoMinimalObject extends IsoOn {
    Engine: IsoMetric;
    /** The position of the object */
    position: IsoVector2D = new IsoVector2D(0, 0);
    /** The scroll-position of the object */
    scrollPosition: IsoVector2D = new IsoVector2D(0, 0);
    /** An offset relative to the position */
    offset: IsoPoint = new IsoPoint(0, 0);
    /** The scale of an object given as a factor */
    scale: IsoScale = { factorX: 1, factorY: 1 };
    /** The zooming level of an object */
    zoomLevel: number = 1;
    /** By using the method zoom, this factor controls the zooming level */
    zoomStrength: number = 1 / 1000;
    /** A point on the screen where zoomed to */
    zoomPoint: IsoVector2D = new IsoVector2D(0, 0);
    /** Rotation in degrees */
    rotation: number = 0;
    /** When moving this factor controls the speed of moving */
    speed: number = 1;
    /** Name of the object */
    name: string;
    /** The anchor of the object for rotation */
    anchor: IsoPoint = new IsoPoint(0, 0);
    /** The blending mode. See IsoBlendingModes */
    blendingMode: string = IsoBlendingModes.NORMAL;
    /** The alpha of the object */
    alpha: number = 1;
    /** If hidden is true, the object will not be drawn. */
    hidden: boolean = false;
    /** Optional additional properties */
    properties: Object = {};
    /** The friction of the object */
    friction: number = 1;
    /** The velocity when moving an object. */
    velocity: IsoVector2D = new IsoVector2D(0, 0);

    constructor(Engine: IsoMetric) {
        super();
        this.Engine = Engine;
    }

    /** Adds an animation. The animation will animate a given attribute of the object. */
    addAnimation(name: string, attribute: string, endValue: number, duration: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()): IsoMinimalObject {
        this.Engine.animation.addAnimation(name, this, attribute, endValue, duration, easing, type, callbacks);
        return this;
    }
    /** Gets an animation */
    getAnimation(name: string): IsoAnimation {
        return this.Engine.animation.get(name, this);
    }
    /** Adds a new playlist. The playlist includes animations which animates the attributes of an object.*/
    addPlaylist(name: string, animations: Array<IsoAnimation>): IsoMinimalObject {
        this.Engine.animation.addPlaylist(name, this, animations);
        return this;
    }
    /** Gets one of the additional properties. */
    getProperty(name: string): any {
        return this.properties[name];
    }
    /** Gets all the additional properties. */
    getProperties(): Object {
        return this.properties;
    }
    /** Gets the position on the screen. */
    getAbsolutePosition(): IsoVector2D {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    }
    /** Gets the rotation of an object in dregrees. */
    getRotation(): number {
        return this.rotation;
    }
    /** Move an object relative to the current position. */
    move(deltaX: number, deltaY: number): IsoMinimalObject {
        this.velocity.x += deltaX;
        this.velocity.y += deltaY;
        if (this.velocity.x > this.speed) {
            this.velocity.x = this.speed;
        }
        if (this.velocity.x < -this.speed) {
            this.velocity.x = - this.speed;
        }

        if (this.velocity.y > this.speed) {
            this.velocity.y = this.speed;
        }
        if (this.velocity.y < -this.speed) {
            this.velocity.y = - this.speed;
        }
        return this;
    }
    /** Rotates an object relative to the current rotation. */
    rotate(degrees: number): IsoMinimalObject {
        this.rotation = this.rotation + degrees;
        return this;
    }
    /** Set the scrolling position relative to the current scroll position. */
    scroll(deltaX: number, deltaY: number): IsoMinimalObject {
        this.scrollPosition.set(
            this.scrollPosition.x + (deltaX * this.speed),
            this.scrollPosition.y + (deltaY * this.speed));
        return this;
    }
    /** Sets the alpha of an object. */
    setAlpha(alpha: number): IsoMinimalObject {
        this.alpha = alpha;
        return this;
    }
    /** Sets the blending mode. See IsoBlending. */
    setBlendingMode(blendingMode: string): IsoMinimalObject {
        this.blendingMode = blendingMode;
        return this;
    }
    /** Sets the name of an object. */
    setName(name: string): IsoMinimalObject {
        this.name = name;
        return this;
    }
    /** Sets an additional property. */
    setProperty(name: string, value: any): IsoMinimalObject {
        this.properties[name] = value;
        return this;
    }
    /** Sets all properties. */
    setProperties(properties: Object): IsoMinimalObject {
        this.properties = properties;
        return this;
    }
    /** Sets the rotation of an object in degrees. */
    setRotation(degrees: number): IsoMinimalObject {
        this.rotation = degrees;
        return this;
    }
    /** Sets the scale of an object. */
    setScale(factorX: number, factorY: number): IsoMinimalObject {
        this.scale.factorX = factorX;
        this.scale.factorY = factorY;
        return this;
    }
    /** Sets the speed for moving of an object. */
    setSpeed(speed: number): IsoMinimalObject {
        this.speed = speed;
        return this;
    }
    /** Sets the absolute zooming-level. */
    setZoomLevel(zoomLevel: number): IsoMinimalObject {
        this.zoomLevel = zoomLevel;
        return this;
    }
    /** Sets the strength of zooming, when using the method IsoObject.zoom */
    setZoomStrength(zoomStrength: number): IsoMinimalObject {
        this.zoomStrength = this.zoomStrength / 1000;
        return this;
    }
    /** Calculate the zoom level */
    zoom(zoom: number): IsoMinimalObject {
        this.setZoomLevel(this.zoomLevel + (zoom * this.zoomStrength));
        return this;
    }
    /** Plays an animation. */
    play(name: string): IsoMinimalObject {
        this.Engine.animation.play(name, this);
        return this;
    }
    /** Stops an animation. */
    stop(name): IsoMinimalObject {
        this.Engine.animation.stop(name, this);
        return this;
    }
    /** Resumes an animation. */
    resume(name: string): IsoMinimalObject {
        this.Engine.animation.resume(name, this);
        return this;
    }
    /** Pause an animation. */
    pause(name: string): IsoMinimalObject {
        this.Engine.animation.pause(name, this);
        return this;
    }
    /** Checks whether an animation is playing or not. */
    isPlaying(name: string): boolean {
        return this.Engine.animation.isPlaying(name, this);;
    }
    /** Sets the addition type of an animation: */
    setAdditionType(name: string, type: string) {
        this.Engine.animation.setAdditionType(name, this, type);
    }
    /** Calculat the new position. */
    updatePosition() {
        this.velocity.x *= this.friction;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}