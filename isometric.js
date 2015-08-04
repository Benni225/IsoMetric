var IsoOn = (function () {
    function IsoOn() {
        this.onCallbacks = new Array();
    }
    IsoOn.prototype.fire = function (type, data, element) {
        var e = new CustomEvent(type);
        e.initCustomEvent(type, true, true, data);
        if (element !== undefined) {
            element.dispatchEvent(e);
        }
        else {
            document.dispatchEvent(e);
        }
    };
    IsoOn.prototype.onEvent = function (eventType, callback) {
        document.addEventListener(eventType, callback);
    };
    IsoOn.prototype.unbindEvent = function (eventType, callback) {
        document.removeEventListener(eventType, callback);
    };
    IsoOn.prototype.on = function (eventType, callback) {
        this.onCallbacks[eventType] = callback;
        return this;
    };
    IsoOn.prototype.callOn = function (eventType) {
        if (this.checkOn(eventType))
            this.onCallbacks[eventType].call(this);
    };
    IsoOn.prototype.checkOn = function (eventType) {
        if (this.onCallbacks[eventType] !== undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    return IsoOn;
})();
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="IsoOn.ts" />
var IsoMinimalObject = (function (_super) {
    __extends(IsoMinimalObject, _super);
    function IsoMinimalObject(Engine) {
        _super.call(this);
        /** The position of the object */
        this.position = new IsoVector2D(0, 0);
        /** The scroll-position of the object */
        this.scrollPosition = new IsoVector2D(0, 0);
        /** An offset relative to the position */
        this.offset = new IsoPoint(0, 0);
        /** The scale of an object given as a factor */
        this.scale = { factorX: 1, factorY: 1 };
        /** The zooming level of an object */
        this.zoomLevel = 1;
        /** By using the method zoom, this factor controls the zooming level */
        this.zoomStrength = 1 / 1000;
        /** A point on the screen where zoomed to */
        this.zoomPoint = new IsoVector2D(0, 0);
        /** Rotation in degrees */
        this.rotation = 0;
        /** When moving this factor controls the speed of moving */
        this.speed = 1;
        /** The anchor of the object for rotation */
        this.anchor = new IsoPoint(0, 0);
        /** The blending mode. See IsoBlendingModes */
        this.blendingMode = IsoBlendingModes.NORMAL;
        /** The alpha of the object */
        this.alpha = 1;
        /** If hidden is true, the object will not be drawn. */
        this.hidden = false;
        /** Optional additional properties */
        this.properties = {};
        /** The friction of the object */
        this.friction = 1;
        /** The velocity when moving an object. */
        this.velocity = new IsoVector2D(0, 0);
        this.Engine = Engine;
    }
    /** Adds an animation. The animation will animate a given attribute of the object. */
    IsoMinimalObject.prototype.addAnimation = function (name, attribute, endValue, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.Engine.animation.addAnimation(name, this, attribute, endValue, duration, easing, type, callbacks);
        return this;
    };
    /** Gets an animation */
    IsoMinimalObject.prototype.getAnimation = function (name) {
        return this.Engine.animation.get(name, this);
    };
    /** Adds a new playlist. The playlist includes animations which animates the attributes of an object.*/
    IsoMinimalObject.prototype.addPlaylist = function (name, animations) {
        this.Engine.animation.addPlaylist(name, this, animations);
        return this;
    };
    /** Gets one of the additional properties. */
    IsoMinimalObject.prototype.getProperty = function (name) {
        return this.properties[name];
    };
    /** Gets all the additional properties. */
    IsoMinimalObject.prototype.getProperties = function () {
        return this.properties;
    };
    /** Gets the position on the screen. */
    IsoMinimalObject.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    };
    /** Gets the rotation of an object in dregrees. */
    IsoMinimalObject.prototype.getRotation = function () {
        return this.rotation;
    };
    /** Move an object relative to the current position. */
    IsoMinimalObject.prototype.move = function (deltaX, deltaY) {
        this.velocity.x += deltaX;
        this.velocity.y += deltaY;
        if (this.velocity.x > this.speed) {
            this.velocity.x = this.speed;
        }
        if (this.velocity.x < -this.speed) {
            this.velocity.x = -this.speed;
        }
        if (this.velocity.y > this.speed) {
            this.velocity.y = this.speed;
        }
        if (this.velocity.y < -this.speed) {
            this.velocity.y = -this.speed;
        }
        return this;
    };
    /** Rotates an object relative to the current rotation. */
    IsoMinimalObject.prototype.rotate = function (degrees) {
        this.rotation = this.rotation + degrees;
        return this;
    };
    /** Set the scrolling position relative to the current scroll position. */
    IsoMinimalObject.prototype.scroll = function (deltaX, deltaY) {
        this.scrollPosition.set(this.scrollPosition.x + (deltaX * this.speed), this.scrollPosition.y + (deltaY * this.speed));
        return this;
    };
    /** Sets the alpha of an object. */
    IsoMinimalObject.prototype.setAlpha = function (alpha) {
        this.alpha = alpha;
        return this;
    };
    /** Sets the blending mode. See IsoBlending. */
    IsoMinimalObject.prototype.setBlendingMode = function (blendingMode) {
        this.blendingMode = blendingMode;
        return this;
    };
    /** Sets the name of an object. */
    IsoMinimalObject.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /** Sets an additional property. */
    IsoMinimalObject.prototype.setProperty = function (name, value) {
        this.properties[name] = value;
        return this;
    };
    /** Sets all properties. */
    IsoMinimalObject.prototype.setProperties = function (properties) {
        this.properties = properties;
        return this;
    };
    /** Sets the rotation of an object in degrees. */
    IsoMinimalObject.prototype.setRotation = function (degrees) {
        this.rotation = degrees;
        return this;
    };
    /** Sets the scale of an object. */
    IsoMinimalObject.prototype.setScale = function (factorX, factorY) {
        this.scale.factorX = factorX;
        this.scale.factorY = factorY;
        return this;
    };
    /** Sets the speed for moving of an object. */
    IsoMinimalObject.prototype.setSpeed = function (speed) {
        this.speed = speed;
        return this;
    };
    /** Sets the absolute zooming-level. */
    IsoMinimalObject.prototype.setZoomLevel = function (zoomLevel) {
        this.zoomLevel = zoomLevel;
        return this;
    };
    /** Sets the strength of zooming, when using the method IsoObject.zoom */
    IsoMinimalObject.prototype.setZoomStrength = function (zoomStrength) {
        this.zoomStrength = this.zoomStrength / 1000;
        return this;
    };
    /** Calculate the zoom level */
    IsoMinimalObject.prototype.zoom = function (zoom) {
        this.setZoomLevel(this.zoomLevel + (zoom * this.zoomStrength));
        return this;
    };
    /** Plays an animation. */
    IsoMinimalObject.prototype.play = function (name) {
        this.Engine.animation.play(name, this);
        return this;
    };
    /** Stops an animation. */
    IsoMinimalObject.prototype.stop = function (name) {
        this.Engine.animation.stop(name, this);
        return this;
    };
    /** Resumes an animation. */
    IsoMinimalObject.prototype.resume = function (name) {
        this.Engine.animation.resume(name, this);
        return this;
    };
    /** Pause an animation. */
    IsoMinimalObject.prototype.pause = function (name) {
        this.Engine.animation.pause(name, this);
        return this;
    };
    /** Checks whether an animation is playing or not. */
    IsoMinimalObject.prototype.isPlaying = function (name) {
        return this.Engine.animation.isPlaying(name, this);
        ;
    };
    /** Sets the addition type of an animation: */
    IsoMinimalObject.prototype.setAdditionType = function (name, type) {
        this.Engine.animation.setAdditionType(name, this, type);
    };
    /** Calculat the new position. */
    IsoMinimalObject.prototype.updatePosition = function () {
        this.velocity.x *= this.friction;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    return IsoMinimalObject;
})(IsoOn);
var IsoBlendingModes = {
    NORMAL: "normal",
    MULTIPLY: "multiply",
    SCREEN: "screen",
    OVERLAY: "overlay",
    DARKEN: "darken",
    LIGHTEN: "lighten",
    COLOR_DODGE: "color-dodge",
    COLOR_BURN: "color-burn",
    HARD_LIGHT: "hard-light",
    SOFT_LIGHT: "soft-light",
    DIFFERENCE: "difference",
    EXCLUSION: "exclusion",
    HUE: "hue",
    SATURATION: "saturation",
    COLOR: "color",
    LUMINOSITY: "luminosity"
};
///<reference path="IsoMinimalObject.ts" />
///<reference path="IsoBlendingModes.ts" />
var IsoObject = (function (_super) {
    __extends(IsoObject, _super);
    /** Creates a new object */
    function IsoObject(Engine, image, name) {
        _super.call(this, Engine);
        /** The collsion type of the object */
        this.collisionType = "box";
        /** If the object has the collisiontype "pixel" this property controls the accuracy of the collision. */
        this.collisionResolution = 0;
        /** Mass of the object for physics */
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
    /** Checks if the object collides with an another given object. */
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
    /** Get the position of the object on the screen. */
    IsoObject.prototype.getCoords = function () {
        var r = this.getRenderDetails();
        return {
            x: r.position.x,
            y: r.position.y,
            width: r.renderSize.width,
            height: r.renderSize.height
        };
    };
    /** Gets the original dimension of the object. */
    IsoObject.prototype.getOriginalDimension = function () {
        return {
            width: this.width,
            height: this.height
        };
    };
    /** Gets the originall height of the object */
    IsoObject.prototype.getOriginalHeight = function () {
        return this.height;
    };
    /** Gets the original width of the obect */
    IsoObject.prototype.getOriginalWidth = function () {
        return this.width;
    };
    /** Gets the position on the screen. */
    IsoObject.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    };
    /** Gets the dimension of the object on the screen. */
    IsoObject.prototype.getAbsoluteDimension = function () {
        return {
            width: this.getOriginalDimension().width * this.zoomLevel * this.scale.factorX,
            height: this.getOriginalDimension().height * this.zoomLevel * this.scale.factorY
        };
    };
    /** Gets all important information for rendering an object. */
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
    /** Checks the collision of two object with collision type "box". */
    IsoObject.prototype.isBoxCollision = function (coordsSource, coordsTarget) {
        if ((coordsSource.x < coordsTarget.x && coordsSource.x + coordsSource.width > coordsTarget.x || coordsSource.x < coordsTarget.x + coordsTarget.width && coordsSource.x + coordsSource.width > coordsTarget.x) &&
            (coordsSource.y < coordsTarget.y + coordsTarget.height && coordsSource.y + coordsSource.height > coordsTarget.y)) {
            return true;
        }
        else {
            return false;
        }
    };
    /** @todo implement pixel-box-collision */
    IsoObject.prototype.isPixelBoxCollision = function (sourceObject, targetCoords) {
        return false;
    };
    /** @todo implement pixel-collision */
    IsoObject.prototype.isPixelCollision = function (sourceObject, targetObject) {
        return false;
    };
    /** Move an object relative to the current position. */
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
    /** Sets the width. */
    IsoObject.prototype.setHeight = function (height) {
        this.height = height;
        return this;
    };
    /** sets the image-ressource */
    IsoObject.prototype.setImage = function (image) {
        this.ressource = image;
        return this;
    };
    /** Sets the width and height of an object. */
    IsoObject.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
        return this;
    };
    /** Sets the width of an object. */
    IsoObject.prototype.setWidth = function (width) {
        this.width = width;
        return this;
    };
    /** Calculat the new position. */
    IsoObject.prototype.updatePosition = function () {
        this.velocity.x *= this.friction;
        if (this.mass === 0) {
            this.velocity.y *= this.friction;
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rigidBody = this.getCoords();
    };
    /** Gets all tiles of a given tilemap where the object collides with. */
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
///<reference path="IsoObject.ts" />
"use strict";
var IsoTileObject = (function (_super) {
    __extends(IsoTileObject, _super);
    function IsoTileObject(Engine, image, tileInfo) {
        _super.call(this, Engine, image);
        this.tileOffset = new IsoPoint(0, 0);
        this.tileHeight = 0;
        this.startTile = 0;
        try {
            if (tileInfo !== undefined) {
                this.set(tileInfo);
            }
            return this;
        }
        catch (e) {
            throw (e);
        }
    }
    IsoTileObject.prototype.setTileOffset = function (x, y) {
        this.tileOffset.set(x, y);
        return this;
    };
    IsoTileObject.prototype.getTileOffset = function () {
        return this.tileOffset;
    };
    IsoTileObject.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x =
            ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
                - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x);
        y =
            ((this.position.y + this.offset.y + this.scrollPosition.y + this.tileHeight) * this.zoomLevel)
                - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    };
    IsoTileObject.prototype.getRelativeDimension = function () {
        return {
            width: this.tileSize.width * this.zoomLevel,
            height: this.tileSize.height * this.zoomLevel
        };
    };
    IsoTileObject.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.tileSize.width * this.scale.factorX, fy = this.anchor.y / this.tileSize.height * this.scale.factorY;
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: new IsoPoint((this.position.x + (this.tileSize.width * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (this.tileSize.height * this.zoomLevel * fy * this.scale.factorY))),
            image: this.ressource.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel,
            type: "IsoTileObject"
        };
    };
    IsoTileObject.prototype.getTileImage = function () {
        var x = this.tileOffset.x;
        var y = this.tileOffset.y;
        var width = this.tileSize.width;
        var height = this.tileSize.height + this.tileHeight;
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            image: this.ressource.get()
        };
    };
    IsoTileObject.prototype.setTile = function (tile) {
        try {
            this.tileOffset.set(0, 0);
            this.tile = tile + this.startTile;
            this.tileOffset.x =
                (this.tile % (this.width / this.tileSize.width)) * (this.tileSize.width + this.ressource.ressource.offset.x);
            this.tileOffset.y =
                (Math.floor(this.tile / (this.width / this.tileSize.width))) * (this.tileSize.height + this.ressource.ressource.offset.y);
            return this;
        }
        catch (e) {
            throw (e);
        }
    };
    IsoTileObject.prototype.set = function (tile) {
        this.tileHeight = tile.height;
        this.tileSize = tile.size;
        this.rigidBody.width = tile.size.width;
        this.rigidBody.height = tile.size.height;
        this.setTile(tile.tile);
        return this;
    };
    return IsoTileObject;
})(IsoObject);
///<reference path="IsoTileObject.ts" />
"use strict";
var IsoTile = (function (_super) {
    __extends(IsoTile, _super);
    function IsoTile(Engine, image, tileInfo) {
        _super.call(this, Engine, image);
        this.tileOffset = new IsoPoint(0, 0);
        this.tileHeight = 0;
        this.mapPosition = new IsoMapVector2D(0, 0);
        this.updateType = "automatic";
        try {
            if (tileInfo !== undefined) {
                this.set(tileInfo);
            }
            return this;
        }
        catch (e) {
            throw ("Can not create tile with following error message: " + e);
        }
    }
    /**
     * Create a new frame-animation.
     *
     * @param  {string}                name   Name of the new animation.
     * @param  {Array<number>}         frames An array that includes the frame numbers.
     * @param  {number}                duration The duration in milliseconds of the animation.
     * @param  {Function}  easing    The animation-easing. For more information see IsoEasing. By default: IsoEasing.Linear.
     * @param  {string} type      The playing-type. Possible values are: IsoAnimation.ONCE, IsoAnimation.ENDLESS, IsoAnimation.PINGPONG. By Default: IsoAnimation.ONCE.
     * @param  {Array<IsoCallback>} callbacks An array including callback. The events are 'onPlaying', 'onStop', 'onPause', 'onResume'
     * @return {IsoAnimatedSprite}            The sprite.
     */
    IsoTile.prototype.addFrameAnimation = function (name, frames, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = IsoAnimation.ONCE; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.Engine.animation.addFrameAnimation(name, this, frames, duration, easing, type, callbacks);
        return this;
    };
    IsoTile.prototype.setUpdateType = function (type) {
        this.updateType = type;
        return this;
    };
    IsoTile.prototype.set = function (tile) {
        this.tileHeight = tile.height;
        this.tileSize = tile.size;
        this.mapPosition = tile.mapPosition;
        this.setTile(tile.tile);
        return this;
    };
    IsoTile.prototype.getCoords = function () {
        var r = this.getRenderDetails();
        return {
            x: r.position.x + (r.mapPosition.column * r.tileSize.width * r.zoomLevel),
            y: r.position.y + (r.mapPosition.row * r.tileSize.height * r.zoomLevel) - this.tileHeight,
            width: this.tileSize.width * this.zoomLevel,
            height: this.tileSize.height * this.zoomLevel
        };
    };
    IsoTile.prototype.getMapPosition = function () {
        return this.mapPosition;
    };
    IsoTile.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x =
            ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
                - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x) + (this.mapPosition.column * this.tileSize.width * this.zoomLevel);
        y =
            ((this.position.y + this.offset.y + this.scrollPosition.y + this.tileHeight) * this.zoomLevel)
                - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y) + (this.mapPosition.row * this.tileSize.height * this.zoomLevel) - this.tileHeight;
        return new IsoVector2D(x, y);
    };
    IsoTile.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.tileSize.width, fy = this.anchor.y / this.tileSize.height;
        return {
            position: this.getAbsolutePosition(),
            mapPosition: this.mapPosition,
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: new IsoPoint((this.getAbsolutePosition().x + (this.tileSize.width * this.zoomLevel * fx)), (this.getAbsolutePosition().y + (this.tileSize.height * this.zoomLevel * fy))),
            image: this.ressource.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel,
            type: "IsoTile"
        };
    };
    IsoTile.prototype.updatePosition = function () {
        this.velocity.x *= this.friction;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.rigidBody = this.getCoords();
    };
    IsoTile.AUTOMATIC = "automatic";
    IsoTile.MANUAL = "manual";
    IsoTile.POSITION = "position";
    IsoTile.ZOOM = "zoom";
    return IsoTile;
})(IsoTileObject);
"use strict";
/*
 * IsoMap
 * This class stores a map. A map has the following form:
 * |-------------------X
 * |[
 * |    [[tileNumber, tileHeight], [tileNumber, tileHeight], [tileNumber, tileHeight]],
 * |    [[tileNumber, tileHeight], [tileNumber, tileHeight], [tileNumber, tileHeight]],
 * |    [[tileNumber, tileHeight], [tileNumber, tileHeight], [tileNumber, tileHeight]]
 * |]
 * Y
 * This is a map with the dimension 3x3 tiles. 3 tiles on the x-axis and 3 tiles on the y-axis. Every item can have
 * to values. one for the tileimage, which means, what tileimmage should be rendered, and the height.
 */
