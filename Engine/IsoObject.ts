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

class IsoObject {
    static BOX_COLLISION: string = "box";
    static PIXEL_COLLISION: string = "pixel";
    position: IsoPoint = {x: 0, y: 0};
    scrollPosition: IsoScroll = {x: 0, y: 0 };
    offset: IsoOffset = {x: 0, y: 0};
    width: number;
    height: number;
    zoomLevel: number = 1;
    zoomStrength: number = 1 / 1000;
    zoomPoint: IsoPoint = { x: 0, y: 0 };
    /**
     * Rotation in degrees
     */
    rotation: number = 0;
    image: IsoRessource;
    collisionType: string = "box";
    collisionResolution: number = 0;
    speed: number = 1;
    name: string;
    Engine: IsoMetric;
    anchor: IsoAnchor = { x: 0, y: 0 };
    blendingMode: string = IsoBlendingModes.NORMAL;
    alpha: number = 1;
    hidden: boolean = false;
    properties: Object = {};
    mass: number = 0;
    friction: number = 1;
    velocity: IsoVelocity = { x: 0, y: 0 };
    rigidBody: IsoCoords;
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

    addAnimation(name: string, attribute: string, endValue: number, duration: number, easing: Function = IsoEasing.Linear, type: string = "once", callbacks: Array<IsoCallback> = new Array()) {
        this.Engine.animation.addAnimation(name, this, attribute, endValue, duration, easing, type, callbacks);
        return this;
    }

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

    getCoords(): IsoCoords {
        var r = this.getRenderDetails();
        return {
            x: r.position.x,
            y: r.position.y,
            width: r.renderSize.width,
            height: r.renderSize.height
        };
    }

    getOffset(): IsoOffset {
        return this.offset;
    }

    getOriginalDimension(): IsoDimension {
        return {
            width: this.width,
            height: this.height
        };
    }

    getOriginalHeight(): number {
        return this.height;
    }

    getOriginalWidth(): number {
        return this.image.image.width;
    }

    getPosition(): IsoPoint {
        return this.position;
    }

    getProperty(name: string): any {
        return this.properties[name];
    }

    getProperties(): Object {
        return this.properties;
    }

    getRelativePosition(): IsoPoint {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return {
            x: x,
            y: y
        };
    }

    getRelativeDimension(): IsoDimension {
        return {
            width: this.getOriginalDimension().width * this.zoomLevel,
            height: this.getOriginalDimension().height * this.zoomLevel
        };
    }

    getRenderDetails() {
        return {
            position: this.getRelativePosition(),
            tileSize: this.getOriginalDimension(),
            renderSize: this.getRelativeDimension(),
            image: this.image.image.get(),
            offset: this.getOffset(),
            zoomLevel: this.zoomLevel
        };
    }

    getRotation(): number {
        return this.rotation;
    }

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

    // @todo implement pixel-box-collision
    isPixelBoxCollision(sourceObject: IsoObject, targetCoords: IsoCoords): boolean {
        return false;
    }

    // @todo implement pixel-collision
    isPixelCollision(sourceObject: IsoObject, targetObject: IsoObject): boolean {
        return false;
    }

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

    rotate(degrees: number): IsoObject {
        this.rotation = this.rotation + degrees;
        return this;
    }

    scroll(deltaX: number, deltaY: number): IsoObject {
        this.scrollPosition.x = this.scrollPosition.x + (deltaX * this.speed);
        this.scrollPosition.y = this.scrollPosition.y + (deltaY * this.speed);
        return this;
    }

    setAlpha(alpha: number): IsoObject {
        this.alpha = alpha;
        return this;
    }

    setAnchor(x: number, y: number): IsoObject {
        this.anchor = { x: x, y: y };
        return this;
    }

    setBlendingMode(blendingMode: string): IsoObject {
        this.blendingMode = blendingMode;
        return this;
    }

    setHeight(height: number): IsoObject {
        this.height = height;
        return this;
    }

    setImage(image: IsoRessource): IsoObject {
        this.image = image;
        return this;
    }

    setFriction(friction: number): IsoObject {
        this.friction = friction;
        return this;
    }

    setName(name: string): IsoObject {
        this.name = name;
        return this;
    }

    setOffset(offsetX: number, offsetY: number): IsoObject {
        this.offset.x = offsetX;
        this.offset.y = offsetY;
        return this;
    }

    setPosition(position: IsoPoint): IsoObject {
        this.position.x = position.x;
        this.position.y = position.y;
        return this;
    }

    setProperty(name: string, value: any): IsoObject {
        this.properties[name] = value;
        return this;
    }

    setProperties(properties: Object): IsoObject {
        this.properties = properties;
        return this;
    }

    setRotation(degrees: number): IsoObject {
        this.rotation = degrees;
        return this;
    }

    setScroll(x: number, y: number) : IsoObject {
        this.scrollPosition.x = x;
        this.scrollPosition.y = y;
        return this;
    }

    setSize(width: number, height: number): IsoObject {
        this.width = width;
        // this.height = height;
        return this;
    }

    setSpeed(speed: number): IsoObject {
        this.speed = speed;
        return this;
    }

    setWidth(width: number): IsoObject {
        this.width = width;
        return this;
    }

    setZoomPoint(position: IsoPoint) : IsoObject {
        this.zoomPoint = position;
        return this;
    }

    setZoomLevel(zoomLevel: number): IsoObject {
        this.zoomLevel = zoomLevel;
        return this;
    }

    setZoomStrength(zoomStrength: number): IsoObject {
        this.zoomStrength = this.zoomStrength / 1000;
        return this;
    }

    zoom(zoom: number): IsoObject {
        this.setZoomLevel(this.zoomLevel + (zoom * this.zoomStrength));
        return this;
    }

    play(name: string): IsoObject {
        this.Engine.animation.play(name, this);
        return this;
    }

    stop(name): IsoObject {
        this.Engine.animation.stop(name, this);
        return this;
    }

    resume(name: string): IsoObject {
        this.Engine.animation.resume(name, this);
        return this;
    }

    pause(name: string): IsoObject {
        this.Engine.animation.pause(name, this);
        return this;
    }

    updatePosition() {
        this.velocity.x *= this.friction;
        if (this.mass === 0) {
            this.velocity.y *= this.friction;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rigidBody = this.getCoords();
        
    }
} 