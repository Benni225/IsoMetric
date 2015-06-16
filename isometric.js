"use strict";
var IsoImage = (function () {
    function IsoImage(name, src) {
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
        this.image.onload = function (event) { return _this._onLoad(event); };
    };
    /**
     * Called when the image file was loaded.
     * @param event The triggerd event
     */
    IsoImage.prototype._onLoad = function (event) {
        this.width = this.image.width;
        this.height = this.image.height;
        if (typeof this.onLoad === "function") {
            this.onLoad.call(this, event);
        }
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
    return IsoImage;
})();
"use strict";
var IsoCollection = (function () {
    function IsoCollection(Engine) {
        this.Engine = Engine;
    }
    IsoCollection.prototype.get = function () {
        return this.collection;
    };
    IsoCollection.prototype.getByName = function (name) {
        if (this.collection !== undefined) {
            for (var i = 0; i < this.collection.length; i++) {
                if (this.collection[i].name === name) {
                    return this.collection[i];
                }
            }
        }
        return undefined;
    };
    return IsoCollection;
})();
///<reference path="IsoImage.ts" />
///<reference path="IsoCollection.ts" />
"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IsoBaseTileImage = (function (_super) {
    __extends(IsoBaseTileImage, _super);
    /**
     * Creates a new instance of IsoBaseTileImage
     * @param Engine A object of IsoMetric
     * @param name Name of the new tileset
     * @param src Path to the image file
     */
    function IsoBaseTileImage(Engine, name, src) {
        _super.call(this, name, src);
        /**
         * ToDo:
         * maybe deprecated
         */
        this.prefix = "TILEIMAGE";
        /**
         * The the direction. Possible values are:
         * - IsoMetric.FRONT
         * - IsoMetric.BACK
         * - IsoMetric.Left
         * - IsoMetric.RIGHT
         */
        this.direction = IsoMetric.FRONT;
        this.offsetX = 0;
        this.offsetY = 0;
        this.Engine = Engine;
        if (name !== undefined && src !== undefined) {
            this.create(name, src);
        }
    }
    /**
     * Define a part of the image as tileset.
     * @param x The point on the X-axis where the imagepart starts.
     * @param y the point on the Y-axis where the imagepart starts.
     * @param width The width in pixels of the imagepart.
     * @param height The height in pixels of the imagepart.
     */
    IsoBaseTileImage.prototype.crop = function (x, y, width, height) {
        this.offsetX = x;
        this.offsetY = y;
        this.width = width;
        this.height = height;
        return this;
    };
    /**
     * Creates a new Tileset.
     * @override IsoImage.create
     * @param Engine A object of IsoMetric
     * @param name Name of the new tileset
     * @param src Path to the image file
     * @return Instance of IsoBaseTileImage
     */
    IsoBaseTileImage.prototype.create = function (name, src) {
        this.src = src;
        this.name = name;
        return this;
    };
    /**
     * Loads the image for further work.
     * @override IsoImage.load
     * @return Instance of IsoBaseTileImage
     */
    IsoBaseTileImage.prototype.load = function () {
        var _this = this;
        this.image = new Image;
        this.image.src = this.src;
        this.image.onload = function (event) { return _this._onLoad(event); };
        return this;
    };
    /**
     * Return the offset in pixel of a given tile inside the tileset
     * @param tileNumber The number of the tile
     * @return An object including the offset
     * @example
     * TILESET
     * 60px width
     * |0|1|2|
     * |3|4|5| 60 px height
     * |6|7|8|
     *
     * This method returns for tile 7:
     * {
     *    offsetX: 20
     *    offsetY: 40
     * }
     */
    IsoBaseTileImage.prototype.getTileOffset = function (tileNumber) {
        var column = tileNumber % (this.width / this.tileWidth), row = Math.floor(tileNumber / (this.width / this.tileWidth));
        var ox = column * this.tileWidth + this.offsetX, oy = row * this.tileHeight + this.offsetY;
        return {
            offsetX: ox,
            offsetY: oy
        };
    };
    /**
     * Sets the size of a tile
     * @param width The width in px
     * @param height The height in px
     */
    IsoBaseTileImage.prototype.setTileSize = function (width, height) {
        this.tileWidth = width;
        this.tileHeight = height;
        return this;
    };
    /**
     * Sets the direction of the tileset.
     * @param direction The direction of the tileset. Possible values are:
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.RIGHT
     * - IsoMetric.LEFT
     * @return The tileset.
     */
    IsoBaseTileImage.prototype.setDirection = function (direction) {
        this.direction = direction;
        return this;
    };
    return IsoBaseTileImage;
})(IsoImage);
var IsoBaseTileImages = (function (_super) {
    __extends(IsoBaseTileImages, _super);
    function IsoBaseTileImages(Engine) {
        _super.call(this, Engine);
        this.collection = new Array();
        this.loaded = 0;
    }
    IsoBaseTileImages.prototype.add = function (name, src) {
        this.collection.push(new IsoTileSet(this.Engine, name, src));
        return this;
    };
    IsoBaseTileImages.prototype.load = function () {
        var _this = this;
        for (var i = 0; i < this.collection.length; i++) {
            this.collection[i].onLoad = function (event) { return _this.loadCounter(event, _this.collection[i]); };
            this.collection[i].load();
        }
        return this;
    };
    IsoBaseTileImages.prototype.loadCounter = function (event, tileSet) {
        this.loaded = this.loaded + 1;
        if (this.onEvery !== undefined) {
            this.onEvery(this.Engine, event, tileSet);
        }
        if (this.loaded === this.collection.length) {
            new IsoEvent("tilesetsLoaded").trigger();
            this.callThen();
        }
    };
    IsoBaseTileImages.prototype.every = function (callback) {
        this.onEvery = callback;
        return this;
    };
    IsoBaseTileImages.prototype.then = function (callback) {
        this.onLoaded = callback;
        return this;
    };
    IsoBaseTileImages.prototype.callThen = function () {
        if (this.onLoaded !== undefined) {
            this.onLoaded.call(this.Engine);
        }
    };
    return IsoBaseTileImages;
})(IsoCollection);
///<reference path="IsoImage.ts" />
var IsoBillboard = (function (_super) {
    __extends(IsoBillboard, _super);
    function IsoBillboard(Engine, name, src) {
        _super.call(this, name, src);
        this.scrollable = true;
        this.Engine = Engine;
        if (name != undefined && src != undefined) {
            this.create(name, src);
        }
    }
    IsoBillboard.prototype.create = function (name, src) {
        this.name = name;
        this.src = src;
        return this;
    };
    IsoBillboard.prototype.load = function () {
        var _this = this;
        this.image = new Image();
        this.image.src = this.src;
        this.image.onload = function (event) { return _this._onLoad(event); };
        return this;
    };
    IsoBillboard.prototype._onLoad = function (event) {
        this.onLoad.call(this, event);
    };
    IsoBillboard.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    IsoBillboard.prototype.setSpeed = function (speed) {
        this.speed = speed;
        return this;
    };
    IsoBillboard.prototype.move = function (deltaX, deltaY) {
        this.x = this.x + (deltaX * this.speed);
        this.y = this.y + (deltaY * this.speed);
        return this;
    };
    IsoBillboard.prototype.setDeltaScroll = function (deltaX, deltaY) {
        this.scrollX = this.scrollX + (this.speed * -(deltaX));
        this.scrollY = this.scrollY + (this.speed * (deltaY));
    };
    IsoBillboard.prototype.setScroll = function (x, y) {
        this.scrollX = x;
        this.scrollY = y;
    };
    return IsoBillboard;
})(IsoImage);
var IsoBillboards = (function (_super) {
    __extends(IsoBillboards, _super);
    function IsoBillboards(Engine, Layer) {
        _super.call(this, Engine);
        this.collection = new Array();
        this.loaded = 0;
        this.Layer = Layer;
    }
    IsoBillboards.prototype.add = function (name, src) {
        this.collection.push(new IsoBillboard(this.Engine, name, src));
        return this;
    };
    IsoBillboards.prototype.load = function () {
        var _this = this;
        for (var i = 0; i < this.collection.length; i++) {
            this.collection[i].onLoad = function (event) { return _this.loadCounter(event, _this.collection[i]); };
            this.collection[i].load();
        }
        return this;
    };
    IsoBillboards.prototype.loadCounter = function (event, tileSet) {
        this.loaded = this.loaded + 1;
        if (this.onEvery !== undefined) {
            this.onEvery(this.Engine, event, tileSet);
        }
        if (this.loaded === this.collection.length) {
            new IsoEvent("tilesetsLoaded").trigger();
            this.callThen();
        }
    };
    IsoBillboards.prototype.every = function (callback) {
        this.onEvery = callback;
        return this;
    };
    IsoBillboards.prototype.then = function (callback) {
        this.onLoaded = callback;
        return this;
    };
    IsoBillboards.prototype.callThen = function () {
        if (this.onLoaded !== undefined) {
            this.onLoaded.call(this.Engine);
        }
    };
    return IsoBillboards;
})(IsoCollection);
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
            this.canvasElement.height = window.innerHeight;
            window.onresize = window.onload = function () { return _this.updateScreen(); };
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
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        //console.log(this.canvasElement.width + " x " + this.canvasElement.height)
        new IsoEvent("IsoCanvasClearScreen").trigger();
        return this;
    };
    IsoCanvas.prototype.get = function () {
        return this.canvasElement;
    };
    return IsoCanvas;
})();
"use strict";
/**
 * Includes all animation parameters of a sprite.
 */
