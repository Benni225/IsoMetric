"use strict";
///<reference path="IsoBlendingModes.ts" />
interface IsoOffset {
    x: number;
    y: number;
}

interface IsoAnchor {
    x: number;
    y: number;
}

interface IsoScroll {
    x: number;
    y: number;
}

interface IsoVelocity {
    x: number;
    y: number;
}

interface IsoDimension {
    width: number;
    height: number;
}

interface IsoPoint {
    x: number;
    y: number;
}

interface IsoCoords {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface IsoScale {
    factorX: number;
    factorY: number;
}

class IsoObject {
    static BOX_COLLISION: string = "box";
    static PIXEL_COLLISION: string = "pixel";
    /** The position of the object */
    position: IsoPoint = { x: 0, y: 0 };
    /** The scroll-position of the object */
    scrollPosition: IsoScroll = { x: 0, y: 0 };
    /** An offset relative to the position */
    offset: IsoOffset = { x: 0, y: 0 };
    /** The original width */
    width: number;
    /** The original height */
    height: number;
    /** The scale of an object given as a factor */
    scale: IsoScale = { factorX: 1, factorY: 1 };
    /** The zooming level of an object */
    zoomLevel: number = 1;
    /** By using the method zoom, this factor controls the zooming level */
    zoomStrength: number = 1 / 1000;
    /** A point on the screen where zoomed to */
    zoomPoint: IsoPoint = { x: 0, y: 0 };
    /** Rotation in degrees */
    rotation: number = 0;
    /** The image ressource of the object */
    image: IsoRessource;
    /** The collsion type of the object */
    collisionType: string = "box";
    /** If the object has the collisiontype "pixel" this property controls the accuracy of the collision. */
    collisionResolution: number = 0;
    /** When moving this factor controls the speed of moving */
    speed: number = 1;
    /** Name of the object */
    name: string;
    /** An instance of IsoMetric */
    Engine: IsoMetric;
    /** The anchor of the object for rotation */
    anchor: IsoAnchor = { x: 0, y: 0 };
    /** The blending mode. See IsoBlendingModes */
    blendingMode: string = IsoBlendingModes.NORMAL;
    /** The alpha of the object */
    alpha: number = 1;
    /** If hidden is true, the object will not be drawn. */
    hidden: boolean = false;
    /** Optional additional properties */
    properties: Object = {};
    /** Mass of the object for physics */
    mass: number = 0;
    /** Controls the friction when moving */
    friction: number = 1;
    /** Controls the velocity when moving */
    velocity: IsoVelocity = { x: 0, y: 0 };
    /** The rigidbody of the object */
    rigidBody: IsoCoords;
    /** Creates a new object */
    constructor(Engine, image: IsoRessource, name?: string) {
        this.Engine = Engine;
        try {
            this.setImage(image);
            this.setWidth(image.image.width);
            this.setHeight(image.image.height);
            if (name !== undefined) {
                this.setName(name);
            }
            this.rigidBody = {
                x: 0,
                y: 0,
                width: image.image.width,
                height: image.image.height
            };
            return this;
        } catch (e) {
            throw ("Can not create object with error message: " + e);
        }
    }
    /** Adds an animation. The animation will animate a given attribute of the object. */
    addAnimation(name: string, attribute: string, endValue: number, duration: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()) {
        this.Engine.animation.addAnimation(name, this, attribute, endValue, duration, easing, type, callbacks);
        return this;
    }
    /** Checks if the object collides with an another given object. */
    collide(object: IsoObject): boolean {
        if (this.collisionType === IsoObject.BOX_COLLISION) {
            if (object.collisionType === IsoObject.BOX_COLLISION) {
                return this.isBoxCollision(object.getCoords(), this.getCoords());
            } else if (object.collisionType === IsoObject.PIXEL_COLLISION) {
                return this.isPixelBoxCollision(object, this.getCoords());
            }
        } else if (this.collisionType === IsoObject.PIXEL_COLLISION) {
            if (object.collisionType === IsoObject.BOX_COLLISION) {
                return this.isPixelBoxCollision(this, object.getCoords());
            } else if (object.collisionType === IsoObject.PIXEL_COLLISION) {
                return this.isPixelCollision(object, this);
            }
        }
    }
    /** Get the position of the object on the screen. */
    getCoords(): IsoCoords {
        var r = this.getRenderDetails();
        return {
            x: r.position.x,
            y: r.position.y,
            width: r.renderSize.width,
            height: r.renderSize.height
        };
    }
    /** Gets the offset of the object */
    getOffset(): IsoOffset {
        return this.offset;
    }
    /** Gets the original dimension of the object. */
    getOriginalDimension(): IsoDimension {
        return {
            width: this.width,
            height: this.height
        };
    }
    /** Gets the originall height of the object */
    getOriginalHeight(): number {
        return this.height;
    }
    /** Gets the original width of the obect */
    getOriginalWidth(): number {
        return this.image.image.width;
    }
    /** Gets the position value. Its not equal to the position on the screen. */
    getPosition(): IsoPoint {
        return this.position;
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
    getAbsolutePosition(): IsoPoint {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return {
            x: x,
            y: y
        };
    }
    /** Gets the dimension of the object on the screen. */
    getAbsoluteDimension(): IsoDimension {
        return {
            width: this.getOriginalDimension().width * this.zoomLevel * this.scale.factorX,
            height: this.getOriginalDimension().height * this.zoomLevel * this.scale.factorY
        };
    }
    /** Gets all important information for rendering an object. */
    getRenderDetails() {
        var fx = this.anchor.x / this.width,
            fy = this.anchor.y / this.height
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.getOriginalDimension(),
            renderSize: this.getAbsoluteDimension(),
            anchor: { x: (this.position.x + (this.width * this.zoomLevel * fx * this.scale.factorX)), y: (this.position.y + (this.height * this.zoomLevel * fy * this.scale.factorY)) },
            image: this.image.image.get(),
            offset: this.getOffset(),
            zoomLevel: this.zoomLevel
        };
    }
    /** Gets the rotation of an object in dregrees. */
    getRotation(): number {
        return this.rotation;
    }
    /** Checks the collision of two object with collision type "box". */
    isBoxCollision(coordsSource: IsoCoords, coordsTarget: IsoCoords): boolean {
        if (
            (coordsSource.x < coordsTarget.x && coordsSource.x + coordsSource.width > coordsTarget.x || coordsSource.x < coordsTarget.x + coordsTarget.width && coordsSource.x + coordsSource.width > coordsTarget.x) &&
            (coordsSource.y < coordsTarget.y + coordsTarget.height && coordsSource.y + coordsSource.height > coordsTarget.y)
            ) {
            return true;
        } else {
            return false;
        }
    }

