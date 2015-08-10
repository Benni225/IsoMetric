///<reference path="IsoMinimalObject.ts" />
///<reference path="IsoBlendingModes.ts" />

interface IsoDimension {
    width: number;
    height: number;
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

interface IsoPixel {
    
}

class IsoObject extends IsoMinimalObject {
    static BOX_COLLISION: string = "box";
    static PIXEL_COLLISION: string = "pixel";
    /** The original width */
    width: number;
    /** The original height */
    height: number;
    /** The image ressource of the object */
    ressource: IsoRessource;
    /** The collsion type of the object */
    collisionType: string = "box";
    /** If the object has the collisiontype "pixel" this property controls the accuracy of the collision. */
    collisionResolution: number = 0;
    /** The image data of the object in a lower resolution for collision detection. */
    collsionMask: Array<Array<Array<number>>>;
    /** Mass of the object for physics */
    mass: number = 0;
    /** The rigidbody of the object */
    rigidBody: IsoCoords;
    /** Type of the object. */
    type: string = "IsoObbject";
    /** Creates a new object */
    constructor(Engine, image: IsoRessource, name?: string) {
        super(Engine);
        try {
            this.setImage(image);
            this.setWidth(image.ressource.width);
            this.setHeight(image.ressource.height);
            if (name !== undefined) {
                this.setName(name);
            }
            this.rigidBody = {
                x: 0,
                y: 0,
                width: image.ressource.getWidth(),
                height: image.ressource.getHeight()
            };
            return this;
        } catch (e) {
            throw ("Can not create object with error message: " + e);
        }
    }

    createCollidingMask() {
        var canvas = document.createElement("canvas");
        canvas.width = this.ressource.ressource.getWidth();
        canvas.height = this.ressource.ressource.getHeight();
        var c: any = canvas.getContext("2d");
        c.drawImage(this.ressource.ressource.get(), 0, 0);
        for (var y = 1; y < canvas.height / this.collisionResolution; y++) {
            for (var x = 1; x < canvas.width / this.collisionResolution; x++) {
                if (this.collsionMask === undefined) {
                    this.collsionMask = new Array();
                }

                if (this.collsionMask[y] === undefined) {
                    this.collsionMask[y] = new Array();
                }
                var data = c.getImageData(x * this.collisionResolution, y * this.collisionResolution, this.collisionResolution, this.collisionResolution);
                this.collsionMask[y][x] = data;
            }
        }
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
        return this.width;
    }
    /** Gets the position on the screen. */
    getAbsolutePosition(): IsoVector2D {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    }
    /** Gets the dimension of the object on the screen. */
    getAbsoluteDimension(): IsoDimension {
        return {
            width: this.getOriginalDimension().width * this.zoomLevel * this.scale.factorX,
            height: this.getOriginalDimension().height * this.zoomLevel * this.scale.factorY
        };
    }
    /** Gets all important information for rendering an object. */
    getRenderDetails(): IIsoRenderDetails {
        var fx = this.anchor.x / this.width * this.scale.factorX,
            fy = this.anchor.y / this.height * this.scale.factorY;
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.getOriginalDimension(),
            renderSize: this.getAbsoluteDimension(),
            anchor: new IsoPoint((this.position.x + (this.width * this.scale.factorX * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (this.height * this.scale.factorY * this.zoomLevel * fy * this.scale.factorY))),
            image: this.ressource.get(),
            offset: this.offset.get(),
            zoomLevel: this.zoomLevel,
            type: "IsoObject"
        };
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
    /** Sets the width. */
    private setHeight(height: number): IsoObject {
        this.height = height;
        return this;
    }
    /** sets the image-ressource */
    setImage(image: IsoRessource): IsoObject {
        this.ressource = image;
        return this;
    }
    /** Sets the width and height of an object. */
    private setSize(width: number, height: number): IsoObject {
        this.width = width;
        this.height = height;
        return this;
    }
    /** Sets the width of an object. */
    private setWidth(width: number): IsoObject {
        this.width = width;
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