"use strict";
///<reference path="IsoBlendingModes.ts" />
var IsoObject = (function () {
    function IsoObject(Engine, image, name) {
        this.position = { x: 0, y: 0 };
        this.scrollPosition = { x: 0, y: 0 };
        this.offset = { x: 0, y: 0 };
        this.zoomLevel = 1;
        this.zoomStrength = 1 / 1000;
        this.zoomPoint = { x: 0, y: 0 };
        /**
         * Rotation in degrees
         */
        this.rotation = 0;
        this.collisionType = "box";
        this.collisionResolution = 0;
        this.speed = 1;
        this.anchor = { x: 0, y: 0 };
        this.blendingMode = IsoBlendingModes.NORMAL;
        this.alpha = 1;
        this.hidden = false;
        this.properties = {};
        this.mass = 0;
        this.friction = 1;
        this.velocity = { x: 0, y: 0 };
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
        }
        catch (e) {
            throw ("Can not create object with error message: " + e);
        }
    }
    IsoObject.prototype.addAnimation = function (name, attribute, endValue, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.Engine.animation.addAnimation(name, this, attribute, endValue, duration, easing, type, callbacks);
        return this;
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
    IsoObject.prototype.getOffset = function () {
        return this.offset;
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
        return this.image.image.width;
    };
    IsoObject.prototype.getPosition = function () {
        return this.position;
    };
    IsoObject.prototype.getProperty = function (name) {
        return this.properties[name];
    };
    IsoObject.prototype.getProperties = function () {
        return this.properties;
    };
    IsoObject.prototype.getRelativePosition = function () {
        var x = 0, y = 0;
        x = ((this.position.x + this.offset.x) * this.zoomLevel) + (this.zoomPoint.x * this.zoomLevel - this.zoomPoint.x);
        y = ((this.position.y + this.offset.y) * this.zoomLevel) + (this.zoomPoint.y * this.zoomLevel - this.zoomPoint.y);
        return {
            x: x,
            y: y
        };
    };
    IsoObject.prototype.getRelativeDimension = function () {
        return {
            width: this.getOriginalDimension().width * this.zoomLevel,
            height: this.getOriginalDimension().height * this.zoomLevel
        };
    };
    IsoObject.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.width, fy = this.anchor.y / this.height;
        return {
            position: this.getRelativePosition(),
            tileSize: this.getOriginalDimension(),
            renderSize: {
                width: this.width * this.zoomLevel,
                height: this.height * this.zoomLevel
            },
            anchor: { x: (this.position.x + (this.width * this.zoomLevel * fx)), y: (this.position.y + (this.height * this.zoomLevel * fy)) },
            image: this.image.image.get(),
            offset: this.getOffset(),
            zoomLevel: this.zoomLevel
        };
    };
    IsoObject.prototype.getRotation = function () {
        return this.rotation;
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
    // @todo implement pixel-box-collision
    IsoObject.prototype.isPixelBoxCollision = function (sourceObject, targetCoords) {
        return false;
    };
    // @todo implement pixel-collision
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
    IsoObject.prototype.rotate = function (degrees) {
        this.rotation = this.rotation + degrees;
        return this;
    };
    IsoObject.prototype.scroll = function (deltaX, deltaY) {
        this.scrollPosition.x = this.scrollPosition.x + (deltaX * this.speed);
        this.scrollPosition.y = this.scrollPosition.y + (deltaY * this.speed);
        return this;
    };
    IsoObject.prototype.setAlpha = function (alpha) {
        this.alpha = alpha;
        return this;
    };
    IsoObject.prototype.setAnchor = function (x, y) {
        this.anchor = { x: x, y: y };
        return this;
    };
    IsoObject.prototype.setBlendingMode = function (blendingMode) {
        this.blendingMode = blendingMode;
        return this;
    };
    IsoObject.prototype.setHeight = function (height) {
        this.height = height;
        return this;
    };
    IsoObject.prototype.setImage = function (image) {
        this.image = image;
        return this;
    };
    IsoObject.prototype.setFriction = function (friction) {
        this.friction = friction;
        return this;
    };
    IsoObject.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    IsoObject.prototype.setOffset = function (offsetX, offsetY) {
        this.offset.x = offsetX;
        this.offset.y = offsetY;
        return this;
    };
    IsoObject.prototype.setPosition = function (position) {
        this.position.x = position.x;
        this.position.y = position.y;
        return this;
    };
    IsoObject.prototype.setProperty = function (name, value) {
        this.properties[name] = value;
        return this;
    };
    IsoObject.prototype.setProperties = function (properties) {
        this.properties = properties;
        return this;
    };
    IsoObject.prototype.setRotation = function (degrees) {
        this.rotation = degrees;
        return this;
    };
    IsoObject.prototype.setScroll = function (x, y) {
        this.scrollPosition.x = x;
        this.scrollPosition.y = y;
        return this;
    };
    IsoObject.prototype.setSize = function (width, height) {
        this.width = width;
        // this.height = height;
        return this;
    };
    IsoObject.prototype.setSpeed = function (speed) {
        this.speed = speed;
        return this;
    };
    IsoObject.prototype.setWidth = function (width) {
        this.width = width;
        return this;
    };
    IsoObject.prototype.setZoomPoint = function (position) {
        this.zoomPoint = position;
        return this;
    };
    IsoObject.prototype.setZoomLevel = function (zoomLevel) {
        this.zoomLevel = zoomLevel;
        return this;
    };
    IsoObject.prototype.setZoomStrength = function (zoomStrength) {
        this.zoomStrength = this.zoomStrength / 1000;
        return this;
    };
    IsoObject.prototype.zoom = function (zoom) {
        this.setZoomLevel(this.zoomLevel + (zoom * this.zoomStrength));
        return this;
    };
    IsoObject.prototype.play = function (name) {
        this.Engine.animation.play(name, this);
        return this;
    };
    IsoObject.prototype.stop = function (name) {
        this.Engine.animation.stop(name, this);
        return this;
    };
    IsoObject.prototype.resume = function (name) {
        this.Engine.animation.resume(name, this);
        return this;
    };
    IsoObject.prototype.pause = function (name) {
        this.Engine.animation.pause(name, this);
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
})();
///<reference path="IsoObject.ts" />
"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoTileObject = (function (_super) {
    __extends(IsoTileObject, _super);
    function IsoTileObject(Engine, image, tileInfo) {
        _super.call(this, Engine, image);
        this.tileOffset = { x: 0, y: 0 };
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
    IsoTileObject.prototype.setTileOffset = function (offset) {
        this.tileOffset = offset;
        return this;
    };
    IsoTileObject.prototype.getTileOffset = function () {
        return this.tileOffset;
    };
    IsoTileObject.prototype.getRelativePosition = function () {
        var x = 0, y = 0;
        x =
            ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
                - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x);
        y =
            ((this.position.y + this.offset.y + this.scrollPosition.y + this.tileHeight) * this.zoomLevel)
                - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y);
        return {
            x: x,
            y: y
        };
    };
    IsoTileObject.prototype.getRelativeDimension = function () {
        return {
            width: this.tileSize.width * this.zoomLevel,
            height: this.tileSize.height * this.zoomLevel
        };
    };
    IsoTileObject.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.tileSize.width, fy = this.anchor.y / this.tileSize.height;
        return {
            position: this.getRelativePosition(),
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: { x: (this.position.x + (this.tileSize.width * this.zoomLevel * fx)), y: (this.position.y + (this.tileSize.height * this.zoomLevel * fy)) },
            image: this.image.image.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel
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
            image: this.image.image.get()
        };
    };
    IsoTileObject.prototype.setTile = function (tile) {
        try {
            this.tileOffset = { x: 0, y: 0 };
            this.tile = tile + this.startTile;
            this.tileOffset.x =
                (this.tile % (this.width / this.tileSize.width)) * (this.tileSize.width + this.image.image.offset.x);
            this.tileOffset.y =
                (Math.floor(this.tile / (this.width / this.tileSize.width))) * (this.tileSize.height + this.image.image.offset.y);
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
        this.tileHeight = 0;
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
    IsoTile.prototype.getRelativePosition = function () {
        var x = 0, y = 0;
        x =
            ((this.position.x + this.offset.x + this.scrollPosition.x) * this.zoomLevel)
                - ((this.zoomPoint.x * this.zoomLevel) - this.zoomPoint.x) + (this.mapPosition.column * this.tileSize.width * this.zoomLevel);
        y =
            ((this.position.y + this.offset.y + this.scrollPosition.y + this.tileHeight) * this.zoomLevel)
                - ((this.zoomPoint.y * this.zoomLevel) - this.zoomPoint.y) + (this.mapPosition.row * this.tileSize.height * this.zoomLevel) - this.tileHeight;
        return {
            x: x,
            y: y
        };
    };
    IsoTile.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.tileSize.width, fy = this.anchor.y / this.tileSize.height;
        return {
            position: this.getRelativePosition(),
            mapPosition: this.mapPosition,
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: { x: (this.getRelativePosition().x + (this.tileSize.width * this.zoomLevel * fx)), y: (this.getRelativePosition().y + (this.tileSize.height * this.zoomLevel * fy)) },
            image: this.image.image.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel
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
     * @param {IsoMetric} Engine
     * @param {string} [name]
     * @param {number} [tileWidth]
     * @param {number} [tileHeight]
     * @param {IsoRessource} [image]
     * @param {Array<Array<Array<number>>>} [map]
     * @chainable
     */
    function IsoTileMap(Engine, name, tileWidth, tileHeight, image, map) {
        this.tiles = new Array();
        this.speed = 1;
        this.zoomLevel = 1;
        this.zoomStrength = 1 / 1000;
        this.zoomPoint = { x: 0, y: 0 };
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
        this.setOffset({ x: 0, y: 0 });
        this.setScroll(0, 0);
        return this;
    }
    /**
     * Sets the map of the tilemap
     * @param {Array<Array<Array<number>>>} map The new map
     * @chainable
     */
    IsoTileMap.prototype.setMap = function (map) {
        this.map = new IsoMap(map);
        return this;
    };
    /**
     * Create a new empty map
     * @param {number} numTilesX The number of tiles on the X-axis
     * @param {number} numTilesY The number of tiles on the Y-axis
     * @param {Array<number>} [defaultValue] The default value of each new tile.
     * @chainable
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
     * @chainable
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
                            mapPosition: {
                                column: x,
                                row: y
                            }
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
     * @param {string} name Name of the tile.
     * @return {IsoTIle} The tile.
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
     * Returns all tiles which are visible on the screen
     * @return {IsoTilesInView} All tiles wich are visible on the screen.
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
     * @param x The position on the X-axis of the area
     * @param y The position on the Y-axis of the area
     * @param width The width of the area
     * @param height The height of the area
     * @return An object with information of all tiles
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
     * @param {IsoPoint} position The position to check.
     * @return {IsoTile} The tile on the given position.
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
     * @param {IsoRessource} image
     * @chainable
     */
    IsoTileMap.prototype.setImage = function (image) {
        this.image = image;
        return this;
    };
    /**
     * Sets the maximum value for zooming.
     * @param {number} zoomLevel
     * @chainable
     */
    IsoTileMap.prototype.setMaxZoomLevel = function (zoomLevel) {
        this.maxZoomLevel = zoomLevel;
        return this;
    };
    /**
     * Sets the minimum value for zooming.
     * @param {number} zoomLevel
     * @chainable
     */
    IsoTileMap.prototype.setMinZoomLevel = function (zoomLevel) {
        this.minZoomLevel = zoomLevel;
        return this;
    };
    /**
     * Sets the name of the tilemap
     * @param {string} name
     * @chainable
     */
    IsoTileMap.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /**
     * Sets the offset of the tilemap
     * @param {IsoOffset} offset
     * @chainable
     */
    IsoTileMap.prototype.setOffset = function (o) {
        this.offset = o;
        return this;
    };
    /**
     * Sets the scroll-position of the tilemap.
     * @param {number} x The x-position.
     * @param {number} y The y-position.
     * @chainable
     */
    IsoTileMap.prototype.setScroll = function (x, y) {
        this.scrollPosition = { x: x, y: y };
        return this;
    };
    /**
     * Sets the speed  for scrolling and moving for the tilemap.
     * @param {number} speed
     * @chainable
     */
    IsoTileMap.prototype.setSpeed = function (speed) {
        this.speed = speed;
        return this;
    };
    /**
     * Scrolls the tilemap relative to the actual position.
     * @param {number} x The relative position on the x-axis.
     * @param {number} y The relative position on the y-axis.
     * @chainable
     */
    IsoTileMap.prototype.scroll = function (x, y) {
        x = x + this.scrollPosition.x;
        y = y + this.scrollPosition.y;
        this.scrollPosition = {
            x: x,
            y: y
        };
        return this;
    };
    /**
     * Sets the tilesize of the tilemap.
     * @param {IsoTileSize} size The new size.
     * @chainable
     */
    IsoTileMap.prototype.setTileSize = function (size) {
        this.tileSize = size;
        return this;
    };
    /**
     * Sets the zoomLevel of the tilemap.
     * @param {number} zoomLevel
     * @chainable
     */
    IsoTileMap.prototype.setZoomLevel = function (zoomLevel) {
        this.zoomLevel = zoomLevel;
        return this;
    };
    /**
     * Sets the zooming point of the tilemap.
     * @param {IsoPoint} point
     * @chainable
     */
    IsoTileMap.prototype.setZoomPoint = function (point) {
        this.zoomPoint = point;
        return this;
    };
    /**
     * Sets the strength of zooming.
     * @param {number} zoomStrength
     * @chainable
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
                tile.setZoomPoint(this.zoomPoint);
            }
            else if (tile.updateType === IsoTile.POSITION) {
                tile.offset = this.offset;
                tile.scrollPosition = this.scrollPosition;
            }
            else if (tile.updateType === IsoTile.ZOOM) {
                tile.setZoomLevel(this.zoomLevel);
                tile.setZoomPoint(this.zoomPoint);
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
        if (this.image === undefined || this.image.image.isLoaded === false) {
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
     * @param {number} zoom
     * @chainable
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
        this.Engine = Engine;
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
            image: this.image.image.get()
        };
    };
    IsoSprite.prototype.setFrame = function (frame) {
        this.tileSize = frame.dimension;
        this.tileOffset = frame.offset;
        return this;
    };
    IsoSprite.prototype.set = function (tile) {
        this.tileHeight = tile.height;
        this.tileSize = tile.size;
        this.setTile(tile.tile);
        return this;
    };
    IsoSprite.prototype.getRenderDetails = function () {
        var fx = this.anchor.x / this.tileSize.width, fy = this.anchor.y / this.tileSize.height;
        return {
            position: this.getRelativePosition(),
            tileSize: this.tileSize,
            renderSize: {
                width: this.tileSize.width * this.zoomLevel,
                height: this.tileSize.height * this.zoomLevel
            },
            anchor: { x: (this.position.x + (this.tileSize.width * this.zoomLevel * fx)), y: (this.position.y + (this.tileSize.height * this.zoomLevel * fy)) },
            image: this.image.image.get(),
            offset: this.getTileOffset(),
            zoomLevel: this.zoomLevel
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
     * @param  {IsoMetric} Engine An instance of IsoMetric
     * @param  {IsoRessource} image  A Ressource file including an image
     * @param  {IsoTileObjectInfo} tileInfoObject Including all information about the tile. See IsoTileObjectInfo.
     * @param  {string} name Name of the new Sprite.
     * @return {IsoAnimatedSprite} The Sprite.
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
     * @param  {string} name Name of the new animation.
     * @param  {Array<number>} frames An array that includes the frame numbers.
     * @param  {number} duration The duration in milliseconds of the animation.
     * @param  {Function} easing The animation-easing. For more information see IsoEasing. By default: IsoEasing.Linear.
     * @param  {string} type The playing-type. Possible values are: IsoAnimation.ONCE, IsoAnimation.ENDLESS, IsoAnimation.PINGPONG. By Default: IsoAnimation.ONCE.
     * @param  {Array<IsoCallback>} callbacks An array including callback. The events are 'onPlaying', 'onStop', 'onPause', 'onResume'
     * @return {IsoAnimatedSprite} The sprite.
     */
    IsoAnimatedSprite.prototype.addFrameAnimation = function (name, frames, duration, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = IsoAnimation.ONCE; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.Engine.animation.addFrameAnimation(name, this, frames, duration, easing, type, callbacks);
        return this;
    };
    /**
     * Plays an animation given by its name.
     * @param  {string} name Name of th animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    IsoAnimatedSprite.prototype.play = function (name) {
        this.Engine.animation.play(name, this);
        return this;
    };
    /**
     * Stops an animation given by its name.
     * @param  {string} name Name of the animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    IsoAnimatedSprite.prototype.stop = function (name) {
        this.Engine.animation.stop(name, this);
        return this;
    };
    /**
     * Resumes an animation given by its name.
     * @param  {string} name Name of the animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    IsoAnimatedSprite.prototype.resume = function (name) {
        this.Engine.animation.resume(name, this);
        return this;
    };
    /**
     * Pause an animation given by its name.
     * @param  {string} name  Name of the animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    IsoAnimatedSprite.prototype.pause = function (name) {
        this.Engine.animation.pause(name, this);
        return this;
    };
    return IsoAnimatedSprite;
})(IsoSprite);
/**
 * A library including all easing-functions.
 */
var IsoEasing = {
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    Linear: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * currentIteration / iterationCount + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuadIn: function (currentIteration, startValue, endValue, iterationCount) {
        currentIteration = currentIteration / iterationCount;
        return (endValue - startValue) * currentIteration * currentIteration + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuadOut: function (currentIteration, startValue, endValue, iterationCount) {
        return -(endValue - startValue) * (currentIteration /= iterationCount) * (currentIteration - 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuadInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * currentIteration * currentIteration + startValue;
        }
        return -(endValue - startValue) / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    CubicIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 3) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    CubicOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 3) + 1) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    CubicInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 3) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuartIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 4) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuartOut: function (currentIteration, startValue, endValue, iterationCount) {
        return -(endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 4) - 1) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuartInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 4) + startValue;
        }
        return -(endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuintIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(currentIteration / iterationCount, 5) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuintOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (Math.pow(currentIteration / iterationCount - 1, 5) + 1) + startValue;
    },
    /**
     * @method IsoEasing.QuintInOut
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    QuintInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(currentIteration, 5) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    SineIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (1 - Math.cos(currentIteration / iterationCount * (Math.PI / 2))) + startValue;
    },
    /**
     * @method IsoEasing.SineOut
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    SineOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.sin(currentIteration / iterationCount * (Math.PI / 2)) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    SineInOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) / 2 * (1 - Math.cos(Math.PI * currentIteration / iterationCount)) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    ExpoIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.pow(2, 10 * (currentIteration / iterationCount - 1)) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    ExpoOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (-Math.pow(2, -10 * currentIteration / iterationCount) + 1) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    ExpoInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
        }
        return (endValue - startValue) / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    CircIn: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * (1 - Math.sqrt(1 - (currentIteration /= iterationCount) * currentIteration)) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    CircOut: function (currentIteration, startValue, endValue, iterationCount) {
        return (endValue - startValue) * Math.sqrt(1 - (currentIteration = currentIteration / iterationCount - 1) * currentIteration) + startValue;
    },
    /**
     * @param {number} currentIteration The current iteration.
     * @param {number} startValue The starting value of an animation
     * @param {number} endValue The target value of an animation
     * @param {number} iterationCount The number of iterations
     * @static
     */
    CircInOut: function (currentIteration, startValue, endValue, iterationCount) {
        if ((currentIteration /= iterationCount / 2) < 1) {
            return (endValue - startValue) / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
        }
        return (endValue - startValue) / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
    }
};
/**
 * Controls an animations.
 * There are two types of animations:
 * 1. "attribute-animation" - animates the attribute of an object. Nearly every object can be animated. The type of the value has to be a number.
 * 2. "frame-animation" - animates the frames of a sprite or a tile. The type of the animated object has to be an IsoAnimatedSprite or IsoTile.W
 */