var IsoMap = (function () {
    function IsoMap(map, name) {
        this.properties = new Array();
        this.updated = false;
        if (map !== undefined) {
            this.set(map);
        }
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    IsoMap.prototype.set = function (map) {
        this.map = map;
        return this;
    };
    IsoMap.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    IsoMap.prototype.get = function () {
        return this.map;
    };
    IsoMap.prototype.getValue = function (row, column) {
        return this.map[row][column];
    };
    IsoMap.prototype.getPropertiy = function (property, row, column) {
        if (this.properties[name] !== undefined) {
            if (this.map[row] !== undefined && this.map[row][column] !== undefined) {
                if (this.map[row][column][this.properties[name]] !== undefined) {
                    return this.map[row][column][this.properties[name]];
                }
                else {
                    throw ("The property '" + property + "' with index '" + this.properties[name] + "' does not exist in the map.");
                }
            }
            else {
                throw ("Row " + row + " or Column " + column + " does not exist.");
            }
        }
        else {
            throw ("Property '" + property + "' does not exist.");
        }
    };
    IsoMap.prototype.nameProperty = function (name, valueIndex) {
        if (valueIndex > 1) {
            this.properties[name] = valueIndex;
        }
        else {
            throw ("valueIndex in IsoMap.nameProperty has to be bigger 1.");
        }
    };
    IsoMap.prototype.editProperty = function (name, valueIndex) {
        if (valueIndex > 1) {
            this.properties[name] = valueIndex;
        }
        else {
            throw ("valueIndex in IsoMap.nameProperty has to be bigger 1.");
        }
    };
    IsoMap.prototype.edit = function (x, y, value) {
        if (this.map === undefined) {
            this.map = new Array();
        }
        if (this.map[y] === undefined) {
            this.map[y] = new Array();
        }
        this.map[y][x] = value;
        return this;
    };
    return IsoMap;
})();
///<reference path="IsoMap" />
///<reference path="IsoTile" />
"use strict";
/**
 * IsoTileMap draws a tile-based map on the screen.
 */
var IsoTileMap = (function () {
    /**
     * Creates a new tiled map.
     */
    function IsoTileMap(Engine, name, tileWidth, tileHeight, image, map) {
        this.tiles = new Array();
        this.offset = new IsoPoint(0, 0);
        this.scrollPosition = new IsoVector2D(0, 0);
        this.speed = 1;
        this.zoomLevel = 1;
        this.zoomStrength = 1 / 1000;
        this.zoomPoint = new IsoPoint(0, 0);
        this.Engine = Engine;
        if (name !== undefined) {
            this.setName(name);
        }
        if (tileWidth !== undefined && tileHeight !== undefined) {
            this.setTileSize({ width: tileWidth, height: tileHeight });
        }
        if (image !== undefined) {
            this.setImage(image);
        }
        if (map !== undefined) {
            this.setMap(map);
        }
        this.offset.set(0, 0);
        this.scrollPosition.set(0, 0);
        return this;
    }
    /**
     * Sets the map of the tilemap
     */
    IsoTileMap.prototype.setMap = function (map) {
        this.map = new IsoMap(map);
        return this;
    };
    /**
     * Create a new empty map.
     */
    IsoTileMap.prototype.createMap = function (numTilesX, numTilesY, defaultValue) {
        if (defaultValue === undefined) {
            defaultValue = new Array(0);
        }
        var map = new Array();
        for (var y = 0; y < numTilesY; y++) {
            for (var x = 0; x < numTilesX; x++) {
                if (map[y] === undefined) {
                    map[y] = new Array();
                }
                map[y][x] = defaultValue;
            }
        }
        return this.setMap(map);
    };
    /**
     * Creates all tile for the tilemap based on the map.
     */
    IsoTileMap.prototype.createTiles = function () {
        try {
            this.tiles = new Array();
            if (this.verify()) {
                var map = this.map.get(), rows = map.length, columns = map[0].length;
                for (var y = 0; y < rows; y++) {
                    for (var x = 0; x < columns; x++) {
                        if (this.tiles[y] === undefined) {
                            this.tiles[y] = new Array();
                        }
                        var tile = map[y][x][0], height = 0;
                        if (map[y][x][1] !== undefined) {
                            height = map[y][x][1];
                        }
                        this.tiles[y][x] = new IsoTile(this.Engine, this.image, {
                            tile: tile,
                            height: height,
                            size: this.tileSize,
                            mapPosition: new IsoMapVector2D(y, x)
                        });
                    }
                }
            }
            else {
                throw ("The tilemap '" + this.name + "' is not valid. Please check the properties image, map and tileSize.");
            }
            return this;
        }
        catch (e) {
            console.log(e);
        }
    };
    /**
     * Get a tile given by its name.
     */
    IsoTileMap.prototype.getTile = function (name) {
        for (var i = 0; i < this.tiles.length; i++) {
            for (var p = 0; p < this.tiles[0].length; p++) {
                if (this.tiles[i][p].name === name) {
                    return this.tiles[i][p];
                }
            }
        }
    };
    /**
     * Returns all tiles which are visible on the screen.
     */
    IsoTileMap.prototype.getTilesInView = function () {
        if (this.verify()) {
            var canvasWidth = this.Engine.canvas.canvasElement.width, canvasHeight = this.Engine.canvas.canvasElement.height, map = this.map.get(), mapLengthY = map.length, mapLengthX = map[0].length, startPointX = (((this.offset.x - this.scrollPosition.x) * this.zoomLevel)
                + ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x)), startPointY = (((this.offset.y - this.scrollPosition.y) * this.zoomLevel)
                + ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y)), columnStart = Math.floor(startPointX / (this.tileSize.width * this.zoomLevel)), columnEnd = Math.floor((canvasWidth + startPointX) / (this.tileSize.width * this.zoomLevel)) + 1, rowStart = Math.floor(startPointY / (this.tileSize.height * this.zoomLevel)), rowEnd = Math.floor((canvasHeight + startPointY) / (this.tileSize.height * this.zoomLevel)) + 1;
            if (columnStart < 0) {
                columnStart = 0;
            }
            if (rowStart < 0) {
                rowStart = 0;
            }
            if (columnEnd >= mapLengthX) {
                columnEnd = mapLengthX;
            }
            if (rowEnd >= mapLengthY) {
                rowEnd = mapLengthY;
            }
            var tiles = new Array();
            for (var y = 0; y < rowEnd - rowStart; y++) {
                for (var x = 0; x < columnEnd - columnStart; x++) {
                    if (tiles[y] === undefined) {
                        tiles[y] = new Array();
                    }
                    tiles[y][x] = this.tiles[y + rowStart][x + columnStart];
                }
            }
            return {
                rowStart: rowStart,
                rowEnd: rowEnd,
                columnEnd: columnEnd,
                columnStart: columnStart,
                tiles: tiles
            };
        }
        else {
            throw ("The tilemap '" + this.name + "' is not valid. Please check the properties image, map and tileSize.");
        }
    };
    /**
     * Gets all tiles in specified area.
     */
    IsoTileMap.prototype.getTilesInRadius = function (x, y, width, height) {
        x = x - (((this.offset.x + this.scrollPosition.x) * this.zoomLevel)
            - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x));
        y = y - (((this.offset.y + this.scrollPosition.y) * this.zoomLevel)
            - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y));
        var map = this.map.get(), mapLengthY = map.length, mapLengthX = map[0].length, rowStart = rowStart = Math.floor(y / (this.tileSize.height * this.zoomLevel)), columnStart = Math.floor(x / (this.tileSize.width * this.zoomLevel)), columnEnd = Math.floor((x + width) / (this.tileSize.width * this.zoomLevel)), rowEnd = Math.floor((y + height) / (this.tileSize.height * this.zoomLevel));
        if (columnStart < 0) {
            columnStart = 0;
        }
        if (rowStart < 0) {
            rowStart = 0;
        }
        if (columnEnd >= mapLengthX) {
            columnEnd = mapLengthX;
        }
        if (rowEnd >= mapLengthY) {
            rowEnd = mapLengthY;
        }
        var tiles = new Array();
        for (var row = rowStart; row < rowEnd; row++) {
            for (var column = columnStart; column < columnEnd; column++) {
                tiles[row][column] = this.tiles[row][column];
            }
        }
        return tiles;
    };
    /**
     * Return the tile placed on the given position.
     */
    IsoTileMap.prototype.getTileOnPosition = function (position) {
        if (this.map.get() !== undefined) {
            var mapLengthY = this.map.map.length, mapLengthX = this.map.map[0].length;
            if (position.x > (mapLengthX * (this.tileSize.width * this.zoomLevel)) ||
                position.y > (mapLengthY * (this.tileSize.height * this.zoomLevel)) ||
                typeof position.x === "NaN" ||
                typeof position.y === "NaN" ||
                position.x === undefined ||
                position.y === undefined) {
                return null;
            }
            else {
                position.x = position.x - (((this.offset.x + this.scrollPosition.x) * this.zoomLevel)
                    - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x));
                position.y = position.y - (((this.offset.y + this.scrollPosition.y) * this.zoomLevel)
                    - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y));
                if (position.y > 0 && position.x > 0) {
                    var row = Math.floor(position.y / (this.tileSize.height * this.zoomLevel)), column = Math.floor(position.x / (this.tileSize.width * this.zoomLevel));
                    return this.tiles[row][column];
                }
                else {
                    return null;
                }
            }
        }
        else {
            return undefined;
        }
    };
    /**
     * Sets the image ressource for the tilemap.
     */
    IsoTileMap.prototype.setImage = function (image) {
        this.image = image;
        return this;
    };
    /**
     * Sets the maximum value for zooming.
     */
    IsoTileMap.prototype.setMaxZoomLevel = function (zoomLevel) {
        this.maxZoomLevel = zoomLevel;
        return this;
    };
    /**
     * Sets the minimum value for zooming.
     */
    IsoTileMap.prototype.setMinZoomLevel = function (zoomLevel) {
        this.minZoomLevel = zoomLevel;
        return this;
    };
    /**
     * Sets the name of the tilemap
     */
    IsoTileMap.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /**
     * Sets the offset of the tilemap. Alias for offset.set.
     */
    IsoTileMap.prototype.setOffset = function (x, y) {
        this.offset.set(x, y);
        return this;
    };
    /**
     * Sets the scroll-position of the tilemap. Alias for scrollPosition.set.
     */
    IsoTileMap.prototype.setScroll = function (x, y) {
        this.scrollPosition.set(x, y);
        return this;
    };
    /**
     * Sets the speed  for scrolling and moving for the tilemap.
     */
    IsoTileMap.prototype.setSpeed = function (speed) {
        this.speed = speed;
        return this;
    };
    /**
     * Scrolls the tilemap relative to the actual position.
     */
    IsoTileMap.prototype.scroll = function (x, y) {
        x = x + this.scrollPosition.x;
        y = y + this.scrollPosition.y;
        this.scrollPosition.set(x, y);
        return this;
    };
    /**
     * Sets the tilesize of the tilemap.
     */
    IsoTileMap.prototype.setTileSize = function (size) {
        this.tileSize = size;
        return this;
    };
    /**
     * Sets the zoomLevel of the tilemap.
     */
    IsoTileMap.prototype.setZoomLevel = function (zoomLevel) {
        this.zoomLevel = zoomLevel;
        return this;
    };
    /**
     * Sets the zooming point of the tilemap.
     */
    IsoTileMap.prototype.setZoomPoint = function (point) {
        this.zoomPoint = point;
        return this;
    };
    /**
     * Sets the strength of zooming.
     */
    IsoTileMap.prototype.setZoomStrength = function (zoomStrength) {
        this.zoomStrength = zoomStrength / 1000;
        return this;
    };
    /**
     * Update the tilemap and with this all the tiles of the tilemap.
     */
    IsoTileMap.prototype.update = function () {
        if (this.tiles === undefined || this.tiles.length === 0) {
            this.createTiles();
        }
        for (var y = 0; y < this.tiles.length; y++) {
            for (var x = 0; x < this.tiles[0].length; x++) {
                this.updateTile(this.tiles[y][x]);
            }
        }
    };
    /**
     * Update all tiles of the tilemap.
     */
    IsoTileMap.prototype.updateTile = function (tile) {
        if (tile !== undefined) {
            if (tile.updateType === IsoTile.AUTOMATIC) {
                tile.offset = this.offset;
                tile.scrollPosition = this.scrollPosition;
                tile.setZoomLevel(this.zoomLevel);
                tile.zoomPoint.set(this.zoomPoint.x, this.zoomPoint.y);
            }
            else if (tile.updateType === IsoTile.POSITION) {
                tile.offset = this.offset;
                tile.scrollPosition = this.scrollPosition;
            }
            else if (tile.updateType === IsoTile.ZOOM) {
                tile.setZoomLevel(this.zoomLevel);
                tile.zoomPoint.set(this.zoomPoint.x, this.zoomPoint.y);
            }
            if (tile.tileHeight === undefined || typeof tile.tileHeight === "NaN") {
                tile.tileHeight = 0;
            }
        }
    };
    /**
     * Verify the tilemap.
     * @private
     */
    IsoTileMap.prototype.verify = function () {
        if (this.image === undefined || this.image.loaded === false) {
            return false;
        }
        if (this.tileSize === undefined) {
            return false;
        }
        if (this.map === undefined && this.map.get() === undefined && this.map.get()[0] === undefined) {
            return false;
        }
        return true;
    };
    /**
     * Set te zoom of the tilemap relative to the current zoom.
     */
    IsoTileMap.prototype.zoom = function (zoom) {
        var zoomLevel = this.zoomLevel + (this.zoomStrength * zoom);
        if (this.maxZoomLevel !== undefined && this.minZoomLevel !== undefined) {
            if (zoomLevel >= this.minZoomLevel && zoomLevel <= this.maxZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        }
        else if (this.maxZoomLevel !== undefined) {
            if (zoomLevel <= this.maxZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        }
        else if (this.minZoomLevel !== undefined) {
            if (zoomLevel >= this.minZoomLevel) {
                this.setZoomLevel(zoomLevel);
            }
        }
        else {
            this.setZoomLevel(zoomLevel);
        }
        return this;
    };
    return IsoTileMap;
})();
///<reference path="IsoTile" />
///<reference path="IsoTileMap" />
"use strict";
var IsoSprite = (function (_super) {
    __extends(IsoSprite, _super);
    function IsoSprite(Engine, image, tileInfo, name) {
        _super.call(this, Engine, image, tileInfo);
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    IsoSprite.prototype.getTileImage = function () {
        var x = this.tileOffset.x;
        var y = this.tileOffset.y;
        var width = this.tileSize.width;
        var height = this.tileSize.height + this.tileHeight;
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            image: this.ressource.get()
        };
    };
    IsoSprite.prototype.setFrame = function (frame) {
        this.tileSize = frame.dimension;
        this.tileOffset.set(frame.offset.x, frame.offset.y);
        return this;
    };
    IsoSprite.prototype.set = function (tile) {
        this.tileHeight = tile.height | 0;
        this.tileSize = tile.size;
        this.setTile(tile.tile);
        return this;
    };
    /** Gets the dimension of the object on the screen. */
    IsoSprite.prototype.getAbsoluteDimension = function () {
        return {
            width: this.tileSize.width * this.zoomLevel * this.scale.factorX,
            height: this.tileSize.height * this.zoomLevel * this.scale.factorY
        };
    };
    IsoSprite.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.tileSize.width * this.scale.factorX, fy = this.anchor.y / this.tileSize.height * this.scale.factorY;
        return {
            position: this.getAbsolutePosition(),
            tileSize: this.tileSize,
            renderSize: this.getAbsoluteDimension(),
            anchor: new IsoPoint((this.position.x + (this.width * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (this.height * this.zoomLevel * fy * this.scale.factorY))),
            image: this.ressource.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel,
            type: "IsoSprite"
        };
    };
    return IsoSprite;
})(IsoTileObject);
///<reference path="IsoSprite.ts" />
"use strict";
/**
 * This sprite type is an animated sprite, which uses frames of a tileset for animations.
 */