var IsoSpriteAnimation = (function () {
    /**
     * Initializes an creates a new animation.
     * @param Engine The IsoMetric object.
     * @param name (optional) The name of the new animation.
     * @param startFrame (optional) The number of the tile in the tileset where animation starts.
     * @param endFrame (optional) The number of the tile in the tileset where animation ends.
     * @param sprite (optional) The parent sprite object.
     */
    function IsoSpriteAnimation(Engine, name, startFrame, endFrame, sprite) {
        /**
         * The speed of the animation in frames per second.
         */
        this.framesPerSecond = 1;
        /**
         * The easing of the animation. It influences the playing speed of the animation.
         */
        this.easing = IsoSpriteAnimation.LINEAR;
        /**
         * The actual frame of the animation.
         */
        this.frame = 1;
        /**
         * A flag for playing a ping-pong-animation.
         */
        this.pingpongDirection = 0;
        /**
         * True if the animation is playing else false.
         */
        this.isPlaying = false;
        this.Engine = Engine;
        if (name !== undefined, startFrame !== undefined && endFrame !== undefined) {
            this.create(name, startFrame, endFrame, sprite);
        }
    }
    /**
     * Creates a new animation.
     * @param name The name of the new animation.
     * @param startFrame The number of the tile in the tileset where animation starts.
     * @param endFrame The number of the tile in the tileset where animation ends.
     * @param sprite The parent sprite object.
     * @return The animation.
     */
    IsoSpriteAnimation.prototype.create = function (name, startFrame, endFrame, sprite) {
        this.name = name;
        this.startFrame = startFrame;
        this.endFrame = endFrame;
        this.frameCount = endFrame - startFrame + 1;
        this.sprite = sprite;
        return this;
    };
    /**
     * Sets the playing speed of the animation in frames per second.
     * @param framesPerSecond The number of frames that will be played in a second.
     * @return The animation.
     */
    IsoSpriteAnimation.prototype.setFramesPerSecond = function (framesPerSecond) {
        this.framesPerSecond = framesPerSecond;
        return this;
    };
    /**
     * Sets the animation type.
     * @param type The type of animation. Posiible values are:
     * - IsoSpriteAnimation.LOOP
     * - IsoSpriteAnimation.PINGPONG
     * @return The animation.
     */
    IsoSpriteAnimation.prototype.setAnimationType = function (type) {
        this.type = type;
        return this;
    };
    /**
     * Starts the playingloop.
     * @return The animation.
     */
    IsoSpriteAnimation.prototype.play = function () {
        var _this = this;
        if (this.isPlaying === false) {
            this.isPlaying = true;
            var time = 1000.0 / this.framesPerSecond;
            this.interval = setInterval(function () { return _this.calculateFrame(); }, time);
        }
        return this;
    };
    /**
     * Calculates the the time between two frames depending on the easing.
     */
    IsoSpriteAnimation.prototype.recalculateFrameTime = function () {
        var _this = this;
        var time = 0;
        clearInterval(this.interval);
        switch (this.easing) {
            case IsoSpriteAnimation.LINEAR:
                time = 1000.0 / this.framesPerSecond;
                break;
        }
        this.interval = setInterval(function () { return _this.calculateFrame(); }, time);
    };
    /**
     * Calculates the actual frame and return it. It depends on the animation type.
     * @return The actual frame number.
     */
    IsoSpriteAnimation.prototype.calculateFrame = function () {
        switch (this.type) {
            case IsoSpriteAnimation.LOOP:
                this.frame = this.frame + 1;
                if (this.frame - 1 > this.endFrame - this.startFrame) {
                    this.frame = 1;
                }
                break;
            case IsoSpriteAnimation.PINGPONG:
                if (this.pingpongDirection === 0) {
                    if (this.frame > this.endFrame - this.startFrame) {
                        this.pingpongDirection = 1;
                        this.frame = this.frame - 1;
                    }
                    else {
                        this.frame = this.frame + 1;
                    }
                }
                else if (this.pingpongDirection === 1) {
                    if (this.frame - 1 < 1) {
                        this.pingpongDirection = 0;
                        this.frame = this.frame + 1;
                    }
                    else {
                        this.frame = this.frame - 1;
                    }
                }
                break;
        }
        this.recalculateFrameTime();
        return this.frame;
    };
    /**
     * Returns the actual frame.
     * @return The actual frame.
     */
    IsoSpriteAnimation.prototype.get = function () {
        return this.frame;
    };
    /**
     * Returns the tile number in the tileset.
     * @return The tile number.
     */
    IsoSpriteAnimation.prototype.getTileNumber = function () {
        var tile = (this.startFrame - 1) + (this.frame - 1) + ((this.sprite.direction * this.frameCount) - this.frameCount);
        return tile;
    };
    /**
     * Stops the animation loop.
     * @return The animation.
     */
    IsoSpriteAnimation.prototype.stop = function () {
        this.isPlaying = false;
        clearInterval(this.interval);
        this.frame = 0;
        return this;
    };
    IsoSpriteAnimation.LOOP = 0;
    IsoSpriteAnimation.PINGPONG = 1;
    IsoSpriteAnimation.LINEAR = 1;
    return IsoSpriteAnimation;
})();
/**
 * Collection of all animation.
 */
