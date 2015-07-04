"use strict";

interface IsoOffset {
    x: number;
    y: number;
}

interface IsoScroll {
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
    zoomPoint: IsoPoint = {x: 0, y: 0};
    rotation: number;
    image: IsoRessource;
    collisionType: string = "box";
    collisionResolution: number = 0;
    speed: number = 1;
    name: string;

    constructor(image: IsoRessource, name?: string) {
        try {
            this.setImage(image);
            this.setWidth(image.image.width);
            this.setHeight(image.image.height);
            if (name !== undefined) {
                this.setName(name);
            }
            return this;
        } catch (e) {
            throw ("Can not create object with error message: " + e);
        }
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
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.width,
            height: this.height
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

    getRelativPosition(): IsoPoint {
        var x = 0, y = 0;
        x = (this.position.x * this.zoomLevel) + (this.offset.x * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = (this.position.y * this.zoomLevel) + (this.offset.y * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return {
            x: x,
            y: y
        };
    }

    getRotation(): number {
        return this.rotation;
    }

    isBoxCollision(coordsSource: IsoCoords, coordsTarget: IsoCoords): boolean {
        if (
            (coordsSource.x > coordsTarget.x || (coordsSource.x + coordsSource.width) < (coordsTarget.x + coordsTarget.width)) &&
            (coordsSource.y > coordsTarget.y || (coordsSource.y + coordsSource.height) < (coordsTarget.y + coordsTarget.height))) {
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
        this.position.x = this.position.x + (deltaX * this.speed);
        this.position.y = this.position.y + (deltaY * this.speed);
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

    setHeight(height: number): IsoObject {
        this.height = height;
        return this;
    }

    setImage(image: IsoRessource): IsoObject {
        this.image = image;
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
        this.height = height;
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
} 