    /** @todo implement pixel-box-collision */
    isPixelBoxCollision(sourceObject: IsoObject, targetCoords: IsoCoords): boolean {
        return false;
    }

    /** @todo implement pixel-collision */
    isPixelCollision(sourceObject: IsoObject, targetObject: IsoObject): boolean {
        return false;
    }
    /** Move an object relative to the current position. */
    move(deltaX: number, deltaY: number): IsoObject {
        this.velocity.x += deltaX;
        this.velocity.y += deltaY;
        if (this.velocity.x > this.speed) {
            this.velocity.x = this.speed;
        }
        if (this.velocity.x < -this.speed) {
            this.velocity.x = - this.speed;
        }
        if (this.mass === 0) {
            if (this.velocity.y > this.speed) {
                this.velocity.y = this.speed;
            }
            if (this.velocity.y < -this.speed) {
                this.velocity.y = - this.speed;
            }
        }
        return this;
    }
    /** Rotates an object relative to the current rotation. */
    rotate(degrees: number): IsoObject {
        this.rotation = this.rotation + degrees;
        return this;
    }
    /** Set the scrolling position relative to the current scroll position. */
    scroll(deltaX: number, deltaY: number): IsoObject {
        this.scrollPosition.x = this.scrollPosition.x + (deltaX * this.speed);
        this.scrollPosition.y = this.scrollPosition.y + (deltaY * this.speed);
        return this;
    }
    /** Sets the alpha of an object. */
    setAlpha(alpha: number): IsoObject {
        this.alpha = alpha;
        return this;
    }
    /** Sets the anchor of an object. */
    setAnchor(x: number, y: number): IsoObject {
        this.anchor = { x: x, y: y };
        return this;
    }
    /** Sets the blending mode. See IsoBlending. */
    setBlendingMode(blendingMode: string): IsoObject {
        this.blendingMode = blendingMode;
        return this;
    }
    /** Sets the width. */
    private setHeight(height: number): IsoObject {
        this.height = height;
        return this;
    }
    /** sets the image-ressource */
    setImage(image: IsoRessource): IsoObject {
        this.image = image;
        return this;
    }
    /** Sets the friction of an object. */
    setFriction(friction: number): IsoObject {
        this.friction = friction;
        return this;
    }
    /** Sets the name of an object. */
    setName(name: string): IsoObject {
        this.name = name;
        return this;
    }
    /** Sets the offset of an object. */
    setOffset(offsetX: number, offsetY: number): IsoObject {
        this.offset.x = offsetX;
        this.offset.y = offsetY;
        return this;
    }
    /** Sets the position of an object. */
    setPosition(position: IsoPoint): IsoObject {
        this.position.x = position.x;
        this.position.y = position.y;
        return this;
    }
    /** Sets an additional property. */
    setProperty(name: string, value: any): IsoObject {
        this.properties[name] = value;
        return this;
    }
    /** Sets all properties. */
    setProperties(properties: Object): IsoObject {
        this.properties = properties;
        return this;
    }
    /** Sets the rotation of an object in degrees. */
    setRotation(degrees: number): IsoObject {
        this.rotation = degrees;
        return this;
    }
    /** Sets the scale of an object. */
    setScale(factorX: number, factorY: number): IsoObject {
        this.scale.factorX = factorX;
        this.scale.factorY = factorY;
        return this;
    }
    /** Sets the scroll-position. */
    setScroll(x: number, y: number) : IsoObject {
        this.scrollPosition.x = x;
        this.scrollPosition.y = y;
        return this;
    }
    /** Sets the width and height of an object. */
    private setSize(width: number, height: number): IsoObject {
        this.width = width;
        this.height = height;
        return this;
    }
    /** Sets the speed for moving of an object. */
    setSpeed(speed: number): IsoObject {
        this.speed = speed;
        return this;
    }
    /** Sets the width of an object. */
    private setWidth(width: number): IsoObject {
        this.width = width;
        return this;
    }
    /** Sets the zooming-point of an object on the screen where zoomed to. */
    setZoomPoint(position: IsoPoint) : IsoObject {
        this.zoomPoint = position;
        return this;
    }
    /** Sets the absolute zooming-level. */
    setZoomLevel(zoomLevel: number): IsoObject {
        this.zoomLevel = zoomLevel;
        return this;
    }
    /** Sets the strength of zooming, when using the method IsoObject.zoom */
    setZoomStrength(zoomStrength: number): IsoObject {
        this.zoomStrength = this.zoomStrength / 1000;
        return this;
    }
    /** Calculate the zoom level */
    zoom(zoom: number): IsoObject {
        this.setZoomLevel(this.zoomLevel + (zoom * this.zoomStrength));
        return this;
    }
    /** Plays an animation. */
    play(name: string): IsoObject {
        this.Engine.animation.play(name, this);
        return this;
    }
    /** Stops an animation. */
    stop(name): IsoObject {
        this.Engine.animation.stop(name, this);
        return this;
    }
    /** Resumes an animation. */
    resume(name: string): IsoObject {
        this.Engine.animation.resume(name, this);
        return this;
    }
    /** Pause an animation. */
    pause(name: string): IsoObject {
        this.Engine.animation.pause(name, this);
        return this;
    }
    /** Calculat the new position. */
    updatePosition() {
        this.velocity.x *= this.friction;
        if (this.mass === 0) {
            this.velocity.y *= this.friction;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rigidBody = this.getCoords();
        
    }
    /** Gets all tiles of a given tilemap where the object collides with. */
    getCollidingTiles(tilemap: IsoTileMap): Array<IsoTile> {
        var collisionBody = this.rigidBody;
        if (collisionBody === undefined) {
            collisionBody = {
                x: 0,
                y: 0,
                width: this.width,
                height: this.height
            };
        }

        return tilemap.getTilesInRadius(
            this.position.x + collisionBody.x,
            this.position.y + collisionBody.y,
            collisionBody.width,
            collisionBody.height
        );
    }
} 