var IsoAnimatedSprite = (function (_super) {
    __extends(IsoAnimatedSprite, _super);
    /**
     * Creats a new frame-animated sprite
     */
    function IsoAnimatedSprite(Engine, image, tileInfo, name) {
        _super.call(this, Engine, image, tileInfo);
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    /**
     * Create a new frame-based animation.
     */
    IsoAnimatedSprite.prototype.addFrameAnimation = function (name, frames, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = IsoAnimation.ONCE; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.Engine.animation.addFrameAnimation(name, this, frames, duration, easing, type, callbacks);
        return this;
    };
    /** Adds a new playlist. The playlist includes animations which animates both: the attributes and/or the frames of an object.*/
    IsoAnimatedSprite.prototype.addPlaylist = function (name, animations) {
        this.Engine.animation.addPlaylist(name, this, animations);
        return this;
    };
    return IsoAnimatedSprite;
})(IsoSprite);
/**
 * A library including all easing-functions.
 */
var IsoEasing = {
    Linear: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * currentIteration / iterationCount + startValue;
    },
    QuadIn: function (currentIteration, startValue, endValue, iterationCount) {
        currentIteration = currentIteration / iterationCount;
        return (endValue - startValue) * currentIteration * currentIteration + startValue;
    },
    QuadOut: function (currentIteration, startValue, endValue, iterationCount) {
        return -(endValue - startValue) * (currentIteration /= iterationCount) * (currentIteration - 2) + startValue;
    },
    QuadInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * currentIteration * currentIteration + startValue;
        }
        return -(endValue - startValue) / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
    },
    CubicIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 3) + startValue;
    },
    CubicOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 3) + 1) + startValue;
    },
    CubicInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 3) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
    },
    QuartIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 4) + startValue;
    },
    QuartOut: function (currentIteration, startValue, endValue, iterationCount) {
        return -(endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 4) - 1) + startValue;
    },
    QuartInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 4) + startValue;
        }
        return -(endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
    },
    QuintIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 5) + startValue;
    },
    QuintOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 5) + 1) + startValue;
    },
    QuintInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 5) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
    },
    SineIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (1 - Math.cos(currentIteration / iterationCount * (Math.PI / 2))) + startValue;
    },
    SineOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.sin(currentIteration / iterationCount * (Math.PI / 2)) + startValue;
    },
    SineInOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) / 2 * (1 - Math.cos(Math.PI * currentIteration / iterationCount)) + startValue;
    },
    ExpoIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(2, 10 * (currentIteration / iterationCount - 1)) + startValue;
    },
    ExpoOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (-Math.pow(2, -10 * currentIteration / iterationCount) + 1) + startValue;
    },
    ExpoInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
        }
        return (endValue - startValue) / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
    },
    CircIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (1 - Math.sqrt(1 - (currentIteration /= iterationCount) * currentIteration)) + startValue;
    },
    CircOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.sqrt(1 - (currentIteration = currentIteration / iterationCount - 1) * currentIteration) + startValue;
    },
    CircInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
    }
};
///<reference path="IsoEasing.ts" />
///<reference path="IsoOn.ts" />
/**
 * Controls an animations.
 * There are two types of animations:
 * 1. "attribute-animation" - animates the attribute of an object. Nearly every object can be animated. The type of the value has to be a number.
 * 2. "frame-animation" - animates the frames of a sprite or a tile. The type of the animated object has to be an IsoAnimatedSprite or IsoTile.W
 */