var IsoAnimation = (function () {
    function IsoAnimation() {
        this.easing = IsoEasing.Linear;
        this.isPlaying = false;
        this.currentIteration = 0;
        this.framesPerSecond = 60;
        this.__debug = 0;
        this.animationType = "attribute";
        return this;
    }
    /**
     * Creates a new frame-based animation.
     * @param {string} name Name of the new animation.
     * @param {IsoAnimatedSprite|IsoTile} object The animated sprite or tile.
     * @param {Array<number>} frames The frames of the animation.
     * @param {number} duration The duration of the animation in milliseconds.
     * @param {function} [easing=IsoEasing.Linear] The easing of the animation.
     * @param {string} [type=IsoEasing.Linear] Sets if the animation played once, endless or endless in pingpong.
     * @param {Array<IsoCallbacks>} [callbacks=new Array()] Callbacks.
     * @return {IsoAnimation} The new animation.
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
     * @param {string} name Name of the new animation.
     * @param {object} object The animated object.
     * @param {string} attribute The attribute of the object, that the animation will change.
     * @param {number} endValue The target value of the attribute.
     * @param {number} duration The duration of the animation in milliseconds.
     * @param {function} [easing=IsoEasing.Linear] The easing of the animation.
     * @param {string} [type=IsoEasing.Linear] Sets if the animation played once, endless or endless in pingpong.
     * @param {Array<IsoCallbacks>} [callbacks=new Array()] Callbacks.
     * @return {IsoAnimation} The new animation.
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
     * @return {IsoAnimation} The new animation.
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
     * @private
     */
    IsoAnimation.prototype.__playAttribute = function () {
        var _this = this;
        if (this.isPlaying === true) {
            if (this.currentIteration === 0) {
                this.actualValue = this.startValue;
            }
            this.currentIteration++;
            this.actualValue = this.easing(this.currentIteration, this.startValue, this.endValue, this.iterations);
            this.setObjectValue(this.actualValue);
            if (this.actualValue === this.endValue) {
                switch (this.type) {
                    case IsoAnimation.ONCE:
                        this.stop();
                        break;
                    case IsoAnimation.PINGPONG:
                        var endValue = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.ENDLESS:
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
    };
    /**
     * Starts an animation of the type "frame".
     * @private
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
                        this.stop();
                        break;
                    case IsoAnimation.PINGPONG:
                        var endValue = this.endValue;
                        this.endValue = this.startValue;
                        this.startValue = endValue;
                        this.actualValue = this.startValue;
                        this.isPlaying = false;
                        this.play();
                        break;
                    case IsoAnimation.ENDLESS:
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
        this.actualValue = this.startValue;
        return this;
    };
    /**
     * Pause the animation
     */
    IsoAnimation.prototype.pause = function () {
        this.isPlaying = false;
        return this;
    };
    /**
     * Resume the animation.
     */
    IsoAnimation.prototype.resume = function () {
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
     * @private
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
     * Parse the object and set the given attribute.
     * @private
     */
    IsoAnimation.prototype.setObjectValue = function (value) {
        var a = this.attribute.split(".");
        var s = "";
        for (var i = 0; i < a.length; i++) {
            s += "['" + a[i] + "']";
        }
        var f = new Function("o", "v", "o" + s + "+=  v;");
        f(this.object, value - this.getObjectValue());
    };
    IsoAnimation.ONCE = "once";
    IsoAnimation.PINGPONG = "pingpong";
    IsoAnimation.ENDLESS = "endless";
    IsoAnimation.ANIMATION_TYPE_FRAME = "frame";
    IsoAnimation.ANIMATION_TYPE_ATTRIBUTE = "attribute";
    return IsoAnimation;
})();
///<reference path="IsoAnimation.ts" />
"use strict";
var IsoAnimationManager = (function () {
    function IsoAnimationManager() {
        this.animations = new Array();
    }
    IsoAnimationManager.prototype.addFrameAnimation = function (name, object, frames, speed, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.animations.push(new IsoAnimation().createFrameAnimation(name, object, frames, speed, easing, type, callbacks));
        return this;
    };
    IsoAnimationManager.prototype.addAnimation = function (name, object, attribute, endValue, speed, easing, type, callbacks) {
        if (easing === void 0) { easing = IsoEasing.Linear; }
        if (type === void 0) { type = "once"; }
        if (callbacks === void 0) { callbacks = new Array(); }
        this.animations.push(new IsoAnimation().createAnimation(name, object, attribute, endValue, speed, easing, type, callbacks));
        return this;
    };
    IsoAnimationManager.prototype.play = function (name, object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                this.animations[i].play();
            }
        }
    };
    IsoAnimationManager.prototype.stop = function (name, object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                this.animations[i].stop();
            }
        }
    };
    IsoAnimationManager.prototype.resume = function (name, object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                this.animations[i].resume();
            }
        }
    };
    IsoAnimationManager.prototype.pause = function (name, object) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name && (this.animations[i].object === object || this.animations[i].sprite === object)) {
                this.animations[i].pause();
            }
        }
    };
    return IsoAnimationManager;
})();
var IsoBlendingModes = {
    NORMAL: "noraml",
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
        if (this.options.fullscreen === true) {
            this.canvasElement.width = window.innerWidth;
            this.canvasElement.height = window.innerWidth;
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
        this.canvasElement.height = window.innerWidth;
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
    IsoDrawer.prototype.update = function () {
        this.canvas.clearScreen();
        this.Engine.layers.sort();
        for (var i = 0; i < this.Engine.layers.layers.length; i++) {
            this.drawLayer(this.Engine.layers.layers[i]);
        }
        this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
        new IsoEvent("drawComplete").trigger();
        this.Engine.endLoop();
    };
    IsoDrawer.prototype.drawLayer = function (layer) {
        this.drawTileMap(layer.getTileMap());
        this.drawSprites(layer.sprites);
    };
    IsoDrawer.prototype.drawTileMap = function (tileMap) {
        tileMap.update();
        var tiles = tileMap.getTilesInView();
        for (var y = 0; y < tiles.rowEnd - tiles.rowStart; y++) {
            for (var x = 0; x < tiles.columnEnd - tiles.columnStart; x++) {
                tiles.tiles[y][x].updatePosition();
                var detail = tiles.tiles[y][x].getRenderDetails();
                if (tiles.tiles[y][x].rotation !== 0) {
                    this.translate(tiles.tiles[y][x], detail);
                    this.rotateTile(tiles.tiles[y][x], detail);
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
    IsoDrawer.prototype.drawSprites = function (sprites) {
        for (var i = 0; i < sprites.length; i++) {
            var s = sprites[i];
            if (s.hidden === false) {
                s.updatePosition();
                var renderDetails = s.getRenderDetails();
                if (s.rotation !== 0) {
                    this.translate(s, renderDetails);
                    this.rotate(s, renderDetails);
                    this.resetTranslation(s, renderDetails);
                }
                this.context.globalCompositeOperation = s.blendingMode;
                this.context.globalAlpha = s.alpha;
                this.context.drawImage(renderDetails.image, renderDetails.offset.x, renderDetails.offset.y, renderDetails.tileSize.width, renderDetails.tileSize.height, renderDetails.position.x, renderDetails.position.y, renderDetails.renderSize.width, renderDetails.renderSize.height);
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                this.context.globalAlpha = 1;
            }
        }
    };
    IsoDrawer.prototype.translate = function (object, renderDetails) {
        this.context.translate(renderDetails.anchor.x, renderDetails.anchor.y);
    };
    IsoDrawer.prototype.resetTranslation = function (object, renderDetails) {
        this.context.translate(-renderDetails.anchor.x, -renderDetails.anchor.y);
    };
    IsoDrawer.prototype.rotate = function (object, renderDetails) {
        this.context.rotate(object.rotation * Math.PI / 180);
    };
    IsoDrawer.prototype.rotateTile = function (object, renderDetails) {
        this.context.rotate(object.rotation * Math.PI / 180);
    };
    return IsoDrawer;
})();
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
    IsoEvent.prototype.trigger = function (target) {
        var event = new CustomEvent(this.type);
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
    return IsoEvent;
})();
"use strict";
var IsoImage = (function () {
    function IsoImage(name, src) {
        this.isLoaded = false;
        this.offset = {
            x: 0,
            y: 0
        };
        if (name !== undefined && src !== undefined) {
            this.create(name, src);
        }
    }
    /**
     * Creates a new image.
     * @param src Source to the imagefile.
     * @return Instance of IsoImage
     */
    IsoImage.prototype.create = function (name, src) {
        this.name = name;
        this.src = src;
        return this;
    };
    /**
     * Loads the image for further work.
     * @return Instance of IsoImage
     */
    IsoImage.prototype.load = function () {
        var _this = this;
        this.image = new Image();
        this.image.src = this.src;
        this.image.addEventListener("load", function (e) { return _this._onLoad(e); });
    };
    /**
     * Called when the image file was loaded.
     * @param event The triggerd event
     */
    IsoImage.prototype._onLoad = function (event) {
        this.width = this.image.width;
        this.height = this.image.height;
        this.isLoaded = true;
        if (typeof this.__onLoad === "function") {
            this.__onLoad.call(this, event);
        }
        var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_LOADED);
        e.trigger();
    };
    IsoImage.prototype.onLoad = function (callback) {
        this.__onLoad = callback;
    };
    /**
     * Returns the image.
     * @return The image.
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
    IsoImage.prototype.setOffset = function (offset) {
        this.offset = offset;
    };
    return IsoImage;
})();
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
        el.ontouchcancel = function (event) { return _this.checkTouch(event); };
        el.ontouchend = function (event) { return _this.checkTouch(event); };
        el.ontouchmove = function (event) { return _this.checkTouch(event); };
        el.ontouchstart = function (event) { return _this.checkTouch(event); };
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
        this.lastTouchEventType = event.type;
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
        this.lastTouchEventType = "";
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
    function IsoLayer(Engine, index, name) {
        this.objects = new Array();
        this.sprites = new Array();
        this.billboards = new Array(); // isoBillboards
        this.Engine = Engine;
        this.index = index;
        if (name !== undefined) {
            this.setName(name);
        }
        return this;
    }
    IsoLayer.prototype.addObject = function (name, image) {
        var o = new IsoObject(this.Engine, image, name);
        this.objects.push(o);
        return o;
    };
    IsoLayer.prototype.addSprite = function (name, image, tileObjectInfo) {
        var s = new IsoSprite(this.Engine, image, tileObjectInfo, name);
        this.sprites.push(s);
        return s;
    };
    IsoLayer.prototype.addAnimatedSprite = function (name, image, tileObjectInfo) {
        var s = new IsoAnimatedSprite(this.Engine, image, tileObjectInfo, name);
        this.sprites.push(s);
        return s;
    };
    IsoLayer.prototype.addTileMap = function (name, image, tileWidth, tileHeight, map) {
        this.tileMap = new IsoTileMap(this.Engine, name, tileWidth, tileHeight, image, map);
        return this.tileMap;
    };
    IsoLayer.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    IsoLayer.prototype.getObject = function (name) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name === name) {
                return this.objects[i];
            }
        }
        return undefined;
    };
    IsoLayer.prototype.getSprite = function (name) {
        for (var i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i].name === name) {
                return this.sprites[i];
            }
        }
        return undefined;
    };
    IsoLayer.prototype.getTileMap = function () {
        return this.tileMap;
    };
    IsoLayer.prototype.zoom = function (zoom) {
        if (this.tileMap !== undefined) {
            this.tileMap.zoom(zoom);
        }
        this.tileMap.update();
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].zoom(zoom);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].zoom(zoom);
        }
        for (var i = 0; i < this.billboards.length; i++) {
        }
    };
    IsoLayer.prototype.scroll = function (deltaX, deltaY) {
        if (this.tileMap !== undefined) {
            this.tileMap.scroll(deltaX, deltaY);
        }
    };
    IsoLayer.prototype.rotate = function (degrees) {
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].rotate(degrees);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].rotate(degrees);
        }
        for (var i = 0; i < this.billboards.length; i++) {
        }
    };
    IsoLayer.prototype.setZoomPoint = function (point) {
        if (this.tileMap !== undefined) {
            this.tileMap.setZoomPoint(point);
        }
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].setZoomPoint(point);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].setZoomPoint(point);
        }
        for (var i = 0; i < this.billboards.length; i++) {
        }
    };
    IsoLayer.prototype.setSpeed = function (speed) {
        if (this.tileMap !== undefined) {
            this.tileMap.setSpeed(speed);
        }
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].setSpeed(speed);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].setSpeed(speed);
        }
        for (var i = 0; i < this.billboards.length; i++) {
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
"use strict";
var IsoOn = (function () {
    function IsoOn() {
    }
    IsoOn.prototype.on = function (eventType, callback) {
        document.addEventListener(eventType, callback);
    };
    return IsoOn;
})();
///<reference path="IsoImage.ts" />
///<reference path="IsoOn.ts" />
"use strict";
var IsoRessource = (function () {
    function IsoRessource(name, src, type, autoload) {
        if (autoload === void 0) { autoload = true; }
        this.loaded = false;
        this._on = new Array();
        return this.create(name, src, type, autoload);
    }
    IsoRessource.prototype.create = function (name, src, type, autoload) {
        this.name = name;
        this.src = src;
        this.type = type;
        this.autoload = autoload;
        return this;
    };
    /**
     * @TO DO
     * Implement audio ressources
     */
    IsoRessource.prototype.load = function () {
        var _this = this;
        if (this.type === IsoRessource.IMAGE) {
            this.image = new IsoImage(this.name, this.src);
            this.image.onLoad(function (e) { return _this._onLoad(e); });
            this.image.load();
        }
        else if (this.type === IsoRessource.AUDIO) {
            this.htmlAudio = new HTMLAudioElement;
            this.htmlAudio.addEventListener("load", function (e) { return _this._onLoad(e); });
            this.htmlAudio.src = this.src;
        }
    };
    IsoRessource.prototype._onLoad = function (event) {
        this.loaded = true;
        var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS);
        e.trigger();
        if (typeof this.__onLoad === "function") {
            this.__onLoad.call(this, event);
        }
    };
    IsoRessource.prototype.onLoad = function (callback) {
        this.__onLoad = callback;
    };
    IsoRessource.prototype.get = function () {
        if (this.type === IsoRessource.AUDIO) {
            return this.htmlAudio;
        }
        else if (this.type === IsoRessource.IMAGE) {
            return this.image.get();
        }
    };
    IsoRessource.AUDIO = "audio";
    IsoRessource.IMAGE = "image";
    IsoRessource.ISO_EVENT_RESSOURCE_LOADED = "ISO_EVENT_RESSOURCE_LOADED";
    IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS = "ISO_EVENT_RESSOURCE_PROGRESS";
    IsoRessource.ISO_EVENT_RESSOURCE_PROGRESS_ALL = "ISO_EVENT_RESSOURCE_PROGRESS_ALL";
    return IsoRessource;
})();
///<reference path="IsoRessource.ts" />
///<reference path="IsoOn.ts" />
"use strict";
var IsoRessourceManager = (function () {
    function IsoRessourceManager(Engine) {
        this.ressources = new Array();
        this.numberAutoload = 0;
        this.autoloaded = 0;
        this.Engine = Engine;
    }
    IsoRessourceManager.prototype.add = function (name, src, type, autoload) {
        var _this = this;
        if (autoload === void 0) { autoload = true; }
        this.ressources.push(new IsoRessource(name, src, type, autoload));
        this.ressources[this.ressources.length - 1].onLoad(function (e) { return _this._onProgress(e); });
        if (autoload === true) {
            this.numberAutoload++;
        }
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
})();
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
var IsoMetric = (function () {
    /**
     * Creates a new instance of IsoMetric
     * @method constructor
     * @param {object} [windowOptions] The canvas configuration.
     */
    function IsoMetric(windowOptions) {
        var _this = this;
        /**
         * A counter for frames.
         * @property frameCount
         * @type {number}
         * @default 0
         */
        this.frameCount = 0;
        /**
         * The frames per second
         * @property FPS
         * @type {number}
         * @default 0
         */
        this.FPS = 0;
        /**
         * The default canvas configuration.
         * @property defaultWIndowOptions
         * @type {IIsoConfigWindowOptions}
         * @default {fullscreen: true, width: window.innerWidth, height: window.innerHeight}
         */
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
        this.on = new IsoOn();
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
    /**
     * Reset and set the FPS
     * @method setFPS
     */
    IsoMetric.prototype.setFPS = function () {
        this.FPS = this.frameCount;
        this.frameCount = 0;
    };
    /**
     * Starts the game- and drawing-loop.
     * @method startLoop
     */
    IsoMetric.prototype.startLoop = function () {
        this.update();
    };
    /**
     * Sets the FPS after the drawing-loop completed.
     * @method endLoop
     */
    IsoMetric.prototype.endLoop = function () {
        var endLoop = new Date();
        this.frameTime = (endLoop.getMilliseconds() - this.startLoopTime.getMilliseconds());
        this.frameCount = this.frameCount + 1;
    };
    /**
     * The game- and drawing-loop.
     * @method update()
     */
    IsoMetric.prototype.update = function () {
        this.startLoopTime = new Date();
        this.drawer.update();
    };
    return IsoMetric;
})();
"use strict";
var IsoPhysicsManager = (function () {
    function IsoPhysicsManager() {
        this.rigidBodies = new Array();
        this.massBodies = new Array();
        this.gravity = 0.2;
    }
    IsoPhysicsManager.prototype.addMassBody = function (object) {
        this.massBodies.push(object);
    };
    IsoPhysicsManager.prototype.addRigidBody = function (object) {
        this.rigidBodies.push(object);
    };
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
    IsoPhysicsManager.prototype.setGravity = function (g) {
        this.gravity = g;
    };
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
//# sourceMappingURL=isometric.js.map