var IsoSpriteAnimations = (function () {
    /**
     * Initialize the collection of animations
     * @param Engine The engine object
     */
    function IsoSpriteAnimations(Engine) {
        /**
         * An array with all animations for a sprite
         */
        this.animations = new Array();
        this.Engine = Engine;
    }
    /**
     * Adds a new animation to the collection.
     * @param name Name of the new animation.
     * @param startFrame The number of the tile in the tileset where the animation starts.
     * @param endFrame The number of the tile in the tileset where the animation ends.
     * @param sprite The parent sprite object.
     * @return The animation collection
     */
    IsoSpriteAnimations.prototype.add = function (name, startFrame, endFrame, sprite) {
        this.animations.push(new IsoSpriteAnimation(this.Engine, name, startFrame, endFrame, sprite));
        return this;
    };
    /**
     * Returns an animation by its name.
     * @param name The name of the animation
     * @return IsoSpriteAnimation or undefined
     */
    IsoSpriteAnimations.prototype.getByName = function (name) {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name) {
                return this.animations[i];
            }
        }
        return undefined;
    };
    return IsoSpriteAnimations;
})();
/**
 * Generates sprites, that can free positioned on the screen. Every sprite is referenced to a layer.
 * @extends IsoBaseTileImage
 */
var IsoSprite = (function (_super) {
    __extends(IsoSprite, _super);
    /**
     * Creates a new sprite.
     * @param Engine {IsoMetric}
     * @param name Name of the sprite
     * @param src Path to the image
     * @param tileWidth Width in pixel of every tile
     * @param tileHeight Height in pixel of every tile
     * @param layer Name of the layer the sprite will be placed on
     */
    function IsoSprite(Engine, name, src, tileWidth, tileHeight, layer) {
        _super.call(this, Engine, name, src);
        this.speed = 1;
        /**
         * The actual tile.
         */
        this.tile = 0;
        /**
         * The default frame
         */
        this.defaultFrame = 1;
        this.setTileSize(tileWidth, tileHeight);
        this.setLayer(layer);
        this.animations = new IsoSpriteAnimations(this.Engine);
    }
    /**
     * Adds a new animation to the sprite object
     * @param name Name of the animation
     * @param startFrame First from of the animation in the tileset
     * @param endFrame Last frame of the animation in the tileset
     * @return The sprite object
     */
    IsoSprite.prototype.addAnimation = function (name, startFrame, endFrame) {
        this.animations.add(name, startFrame, endFrame, this);
        return this;
    };
    /**
     * Sets the layer where the sprite will be placed on
     * @param name The name of the layer.
     * @return The sprite.
     */
    IsoSprite.prototype.setLayer = function (layer) {
        this.layer = layer;
        return this;
    };
    /**
     * Sets the default animation if no animation is played
     * @param name Name of the animation
     * @return The sprite
     */
    IsoSprite.prototype.setDefaultAnimation = function (name) {
        this.defaultAnimation = name;
        return this;
    };
    /**
     * Sets the position on the X-axis.
     * @param x Position on the X-axis.
     * @return The sprite.
     */
    IsoSprite.prototype.setX = function (x) {
        this.x = x;
        return this;
    };
    /**
     * Sets the position on Y-axis
     * @param y Position on the Y-axis
     * @return The sprite.
     */
    IsoSprite.prototype.setY = function (y) {
        this.y = y;
        return this;
    };
    /**
     * @Todo: integrate masks
     */
    // setMask() {
    // }
    /**
     * Sets the direction of the sprite.
     * @param direction The direction of the sprite. Possible values are:
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.RIGHT
     * - IsoMetric.LEFT
     * @return The sprite.
     */
    IsoSprite.prototype.setDirection = function (direction) {
        this.direction = direction;
        return this;
    };
    /**
     * Gets the actual used tile of the sprite
     * @return number
     */
    IsoSprite.prototype.getTile = function () {
        if (this.animations.animations !== undefined) {
            for (var i = 0; i < this.animations.animations.length; i++) {
                if (this.animations.animations[i].isPlaying === true) {
                    this.tile = this.animations.animations[i].getTileNumber();
                    return this.tile;
                }
            }
        }
        if (this.defaultAnimation !== undefined) {
            this.animations.getByName(this.defaultAnimation).frame = this.defaultFrame;
            this.tile = this.animations.getByName(this.defaultAnimation).getTileNumber();
        }
        else {
            this.tile = this.defaultFrame - 1;
        }
        return this.tile;
    };
    /**
     * Sets the actual tile
     * @param tileNumber The number of the tile
     * @return The sprite
     */
    IsoSprite.prototype.setTile = function (tileNumber) {
        this.tile = tileNumber;
        return this;
    };
    /**
     * Sets the default frame for the case no animation is played.
     * @param frame The frame number
     */
    IsoSprite.prototype.setDefaultFrame = function (frame) {
        this.defaultFrame = frame;
        return this;
    };
    /**
     * Move the sprite on the X- and Y-axis.
     * @param x The move the position on the X-axis.
     * @param y The move the position on the Y-axis.
     * @return The sprite.
     */
    IsoSprite.prototype.move = function (deltaX, deltaY) {
        this.x = this.x + (this.speed * deltaX);
        this.y = this.y + (this.speed * deltaY);
        return this;
    };
    /**
     * Sets the moving speed of the sprite.
     * @param speed The speed which the sprite will moving over the screen in pixel.
     * @return The sprite.
     */
    IsoSprite.prototype.setSpeed = function (speed) {
        this.speed = speed;
        return this;
    };
    IsoSprite.prototype.setCollisionBody = function (collisionBody) {
        this.collisionBody = collisionBody;
        return this;
    };
    IsoSprite.prototype.getCollidingTiles = function () {
        var layers = this.Engine.layers.layers;
        var tilesO = new Array();
        var collisionBody = this.collisionBody;
        if (collisionBody === undefined) {
            collisionBody = {
                relativX: 0,
                relativY: 0,
                width: this.tileWidth,
                height: this.tileHeight
            };
        }
        for (var i = 0; i < layers.length; i++) {
            var tiles = layers[i].tileMap.getTilesInRadius(this.x + collisionBody.relativX, this.y + collisionBody.relativY, collisionBody.width, collisionBody.height);
            if (tiles.length > 0) {
                tilesO[layers[i].name] = tiles;
            }
        }
        return tilesO;
    };
    return IsoSprite;
})(IsoBaseTileImage);
/**
 * Collection of all sprites.
 */