var IsoAnimation = (function (_super) {
    __extends(IsoAnimation, _super);
    function IsoAnimation() {
        _super.call(this);
        this.easing = IsoEasing.Linear;
        this.isPlaying = false;
        this.currentIteration = 0;
        this.framesPerSecond = 60;
        this.__debug = 0;
        this.animationType = "attribute";
        this.additionType = IsoAnimation.ADDTION_RELATIVE;
        this.impulsePlaying = 0;
        return this;
    }
    /**
     * Creates a new frame-based animation.
     */
    IsoAnimation.prototype.createFrameAnimation = function (name, object, frames, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.name = name;
        this.sprite = object;
        this.frames = frames;
        this.startValue = frames[0] - 1;
        this.endValue = frames[frames.length - 1];
        this.duration = duration;
        this.easing = easing;
        this.type = type;
        this.callbacks = callbacks;
        this.animationType = IsoAnimation.ANIMATION_TYPE_FRAME;
        return this;
    };
    /**
     * Creates a new frame-based animation.
     */
    IsoAnimation.prototype.createAnimation = function (name, object, attribute, endValue, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.name = name;
        this.object = object;
        this.attribute = attribute;
        this.startValue = this.getObjectValue();
        this.endValue = endValue;
        this.duration = duration;
        this.easing = easing;
        this.type = type;
        this.callbacks = callbacks;
        this.animationType = IsoAnimation.ANIMATION_TYPE_ATTRIBUTE;
        return this;
    };
    /**
     * Starts the animation.
     */
    IsoAnimation.prototype.play = function () {
        if (this.isPlaying === false) {
            this.iterations = (this.duration / 1000) * this.framesPerSecond;
            this.currentIteration = 0;
            this.isPlaying = true;
            if (this.animationType === IsoAnimation.ANIMATION_TYPE_ATTRIBUTE) {
                this.__playAttribute();
            }
            else if (this.animationType === IsoAnimation.ANIMATION_TYPE_FRAME) {
                this.__playFrame();
            }
        }
        return this;
    };
    /**
     * Starts an animation of the type "attribute".
     */
    IsoAnimation.prototype.__playAttribute = function () {
        var _this = this;
        if (this.isPlaying === true) {
            if (this.currentIteration === 0) {
                this.actualValue = this.startValue;
            }
            this.currentIteration++;
            this.actualValue = this.easing(this.currentIteration, this.startValue, this.endValue, this.iterations);
            if (this.additionType !== IsoAnimation.ADDITION_ABSOLUTE)
                this.setObjectValue(this.actualValue);
            else
                this.setObjectValueAbsolute(this.actualValue);
            if (this.actualValue === this.endValue) {
                switch (this.type) {
                    case IsoAnimation.ONCE:
                        this.fire(IsoAnimation.PLAYED, this);
                        if (this.checkOn(IsoAnimation.PLAYED)) {
                            this.callOn(IsoAnimation.PLAYED);
                        }
                        this.isPlaying = false;
                        this.stop();
                        return;
                        break;
                    case IsoAnimation.PINGPONG:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        var endValue = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.IMPULSE:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        var endValue = this.endValue;
                        this.impulsePlaying++;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        if (this.impulsePlaying == 2) {
                            this.stop();
                        }
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.ENDLESS:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                }
            }
            else {
                if (this.isPlaying === true)
                    requestAnimationFrame(function () { return _this.__playAttribute(); });
            }
        }
        else {
            return;
        }
    };
    /**
     * Starts an animation of the type "frame".
     */
    IsoAnimation.prototype.__playFrame = function () {
        var _this = this;
        if (this.isPlaying === true) {
            if (this.currentIteration === 0) {
                this.actualValue = this.startValue;
            }
            this.currentIteration++;
            var __t = Math.floor(this.easing(this.currentIteration, this.startValue, this.endValue, this.iterations));
            this.actualValue = Math.floor(__t);
            if (this.actualValue !== this.sprite.tile) {
                this.sprite.setTile(Math.round(this.actualValue));
            }
            if (__t === this.endValue) {
                switch (this.type) {
                    case IsoAnimation.ONCE:
                        this.fire(IsoAnimation.PLAYED, this);
                        if (this.checkOn(IsoAnimation.PLAYED)) {
                            this.callOn(IsoAnimation.PLAYED);
                        }
                        this.stop();
                        break;
                    case IsoAnimation.PINGPONG:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        var endValue = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.IMPULSE:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        var endValue = this.endValue;
                        this.impulsePlaying++;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        if (this.impulsePlaying == 2) {
                            this.stop();
                        }
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.ENDLESS:
                        this.fire(IsoAnimation.EVERYPLAYED, this);
                        if (this.checkOn(IsoAnimation.EVERYPLAYED)) {
                            this.callOn(IsoAnimation.EVERYPLAYED);
                        }
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                }
            }
            else {
                if (this.isPlaying === true)
                    requestAnimationFrame(function () { return _this.__playFrame(); });
            }
        }
    };
    /**
     * Stop playing the animation.
     */
    IsoAnimation.prototype.stop = function () {
        this.isPlaying = false;
        // this.impulsePlaying = 0;
        // this.actualValue = this.startValue;
        // this.fire(IsoAnimation.STOPPED, this);
        return this;
    };
    /**
     * Pause the animation
     */
    IsoAnimation.prototype.pause = function () {
        this.fire(IsoAnimation.PAUSE, this);
        if (this.checkOn(IsoAnimation.PAUSE)) {
            this.callOn(IsoAnimation.PAUSE);
        }
        this.isPlaying = false;
        return this;
    };
    /**
     * Resume the animation.
     */
    IsoAnimation.prototype.resume = function () {
        this.fire(IsoAnimation.RESUME, this);
        if (this.checkOn(IsoAnimation.RESUME)) {
            this.callOn(IsoAnimation.RESUME);
        }
        this.isPlaying = true;
        if (this.animationType === IsoAnimation.ANIMATION_TYPE_ATTRIBUTE) {
            this.__playAttribute();
        }
        else if (this.animationType === IsoAnimation.ANIMATION_TYPE_FRAME) {
            this.__playFrame();
        }
        return this;
    };
    /**
     * Parse the object and return the given attribute.
     */
    IsoAnimation.prototype.getObjectValue = function () {
        var a = this.attribute.split("."), s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "return o" + s + ";");
        return f(this.object);
    };
    /**
     * Parse the object and set the given attribute in a relative way.
     */
    IsoAnimation.prototype.setObjectValue = function (value) {
        var a = this.attribute.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + "+= v;");
        f(this.object, value - this.getObjectValue());
    };
    /**
     * Parse the object and set the given attribute in a absolute way.
     */
    IsoAnimation.prototype.setObjectValueAbsolute = function (value) {
        var a = this.attribute.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + "= v;");
        f(this.object, value);
    };
    IsoAnimation.prototype.setAdditionType = function (type) {
        this.additionType = type;
    };
    IsoAnimation.ADDITION_ABSOLUTE = "absolute";
    IsoAnimation.ADDTION_RELATIVE = "relative";
    IsoAnimation.ONCE = "once";
    IsoAnimation.PINGPONG = "pingpong";
    IsoAnimation.ENDLESS = "endless";
    IsoAnimation.IMPULSE = "impulse";
    IsoAnimation.ANIMATION_TYPE_FRAME = "frame";
    IsoAnimation.ANIMATION_TYPE_ATTRIBUTE = "attribute";
    // Events
    IsoAnimation.PLAYED = "played";
    IsoAnimation.EVERYPLAYED = "everyPlayed";
    IsoAnimation.STOPPED = "stopped";
    IsoAnimation.RESUME = "resume";
    IsoAnimation.PAUSE = "pause";
    return IsoAnimation;
})(IsoOn);
///<reference path="IsoAnimation.ts" />
"use strict";
var IsoAnimationManager = (function () {
    function IsoAnimationManager() {
        /** Includes all object animations. */
        this.animations = new Array();
    }
    /** Adds a new frame-based animation. */
    IsoAnimationManager.prototype.addFrameAnimation = function (name, object, frames, speed, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.animations.push(new IsoAnimation().createFrameAnimation(name, object, frames, speed, easing, type, callbacks));
        return this;
    };
    /** Adds a new attribute-based animation. */
    IsoAnimationManager.prototype.addAnimation = function (name, object, attribute, endValue, speed, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.animations.push(new IsoAnimation().createAnimation(name, object, attribute, endValue, speed, easing, type, callbacks));
        return this;
    };
    /** Adds a new playlist. */
    IsoAnimationManager.prototype.addPlaylist = function (name, object, animations) {
        this.playLists.push(new IsoAnimationPlaylist(name, object, animations));
        return this;
    };
    /** Plays an animation given by its name and the animated object.*/
    IsoAnimationManager.prototype.play = function (name, object) {
        this.get(name, object).play();
    };
    /** Stops an animation given by its name and the animated object.*/
    IsoAnimationManager.prototype.stop = function (name, object) {
        this.get(name, object).stop();
    };
    /** Resumes an animation given by its name and the animated object.*/
    IsoAnimationManager.prototype.resume = function (name, object) {
        this.get(name, object).resume();
    };
    /** Pauses an animation given by its name and the animated object.*/
    IsoAnimationManager.prototype.pause = function (name, object) {
        this.get(name, object).pause();
    };
    /** Checks if an animation is playing given by its name and the animated object.*/
    IsoAnimationManager.prototype.isPlaying = function (name, object) {
        return this.get(name, object).isPlaying;
    };
    /** Sets the addiion type of the animation. */
    IsoAnimationManager.prototype.setAdditionType = function (name, object, type) {
        this.get(name, object).setAdditionType(type);
    };
    /** Plays a playlist given by its name and the animated object.*/
    IsoAnimationManager.prototype.playPlaylist = function (name, object) {
        this.getPlaylist(name, object).play();
    };
    /** Stops a playlist given by its name and the animated object.*/
    IsoAnimationManager.prototype.stopPlaylist = function (name, object) {
        this.getPlaylist(name, object).stop();
    };
    /** Pauses a playlist given by its name and the animated object.*/
    IsoAnimationManager.prototype.pausePlaylist = function (name, object) {
        this.getPlaylist(name, object).pause();
    };
    /** Resumes a playlist given by its name and the animated object.*/
    IsoAnimationManager.prototype.resumePlaylist = function (name, object) {
        this.getPlaylist(name, object).resume();
    };
    /** Checks if a playlist is playing given by its name and the animated object.*/
    IsoAnimationManager.prototype.isPlayingPlaylist = function (name, object) {
        return this.getPlaylist(name, object).isPlaying;
    };
    /** Returns a specified animation given by its name and the animated object.*/
    IsoAnimationManager.prototype.get = function (name, object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                return this.animations[i];
            }
        }
    };
    /** Returns a specified playlist given by its name and the animated object.*/
    IsoAnimationManager.prototype.getPlaylist = function (name, object) {
        for (var i = 0; i < this.playLists.length; i++) {
            if (this.playLists[i].name === name && (this.playLists[i].object === object)) {
                return this.playLists[i];
            }
        }
    };
    return IsoAnimationManager;
})();
///<reference path="IsoOn.ts" />
"use strict";
var IsoAnimationPlaylist = (function (_super) {
    __extends(IsoAnimationPlaylist, _super);
    /** Creates a new playlist.*/
    function IsoAnimationPlaylist(name, object, animations) {
        var _this = this;
        _super.call(this);
        /** True, if the playlist is playing, else if not.*/
        this.isPlaying = false;
        /** All the animations of the playlist.*/
        this.animations = new Array();
        /** The current playing animation.*/
        this.current = "";
        this.name = name;
        this.object = object;
        this.animations = animations;
        document.addEventListener(IsoAnimation.PLAYED, function (event) { return _this.checkPlaylist(event); });
    }
    IsoAnimationPlaylist.prototype.checkPlaylist = function (event) {
        if (event.detail.object === this.object && this.isPlaying === true) {
            for (var i = 0; i < this.animations.length; i++) {
                if (i < this.animations.length - 1 && event.detail.name === this.current) {
                    this.next(this.animations[i + 1]);
                }
                else if (event.detail.name === this.current) {
                    this.stop();
                }
            }
        }
    };
    /** Stops the playlist. */
    IsoAnimationPlaylist.prototype.stop = function () {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].isPlaying === true) {
                this.animations[i].stop();
            }
        }
        this.isPlaying = false;
        this.current = "";
    };
    /** Pause the playlist and saves the current animation.*/
    IsoAnimationPlaylist.prototype.pause = function () {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].isPlaying === true) {
                this.animations[i].pause();
                this.pausedAnimation = this.animations[i].name;
            }
        }
        this.isPlaying = false;
    };
    /** Resumes the playlist. */
    IsoAnimationPlaylist.prototype.resume = function () {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === this.pausedAnimation) {
                this.animations[i].resume();
            }
        }
    };
    /** Plays the next animation. */
    IsoAnimationPlaylist.prototype.next = function (animation) {
        this.current = animation.name;
        animation.play();
    };
    /** Plays the playlist from the beginning. */
    IsoAnimationPlaylist.prototype.play = function () {
        if (this.animations !== undefined && this.animations.length > 0 && this.isPlaying === false) {
            this.isPlaying = true;
            this.animations[0].play();
        }
    };
    return IsoAnimationPlaylist;
})(IsoOn);
///<reference path="IsoOn.ts" />
"use strict";
var IsoAudio = (function (_super) {
    __extends(IsoAudio, _super);
    function IsoAudio(src) {
        _super.call(this);
        this.type = IsoRessource.AUDIO;
        this.src = "";
        this.isLoaded = false;
        this.create(src);
    }
    IsoAudio.prototype.create = function (src) {
        this.src = src;
    };
    IsoAudio.prototype.load = function () {
        var _this = this;
        this.audio = document.createElement("audio");
        this.audio.addEventListener("canplaythrough", function (event) { return _this._onLoad(event); }, false);
        this.audio.src = this.src;
    };
    /**
     * Called when the image file was loaded.
     */
    IsoAudio.prototype._onLoad = function (event) {
        this.isLoaded = true;
        this.callOn("load");
    };
    IsoAudio.prototype.get = function () {
        return this.audio;
    };
    return IsoAudio;
})(IsoOn);
"use strict";
var IsoBillboard = (function (_super) {
    __extends(IsoBillboard, _super);
    function IsoBillboard() {
        _super.apply(this, arguments);
        this.repeat = IsoBillboard.NOREPEAT;
    }
    /** Sets if the billboard will repeated. */
    IsoBillboard.prototype.setRepeat = function (repeat) {
        this.repeat = repeat;
        return this;
    };
    IsoBillboard.REPEATX = "repeatx";
    IsoBillboard.REPEATY = "repeaty";
    IsoBillboard.REPEAT = "repeat";
    IsoBillboard.NOREPEAT = "norepeat";
    return IsoBillboard;
})(IsoObject);
"use strict";
var IsoCanvas = (function () {
    function IsoCanvas(Engine) {
        this.defaultOptions = {
            width: 640,
            height: 480,
            fullscreen: true
        };
        this.Engine = Engine;
    }
    IsoCanvas.prototype.create = function (id) {
        var _this = this;
        this.canvasElement = document.createElement("canvas");
        if (id === undefined) {
            id = "isoMetricCanvas";
        }
        this.canvasElement.id = id;
        this.options = this.defaultOptions;
        if (this.Engine.config.get("windowOptions") !== undefined) {
            this.options = this.Engine.config.get("windowOptions");
        }
        this.canvasElement.width = this.options.width;
        this.canvasElement.height = this.options.height;
        this.canvasElement.style.width = this.options.width + "px";
        this.canvasElement.style.height = this.options.height + "px";
        if (this.options.fullscreen === true) {
            this.canvasElement.width = window.innerWidth;
            this.canvasElement.height = window.innerHeight;
            this.canvasElement.style.width = window.innerWidth + "px";
            this.canvasElement.style.height = window.innerHeight + "px";
            window.onresize = window.onload = function () { return _this.updateScreen(); };
            this.canvasElement.style.overflow = "hidden";
        }
        if (document.body === null) {
            document.body = document.createElement("body");
        }
        document.body.appendChild(this.canvasElement);
        this.context = this.canvasElement.getContext("2d");
        new IsoEvent("IsoCanvasReady").trigger();
        return this;
    };
    IsoCanvas.prototype.set = function (canvas) {
        if (this.canvasElement !== undefined) {
            this.canvasElement.remove();
        }
        this.canvasElement = canvas;
        this.context = this.canvasElement.getContext("2d");
        new IsoEvent("IsoCanvasReady").trigger();
        return this;
    };
    IsoCanvas.prototype.setClass = function (cssClass) {
        this.canvasElement.className = cssClass;
    };
    IsoCanvas.prototype.updateScreen = function () {
        this.canvasElement.width = window.innerWidth;
        this.canvasElement.height = window.innerHeight;
        this.canvasElement.style.width = this.canvasElement.width + "px";
        this.canvasElement.style.height = this.canvasElement.height + "px";
        new IsoEvent("IsoCanvasUpdate").trigger();
        return this;
    };
    IsoCanvas.prototype.updateSize = function (width, height) {
        this.canvasElement.width = width;
        this.canvasElement.height = height;
        this.canvasElement.style.width = width + "px";
        this.canvasElement.style.height = height + "px";
        this.options.height = height;
        this.options.width = width;
    };
    IsoCanvas.prototype.clearScreen = function () {
        /**
         * @todo:
         * Finding a better solution for redraw the canvas.
         */
        this.canvasElement.width = this.canvasElement.width;
        if (this.clearColor === undefined) {
            this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }
        else {
            this.context.fillStyle = this.clearColor;
            this.context.rect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.context.fill();
        }
        new IsoEvent("IsoCanvasClearScreen").trigger();
        return this;
    };
    IsoCanvas.prototype.get = function () {
        return this.canvasElement;
    };
    return IsoCanvas;
})();
"use strict";
var IsoConfig = (function () {
    function IsoConfig(Engine, c) {
        this.Engine = Engine;
        if (c !== undefined) {
            this.c = c;
        }
        else {
            this.c = {};
        }
    }
    IsoConfig.prototype.setConfig = function (c) {
        this.c = c;
    };
    IsoConfig.prototype.set = function (name, value) {
        this.c[name] = value;
    };
    IsoConfig.prototype.get = function (name) {
        if (this.c[name] !== undefined) {
            return this.c[name];
        }
        else {
            return undefined;
        }
    };
    return IsoConfig;
})();
"use strict";
var IsoDrawer = (function () {
    function IsoDrawer(Engine) {
        this.__DEBUG_SHOW = false;
        this.Engine = Engine;
        this.canvas = Engine.canvas;
        this.context = Engine.canvas.context;
    }
    /** Redraw all elements on the screen */
    IsoDrawer.prototype.update = function () {
        this.canvas.clearScreen();
        this.Engine.layers.sort();
        for (var i = 0; i < this.Engine.layers.layers.length; i++) {
            if (!this.Engine.layers.layers[i].isHidden()) {
                this.drawLayer(this.Engine.layers.layers[i]);
            }
        }
        this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
        new IsoEvent("drawComplete").trigger();
        this.Engine.endLoop();
    };
    /** Draws a single layer. */
    IsoDrawer.prototype.drawLayer = function (layer) {
        if (layer.billboards.length > 0) {
            this.drawBillboards(layer.billboards);
        }
        if (layer.getTileMap() !== undefined) {
            this.drawTileMap(layer.getTileMap());
        }
        if (layer.objects.length > 0) {
            this.drawObjects(layer.objects);
        }
        if (layer.texts.length > 0) {
            this.drawTexts(layer.texts);
        }
    };
    /** Draws a tilemap of a layer. */
    IsoDrawer.prototype.drawTileMap = function (tileMap) {
        tileMap.update();
        var tiles = tileMap.getTilesInView();
        for (var y = 0; y < tiles.rowEnd - tiles.rowStart; y++) {
            for (var x = 0; x < tiles.columnEnd - tiles.columnStart; x++) {
                tiles.tiles[y][x].updatePosition();
                var detail = tiles.tiles[y][x].getRenderDetails();
                if (tiles.tiles[y][x].rotation !== 0) {
                    this.translate(tiles.tiles[y][x], detail);
                    this.rotate(tiles.tiles[y][x], detail);
                    this.resetTranslation(tiles.tiles[y][x], detail);
                }
                this.context.globalCompositeOperation = tiles.tiles[y][x].blendingMode;
                this.context.globalAlpha = tiles.tiles[y][x].alpha;
                this.context.drawImage(detail.image, detail.offset.x, detail.offset.y, detail.tileSize.width, detail.tileSize.height, detail.position.x, detail.position.y, detail.renderSize.width, detail.renderSize.height);
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    };
    /** Draws all given objects. */
    IsoDrawer.prototype.drawBillboards = function (objects) {
        for (var i = 0; i < objects.length; i++) {
            var o = objects[i];
            if (o.hidden === false) {
                o.updatePosition();
                var renderDetails = o.getRenderDetails();
                if (o.rotation !== 0) {
                    this.translate(o, renderDetails);
                    this.rotate(o, renderDetails);
                    this.resetTranslation(o, renderDetails);
                }
                this.context.globalCompositeOperation = o.blendingMode;
                this.context.globalAlpha = o.alpha;
                if (o.repeat !== IsoBillboard.NOREPEAT) {
                    if (o.repeat === IsoBillboard.REPEAT) {
                        if (o.scrollPosition.x <= -o.width || o.scrollPosition.x >= o.width) {
                            o.scrollPosition.x = 0;
                        }
                        if (o.scrollPosition.y <= -o.height || o.scrollPosition.y >= o.height) {
                            o.scrollPosition.y = 0;
                        }
                    }
                    if (o.repeat === IsoBillboard.REPEATX) {
                        if (o.scrollPosition.x <= -o.width || o.scrollPosition.x >= o.width) {
                            o.scrollPosition.x = 0;
                        }
                    }
                    if (o.repeat === IsoBillboard.REPEATY) {
                        if (o.scrollPosition.y <= -o.height || o.scrollPosition.y >= o.height) {
                            o.scrollPosition.y = 0;
                        }
                    }
                    o.updatePosition();
                    for (var ii = -1; ii < Math.ceil(this.canvas.canvasElement.height / o.height) + 1; ii++) {
                        for (var i = -1; i < Math.ceil(this.canvas.canvasElement.width / o.width) + 1; i++) {
                            var rx = renderDetails.position.x, ry = renderDetails.position.y, fx = o.scrollPosition.x > 0 ? -1 : 1, fy = o.scrollPosition.y > 0 ? -1 : 1;
                            if (o.repeat === IsoBillboard.REPEAT) {
                                rx += i * (fx * renderDetails.renderSize.width);
                                ry += ii * (fy * renderDetails.renderSize.height);
                            }
                            if (o.repeat === IsoBillboard.REPEATX) {
                                rx += i * (fx * renderDetails.renderSize.width);
                            }
                            if (o.repeat === IsoBillboard.REPEATY) {
                                ry += ii * (fy * renderDetails.renderSize.height);
                            }
                            this.drawImage({
                                image: renderDetails.image,
                                offset: new IsoPoint(renderDetails.offset.x, renderDetails.offset.y),
                                tileSize: renderDetails.tileSize,
                                position: new IsoVector2D(rx, ry),
                                renderSize: renderDetails.renderSize
                            });
                        }
                    }
                }
                else {
                    this.drawImage(renderDetails);
                }
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    };
    /** Draws all given objects. */
    IsoDrawer.prototype.drawObjects = function (objects) {
        for (var i = 0; i < objects.length; i++) {
            var o = objects[i];
            if (o.hidden === false) {
                o.updatePosition();
                var renderDetails = o.getRenderDetails();
                if (o.rotation !== 0) {
                    this.translate(o, renderDetails);
                    this.rotate(o, renderDetails);
                    this.resetTranslation(o, renderDetails);
                }
                this.context.globalCompositeOperation = o.blendingMode;
                this.context.globalAlpha = o.alpha;
                if (renderDetails.type === "IsoObject" || renderDetails.type === "IsoSprite") {
                    if (o.ressource.ressource.type === IsoRessource.IMAGE) {
                        this.drawImage(renderDetails);
                    }
                }
                else if (renderDetails.type === "IsoEmitter") {
                    this.drawParticles(renderDetails, o);
                }
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    };
    /** Draws the particles of an emitter. */
    IsoDrawer.prototype.drawParticles = function (renderDetails, emitter) {
    };
    /** Draws all given texts. */
    IsoDrawer.prototype.drawTexts = function (objects) {
        for (var i = 0; i < objects.length; i++) {
            var o = objects[i];
            if (o.hidden === false) {
                o.updatePosition();
                var renderDetails = o.getRenderDetails();
                if (o.rotation !== 0) {
                    this.translate(o, renderDetails);
                    this.rotate(o, renderDetails);
                    this.resetTranslation(o, renderDetails);
                }
                this.context.globalCompositeOperation = o.blendingMode;
                this.context.globalAlpha = o.alpha;
                this.drawText(renderDetails);
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    };
    IsoDrawer.prototype.drawImage = function (renderDetails) {
        if (renderDetails["alpha"] !== undefined) {
            this.context.globalAlpha = renderDetails["alpha"];
        }
        this.context.drawImage(renderDetails.image, renderDetails.offset.x, renderDetails.offset.y, renderDetails.tileSize.width, renderDetails.tileSize.height, renderDetails.position.x, renderDetails.position.y, renderDetails.renderSize.width, renderDetails.renderSize.height);
    };
    IsoDrawer.prototype.drawText = function (renderDetails) {
        var actualColor = this.canvas.context.fillStyle;
        var actualFont = this.canvas.context.font;
        var actualAlign = this.canvas.context.textAlign;
        var actualBaseline = this.canvas.context.textBaseline;
        var actualDirection = this.canvas.context.direction;
        if (typeof renderDetails.size === "string")
            this.canvas.context.font = renderDetails.size + " " + renderDetails.font;
        else
            this.canvas.context.font = renderDetails.size + "px " + renderDetails.font;
        if (renderDetails.backgroundColor !== null && renderDetails.backgroundColor !== "transparent") {
            this.canvas.context.beginPath();
            var x = renderDetails.position.x;
            var y = renderDetails.position.y;
            if (renderDetails.align === IsoText.CENTER) {
                x = x - (renderDetails.renderSize.width / 2);
            }
            else if (renderDetails.align === IsoText.RIGHT) {
                x = x + renderDetails.renderSize.width;
            }
            this.canvas.context.rect(x, y, renderDetails.renderSize.width, renderDetails.renderSize.height);
            this.canvas.context.fillStyle = renderDetails.backgroundColor;
            this.canvas.context.fill();
        }
        this.canvas.context.direction = renderDetails.direction;
        this.canvas.context.textAlign = renderDetails.align;
        this.canvas.context.textBaseline = renderDetails.baseline;
        if (renderDetails.filled === true) {
            this.canvas.context.fillStyle = renderDetails.color;
            this.canvas.context.fontStyle = renderDetails.size + "px " + renderDetails.font;
            this.canvas.context.fillText(renderDetails.text, renderDetails.position.x, renderDetails.position.y);
        }
        if (renderDetails.filled === false || renderDetails.strokeWidth > 0 && renderDetails.strokeColor !== null && renderDetails.strokeColor !== "transparent") {
            this.canvas.context.fontStyle = renderDetails.size + "px " + renderDetails.font;
            this.canvas.context.lineWidth = renderDetails.strokeWidth;
            this.canvas.context.strokeStyle = renderDetails.strokeColor;
            this.canvas.context.strokeText(renderDetails.text, renderDetails.position.x, renderDetails.position.y);
        }
        this.canvas.context.fillStyle = actualColor;
        this.canvas.context.font = actualFont;
        this.canvas.context.textAlign = actualAlign;
        this.canvas.context.textBaseline = actualBaseline;
        this.canvas.context.direction = actualDirection;
    };
    /** Sets the anchor of an object. */
    IsoDrawer.prototype.translate = function (object, renderDetails) {
        this.context.translate(renderDetails.anchor.x, renderDetails.anchor.y);
    };
    /** Reset the anchor of an object. */
    IsoDrawer.prototype.resetTranslation = function (object, renderDetails) {
        this.context.translate(-renderDetails.anchor.x, -renderDetails.anchor.y);
    };
    /** Rotates an object. */
    IsoDrawer.prototype.rotate = function (object, renderDetails) {
        this.context.rotate(object.rotation * Math.PI / 180);
    };
    return IsoDrawer;
})();
var IsoEmitter = (function (_super) {
    __extends(IsoEmitter, _super);
    /** Creates a new particle emiter.*/
    function IsoEmitter(Engine, ressource) {
        _super.call(this, Engine);
        /** The maximum particle count. */
        this.particleCount = 100;
        /** The lifttime of a particle.*/
        this.lifetime = 1000;
        /** Sets how many particles will spreaded.*/
        this.spreadCount = 4;
        /** A simple seed number.*/
        this.variance = 100;
        /** The speed of the particles.*/
        this.particleSpeed = 1;
        /** Height of the emitter.*/
        this.height = 1;
        /** Width of the emitter.*/
        this.width = 1;
        /** Sets the typ of this object.*/
        this.type = "IsoEmitter";
        this.ressource = ressource;
    }
    IsoEmitter.prototype.update = function () {
    };
    IsoEmitter.prototype.emit = function () {
        var vector2d = new IsoVector2D();
        vector2d.createFromAngle(this.rotation, this.height);
    };
    IsoEmitter.prototype.getLifetime = function () {
        return this.lifetime;
    };
    IsoEmitter.prototype.getParticleCount = function () {
        return this.particleCount;
    };
    IsoEmitter.prototype.getParticleSpeed = function () {
        return this.particleSpeed;
    };
    IsoEmitter.prototype.getVariance = function () {
        return this.variance;
    };
    IsoEmitter.prototype.setLifetime = function (lifetime) {
        this.lifetime = lifetime;
        return this;
    };
    IsoEmitter.prototype.setParticleCount = function (count) {
        this.particleCount = count;
        return this;
    };
    IsoEmitter.prototype.setParticleSpeed = function (speed) {
        this.particleSpeed = speed;
        return this;
    };
    IsoEmitter.prototype.setVariance = function (variance) {
        this.variance = variance;
        return this;
    };
    IsoEmitter.prototype.setSpreadCount = function (count) {
        this.spreadCount = count;
        return this;
    };
    IsoEmitter.prototype.freeParticle = function (particle) {
        var f = false;
        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i] === particle) {
                f = true;
            }
            if (f === true) {
                this.particles[i - 1] = this.particles[i];
            }
        }
        this.particles.pop();
        return f;
    };
    return IsoEmitter;
})(IsoMinimalObject);
"use strict";
var IsoEvent = (function () {
    function IsoEvent(type) {
        this.type = type;
        return this;
    }
    IsoEvent.prototype.addData = function (data) {
        this.data = data;
        return this;
    };
    /**
     * @todo Find a solid solution */
    IsoEvent.prototype.trigger = function (target) {
        var d = document;
        if (d.createEventObject) {
            // dispatch for IE
            var evt = d.createEventObject();
            if (target !== undefined) {
                if (typeof target === "string") {
                    var e = document.querySelector(target);
                    e.fireEvent(this.type, event);
                }
                else {
                    var e = target;
                    e.fireEvent(this.type, event);
                }
            }
            else {
                d.fireEvent(event);
            }
        }
        else {
            // dispatch for firefox + others
            var evt2 = document.createEvent("HTMLEvents");
            evt2.initEvent(this.type, true, true); // event type,bubbling,cancelable
            if (target !== undefined) {
                if (typeof target === "string") {
                    document.querySelector(target).dispatchEvent(evt2);
                }
                else {
                    target.dispatchEvent(evt2);
                }
            }
            else {
                document.dispatchEvent(evt2);
            }
        }
    };
    IsoEvent.prototype.__c = function (target) {
        var event = new CustomEvent(this.type, { 'detail': this.data });
        event.initCustomEvent(this.type, false, false, this.data);
        if (target !== undefined) {
            if (typeof target === "string") {
                document.querySelector(target).dispatchEvent(event);
            }
            else {
                target.dispatchEvent(event);
            }
        }
        else {
            document.dispatchEvent(event);
        }
    };
    IsoEvent.prototype.__e = function (target) {
        var event = new Event(this.type, this.data);
        event.initEvent(this.type, false, false);
        if (target !== undefined) {
            if (typeof target === "string") {
                document.querySelector(target).dispatchEvent(event);
            }
            else {
                target.dispatchEvent(event);
            }
        }
        else {
            document.dispatchEvent(event);
        }
    };
    return IsoEvent;
})();
"use strict";
/// <reference path="IsoMinimalObject.ts" />
var IsoGroup = (function (_super) {
    __extends(IsoGroup, _super);
    function IsoGroup() {
        _super.apply(this, arguments);
    }
    IsoGroup.prototype.addItem = function (object) {
        this.items.push(object);
    };
    return IsoGroup;
})(IsoMinimalObject);
"use strict";
var IsoGui = (function () {
    function IsoGui(Engine) {
        this.Engine = Engine;
    }
    return IsoGui;
})();
///<reference path="IsoOn.ts" />
"use strict";
var IsoImage = (function (_super) {
    __extends(IsoImage, _super);
    function IsoImage(src, local) {
        if (local === void 0) { local = false; }
        _super.call(this);
        this.isLoaded = false;
        this.offset = new IsoPoint(0, 0);
        this.type = IsoRessource.IMAGE;
        if (name !== undefined && src !== undefined) {
            this.create(src);
        }
    }
    /**
     * Creates a new image.
     */
    IsoImage.prototype.create = function (src) {
        this.src = src;
        return this;
    };
    /**
     * Loads the image for further work.
     */
    IsoImage.prototype.load = function () {
        var _this = this;
        this.image = new Image();
        this.image.addEventListener("load", function (e) { return _this._onLoad(e); }, false);
        this.image.src = this.src;
    };
    /**
     * Called when the image file was loaded.
     */
    IsoImage.prototype._onLoad = function (event) {
        this.width = this.image.width;
        this.height = this.image.height;
        this.isLoaded = true;
        this.callOn("load");
    };
    /**
     * Returns the image.
     */
    IsoImage.prototype.get = function () {
        return this.image;
    };
    /**
     * Deletes the image.
     */
    IsoImage.prototype.free = function () {
        this.image = null;
        delete (this);
    };
    IsoImage.prototype.getWidth = function () {
        return this.width;
    };
    IsoImage.prototype.getHeight = function () {
        return this.height;
    };
    IsoImage.prototype.getOffset = function () {
        return this.offset;
    };
    IsoImage.prototype.setOffset = function (x, y) {
        this.offset.set(x, y);
    };
    return IsoImage;
})(IsoOn);
"use strict";
var IsoInput = (function () {
    function IsoInput(Engine) {
        var _this = this;
        this.isKeyEvent = false;
        this.isMouseEvent = false;
        this.isTouchEvent = false;
        this.Engine = Engine;
        document.addEventListener("IsoCanvasReady", function () { return _this.addEvents(); });
    }
    IsoInput.prototype.addEvents = function () {
        var _this = this;
        var el = window;
        el.onkeydown = function (event) { return _this.checkKeyboard(event); };
        el.onkeypress = function (event) { return _this.checkKeyboard(event); };
        el.onkeyup = function (event) { return _this.checkKeyboard(event); };
        el.onmousedown = function (event) { return _this.checkMouse(event); };
        el.onmousemove = function (event) { return _this.checkMouse(event); };
        el.onmouseup = function (event) { return _this.checkMouse(event); };
        el.onmousewheel = function (event) { return _this.checkMouse(event); };
    };
    IsoInput.prototype.checkKeyboard = function (event) {
        this.oldEvent = event;
        this.isKeyEvent = true;
        this.keyEventType = event.type;
        this.keyEvent = event;
        this.keyCode = event.which;
        this.keyChar = String.fromCharCode(this.keyCode);
        this.callCallback(event);
    };
    IsoInput.prototype.checkMouse = function (event) {
        this.oldEvent = event;
        this.isMouseEvent = true;
        this.mouseEvent = event;
        this.mouseEventType = event.type;
        this.mouseCode = event.which;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.mouseWheelDelta = event.wheelDelta || -event.detail;
        this.callCallback(event);
    };
    IsoInput.prototype.checkTouch = function (event) {
        this.oldEvent = event;
        this.isTouchEvent = true;
        this.touches = event.touches;
        this.touchEventType = event.type;
        this.callCallback(event);
    };
    IsoInput.prototype.reset = function () {
        this.isKeyEvent = false;
        this.isMouseEvent = false;
        this.isTouchEvent = false;
        this.keyChar = "";
        this.keyCode = undefined;
        this.keyEventType = undefined;
        this.mouseCode = 0;
        this.keyEvent = undefined;
        this.mouseEvent = undefined;
        this.mouseEventType = undefined;
        this.mouseWheelDelta = undefined;
        this.touches = undefined;
        this.touchEvent = undefined;
        this.touchEventType = "";
    };
    IsoInput.prototype.callCallback = function (event) {
        if (this.onInput !== undefined) {
            this.onInput.call(this, this.Engine, event);
        }
        if (event.type.replace("key", "") !== event.type && this.onKeyboard !== undefined) {
            this.onKeyboard.call(this, this.Engine, event);
        }
        if (event.type.replace("mouse", "") !== event.type && this.onMouse !== undefined) {
            this.onMouse.call(this, this.Engine, event);
        }
        if (event.type.replace("key", "") !== event.type && this.onTouch !== undefined) {
            this.onTouch.call(this, this.Engine, event);
        }
    };
    IsoInput.KEYDOWN = 40;
    IsoInput.KEYUP = 38;
    IsoInput.KEYLEFT = 37;
    IsoInput.KEYRIGHT = 39;
    IsoInput.KEYTAB = 9;
    IsoInput.KEYESCAPE = 27;
    IsoInput.KEYSPACE = 32;
    IsoInput.KEYENTER = 13;
    IsoInput.KEYCTRL = 17;
    IsoInput.KEYSHIFT = 16;
    IsoInput.KEYALT = 18;
    IsoInput.KEYBACKSPACE = 8;
    IsoInput.EVENT_KEYPRESS = "keypress";
    IsoInput.EVENT_KEYDOWN = "keydown";
    IsoInput.EVENT_KEYUP = "keyup";
    IsoInput.EVENT_MOUSEDOWN = "mousedown";
    IsoInput.EVENT_MOUSEUP = "mouseup";
    IsoInput.EVENT_MOUSEWHEEL = "mousewheel";
    return IsoInput;
})();
///<reference path="IsoObject.ts" />
///<reference path="IsoTileObject.ts" />
///<reference path="IsoSprite.ts" />
///<reference path="IsoTileMap.ts" />
"use strict";
var IsoLayer = (function () {
    /** Creates a new layer. */
    function IsoLayer(Engine, index, name) {
        /** Includes all objects like IsoObject, IsoText, IsoSprite, IsoAnimatedSprite. */
        this.objects = new Array();
        this.texts = new Array();
        /** Includes all billboards of  a layer. */
        this.billboards = new Array(); // isoBillboards
        /** Controls if the layer is hidden or not. */
        this.hidden = false;
        this.Engine = Engine;
        this.index = index;
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    /** Adds a new object to the layer */
    IsoLayer.prototype.addObject = function (name, image) {
        var o = new IsoObject(this.Engine, image, name);
        this.objects.push(o);
        return o;
    };
    /** Adds a new sprite to the layer. */
    IsoLayer.prototype.addSprite = function (name, image, tileObjectInfo) {
        var s = new IsoSprite(this.Engine, image, tileObjectInfo, name);
        this.objects.push(s);
        return s;
    };
    /** Adds a new text to the layer. */
    IsoLayer.prototype.addText = function (name, text) {
        var t = new IsoText(this.Engine, name, text);
        this.texts.push(t);
        return t;
    };
    /** Adds a new billboard to the layer. */
    IsoLayer.prototype.addBillboard = function (name, image) {
        var b = new IsoBillboard(this.Engine, image, name);
        this.billboards.push(b);
        return b;
    };
    /** Adds a new particle emitter. */
    IsoLayer.prototype.addEmitter = function (name, ressource) {
        var b = new IsoEmitter(this.Engine, ressource);
        b.name = name;
        this.objects.push(b);
        return b;
    };
    /** Adds a new animated sprite to the layer. */
    IsoLayer.prototype.addAnimatedSprite = function (name, image, tileObjectInfo) {
        var s = new IsoAnimatedSprite(this.Engine, image, tileObjectInfo, name);
        this.objects.push(s);
        return s;
    };
    /** Adds a new tilemap to the layer. */
    IsoLayer.prototype.addTileMap = function (name, image, tileWidth, tileHeight, map) {
        this.tileMap = new IsoTileMap(this.Engine, name, tileWidth, tileHeight, image, map);
        return this.tileMap;
    };
    /** Sets the name of the layer. */
    IsoLayer.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /** Gets a billboard by its name. */
    IsoLayer.prototype.getBillboard = function (name) {
        for (var i = 0; i < this.billboards.length; i++) {
            if (this.billboards[i].name === name) {
                return this.billboards[i];
            }
        }
        return undefined;
    };
    /** Gets a object by its name. */
    IsoLayer.prototype.getObject = function (name) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name === name) {
                return this.objects[i];
            }
        }
        return undefined;
    };
    /** Equal to IsoLayer.getObject. */
    IsoLayer.prototype.getSprite = function (name) {
        return this.getObject(name);
    };
    /** Equal to IsoLayer.getObject. */
    IsoLayer.prototype.getAnimatedSprite = function (name) {
        return this.getObject(name);
    };
    /** Equal to IsoLayer.getObject. */
    IsoLayer.prototype.getText = function (name) {
        for (var i = 0; i < this.texts.length; i++) {
            if (this.texts[i].name === name) {
                return this.texts[i];
            }
        }
        return undefined;
    };
    /** Gets the tilemap of the layer. */
    IsoLayer.prototype.getTileMap = function () {
        return this.tileMap;
    };
    /** Zoom all objects, tilemap and billboards of the layer. */
    IsoLayer.prototype.zoom = function (zoom) {
        if (this.tileMap !== undefined) {
            this.tileMap.zoom(zoom);
        }
        this.tileMap.update();
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].zoom(zoom);
        }
        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].zoom(zoom);
        }
    };
    /** Scrolls all objects, tilemap and billboards of the layer. */
    IsoLayer.prototype.scroll = function (deltaX, deltaY) {
        if (this.tileMap !== undefined) {
            this.tileMap.scroll(deltaX, deltaY);
        }
    };
    /** Rotates all objects, tilemap and billboards of the layer. */
    IsoLayer.prototype.rotate = function (degrees) {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].rotate(degrees);
        }
        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].rotate(degrees);
        }
    };
    /** Sets the zooming point of all objects, tilemap and billboards of the layer. */
    IsoLayer.prototype.setZoomPoint = function (point) {
        if (this.tileMap !== undefined) {
            this.tileMap.setZoomPoint(point);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].zoomPoint.set(point.x, point.y);
        }
        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].zoomPoint.set(point.x, point.y);
        }
    };
    /** Sets the speed of all objects, tilemap and billboards of the layer. */
    IsoLayer.prototype.setSpeed = function (speed) {
        if (this.tileMap !== undefined) {
            this.tileMap.setSpeed(speed);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].setSpeed(speed);
        }
        for (var i = 0; i < this.billboards.length; i++) {
            this.billboards[i].setSpeed(speed);
        }
    };
    /** Hides the layer. */
    IsoLayer.prototype.hide = function () {
        this.hidden = true;
        return this;
    };
    /** Show the layer. */
    IsoLayer.prototype.show = function () {
        this.hidden = false;
        return this;
    };
    /** Return true if the layer is hidden. Else false. */
    IsoLayer.prototype.isHidden = function () {
        return this.hidden;
    };
    /** Removes an object or sprite from the layer. */
    IsoLayer.prototype.freeObject = function (object) {
        var f = false;
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i] === object) {
                f = true;
            }
            if (f === true) {
                this.objects[i - 1] = this.objects[i];
            }
        }
        this.objects.pop();
        return f;
    };
    /** Removes an object from the layer. */
    IsoLayer.prototype.freeText = function (text) {
        var f = false;
        for (var i = 0; i < this.texts.length; i++) {
            if (this.texts[i] === text) {
                f = true;
            }
            if (f === true) {
                this.texts[i - 1] = this.texts[i];
            }
        }
        this.texts.pop();
        return f;
    };
    /** Removes a billboard from the layer. */
    IsoLayer.prototype.freeBillboard = function (billboard) {
        var f = false;
        for (var i = 0; i < this.billboards.length; i++) {
            if (this.billboards[i] === billboard) {
                f = true;
            }
            if (f === true) {
                this.billboards[i - 1] = this.billboards[i];
            }
        }
        this.billboards.pop();
        return f;
    };
    /** Removes the tilemap form the layer.*/
    IsoLayer.prototype.freeTileMap = function () {
        if (this.tileMap !== undefined && this.tileMap !== null) {
            this.tileMap = null;
            return true;
        }
        else {
            return false;
        }
    };
    return IsoLayer;
})();
///<reference path="IsoLayer.ts" />
"use strict";
var IsoLayers = (function () {
    function IsoLayers(Engine) {
        this.layers = new Array();
        this.Engine = Engine;
    }
    IsoLayers.prototype.add = function (name, index) {
        this.length++;
        if (index === undefined) {
            index = this.length - 1;
        }
        var l = new IsoLayer(this.Engine, index, name);
        this.layers.push(l);
        return l;
    };
    IsoLayers.prototype.get = function (name) {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].name === name) {
                return this.layers[i];
            }
        }
    };
    IsoLayers.prototype.sort = function () {
        this.layers.sort(this._sort);
    };
    IsoLayers.prototype._sort = function (layerA, layerB) {
        if (layerA.index > layerB.index) {
            return 1;
        }
        else if (layerA.index < layerB.index) {
            return -1;
        }
        else {
            return 0;
        }
    };
    IsoLayers.prototype.getByIndex = function (index) {
        return this.layers[index];
    };
    return IsoLayers;
})();
var IsoMapPoint = (function () {
    function IsoMapPoint(row, column) {
        if (row !== undefined) {
            this.row = row;
        }
        if (column !== undefined) {
            this.column = column;
        }
    }
    IsoMapPoint.prototype.set = function (row, column) {
        this.row = row;
        this.column = column;
    };
    IsoMapPoint.prototype.get = function () {
        return {
            row: this.row,
            column: this.column
        };
    };
    return IsoMapPoint;
})();
"use strict";
/**
 * IsoMapVector2D represents a point on the map.
 */
