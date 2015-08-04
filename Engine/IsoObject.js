///<reference path="IsoMinimalObject.ts" />
///<reference path="IsoBlendingModes.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoObject = (function (_super) {
    __extends(IsoObject, _super);
    function IsoObject(Engine, image, name) {
        _super.call(this, Engine);
        this.collisionType = "box";
        this.collisionResolution = 0;
        this.mass = 0;
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
        }
        catch (e) {
            throw ("Can not create object with error message: " + e);
        }
    }
    IsoObject.prototype.createCollidingMask = function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.ressource.ressource.getWidth();
        canvas.height = this.ressource.ressource.getHeight();
        var c = canvas.getContext("2d");
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
    };
    IsoObject.prototype.collide = function (object) {
        if (this.collisionType === IsoObject.BOX_COLLISION) {
            if (object.collisionType === IsoObject.BOX_COLLISION) {
                return this.isBoxCollision(object.getCoords(), this.getCoords());
            }
            else if (object.collisionType === IsoObject.PIXEL_COLLISION) {
                return this.isPixelBoxCollision(object, this.getCoords());
            }
        }
        else if (this.collisionType === IsoObject.PIXEL_COLLISION) {
            if (object.collisionType === IsoObject.BOX_COLLISION) {
                return this.isPixelBoxCollision(this, object.getCoords());
            }
            else if (object.collisionType === IsoObject.PIXEL_COLLISION) {
                return this.isPixelCollision(object, this);
            }
        }
    };
    IsoObject.prototype.getCoords = function () {
        var r = this.getRenderDetails();
        return {
            x: r.position.x,
            y: r.position.y,
            width: r.renderSize.width,
            height: r.renderSize.height
        };
    };
    IsoObject.prototype.getOriginalDimension = function () {
        return {
            width: this.width,
            height: this.height
        };
    };
    IsoObject.prototype.getOriginalHeight = function () {
        return this.height;
    };
    IsoObject.prototype.getOriginalWidth = function () {
        return this.width;
    };
    IsoObject.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    };
    IsoObject.prototype.getAbsoluteDimension = function () {
        return {
            width: this.getOriginalDimension().width * this.zoomLevel * this.scale.factorX,
            height: this.getOriginalDimension().height * this.zoomLevel * this.scale.factorY
        };
    };
    IsoObject.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.width * this.scale.factorX, fy = this.anchor.y / this.height * this.scale.factorY;
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
    };
    IsoObject.prototype.isBoxCollision = function (coordsSource, coordsTarget) {
        if ((coordsSource.x < coordsTarget.x && coordsSource.x + coordsSource.width > coordsTarget.x || coordsSource.x < coordsTarget.x + coordsTarget.width && coordsSource.x + coordsSource.width > coordsTarget.x) &&
            (coordsSource.y < coordsTarget.y + coordsTarget.height && coordsSource.y + coordsSource.height > coordsTarget.y)) {
            return true;
        }
        else {
            return false;
        }
    };
    IsoObject.prototype.isPixelBoxCollision = function (sourceObject, targetCoords) {
        return false;
    };
    IsoObject.prototype.isPixelCollision = function (sourceObject, targetObject) {
        return false;
    };
    IsoObject.prototype.move = function (deltaX, deltaY) {
        this.velocity.x += deltaX;
        this.velocity.y += deltaY;
        if (this.velocity.x > this.speed) {
            this.velocity.x = this.speed;
        }
        if (this.velocity.x < -this.speed) {
            this.velocity.x = -this.speed;
        }
        if (this.mass === 0) {
            if (this.velocity.y > this.speed) {
                this.velocity.y = this.speed;
            }
            if (this.velocity.y < -this.speed) {
                this.velocity.y = -this.speed;
            }
        }
        return this;
    };
    IsoObject.prototype.setHeight = function (height) {
        this.height = height;
        return this;
    };
    IsoObject.prototype.setImage = function (image) {
        this.ressource = image;
        return this;
    };
    IsoObject.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
        return this;
    };
    IsoObject.prototype.setWidth = function (width) {
        this.width = width;
        return this;
    };
    IsoObject.prototype.updatePosition = function () {
        this.velocity.x *= this.friction;
        if (this.mass === 0) {
            this.velocity.y *= this.friction;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rigidBody = this.getCoords();
    };
    IsoObject.prototype.getCollidingTiles = function (tilemap) {
        var collisionBody = this.rigidBody;
        if (collisionBody === undefined) {
            collisionBody = {
                x: 0,
                y: 0,
                width: this.width,
                height: this.height
            };
        }
        return tilemap.getTilesInRadius(this.position.x + collisionBody.x, this.position.y + collisionBody.y, collisionBody.width, collisionBody.height);
    };
    IsoObject.BOX_COLLISION = "box";
    IsoObject.PIXEL_COLLISION = "pixel";
    return IsoObject;
})(IsoMinimalObject);
