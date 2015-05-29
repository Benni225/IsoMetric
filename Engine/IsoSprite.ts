"use strict";
interface ICollisionBody {
    relativX: number;
    relativY: number;
    width: number;
    height: number;
}
/**
 * Includes all animation parameters of a sprite.
 */
class IsoSpriteAnimation {
    static LOOP = 0;
    static PINGPONG = 1;

    static LINEAR = 1;
    /**
     * Name of the animation
     */
    name: string;
    /**
     * The first tile in the tileset where the animation starts.
     */
    startFrame: number;
    /**
     * The last tile in the tileset where animation ends.
     */
    endFrame: number;
    /**
     * Framecount of the animation.
     */
    frameCount: number;
    /**
     * The speed of the animation in frames per second.
     */
    framesPerSecond: number = 1;
    /**
     * The playing type. Possible values are:
     * - IsoSpriteAnimation.LOOP
     * - IsoSpriteAnimation.PINGPONG.
     */
    type: number;
    /**
     * The easing of the animation. It influences the playing speed of the animation.
     */
    easing: number = IsoSpriteAnimation.LINEAR;
    /**
     * The interval object returned by window.setInterval
     */
    private interval: any;
    /**
     * The actual frame of the animation.
     */
    frame: number = 1;
    /**
     * A flag for playing a ping-pong-animation.
     */
    private pingpongDirection: number = 0;
    /**
     * The IsoMetric object
     */
    Engine: IsoMetric;
    /**
     * True if the animation is playing else false.
     */
    isPlaying: boolean = false;
    /**
     * The parent sprite object.
     */
    sprite: IsoSprite;
    /**
     * Initializes an creates a new animation.
     * @param Engine The IsoMetric object.
     * @param name (optional) The name of the new animation.
     * @param startFrame (optional) The number of the tile in the tileset where animation starts.
     * @param endFrame (optional) The number of the tile in the tileset where animation ends.
     * @param sprite (optional) The parent sprite object.
     */
    constructor(Engine: IsoMetric, name?: string, startFrame?: number, endFrame?: number, sprite?: IsoSprite) {
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
    create(name: string, startFrame: number, endFrame: number, sprite: IsoSprite) : IsoSpriteAnimation {
        this.name = name;
        this.startFrame = startFrame;
        this.endFrame = endFrame;
        this.frameCount = endFrame - startFrame + 1;
        this.sprite = sprite;
        return this;
    }
    /**
     * Sets the playing speed of the animation in frames per second.
     * @param framesPerSecond The number of frames that will be played in a second.
     * @return The animation.
     */
    setFramesPerSecond(framesPerSecond: number) : IsoSpriteAnimation {
        this.framesPerSecond = framesPerSecond;
        return this;
    }
    /**
     * Sets the animation type.
     * @param type The type of animation. Posiible values are:
     * - IsoSpriteAnimation.LOOP
     * - IsoSpriteAnimation.PINGPONG
     * @return The animation.
     */
    setAnimationType(type: number) : IsoSpriteAnimation {
        this.type = type;
        return this;
    }
    /**
     * Starts the playingloop.
     * @return The animation.
     */
    play(): IsoSpriteAnimation {
        if (this.isPlaying === false) {
            this.isPlaying = true;
            var time = 1000.0 / this.framesPerSecond;
            this.interval = setInterval(() => this.calculateFrame(), time);
        }
        return this;
    }
    /**
     * Calculates the the time between two frames depending on the easing.
     */
    private recalculateFrameTime() {
        var time = 0;
        clearInterval(this.interval);
        switch (this.easing) {
            case IsoSpriteAnimation.LINEAR:
                time = 1000.0 / this.framesPerSecond;
                break;
        }
        this.interval = setInterval(() => this.calculateFrame(), time);
    }
    /**
     * Calculates the actual frame and return it. It depends on the animation type.
     * @return The actual frame number.
     */
    calculateFrame() {
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
                    } else {
                        this.frame = this.frame + 1;
                    }
                } else if (this.pingpongDirection === 1) {
                    if (this.frame - 1 < 1) {
                        this.pingpongDirection = 0;
                        this.frame = this.frame + 1;
                    } else {
                        this.frame = this.frame - 1;
                    }
                }
                break;
        }
        this.recalculateFrameTime();
        return this.frame;
    }
    /**
     * Returns the actual frame.
     * @return The actual frame.
     */
    get() : number {
        return this.frame;
    }
    /**
     * Returns the tile number in the tileset.
     * @return The tile number.
     */
    getTileNumber(): number {
        var tile = (this.startFrame - 1) + (this.frame - 1) + ((this.sprite.direction * this.frameCount) - this.frameCount);
        return tile;
    }
    /**
     * Stops the animation loop.
     * @return The animation.
     */
    stop(): IsoSpriteAnimation {
        this.isPlaying = false;
        clearInterval(this.interval);
        this.frame = 0;
        return this;
    }
}
/**
 * Collection of all animation.
 */