var IsoMapVector2D = (function (_super) {
    __extends(IsoMapVector2D, _super);
    /** Creates a new vector */
    function IsoMapVector2D(row, column) {
        _super.call(this, row, column);
    }
    /** Gets the distance between two points */
    IsoMapVector2D.prototype.getDistance = function (vec) {
        // c2 = a2 + b2 --> c = sqrt(a2 + b2) --> c = is distance
        return Math.sqrt(((this.column - vec.column) * (this.column - vec.column)) + ((this.row - vec.row) * (this.row - vec.row)));
    };
    return IsoMapVector2D;
})(IsoMapPoint);
///<reference path="IsoImage.ts" />
///<reference path="IsoOn.ts" />
"use strict";
;
var IsoRessource = (function (_super) {
    __extends(IsoRessource, _super);
    function IsoRessource(name, ressource) {
        _super.call(this);
        this.loaded = false;
        this.name = name;
        this.ressource = ressource;
        this.type = this.ressource.type;
    }
    IsoRessource.prototype.load = function () {
        var _this = this;
        this.ressource.on("load", function () { return _this.onload(); });
        this.ressource.load();
    };
    IsoRessource.prototype.onload = function () {
        this.loaded = true;
        this.fire(IsoRessource.ISO_EVENT_RESSOURCE_LOADED, this);
    };
    IsoRessource.prototype.get = function () {
        return this.ressource.get();
    };
    IsoRessource.ISO_EVENT_RESSOURCE_LOADED = "ISO_EVENT_RESSOURCE_LOADED";
    IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS = "ISO_EVENT_RESSOURCE_PROGRESS";
    IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS_ALL = "ISO_EVENT_RESSOURCE_PROGRESS_ALL";
    IsoRessource.IMAGE = "image";
    IsoRessource.AUDIO = "audio";
    IsoRessource.SHAPE = "SHAPE";
    return IsoRessource;
})(IsoOn);
///<reference path="IsoRessource.ts" />
///<reference path="IsoOn.ts" />
"use strict";
var IsoRessourceManager = (function (_super) {
    __extends(IsoRessourceManager, _super);
    function IsoRessourceManager(Engine) {
        var _this = this;
        _super.call(this);
        this.ressources = new Array();
        this.numberAutoload = 0;
        this.autoloaded = 0;
        this.Engine = Engine;
        this.onEvent(IsoRessource.ISO_EVENT_RESSOURCE_LOADED, function (event) { return _this._onProgress(event); });
    }
    IsoRessourceManager.prototype.add = function (name, ressource) {
        this.ressources.push(new IsoRessource(name, ressource));
        this.numberAutoload++;
    };
    IsoRessourceManager.prototype.onBeforeLoad = function (callback) {
        this.__beforeLoad = callback;
    };
    IsoRessourceManager.prototype._onBeforeLoad = function () {
        if (typeof this.__beforeLoad === "function") {
            this.__beforeLoad.call(this);
        }
    };
    IsoRessourceManager.prototype.get = function (name) {
        for (var i = 0; i < this.ressources.length; i++) {
            if (this.ressources[i].name === name) {
                return this.ressources[i];
            }
        }
    };
    IsoRessourceManager.prototype.load = function () {
        for (var i = 0; i < this.ressources.length; i++) {
            this.ressources[i].load();
        }
        return this;
    };
    IsoRessourceManager.prototype.onProgress = function (callback) {
        this.__onProgress = callback;
    };
    IsoRessourceManager.prototype._onProgress = function (event) {
        this.autoloaded++;
        var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS);
        e.trigger();
        if (typeof this.__onProgress === "function") {
            this.__onProgress.call(this, event);
        }
        if (this.autoloaded === this.numberAutoload) {
            this._onProgressAll();
        }
        return this;
    };
    IsoRessourceManager.prototype._then = function () {
        if (typeof this.__then === "function") {
            this.__then.call(this.Engine);
        }
    };
    IsoRessourceManager.prototype.then = function (callback) {
        this.__then = callback;
        return this;
    };
    IsoRessourceManager.prototype._onProgressAll = function () {
        var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS_ALL);
        e.trigger();
        if (typeof this.__onProgressAll === "function") {
            this.__onProgressAll.call(this, event);
        }
        this._then();
    };
    IsoRessourceManager.prototype.onProgressAll = function (callback) {
        this.__onProgressAll = callback;
    };
    return IsoRessourceManager;
})(IsoOn);
///<reference path="IsoConfig.ts" />
///<reference path="IsoCanvas.ts" />
///<reference path="IsoEvent.ts" />
///<reference path="IsoMap.ts" />
///<reference path="IsoRessourceManager.ts" />
///<reference path="IsoLayers.ts" />
///<reference path="IsoOn.ts" />
///<reference path="IsoDrawer.ts" />
"use strict";
/**
 * The mainclass of IsoMetric and the starting point for the gameloop.
 * @class IsoMetric
 * @constructor
 *
 */