var IsoSprites = (function () {
    /**
     * Initialize the collection.
     * @param Engine
     */
    function IsoSprites(Engine, layer) {
        this.sprites = new Array();
        this.loaded = 0;
        this.Engine = Engine;
        this.layer = layer;
    }
    IsoSprites.prototype.add = function (name, src, tileWidth, tileHeight) {
        this.sprites.push(new IsoSprite(this.Engine, name, src, tileWidth, tileHeight, this.layer));
        return this;
    };
    IsoSprites.prototype.getByName = function (name) {
        for (var i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i].name === name) {
                return this.sprites[i];
            }
        }
        return undefined;
    };
    IsoSprites.prototype.get = function () {
        return this.sprites;
    };
    IsoSprites.prototype.load = function () {
        var _this = this;
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].onLoad = function (event) { return _this.loadCounter(event, _this.sprites[i]); };
            this.sprites[i].load();
        }
        return this;
    };
    IsoSprites.prototype.loadCounter = function (event, sprite) {
        this.loaded = this.loaded + 1;
        if (this.onEvery !== undefined) {
            this.onEvery(this.Engine, event, sprite);
        }
        if (this.loaded === this.sprites.length) {
            new IsoEvent("spritesLoaded").trigger();
            this.callThen();
        }
    };
    IsoSprites.prototype.every = function (callback) {
        this.onEvery = callback;
        return this;
    };
    IsoSprites.prototype.then = function (callback) {
        this.onLoaded = callback;
        return this;
    };
    IsoSprites.prototype.callThen = function () {
        if (this.onLoaded !== undefined) {
            this.onLoaded.call(this.Engine);
        }
    };
    return IsoSprites;
})();
///<reference path = "IsoSprite.ts" />
var IsoCharacter = (function (_super) {
    __extends(IsoCharacter, _super);
    function IsoCharacter(Engine, name, src, tileWidth, tileHeight, layer) {
        _super.call(this, Engine, name, src, tileWidth, tileHeight, layer);
    }
    IsoCharacter.prototype.addAttribute = function (name, value) {
        this.attributes[name] = value;
        return this;
    };
    IsoCharacter.prototype.getAttribute = function (name) {
        return this.attributes[name];
    };
    return IsoCharacter;
})(IsoSprite);
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
"use strict";
var IsoDrawObject = (function () {
    function IsoDrawObject() {
        this.objects = new Array();
    }
    IsoDrawObject.prototype.add = function (object) {
        this.objects.push(object);
    };
    IsoDrawObject.prototype.clear = function () {
        this.objects = null;
        this.objects = new Array();
    };
    return IsoDrawObject;
})();
var IsoDrawer = (function () {
    function IsoDrawer(Engine) {
        this.Engine = Engine;
        this.Layers = Engine.layers;
        this.Canvas = Engine.canvas;
        this.TileSets = Engine.tileSets;
        this.objects = new IsoDrawObject;
    }
    IsoDrawer.prototype.draw = function () {
        this.Canvas.clearScreen();
        this.Layers.sortLayers();
        this.objects.clear();
        for (var i = 0; i < this.Layers.layers.length; i++) {
            if (this.Layers.layers[i].hidden !== true) {
                this.drawLayer(this.Layers.layers[i]);
            }
        }
        this.drawObject();
        if (this.onDrawComplete !== undefined) {
            this.onDrawComplete(this.Engine);
        }
        new IsoEvent("drawComplete").trigger();
        this.Engine.endLoop();
    };
    IsoDrawer.prototype.drawObject = function () {
        this.objects.objects.sort(this.sortPriorities);
        var lastRow, lastColumn;
        for (var i = 0; i < this.objects.objects.length; i++) {
            var zoomX = 0, zoomY = 0, zoomWidth = 0, zoomHeight = 0, object = this.objects.objects[i], zoomLevel = object.zoom, zoomPoint = object.layer.zoomPoint;
            // calculating the zoom
            zoomX = (object.offsetX * zoomLevel) + (object.scrollX * zoomLevel) - (zoomPoint.x * zoomLevel - zoomPoint.x);
            zoomY = (object.offsetY * zoomLevel) + (object.scrollY * zoomLevel) - (zoomPoint.y * zoomLevel - zoomPoint.y);
            zoomWidth = object.width * zoomLevel;
            zoomHeight = object.height * zoomLevel;
            if (this.objects.objects[i].tileHeight > 0) {
                var heightMapImageOffset = this.objects.objects[i].layer.tileMap.tileSet.getTileOffset(this.objects.objects[i].layer.tileMap.heightTile);
                for (var p = 0; p <= this.objects.objects[i].tileHeight; p++) {
                    this.Canvas.context.drawImage(this.objects.objects[i].image, heightMapImageOffset.offsetX, heightMapImageOffset.offsetY, this.objects.objects[i].width, this.objects.objects[i].height, zoomX, zoomY - (p * this.objects.objects[i].height * zoomLevel), zoomWidth, zoomHeight);
                }
                this.Canvas.context.drawImage(this.objects.objects[i].image, this.objects.objects[i].imageOffsetX, this.objects.objects[i].imageOffsetY, this.objects.objects[i].width, this.objects.objects[i].height, zoomX, zoomY, zoomWidth, zoomHeight);
            }
            else {
                this.Canvas.context.drawImage(this.objects.objects[i].image, this.objects.objects[i].imageOffsetX, this.objects.objects[i].imageOffsetY, this.objects.objects[i].width, this.objects.objects[i].height, zoomX, zoomY, zoomWidth, zoomHeight);
            }
        }
    };
    IsoDrawer.prototype.drawLayer = function (layer) {
        var tileSet = layer.tileMap.getTileSet();
        for (var row = 0; row < layer.tileMap.map.get().length; row++) {
            for (var column = 0; column < layer.tileMap.map.get()[row].length; column++) {
                var x1 = column * tileSet.tileWidth + layer.tileMap.offsetX + layer.tileMap.scrollX;
                var y1 = row * tileSet.tileHeight + layer.tileMap.offsetY + layer.tileMap.scrollY;
                var x2 = x1 + tileSet.tileWidth;
                var y2 = y1 + tileSet.tileHeight;
                var tile = layer.tileMap.map.get()[row][column], offset = tileSet.getTileOffset(tile);
                var sprites = layer.sprites.sprites;
                var priorities = new Array();
                priorities.push({
                    scrollX: layer.tileMap.scrollX,
                    scrollY: layer.tileMap.scrollY,
                    offsetX: column * tileSet.tileWidth + layer.tileMap.offsetX,
                    offsetY: row * tileSet.tileHeight + layer.tileMap.offsetY,
                    x: x1,
                    y: y1,
                    width: layer.tileMap.tileSizeX,
                    height: layer.tileMap.tileSizeY,
                    image: layer.tileMap.tileSet.get(),
                    imageOffsetX: offset.offsetX,
                    imageOffsetY: offset.offsetY,
                    tileHeight: layer.tileMap.heightMap.getHeight(column, row),
                    layer: layer,
                    zoom: layer.zoom,
                    row: row,
                    column: column,
                    type: "tilemap"
                });
                for (var i = 0; i < sprites.length; i++) {
                    if ((sprites[i].x) > x1 && (sprites[i].x) < x2 && (sprites[i].y) > y1 && (sprites[i].y) < y2) {
                        var offset = sprites[i].getTileOffset(sprites[i].getTile());
                        priorities.push({
                            scrollX: 0,
                            scrollY: 0,
                            offsetX: sprites[i].x,
                            offsetY: sprites[i].y,
                            x: sprites[i].x,
                            y: sprites[i].y,
                            width: sprites[i].tileWidth,
                            height: sprites[i].tileHeight,
                            image: sprites[i].image,
                            imageOffsetX: offset.offsetX,
                            imageOffsetY: offset.offsetY,
                            tileHeight: 0,
                            type: "sprite",
                            zoom: layer.zoom,
                            layer: layer
                        });
                    }
                }
                for (var i = 0; i < priorities.length; i++) {
                    this.objects.add(priorities[i]);
                }
            }
        }
        for (var i = 0; i < layer.billboards.collection.length; i++) {
            var billboard = layer.billboards.collection[i];
            this.objects.add({
                scrollX: (billboard.scrollable === true ? billboard.scrollX : 0),
                scrollY: (billboard.scrollable === true ? billboard.scrollY : 0),
                offsetX: billboard.x,
                offsetY: billboard.y,
                x: billboard.x + (billboard.scrollable === true ? billboard.scrollX : 0),
                y: billboard.y + (billboard.scrollable === true ? billboard.scrollY : 0),
                width: billboard.width,
                height: billboard.height,
                image: billboard.image,
                imageOffsetX: billboard.offsetX,
                imageOffsetY: billboard.offsetY,
                tileHeight: 0,
                type: "billboard",
                zoom: layer.zoom,
                layer: layer
            });
        }
        if (this.onDrawLayer !== undefined) {
            this.onDrawLayer(this.Engine, layer);
        }
        new IsoEvent("drawLayerComplete").addData(layer).trigger();
    };
    IsoDrawer.prototype.sortPriorities = function (a, b) {
        //bringing billbords in the foreground
        if (a.type === "billboard" || b.type === "billboard") {
            if (a.type === "billboard" && b.type === "billboard") {
                return 0;
            }
            else if (a.type === "billboard" && b.type !== "billboard") {
                return 1;
            }
            else {
                return -1;
            }
        }
        else {
            var ax, ay, bx, by;
            if (a.type === "sprite") {
                ax = a.x + a.width;
                ay = a.y + a.height;
            }
            else {
                ax = a.x;
                ay = a.y;
            }
            if (b.type === "sprite") {
                bx = b.x + b.width;
                by = b.y + b.height;
            }
            else {
                bx = b.x;
                by = b.y;
            }
            if (ay > by + 1) {
                return 1;
            }
            if (ay < by + 1) {
                return -1;
            }
            if (ax > bx) {
                return 1;
            }
            if (ax < bx) {
                return -1;
            }
            if (a.tileHeight > b.tileHeight) {
                return 1;
            }
            if (a.tileHeight < b.tileHeight) {
                return -1;
            }
            return 0;
        }
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
            document.querySelector(target).dispatchEvent(event);
        }
        else {
            document.dispatchEvent(event);
        }
    };
    return IsoEvent;
})();
"use strict";
var IsoLayer = (function () {
    function IsoLayer(Engine, name, index) {
        this.hidden = false;
        this.zoom = 1;
        this.maxZoom = 2;
        this.minZoom = 0.5;
        this.zoomStrength = 1;
        this.Engine = Engine;
        this.name = name;
        this.sprites = new IsoSprites(this.Engine, this);
        this.billboards = new IsoBillboards(this.Engine, this);
        this.tileMap = new IsoTileMap(this.Engine);
        this.zoomPoint = {
            x: Math.floor(this.Engine.canvas.canvasElement.width / 2),
            y: Math.floor(this.Engine.canvas.canvasElement.height / 2)
        };
    }
    IsoLayer.prototype.hide = function () {
        this.hidden = true;
        return this;
    };
    IsoLayer.prototype.show = function () {
        this.hidden = false;
        return this;
    };
    IsoLayer.prototype.setZoom = function (zoom) {
        var zoomNew = this.zoom + (zoom * (this.zoomStrength / 1000));
        if (zoomNew <= this.maxZoom && zoomNew >= this.minZoom)
            this.zoom = this.zoom + (zoom * (this.zoomStrength / 1000));
        return this;
    };
    IsoLayer.prototype.setMaxZoom = function (maxZoom) {
        this.maxZoom = maxZoom;
        return this;
    };
    IsoLayer.prototype.setMinZoom = function (minZoom) {
        this.minZoom = minZoom;
        return this;
    };
    IsoLayer.prototype.getZoom = function () {
        return this.zoom;
    };
    IsoLayer.prototype.setZoomPoint = function (zoomPoint) {
        this.zoomPoint = zoomPoint;
        return this;
    };
    return IsoLayer;
})();
var IsoLayers = (function () {
    function IsoLayers(Engine) {
        this.layers = new Array();
        this.lastIndex = 0;
        this.Engine = Engine;
    }
    IsoLayers.prototype.add = function (name) {
        this.layers.push(new IsoLayer(this.Engine, name, this.lastIndex));
        this.lastIndex++;
        return this.getByName(name);
    };
    IsoLayers.prototype.getByName = function (name) {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].name === name) {
                return this.layers[i];
            }
        }
        return undefined;
    };
    IsoLayers.prototype.getByIndex = function (index) {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].index === index) {
                return this.layers[i];
            }
        }
        return undefined;
    };
    IsoLayers.prototype.layerUp = function (name) {
        var oldIndex = this.getByName(name).index;
        this.getByIndex(oldIndex + 1).index = oldIndex;
        this.getByName(name).index = oldIndex + 1;
        return this;
    };
    IsoLayers.prototype.layerDown = function (name) {
        var oldIndex = this.getByName(name).index;
        this.getByIndex(oldIndex - 1).index = oldIndex;
        this.getByName(name).index = oldIndex - 1;
        return this;
    };
    IsoLayers.prototype.swapLayers = function (nameLayer1, nameLayer2) {
        var oldIndex = this.getByName(nameLayer2).index;
        this.getByName(nameLayer2).index = this.getByName(nameLayer1).index;
        this.getByName(nameLayer1).index = oldIndex;
        return this;
    };
    IsoLayers.prototype.sortLayers = function () {
        this.layers.sort(this.sortLayerByIndex);
        return this;
    };
    IsoLayers.prototype.sortLayerByIndex = function (a, b) {
        return a.index - b.index;
    };
    IsoLayers.prototype.setTileset = function (name) {
        this.tileset = name;
        return this;
    };
    IsoLayers.prototype.mouseOver = function (name) {
        return this.getByName(name).tileMap.mouseOver();
    };
    return IsoLayers;
})();
///<reference path="IsoLayer.ts" />
"use strict";
var IsoMap = (function () {
    function IsoMap(TileMap, map) {
        this.TileMap = TileMap;
        if (map !== undefined) {
            this.create(map);
        }
        else {
            var _mapArray = new Array();
            for (var y = 0; y < Math.floor(this.TileMap.height / this.TileMap.tileSizeY); y++) {
                for (var x = 0; x < Math.floor(this.TileMap.width / this.TileMap.tileSizeX); x++) {
                    if (_mapArray[y] === undefined) {
                        _mapArray[y] = new Array();
                    }
                    _mapArray[y].push(0);
                }
            }
            this.map = _mapArray;
        }
    }
    IsoMap.prototype.create = function (map) {
        this.map = map;
        return this;
    };
    IsoMap.prototype.edit = function (x, y, value) {
        this.map[y][x] = value;
        return this;
    };
    IsoMap.prototype.set = function (map) {
        this.map = map;
        return this;
    };
    IsoMap.prototype.get = function () {
        return this.map;
    };
    return IsoMap;
})();
///<reference path="IsoMap.ts" />
"use strict";
var IsoHeightMap = (function (_super) {
    __extends(IsoHeightMap, _super);
    function IsoHeightMap(tileMap, map) {
        _super.call(this, tileMap, map);
        this.strength = 1;
    }
    IsoHeightMap.prototype.getHeight = function (x, y) {
        return this.map[y][x];
    };
    IsoHeightMap.prototype.setStrength = function (strength) {
        this.strength = strength;
        return this;
    };
    return IsoHeightMap;
})(IsoMap);
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
///<reference path="IsoMap.ts" />
"use strict";
var IsoTileSet = (function (_super) {
    __extends(IsoTileSet, _super);
    function IsoTileSet(Engine, name, src) {
        _super.call(this, Engine, name, src);
        this.prefix = "TILESET_";
    }
    return IsoTileSet;
})(IsoBaseTileImage);
var IsoTileSets = (function (_super) {
    __extends(IsoTileSets, _super);
    function IsoTileSets(Engine) {
        _super.call(this, Engine);
    }
    return IsoTileSets;
})(IsoBaseTileImages);
/**
 * IsoMetric
 * =========
 * IsoMetric is a small and simple tileengine. This software is a pre-alpha.
 */