class IsoSpriteAnimations {
    /**
     * An array with all animations for a sprite
     */
    animations: Array<IsoSpriteAnimation> = new Array();
    /**
     * The egnine object
     */
    Engine: IsoMetric;
    /**
     * Initialize the collection of animations
     * @param Engine The engine object
     */
    constructor(Engine: IsoMetric) {
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
    add(name: string, startFrame: number, endFrame: number, sprite: IsoSprite) : IsoSpriteAnimations {
        this.animations.push(new IsoSpriteAnimation(this.Engine, name, startFrame, endFrame, sprite));
        return this;
    }
    /**
     * Returns an animation by its name.
     * @param name The name of the animation
     * @return IsoSpriteAnimation or undefined
     */
    getByName(name: string) : IsoSpriteAnimation {
        for (var i = 0; i < this.animations.length; i++) {
            if (this.animations[i].name === name) {
                return this.animations[i];
            }
        }
        return undefined;
    }
}
/**
 * Generates sprites, that can free positioned on the screen. Every sprite is referenced to a layer.
 * @extends IsoBaseTileImage 
 */
class IsoSprite extends IsoBaseTileImage {
    /**
     * Includes all animations of the sprite.
     * @see IsoSpriteAnimations
     */
    animations: IsoSpriteAnimations;
    /**
     * Position on the X-axis.
     */
    x: number;
    /**
     * Position on the Y-axis.
     */
    y: number;
    speed: number = 1;
    /**
     * The actual tile.
     */
    tile: number = 0;
    /**
     * The layer where the sprite will be placed on.
     */
    layer: IsoLayer;
    /**
     * Source image of the mask
     */
    maskSrc: string;
    /**
     * The default frame
     */
    defaultFrame: number = 1;
    /**
     * The default animation if no animation is played.
     */
    defaultAnimation: string;
    collisionBody: ICollisionBody;
    /**
     * Creates a new sprite.
     * @param Engine {IsoMetric}
     * @param name Name of the sprite
     * @param src Path to the image
     * @param tileWidth Width in pixel of every tile
     * @param tileHeight Height in pixel of every tile
     * @param layer Name of the layer the sprite will be placed on
     */
    constructor(Engine: IsoMetric, name: string, src: string, tileWidth: number, tileHeight: number, layer: IsoLayer) {
        super(Engine, name, src);
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
    addAnimation(name: string, startFrame: number, endFrame: number) : IsoSprite {
        this.animations.add(name, startFrame, endFrame, this);
        return this;
    }
    /**
     * Sets the layer where the sprite will be placed on
     * @param name The name of the layer.
     * @return The sprite.
     */
    setLayer(layer: IsoLayer) : IsoSprite {
        this.layer = layer;
        return this;
    }
    /**
     * Sets the default animation if no animation is played
     * @param name Name of the animation
     * @return The sprite
     */
    setDefaultAnimation(name: string): IsoSprite {
        this.defaultAnimation = name;
        return this;
    }
    /**
     * Sets the position on the X-axis.
     * @param x Position on the X-axis.
     * @return The sprite.
     */
    setX(x: number): IsoSprite {
        this.x = x;
        return this;
    }
    /**
     * Sets the position on Y-axis
     * @param y Position on the Y-axis
     * @return The sprite.
     */
    setY(y: number): IsoSprite {
        this.y = y;
        return this;
    }
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
    setDirection(direction: number): IsoSprite {
        this.direction = direction;
        return this;
    }
    /**
     * Gets the actual used tile of the sprite
     * @return number
     */
    getTile() {
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
        } else {
            this.tile = this.defaultFrame - 1;
        }
        return this.tile;
    }
    /**
     * Sets the actual tile
     * @param tileNumber The number of the tile
     * @return The sprite
     */
    setTile(tileNumber: number): IsoSprite {
        this.tile = tileNumber;
        return this;
    }
    /**
     * Sets the default frame for the case no animation is played.
     * @param frame The frame number
     */
    setDefaultFrame(frame: number) : IsoSprite {
        this.defaultFrame = frame;
        return this;
    }
    /**
     * Move the sprite on the X- and Y-axis.
     * @param x The move the position on the X-axis.
     * @param y The move the position on the Y-axis.
     * @return The sprite.
     */
    move(deltaX: number, deltaY: number): IsoSprite {
        this.x = this.x + (this.speed * deltaX);
        this.y = this.y + (this.speed * deltaY);
        return this;
    }
    /**
     * Sets the moving speed of the sprite.
     * @param speed The speed which the sprite will moving over the screen in pixel.
     * @return The sprite.
     */
    setSpeed(speed: number): IsoSprite {
        this.speed = speed;
        return this;
    }