var IsoMetric = (function (_super) {
    __extends(IsoMetric, _super);
    /** Creates a new instance of IsoMetric */
    function IsoMetric(windowOptions) {
        var _this = this;
        _super.call(this);
        /** A counter for frames */
        this.frameCount = 0;
        /** The frames per second */
        this.FPS = 0;
        /** The default canvas configuration. */
        this.defaultWindowOptions = {
            fullscreen: true,
            width: window.innerWidth,
            height: window.innerHeight
        };
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
        this.frameCountInteral = setInterval(function () { return _this.setFPS(); }, 1000);
    }
    /** Reset and set the FPS */
    IsoMetric.prototype.setFPS = function () {
        this.FPS = this.frameCount;
        this.frameCount = 0;
    };
    /** Starts the game- and drawing-loop. */
    IsoMetric.prototype.startLoop = function () {
        this.update();
    };
    /** Sets the FPS after the drawing-loop completed. */
    IsoMetric.prototype.endLoop = function () {
        var endLoop = new Date();
        this.frameTime = (endLoop.getMilliseconds() - this.startLoopTime.getMilliseconds());
        this.frameCount = this.frameCount + 1;
    };
    /** The game- and drawing-loop. */
    IsoMetric.prototype.update = function () {
        this.startLoopTime = new Date();
        this.drawer.update();
    };
    return IsoMetric;
})(IsoOn);
var IsoParticle = (function (_super) {
    __extends(IsoParticle, _super);
    /** Create a new particle. */
    function IsoParticle(Engine, ressource, position, velocity) {
        _super.call(this, Engine);
        /** number in milliseconds */
        this.lifetimeStart = 0;
        this.lifetimeEnd = 0;
        /** The velocity as an vector. */
        this.velocity = new IsoVector2D(0, 0);
        /** The position of the particle. */
        this.position = new IsoVector2D(0, 0);
        this.anchor = new IsoPoint(0, 0);
        this.ressource = ressource;
        this.velocity = velocity;
        this.position = position;
    }
    /** Moves the particle. */
    IsoParticle.prototype.move = function () {
        this.position.add(this.velocity);
        return this;
    };
    IsoParticle.prototype.getRenderDetails = function () {
    };
    IsoParticle.prototype.updatePosition = function () {
    };
    return IsoParticle;
})(IsoMinimalObject);
"use strict";
var IsoPoint = (function () {
    function IsoPoint(x, y) {
        if (x !== undefined) {
            this.x = x;
        }
        if (y !== undefined) {
            this.y = y;
        }
    }
    /** Sets or resets the point */
    IsoPoint.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /** Gets the point on the screen. */
    IsoPoint.prototype.get = function () {
        return this;
    };
    return IsoPoint;
})();
"use strict";
/**
 * An implementation of the MersenneTwister for TypeScript.
 * This library produces much better random numbers than Math.random().
 */