///<reference path="IsoConfig.ts" />
///<reference path="IsoCanvas.ts" />
///<reference path="IsoEvent.ts" />
///<reference path="IsoMap.ts" />
///<reference path="IsoTileSet.ts" />
"use strict";
/**
 * The mainclass of IsoMetric and the starting point for the gameloop.
 */
var IsoMetric = (function () {
    /**
     * Creates a new instance of IsoMetric
     * @param windowOptions (optional) The canvas configuration.
     */
    function IsoMetric(windowOptions) {
        var _this = this;
        /**
         * A counter for frames.
         */
        this.frameCount = 0;
        /**
         * The frames per second
         */
        this.FPS = 0;
        /**
         * The default canvas configuration.
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
        this.tileSets = new IsoTileSets(this);
        this.drawer = new IsoDrawer(this);
        if (windowOptions === undefined) {
            windowOptions = this.defaultWindowOptions;
        }
        this.config.set("windowOptions", windowOptions);
        this.canvas.create();
        this.frameCountInteral = setInterval(function () { return _this.setFPS(); }, 1000);
    }
    /**
     * Reset and set the FPS
     */
    IsoMetric.prototype.setFPS = function () {
        this.FPS = this.frameCount;
        this.frameCount = 0;
    };
    /**
     * Starts the game- and drawing-loop.
     */
    IsoMetric.prototype.startLoop = function () {
        this.update();
    };
    IsoMetric.prototype.endLoop = function () {
        var endLoop = new Date();
        this.frameTime = (endLoop.getMilliseconds() - this.startLoopTime.getMilliseconds());
        this.frameCount = this.frameCount + 1;
    };
    /**
     * The game- and drawing-loop.
     */
    IsoMetric.prototype.update = function () {
        this.startLoopTime = new Date();
        this.drawer.draw();
    };
    /**
     * [deprecated] Sets the global direction.
     */
    IsoMetric.prototype.setDirection = function (direction) {
        this.direction = direction;
    };
    IsoMetric.FRONT = 1;
    IsoMetric.RIGHT = 3;
    IsoMetric.BACK = 4;
    IsoMetric.LEFT = 2;
    return IsoMetric;
})();
"use strict";
/**
 * Collects all information about a tilemap. For example the scrolling, the used tileset and so on.
 */
var IsoTileMap = (function () {
    /**
     * Initializes the new tilemap.
     * @param Engine A instance of IsoMetric
     * @param width (optional) The width of the new tilemap in pixel
     * @param height (optional) The height of the tilemap in pixel
     * @param tileSizeX (optional) The width of a single tile
     * @param tileSizeY (optional) The height of a single tile
     */
    function IsoTileMap(Engine, width, height, tileSizeX, tileSizeY) {
        /**
         * Scroll on the X-axis
         */
        this.scrollX = 0;
        /**
         * Scroll on the Y-axis
         */
        this.scrollY = 0;
        /**
         * The scrolling speed
         */
        this.scrollSpeed = 1;
        /**
         * The offset on the X-axis
         */
        this.offsetX = 0;
        /**
         * The offset on the Y-axis
         */
        this.offsetY = 0;
        this.Engine = Engine;
        if (width !== undefined && height !== undefined && tileSizeX !== undefined && tileSizeY !== undefined) {
            this.create(width, height, tileSizeX, tileSizeY);
        }
    }
    /**
     * Creates the new tilemap.
     * @param width The width of the new tilemap in pixel
     * @param height The height of the tilemap in pixel
     * @param tileSizeX The width of a single tile
     * @param tileSizeY The height of a single tile
     * @return The new tilemap
     */
    IsoTileMap.prototype.create = function (width, height, tileSizeX, tileSizeY) {
        this.width = width;
        this.height = height;
        this.tileSizeX = tileSizeX;
        this.tileSizeY = tileSizeY;
        this.map = new IsoMap(this);
        this.heightMap = new IsoHeightMap(this);
        return this;
    };
    /**
     * Sets the tileset for the tilemap. A tileset is an image which includes all imagedata of a tilemap.
     * @param tileset A instance of the tileset
     * @return The tilemap
     * @see IsoTileSet
     */
    IsoTileMap.prototype.setTileSet = function (tileSet) {
        this.tileSet = tileSet;
        this.tileSet.setTileSize(this.tileSizeX, this.tileSizeY);
        return this;
    };
    /**
     * Returns the tileset of a tilemap
     * @return The instance of the tileset
     */
    IsoTileMap.prototype.getTileSet = function () {
        return this.tileSet;
    };
    /**
     * Adds the value of x and y to the actual srollvalues
     * @param x Scroll on the X-axis in pixel
     * @param y Scroll on the Y-axis in pixel
     */
    IsoTileMap.prototype.setDeltaScroll = function (x, y) {
        this.scrollX = this.scrollX + (this.scrollSpeed * -(x));
        this.scrollY = this.scrollY + (this.scrollSpeed * (y));
        if (this.scrollX > 0) {
            this.scrollX = 0;
        }
        if (this.scrollY > 0) {
            this.scrollY = 0;
        }
        if (-(this.scrollX) + this.Engine.config.get("windowOptions").width + this.offsetX > (this.width - (this.width % this.tileSizeX))) {
            this.scrollX =
                -((this.width - (this.width % this.tileSizeX)) + this.offsetX - this.Engine.config.get("windowOptions").width);
        }
        if (-(this.scrollY) + this.Engine.config.get("windowOptions").height + this.offsetY > (this.height - (this.height % this.tileSizeY))) {
            this.scrollY =
                -((this.height - (this.height % this.tileSizeY)) + this.offsetY - this.Engine.config.get("windowOptions").height);
        }
    };
    /**
     * Sets the scrolling speed
     * @param speed The speed
     * @return The tilemap
     */
    IsoTileMap.prototype.setScrollSpeed = function (speed) {
        this.scrollSpeed = speed;
        return this;
    };
    /**
     * Checks the tile which the mouse pointer is touching
     * return The tile.
     */
    IsoTileMap.prototype.mouseOver = function () {
        var mouseX = this.Engine.input.mouseX, mouseY = this.Engine.input.mouseY;
        if (mouseX > this.width ||
            mouseY > this.height ||
            typeof mouseX === "NaN" ||
            typeof mouseY === "NaN" ||
            mouseX === undefined ||
            mouseY === undefined) {
            return null;
        }
        else {
            mouseX = mouseX - this.offsetX;
            mouseY = mouseY - this.offsetY;
            if (mouseY > 0 && mouseX > 0) {
                var row = Math.floor((mouseY + (-this.scrollY)) / this.tileSizeY), column = Math.floor((mouseX + (-this.scrollX)) / this.tileSizeX), x = Math.floor(column * this.tileSizeX) + this.scrollX + this.offsetX, y = Math.floor(row * this.tileSizeY) + this.scrollY + this.offsetY;
                return {
                    x: x,
                    y: y,
                    width: this.tileSizeX,
                    height: this.tileSizeY,
                    tile: this.map.get()[row][column]
                };
            }
            else {
                return null;
            }
        }
    };
    /**
     * Gets all tiles in specified area
     * @param x The position on the X-axis of the area
     * @param y The position on the Y-axis of the area
     * @param width The width of the area
     * @param height The height of the area
     * @retrurn An array with information of all tiles
     */
    IsoTileMap.prototype.getTilesInRadius = function (x, y, width, height) {
        x = x - this.offsetX;
        y = y - this.offsetY;
        var tiles = new Array(), toX = x + width, toY = y + height, rowStart = (y - (y % this.tileSizeY)) / this.tileSizeY, rowEnd = (toY - (toY % this.tileSizeY)) / this.tileSizeY, colStart = (x - (x % this.tileSizeX)) / this.tileSizeX, colEnd = (toX - (toX % this.tileSizeX)) / this.tileSizeX;
        for (var iy = rowStart; iy <= rowEnd; iy++) {
            for (var ix = colStart; ix <= colEnd; ix++) {
                var tileX = ix * this.tileSizeX, tileY = iy * this.tileSizeY, tileX2 = tileX + this.tileSizeX, tileY2 = tileY + this.tileSizeY;
                tiles.push({
                    x: ix * this.tileSizeX,
                    y: iy * this.tileSizeY,
                    width: this.tileSizeX,
                    height: this.tileSizeY,
                    tile: this.map.get()[iy][ix],
                    tileHeight: this.heightMap.getHeight(ix, iy)
                });
            }
        }
        return tiles;
    };
    return IsoTileMap;
})();
//# sourceMappingURL=isometric.js.map