    setCollisionBody(collisionBody: ICollisionBody) : IsoSprite {
        this.collisionBody = collisionBody;
        return this;
    }

    getCollidingTiles() : Array<Array<ITile>> {
        var layers = this.Engine.layers.layers;
        var tilesO = new Array();
        var collisionBody: ICollisionBody = this.collisionBody;
        if (collisionBody === undefined) {
            collisionBody = {
                relativX: 0,
                relativY: 0,
                width: this.tileWidth,
                height: this.tileHeight
            };
        }
        for (var i = 0; i < layers.length; i++) {
            var tiles = layers[i].tileMap.getTilesInRadius
                (
                this.x + collisionBody.relativX,
                this.y + collisionBody.relativY,
                collisionBody.width,
                collisionBody.height
                );
            if (tiles.length > 0) {
                tilesO[layers[i].name] = tiles;
            }
        }
        return tilesO;
    }
}
/**
 * Collection of all sprites.
 */
class IsoSprites {
    sprites: Array<IsoSprite> = new Array();
    Engine: IsoMetric;
    onEvery: Function;
    onLoaded: Function;
    loaded: number = 0;
    layer: IsoLayer;
    /**
     * Initialize the collection.
     * @param Engine
     */
    constructor(Engine: IsoMetric, layer: IsoLayer) {
        this.Engine = Engine;
        this.layer = layer;
    }

    add(name: string, src: string, tileWidth: number, tileHeight: number) : IsoSprites {
        this.sprites.push(new IsoSprite(this.Engine, name, src, tileWidth, tileHeight, this.layer));
        return this;
    }

    getByName(name: string) : IsoSprite {
        for (var i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i].name === name) {
                return this.sprites[i];
            }
        }
        return undefined;
    }

    get() : Array<IsoSprite> {
        return this.sprites;
    }

    load(): IsoSprites {
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].onLoad = (event: Event) => this.loadCounter(event, this.sprites[i]);
            this.sprites[i].load();
        }
        return this;
    }

    loadCounter(event: Event, sprite: IsoSprite) {
        this.loaded = this.loaded + 1;
        if (this.onEvery !== undefined) {
            this.onEvery(this.Engine, event, sprite);
        }
        if (this.loaded === this.sprites.length) {
            new IsoEvent("spritesLoaded").trigger();
            this.callThen();
        }
    }

    every(callback: Function): IsoSprites {
        this.onEvery = callback;
        return this;
    }

    then(callback: Function): IsoSprites {
        this.onLoaded = callback;
        return this;
    }

    callThen() {
        if (this.onLoaded !== undefined) {
            this.onLoaded.call(this.Engine);
        }
    }
}