/**
 * Written for JavaScript by Sean McCullough (banksean@gmail.com).
 * Written for TypeScript by Benjamin Werner
 */
/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.
  
  If you want to use this as a substitute for Math.random(), use the random()
  method like so:
  
  var m = new MersenneTwister();
  var randomNumber = m.random();
  
  You can also call the other genrand_{foo}() methods on the instance.
  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:
  var m = new MersenneTwister(123);
  and that will always produce the same random sequence.
  Sean McCullough (banksean@gmail.com)
*/
/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.
 
   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).
 
   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.
 
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
 
     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
 
     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
 
     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.
 
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 
   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/
var MersenneTwister = (function () {
    function MersenneTwister(seed) {
        /* Period parameters */
        this.N = 624;
        this.M = 397;
        /** constant vector a */
        this.MATRIX_A = 0x9908b0df;
        /** most significant w-r bits */
        this.UPPER_MASK = 0x80000000;
        /** least significant r bits */
        this.LOWER_MASK = 0x7fffffff;
        /** the array for the state vector */
        this.mt = new Array(this.N);
        /** mti==N+1 means mt[N] is not initialized */
        this.mti = this.N + 1;
        if (seed === undefined) {
            seed = new Date().getTime();
        }
        this.init_genrand(seed);
    }
    MersenneTwister.prototype.init_genrand = function (s) {
        this.mt[0] = s >>> 0;
        for (this.mti = 1; this.mti < this.N; this.mti++) {
            var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
                + this.mti;
            /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
            /* In the previous versions, MSBs of the seed affect   */
            /* only MSBs of the array mt[].                        */
            /* 2002/01/09 modified by Makoto Matsumoto             */
            this.mt[this.mti] >>>= 0;
        }
    };
    MersenneTwister.prototype.init_by_array = function (init_key, key_length) {
        var i, j, k;
        this.init_genrand(19650218);
        i = 1;
        j = 0;
        k = (this.N > key_length ? this.N : key_length);
        for (; k; k--) {
            var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
            this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
                + init_key[j] + j; /* non linear */
            this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
            i++;
            j++;
            if (i >= this.N) {
                this.mt[0] = this.mt[this.N - 1];
                i = 1;
            }
            if (j >= key_length)
                j = 0;
        }
        for (k = this.N - 1; k; k--) {
            var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
            this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
                - i; /* non linear */
            this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
            i++;
            if (i >= this.N) {
                this.mt[0] = this.mt[this.N - 1];
                i = 1;
            }
        }
        this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
    };
    MersenneTwister.prototype.genrand_int32 = function () {
        var y;
        var mag01 = new Array(0x0, this.MATRIX_A);
        /* mag01[x] = x * MATRIX_A  for x=0,1 */
        if (this.mti >= this.N) {
            var kk;
            if (this.mti == this.N + 1)
                this.init_genrand(5489); /* a default initial seed is used */
            for (kk = 0; kk < this.N - this.M; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < this.N - 1; kk++) {
                y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
            this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
            this.mti = 0;
        }
        y = this.mt[this.mti++];
        /* Tempering */
        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);
        return y >>> 0;
    };
    MersenneTwister.prototype.genrand_int31 = function () {
        return (this.genrand_int32() >>> 1);
    };
    /** Generates an number between 0 and 1. */
    MersenneTwister.prototype.genrand_real1 = function () {
        return this.genrand_int32() * (1.0 / 4294967295.0);
        /* divided by 2^32-1 */
    };
    MersenneTwister.prototype.random = function () {
        return this.genrand_int32() * (1.0 / 4294967296.0);
        /* divided by 2^32 */
    };
    MersenneTwister.prototype.genrand_real3 = function () {
        return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
        /* divided by 2^32 */
    };
    MersenneTwister.prototype.genrand_res53 = function () {
        var a = this.genrand_int32() >>> 5, b = this.genrand_int32() >>> 6;
        return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
    };
    return MersenneTwister;
})();
"use strict";
var IsoText = (function (_super) {
    __extends(IsoText, _super);
    /** Creates a new text object. */
    function IsoText(Engine, name, text) {
        _super.call(this, Engine);
        /** Font of the text */
        this.font = "sans serif";
        /** The stroke width. */
        this.strokeWidth = 0;
        /** The font size of the text in pixel. Default is 10. */
        this.size = 10;
        /** The fill style. If true the text is filled, else its stroked. */
        this.filled = true;
        /** The direction of the text. Possible values are IsoText.INHERIT, IsoText.LEFTTORIGHT or IsoText.RIGHTTOLEFT. Default is IsoText.INHERIT. */
        this.direction = IsoText.INHERIT;
        /** The baseline of the text. Possible values are IsoText.TOP, IsoText.HANGING, IsoText.MIDDLE, IsoText.ALPHABETIC, IsoText.IDEOGRAPHIC and IsoText.BOTTOM. The default is IsoText.ALPHABETIC. */
        this.baseline = IsoText.ALPHABETIC;
        /** The allignment of the text. Possible values are IsoText.START, IsoText.END, IsoText.LEFT, IsoText.RIGHT or IsoText.CENTER. Default is IsoText.START. */
        this.align = IsoText.START;
        this.name = name;
        this.text = text;
        return this;
    }
    /** Sets the text. */
    IsoText.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    /** Sets the font-size of the text. size can be a number in pixel or a string. */
    IsoText.prototype.setSize = function (size) {
        this.size = size;
        return this;
    };
    /** Sets the value of the color red of the text. red is a value between 0 and 255. */
    IsoText.prototype.setColorRed = function (red) {
        this.colorRGB.red = red;
        return this;
    };
    /** Sets the value of the color green of the text. green is a value between 0 and 255. */
    IsoText.prototype.setColorGreen = function (green) {
        this.colorRGB.green = green;
        return this;
    };
    /** Sets the value of the color blue of the text. blue is a value between 0 and 255. */
    IsoText.prototype.setColorBlue = function (blue) {
        this.colorRGB.blue = blue;
        return this;
    };
    /** Sets the value of the background color red of the text. red is a value between 0 and 255. */
    IsoText.prototype.setBackgroundColorRed = function (red) {
        this.backgroundColorRGB.red = red;
        return this;
    };
    /** Sets the value of the background color green of the text. green is a value between 0 and 255. */
    IsoText.prototype.setBackgroundColorGreen = function (green) {
        this.backgroundColorRGB.green = green;
        return this;
    };
    /** Sets the value of the background color blue of the text. blue is a value between 0 and 255. */
    IsoText.prototype.setBackgroundColorBlue = function (blue) {
        this.backgroundColorRGB.blue = blue;
        return this;
    };
    /** Sets the value of the stroke color red of the text. red is a value between 0 and 255. */
    IsoText.prototype.setStrokeColorRed = function (red) {
        this.strokeColorRGB.red = red;
        return this;
    };
    /** Sets the value of the stroke color green of the text. green is a value between 0 and 255. */
    IsoText.prototype.setStrokeColorGreen = function (green) {
        this.strokeColorRGB.green = green;
        return this;
    };
    /** Sets the value of the stroke color blue of the text. blue is a value between 0 and 255. */
    IsoText.prototype.setStrokeColorBlue = function (blue) {
        this.strokeColorRGB.blue = blue;
        return this;
    };
    /** Sets the color of a text. color can be a hex value or an object of IsoColor. */
    IsoText.prototype.setColor = function (color) {
        if (typeof color === "string") {
            this.color = color;
            if (color === "transparent")
                this.colorRGB = null;
            else
                this.colorRGB = this.hexToRGB(color);
        }
        else {
            this.colorRGB = color;
            this.color = this.rgbToHex(color.red, color.green, color.blue);
        }
        return this;
    };
    /** Sets te background color of the text. color can be a hex value or an object of IsoColor. */
    IsoText.prototype.setBackgroundColor = function (color) {
        if (typeof color === "string") {
            this.backgroundColor = color;
            if (color === "transparent")
                this.backgroundColorRGB = null;
            else
                this.backgroundColorRGB = this.hexToRGB(color);
        }
        else {
            this.backgroundColorRGB = color;
            this.backgroundColor = this.rgbToHex(color.red, color.green, color.blue);
        }
        return this;
    };
    /** Sets the stroke color of a text. color can be a hex value or an object of IsoColor. */
    IsoText.prototype.setStrokeColor = function (color) {
        if (typeof color === "string") {
            this.strokeColor = color;
            if (color === "transparent")
                this.strokeColorRGB = null;
            else
                this.strokeColorRGB = this.hexToRGB(color);
        }
        else {
            this.strokeColorRGB = color;
            this.strokeColor = this.rgbToHex(color.red, color.green, color.blue);
        }
        return this;
    };
    /** Sets the stroke width of the text. */
    IsoText.prototype.setStrokeWidth = function (width) {
        this.strokeWidth = width;
        return this;
    };
    /** Sets the font of the text.*/
    IsoText.prototype.setFont = function (font) {
        this.font = font;
        return this;
    };
    /** Sets if the text is filled or not. */
    IsoText.prototype.setFilled = function (fill) {
        this.filled = fill;
        return this;
    };
    /** Sets the direction of the text. */
    IsoText.prototype.setDirection = function (direction) {
        this.direction = direction;
        return this;
    };
    /** Sets the baseline of the text. */
    IsoText.prototype.setBaseline = function (baseline) {
        this.baseline = baseline;
        return this;
    };
    /** Sets the allignment of the text. */
    IsoText.prototype.setAlign = function (align) {
        this.align = align;
        return this;
    };
    /** Gets the allignment of the text. */
    IsoText.prototype.getAlign = function () {
        return this.align;
    };
    /** Gets the baseline of the text. */
    IsoText.prototype.getBaseline = function () {
        return this.baseline;
    };
    /** Gets the direction of the text. */
    IsoText.prototype.getDirection = function () {
        return this.direction;
    };
    /** Gets if the text is filled or not. */
    IsoText.prototype.getFilled = function () {
        return this.filled;
    };
    /** Returns the text.*/
    IsoText.prototype.getText = function () {
        return this.text;
    };
    /** Returns the size of the text. The returnd value can be a number or a string.*/
    IsoText.prototype.getSize = function () {
        return this.size;
    };
    /** Returns the color of the text as an IsoColor object.*/
    IsoText.prototype.getColorRGB = function () {
        return this.colorRGB;
    };
    /** Returns the background color of the text as an IsoColor object.*/
    IsoText.prototype.getBackgroundColorRGB = function () {
        return this.backgroundColorRGB;
    };
    /** Returns the stroke color of the text as an IsoColor object.*/
    IsoText.prototype.getStrokeColorRGB = function () {
        return this.strokeColorRGB;
    };
    /** Retruns the font.*/
    IsoText.prototype.getFont = function () {
        return this.font;
    };
    /** Gets the stroke width of the text. */
    IsoText.prototype.getStrokeWidth = function () {
        return this.strokeWidth;
    };
    /**
     * Converts a hex value to a RGB-color and return it.
     * Code by Time Down @ stackoverflow.com
     * @see http://www.stackoverflow.com/user/96100/tim-down
     */
    IsoText.prototype.hexToRGB = function (hex) {
        var shortFormRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shortFormRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return rgb ? {
            red: parseInt(rgb[1], 16),
            green: parseInt(rgb[2], 16),
            blue: parseInt(rgb[3], 16)
        } : undefined;
    };
    /**
     * Converts a RGB-color to a hex value and return it.
     * Code by Time Down @ stackoverflow.com
     * @see http://www.stackoverflow.com/user/96100/tim-down
     */
    IsoText.prototype.rgbToHex = function (r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    IsoText.prototype.ptToPx = function (size) {
        size = size.replace(/([0-9]+)pt/g, function (m, g) {
            return Math.round(parseInt(g, 10) * (96 / 72)) + "px";
        });
        return size;
    };
    /** Gets the position on the screen. */
    IsoText.prototype.getAbsolutePosition = function () {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y + this.scrollPosition.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return new IsoVector2D(x, y);
    };
    /** Gets the original dimension of a text in pixel. @todo convert %, pt, em to px */
    IsoText.prototype.getOriginalDimension = function () {
        // Gets the font for reseting later
        var fontSize = this.Engine.canvas.context.font;
        var baseline = this.Engine.canvas.context.textBaseline;
        var align = this.Engine.canvas.context.textAlign;
        var direction = this.Engine.canvas.context.direction;
        // Configure the use font to get the right size.
        this.Engine.canvas.context.font = this.size + "px " + this.font;
        this.Engine.canvas.context.textBaseline = this.baseline;
        this.Engine.canvas.context.textAlign = this.align;
        this.Engine.canvas.context.direction = this.direction;
        var width = 0;
        var height = 0;
        if (this.text !== undefined) {
            var m = this.Engine.canvas.context.measureText(this.text);
            width = m.width;
            height = this.size;
        }
        // Reset the font 
        this.Engine.canvas.context.font = fontSize;
        this.Engine.canvas.context.textBaseline = baseline;
        this.Engine.canvas.context.align = align;
        this.Engine.canvas.context.direction = direction;
        return {
            width: width,
            height: height
        };
    };
    /** Gets the dimension of the object on the screen. */
    IsoText.prototype.getAbsoluteDimension = function () {
        var dimension = this.getOriginalDimension();
        return {
            width: dimension.width * this.zoomLevel * this.scale.factorX,
            height: dimension.height * this.zoomLevel * this.scale.factorY
        };
    };
    /** Gets all important information for rendering an object. */
    IsoText.prototype.getRenderDetails = function () {
        var dimension = this.getOriginalDimension();
        var fx = this.anchor.x / dimension.width * this.scale.factorX, fy = this.anchor.y / dimension.height * this.scale.factorY;
        var backgroundColor = null;
        var color = null;
        var strokeColor = null;
        if (this.colorRGB !== undefined && this.colorRGB !== null) {
            color = this.rgbToHex(this.colorRGB.red, this.colorRGB.green, this.colorRGB.blue);
        }
        if (this.backgroundColorRGB !== undefined && this.backgroundColorRGB !== null) {
            backgroundColor = this.rgbToHex(this.backgroundColorRGB.red, this.backgroundColorRGB.green, this.backgroundColorRGB.blue);
        }
        if (this.strokeColorRGB !== undefined && this.strokeColorRGB !== null) {
            strokeColor = this.rgbToHex(this.strokeColorRGB.red, this.strokeColorRGB.green, this.strokeColorRGB.blue);
        }
        return {
            position: this.getAbsolutePosition(),
            renderSize: this.getAbsoluteDimension(),
            anchor: new IsoPoint((this.position.x + (dimension.width * this.scale.factorX * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (dimension.height * this.scale.factorY * this.zoomLevel * fy * this.scale.factorY))),
            text: this.text,
            offset: this.offset.get(),
            zoomLevel: this.zoomLevel,
            color: color,
            backgroundColor: backgroundColor,
            strokeColor: strokeColor,
            strokeWidth: this.strokeWidth,
            align: this.align,
            filled: this.filled,
            baseline: this.baseline,
            direction: this.direction,
            size: this.size,
            font: this.font,
            type: "IsoText"
        };
    };
    IsoText.INHERIT = "inherit";
    IsoText.LEFTTORIGHT = "ltr";
    IsoText.RIGHTTOLEFT = "rtl";
    IsoText.TOP = "top";
    IsoText.HANGING = "hanging";
    IsoText.MIDDLE = "middle";
    IsoText.ALPHABETIC = "alphabetic";
    IsoText.IDEOGRAPHIC = "ideograpic";
    IsoText.BOTTOM = "bottom";
    IsoText.LEFT = "left";
    IsoText.RIGHT = "right";
    IsoText.START = "start";
    IsoText.END = "end";
    IsoText.CENTER = "center";
    return IsoText;
})(IsoMinimalObject);
"use strict";
var IsoPhysicsManager = (function () {
    function IsoPhysicsManager() {
        /** Includes all registered rigid bodies */
        this.rigidBodies = new Array();
        /** Includes all registred mass bodies */
        this.massBodies = new Array();
        /** The global gravity */
        this.gravity = 0.2;
    }
    /** Registers a new mass body */
    IsoPhysicsManager.prototype.addMassBody = function (object) {
        this.massBodies.push(object);
    };
    /** Registers a new rigid body */
    IsoPhysicsManager.prototype.addRigidBody = function (object) {
        this.rigidBodies.push(object);
    };
    /** Removes a rigid body */
    IsoPhysicsManager.prototype.removeRigidBody = function (object) {
        var __i;
        for (var i = 0; i < this.rigidBodies.length; i++) {
            if (this.rigidBodies[i] === object) {
                __i = i;
            }
            if (__i !== undefined) {
                if (this.rigidBodies[i + 1] !== undefined) {
                    this.rigidBodies[i] = this.rigidBodies[i + 1];
                }
            }
        }
    };
    /** Removes a mass body */
    IsoPhysicsManager.prototype.removeMassBody = function (object) {
        var __i;
        for (var i = 0; i < this.massBodies.length; i++) {
            if (this.massBodies[i] === object) {
                __i = i;
            }
            if (__i !== undefined) {
                if (this.massBodies[i + 1] !== undefined) {
                    this.massBodies[i] = this.massBodies[i + 1];
                }
            }
        }
    };
    /** Sets the global gravity */
    IsoPhysicsManager.prototype.setGravity = function (g) {
        this.gravity = g;
    };
    /**
    * Updates the physics.
    * @todo find a much better solution
    * @todo implement more physics
    */
    IsoPhysicsManager.prototype.update = function () {
        for (var i = 0; i < this.massBodies.length; i++) {
            if (this.massBodies[i] !== undefined) {
                this.massBodies[i].velocity.y += this.gravity * 2;
                var collides = false;
                for (var j = 0; j < this.rigidBodies.length; j++) {
                    if (this.rigidBodies[j] !== undefined && this.massBodies[i].collide(this.rigidBodies[j])) {
                        this.massBodies[i].velocity.y = 0;
                        if ((this.massBodies[i].rigidBody.y + this.massBodies[i].rigidBody.height) > this.rigidBodies[j].rigidBody.y) {
                            if ((this.massBodies[i].rigidBody.y + this.massBodies[i].rigidBody.height) - this.rigidBodies[j].rigidBody.y < 5) {
                                this.massBodies[i].position.y -= (this.massBodies[i].rigidBody.y + this.massBodies[i].rigidBody.height) - this.rigidBodies[j].rigidBody.y;
                            }
                            else if ((this.massBodies[i].rigidBody.y + this.massBodies[i].rigidBody.height) - this.rigidBodies[j].rigidBody.y >= 5) {
                                if ((this.massBodies[i].rigidBody.x < this.rigidBodies[j].rigidBody.x + this.rigidBodies[j].rigidBody.width) &&
                                    (this.massBodies[i].rigidBody.x + this.massBodies[i].rigidBody.width > this.rigidBodies[j].rigidBody.x + this.rigidBodies[j].rigidBody.width)) {
                                    this.massBodies[i].position.x += (this.rigidBodies[j].rigidBody.x + this.rigidBodies[j].rigidBody.width) - this.massBodies[i].rigidBody.x;
                                }
                                else if ((this.massBodies[i].rigidBody.x + this.massBodies[i].rigidBody.width > this.rigidBodies[j].rigidBody.x) &&
                                    (this.massBodies[i].rigidBody.x + this.massBodies[i].rigidBody.width < this.rigidBodies[j].rigidBody.x + this.rigidBodies[j].rigidBody.width)) {
                                    this.massBodies[i].position.x += this.rigidBodies[j].rigidBody.x - (this.massBodies[i].rigidBody.x + this.massBodies[i].rigidBody.width);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    return IsoPhysicsManager;
})();
"use strict";
/**
 * IsoVector2D represents a point on the screen.
 */
var IsoVector2D = (function (_super) {
    __extends(IsoVector2D, _super);
    /** Creates a new vector */
    function IsoVector2D(x, y) {
        _super.call(this, x, y);
    }
    /** Gets the distance between two points */
    IsoVector2D.prototype.getDistance = function (vec) {
        // c2 = a2 + b2 --> c = sqrt(a2 + b2) --> c = is distance
        return Math.sqrt(((this.x - vec.x) * (this.x - vec.x)) + ((this.y - vec.y) * (this.y - vec.y)));
    };
    /** Gets the length of a vector. */
    IsoVector2D.prototype.getMagnitude = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    /** Gets the angle of a vector. */
    IsoVector2D.prototype.getAngle = function () {
        return Math.atan2(this.y, this.x);
    };
    /** Sets the vector from an angle and a length.*/
    IsoVector2D.prototype.createFromAngle = function (angle, length) {
        this.x = length * Math.cos(angle);
        this.y = length * Math.sin(angle);
    };
    IsoVector2D.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };
    return IsoVector2D;
})(IsoPoint);
//# sourceMappingURL=isometric.js.map