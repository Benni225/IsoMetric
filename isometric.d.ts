declare class IsoImage {
    /**
     * Path to the image
     */
    src: string;
    /**
     * Name of the object
     */
    name: string;
    /**
     * HTMLImageObject
     */
    image: HTMLImageElement;
    /**
     * A callback when the image loaded
     */
    onLoad: Function;
    /**
     * The width of the image
     */
    width: number;
    /**
     * The height of the image
     */
    height: number;
    constructor(name?: string, src?: string);
    /**
     * Creates a new image.
     * @param src Source to the imagefile.
     * @return Instance of IsoImage
     */
    create(name: string, src: string): IsoImage;
    /**
     * Loads the image for further work.
     * @return Instance of IsoImage
     */
    load(): void;
    /**
     * Called when the image file was loaded.
     * @param event The triggerd event
     */
    _onLoad(event: Event): void;
    /**
     * Returns the image.
     * @return The image.
     */
    get(): HTMLImageElement;
    /**
     * Deletes the image.
     */
    free(): void;
}
declare class IsoCollection {
    collection: Array<any>;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric);
    get(): Array<any>;
    getByName(name: string): any;
}
interface IIsoTransparentColor {
    r: number;
    g: number;
    b: number;
}
interface IIsoImageData {
    raw: ImageData;
    urlData: string;
}
declare class IsoBaseTileImage extends IsoImage {
    /**
     * Width of the image
     */
    tileWidth: number;
    /**
     * Height of the image
     */
    tileHeight: number;
    /**
     * ToDo:
     * maybe deprecated
     */
    prefix: string;
    tansparentColor: IIsoTransparentColor;
    /**
     * The the direction. Possible values are:
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.Left
     * - IsoMetric.RIGHT
     */
    direction: number;
    /**
     * An object of IsoMetric
     */
    Engine: IsoMetric;
    offsetX: number;
    offsetY: number;
    /**
     * Creates a new instance of IsoBaseTileImage
     * @param Engine A object of IsoMetric
     * @param name Name of the new tileset
     * @param src Path to the image file
     */
    constructor(Engine: IsoMetric, name?: string, src?: string);
    /**
     * Define a part of the image as tileset.
     * @param x The point on the X-axis where the imagepart starts.
     * @param y the point on the Y-axis where the imagepart starts.
     * @param width The width in pixels of the imagepart.
     * @param height The height in pixels of the imagepart.
     */
    crop(x: number, y: number, width: number, height: number): IsoBaseTileImage;
    /**
     * Creates a new Tileset.
     * @override IsoImage.create
     * @param Engine A object of IsoMetric
     * @param name Name of the new tileset
     * @param src Path to the image file
     * @return Instance of IsoBaseTileImage
     */
    create(name: string, src: string): IsoBaseTileImage;
    /**
     * Loads the image for further work.
     * @override IsoImage.load
     * @return Instance of IsoBaseTileImage
     */
    load(): IsoBaseTileImage;
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
    getTileOffset(tileNumber: number): {
        offsetX: number;
        offsetY: number;
    };
    /**
     * Sets the size of a tile
     * @param width The width in px
     * @param height The height in px
     */
    setTileSize(width: number, height: number): IsoBaseTileImage;
    /**
     * Sets the direction of the tileset.
     * @param direction The direction of the tileset. Possible values are:
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.RIGHT
     * - IsoMetric.LEFT
     * @return The tileset.
     */
    setDirection(direction: number): IsoBaseTileImage;
}
declare class IsoBaseTileImages extends IsoCollection {
    collection: Array<IsoBaseTileImage>;
    private loaded;
    private onLoaded;
    private onEvery;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric);
    add(name: string, src: string): IsoTileSets;
    load(): IsoTileSets;
    loadCounter(event: Event, tileSet: IsoTileSet): void;
    every(callback: Function): IsoBaseTileImages;
    then(callback: Function): IsoBaseTileImages;
    callThen(): void;
}
declare class IsoBillboard extends IsoImage {
    x: number;
    y: number;
    scrollX: number;
    scrollY: number;
    offsetX: number;
    offsetY: number;
    speed: number;
    Engine: IsoMetric;
    layer: IsoLayer;
    scrollable: boolean;
    constructor(Engine: IsoMetric, name?: string, src?: string);
    create(name: string, src: string): IsoBillboard;
    load(): IsoBillboard;
    _onLoad(event: Event): void;
    setPosition(x: number, y: number): IsoBillboard;
    setSpeed(speed: number): IsoBillboard;
    move(deltaX: number, deltaY: number): IsoBillboard;
    setDeltaScroll(deltaX: number, deltaY: number): void;
    setScroll(x: number, y: number): void;
}
declare class IsoBillboards extends IsoCollection {
    collection: Array<IsoBillboard>;
    private loaded;
    private onLoaded;
    private onEvery;
    Layer: IsoLayer;
    constructor(Engine: IsoMetric, Layer: IsoLayer);
    add(name: string, src: string): IsoBillboards;
    load(): IsoBillboards;
    loadCounter(event: Event, tileSet: IsoBillboard): void;
    every(callback: Function): IsoBillboards;
    then(callback: Function): IsoBillboards;
    callThen(): void;
}
declare class IsoCanvas {
    canvasElement: HTMLCanvasElement;
    context: any;
    private clearColor;
    private defaultOptions;
    options: IIsoConfigWindowOptions;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric);
    create(id?: string): IsoCanvas;
    set(canvas: HTMLCanvasElement): IsoCanvas;
    setClass(cssClass: string): void;
    updateScreen(): IsoCanvas;
    updateSize(width: number, height: number): void;
    clearScreen(): IsoCanvas;
    get(): HTMLCanvasElement;
}
interface ICollisionBody {
    relativX: number;
    relativY: number;
    width: number;
    height: number;
}
/**
 * Includes all animation parameters of a sprite.
 */
declare class IsoSpriteAnimation {
    static LOOP: number;
    static PINGPONG: number;
    static LINEAR: number;
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
    framesPerSecond: number;
    /**
     * The playing type. Possible values are:
     * - IsoSpriteAnimation.LOOP
     * - IsoSpriteAnimation.PINGPONG.
     */
    type: number;
    /**
     * The easing of the animation. It influences the playing speed of the animation.
     */
    easing: number;
    /**
     * The interval object returned by window.setInterval
     */
    private interval;
    /**
     * The actual frame of the animation.
     */
    frame: number;
    /**
     * A flag for playing a ping-pong-animation.
     */
    private pingpongDirection;
    /**
     * The IsoMetric object
     */
    Engine: IsoMetric;
    /**
     * True if the animation is playing else false.
     */
    isPlaying: boolean;
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
    constructor(Engine: IsoMetric, name?: string, startFrame?: number, endFrame?: number, sprite?: IsoSprite);
    /**
     * Creates a new animation.
     * @param name The name of the new animation.
     * @param startFrame The number of the tile in the tileset where animation starts.
     * @param endFrame The number of the tile in the tileset where animation ends.
     * @param sprite The parent sprite object.
     * @return The animation.
     */
    create(name: string, startFrame: number, endFrame: number, sprite: IsoSprite): IsoSpriteAnimation;
    /**
     * Sets the playing speed of the animation in frames per second.
     * @param framesPerSecond The number of frames that will be played in a second.
     * @return The animation.
     */
    setFramesPerSecond(framesPerSecond: number): IsoSpriteAnimation;
    /**
     * Sets the animation type.
     * @param type The type of animation. Posiible values are:
     * - IsoSpriteAnimation.LOOP
     * - IsoSpriteAnimation.PINGPONG
     * @return The animation.
     */
    setAnimationType(type: number): IsoSpriteAnimation;
    /**
     * Starts the playingloop.
     * @return The animation.
     */
    play(): IsoSpriteAnimation;
    /**
     * Calculates the the time between two frames depending on the easing.
     */
    private recalculateFrameTime();
    /**
     * Calculates the actual frame and return it. It depends on the animation type.
     * @return The actual frame number.
     */
    calculateFrame(): number;
    /**
     * Returns the actual frame.
     * @return The actual frame.
     */
    get(): number;
    /**
     * Returns the tile number in the tileset.
     * @return The tile number.
     */
    getTileNumber(): number;
    /**
     * Stops the animation loop.
     * @return The animation.
     */
    stop(): IsoSpriteAnimation;
}
/**
 * Collection of all animation.
 */
declare class IsoSpriteAnimations {
    /**
     * An array with all animations for a sprite
     */
    animations: Array<IsoSpriteAnimation>;
    /**
     * The egnine object
     */
    Engine: IsoMetric;
    /**
     * Initialize the collection of animations
     * @param Engine The engine object
     */
    constructor(Engine: IsoMetric);
    /**
     * Adds a new animation to the collection.
     * @param name Name of the new animation.
     * @param startFrame The number of the tile in the tileset where the animation starts.
     * @param endFrame The number of the tile in the tileset where the animation ends.
     * @param sprite The parent sprite object.
     * @return The animation collection
     */
    add(name: string, startFrame: number, endFrame: number, sprite: IsoSprite): IsoSpriteAnimations;
    /**
     * Returns an animation by its name.
     * @param name The name of the animation
     * @return IsoSpriteAnimation or undefined
     */
    getByName(name: string): IsoSpriteAnimation;
}
/**
 * Generates sprites, that can free positioned on the screen. Every sprite is referenced to a layer.
 * @extends IsoBaseTileImage
 */
declare class IsoSprite extends IsoBaseTileImage {
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
    speed: number;
    /**
     * The actual tile.
     */
    tile: number;
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
    defaultFrame: number;
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
    constructor(Engine: IsoMetric, name: string, src: string, tileWidth: number, tileHeight: number, layer: IsoLayer);
    /**
     * Adds a new animation to the sprite object
     * @param name Name of the animation
     * @param startFrame First from of the animation in the tileset
     * @param endFrame Last frame of the animation in the tileset
     * @return The sprite object
     */
    addAnimation(name: string, startFrame: number, endFrame: number): IsoSprite;
    /**
     * Sets the layer where the sprite will be placed on
     * @param name The name of the layer.
     * @return The sprite.
     */
    setLayer(layer: IsoLayer): IsoSprite;
    /**
     * Sets the default animation if no animation is played
     * @param name Name of the animation
     * @return The sprite
     */
    setDefaultAnimation(name: string): IsoSprite;
    /**
     * Sets the position on the X-axis.
     * @param x Position on the X-axis.
     * @return The sprite.
     */
    setX(x: number): IsoSprite;
    /**
     * Sets the position on Y-axis
     * @param y Position on the Y-axis
     * @return The sprite.
     */
    setY(y: number): IsoSprite;
    /**
     * @Todo: integrate masks
     */
    /**
     * Sets the direction of the sprite.
     * @param direction The direction of the sprite. Possible values are:
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.RIGHT
     * - IsoMetric.LEFT
     * @return The sprite.
     */
    setDirection(direction: number): IsoSprite;
    /**
     * Gets the actual used tile of the sprite
     * @return number
     */
    getTile(): number;
    /**
     * Sets the actual tile
     * @param tileNumber The number of the tile
     * @return The sprite
     */
    setTile(tileNumber: number): IsoSprite;
    /**
     * Sets the default frame for the case no animation is played.
     * @param frame The frame number
     */
    setDefaultFrame(frame: number): IsoSprite;
    /**
     * Move the sprite on the X- and Y-axis.
     * @param x The move the position on the X-axis.
     * @param y The move the position on the Y-axis.
     * @return The sprite.
     */
    move(deltaX: number, deltaY: number): IsoSprite;
    /**
     * Sets the moving speed of the sprite.
     * @param speed The speed which the sprite will moving over the screen in pixel.
     * @return The sprite.
     */
    setSpeed(speed: number): IsoSprite;
    setCollisionBody(collisionBody: ICollisionBody): IsoSprite;
    getCollidingTiles(): Array<Array<ITile>>;
}
/**
 * Collection of all sprites.
 */
declare class IsoSprites {
    sprites: Array<IsoSprite>;
    Engine: IsoMetric;
    onEvery: Function;
    onLoaded: Function;
    loaded: number;
    layer: IsoLayer;
    /**
     * Initialize the collection.
     * @param Engine
     */
    constructor(Engine: IsoMetric, layer: IsoLayer);
    add(name: string, src: string, tileWidth: number, tileHeight: number): IsoSprites;
    getByName(name: string): IsoSprite;
    get(): Array<IsoSprite>;
    load(): IsoSprites;
    loadCounter(event: Event, sprite: IsoSprite): void;
    every(callback: Function): IsoSprites;
    then(callback: Function): IsoSprites;
    callThen(): void;
}
declare class IsoCharacter extends IsoSprite {
    attributes: Object;
    constructor(Engine: IsoMetric, name: string, src: string, tileWidth: number, tileHeight: number, layer: IsoLayer);
    addAttribute(name: string, value: any): IsoCharacter;
    getAttribute(name: string): any;
}
interface IIsoConfigWindowOptions {
    width: number;
    height: number;
    fullscreen: boolean;
}
declare class IsoConfig {
    c: Object;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric, c?: JSON);
    setConfig(c: JSON): void;
    set(name: string, value: any): void;
    get(name: string): any;
}
interface IIsoDrawObject {
    scrollX: number;
    scrollY: number;
    offsetX: number;
    offsetY: number;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    imageOffsetX: number;
    imageOffsetY: number;
    type?: string;
    tileHeight?: number;
    layer?: IsoLayer;
    imageUrl?: string;
    zoom: number;
    row?: number;
    column?: number;
}
declare class IsoDrawObject {
    objects: Array<IIsoDrawObject>;
    add(object: IIsoDrawObject): void;
    clear(): void;
}
declare class IsoDrawer {
    Engine: IsoMetric;
    Layers: IsoLayers;
    Canvas: IsoCanvas;
    TileSets: IsoTileSets;
    onDrawLayer: Function;
    onDrawComplete: Function;
    objects: IsoDrawObject;
    constructor(Engine: IsoMetric);
    draw(): void;
    drawObject(): void;
    drawLayer(layer: IsoLayer): void;
    sortPriorities(a: IIsoDrawObject, b: IIsoDrawObject): number;
}
declare class IsoEvent {
    type: string;
    data: any;
    constructor(type: string);
    addData(data: any): IsoEvent;
    trigger(target?: string): void;
}
interface zoomPoint {
    x: number;
    y: number;
}
declare class IsoLayer {
    index: number;
    name: string;
    hidden: boolean;
    Engine: IsoMetric;
    sprites: IsoSprites;
    billboards: IsoBillboards;
    tileMap: IsoTileMap;
    zoom: number;
    maxZoom: number;
    minZoom: number;
    zoomStrength: number;
    zoomPoint: zoomPoint;
    constructor(Engine: IsoMetric, name: string, index: number);
    hide(): IsoLayer;
    show(): IsoLayer;
    setZoom(zoom: number): IsoLayer;
    setMaxZoom(maxZoom: number): IsoLayer;
    setMinZoom(minZoom: number): IsoLayer;
    getZoom(): number;
    setZoomPoint(zoomPoint: zoomPoint): IsoLayer;
}
declare class IsoLayers {
    layers: Array<IsoLayer>;
    private lastIndex;
    tileset: string;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric);
    add(name: string): IsoLayer;
    getByName(name: string): IsoLayer;
    getByIndex(index: number): IsoLayer;
    layerUp(name: string): IsoLayers;
    layerDown(name: string): IsoLayers;
    swapLayers(nameLayer1: string, nameLayer2: string): IsoLayers;
    sortLayers(): IsoLayers;
    sortLayerByIndex(a: IsoLayer, b: IsoLayer): number;
    setTileset(name: string): IsoLayers;
    mouseOver(name: string): ITile;
}
declare class IsoMap {
    map: Array<Array<number>>;
    TileMap: IsoTileMap;
    constructor(TileMap: IsoTileMap, map?: Array<Array<number>>);
    create(map: Array<Array<number>>): IsoMap;
    edit(x: number, y: number, value: number): IsoMap;
    set(map: Array<Array<number>>): IsoMap;
    get(): Array<Array<number>>;
}
declare class IsoHeightMap extends IsoMap {
    strength: number;
    constructor(tileMap: IsoTileMap, map?: Array<Array<number>>);
    getHeight(x: number, y: number): number;
    setStrength(strength: number): IsoHeightMap;
}
interface IsoMouseEvent extends MouseEvent {
    wheelDelta?: number;
}
declare class IsoInput {
    static KEYDOWN: number;
    static KEYUP: number;
    static KEYLEFT: number;
    static KEYRIGHT: number;
    static KEYTAB: number;
    static KEYESCAPE: number;
    static KEYSPACE: number;
    static KEYENTER: number;
    static KEYCTRL: number;
    static KEYSHIFT: number;
    static KEYALT: number;
    static KEYBACKSPACE: number;
    static EVENT_KEYPRESS: string;
    static EVENT_KEYDOWN: string;
    static EVENT_KEYUP: string;
    static EVENT_MOUSEDOWN: string;
    static EVENT_MOUSEUP: string;
    static EVENT_MOUSEWHEEL: string;
    Engine: IsoMetric;
    keyCode: number;
    keyEventType: string;
    isKeyEvent: boolean;
    keyEvent: KeyboardEvent;
    keyChar: string;
    onKeyboard: Function;
    mouseCode: number;
    mouseEventType: string;
    isMouseEvent: boolean;
    mouseEvent: IsoMouseEvent;
    onMouse: Function;
    mouseX: number;
    mouseY: number;
    mouseWheelDelta: number;
    lastTouchEventType: string;
    touches: TouchList;
    isTouchEvent: boolean;
    touchEvent: TouchEvent;
    onTouch: Function;
    onInput: Function;
    oldEvent: Event;
    constructor(Engine: IsoMetric);
    addEvents(): void;
    checkKeyboard(event: KeyboardEvent): void;
    checkMouse(event: IsoMouseEvent): void;
    checkTouch(event: TouchEvent): void;
    reset(): void;
    callCallback(event: Event): void;
}
interface ITile {
    x: number;
    y: number;
    width: number;
    height: number;
    tile: number;
}
declare class IsoTileSet extends IsoBaseTileImage {
    constructor(Engine: IsoMetric, name: string, src: string);
}
declare class IsoTileSets extends IsoBaseTileImages {
    constructor(Engine: IsoMetric);
}
/**
 * The mainclass of IsoMetric and the starting point for the gameloop.
 */
declare class IsoMetric {
    static FRONT: number;
    static RIGHT: number;
    static BACK: number;
    static LEFT: number;
    /**
     * The configuration.
     * @see IsoConfig
     */
    config: IsoConfig;
    /**
     * The canvas object
     * @see IsoCanvas
     */
    canvas: IsoCanvas;
    /**
     * All layers of the actual game
     * @see IsoLayers
     */
    layers: IsoLayers;
    /**
     * @Todo:
     * Maybe deprecated
     */
    tileSets: IsoTileSets;
    /**
     * The drawing lib.
     * @see IsoDrawer
     */
    drawer: IsoDrawer;
    /**
     * The input library.
     * @see IsoInput
     */
    input: IsoInput;
    /**
     * [deprecated] The global direction of all layers.
     */
    direction: number;
    /**
     * The time one frames needs to draw.
     */
    frameTime: number;
    /**
     * A counter for frames.
     */
    frameCount: number;
    /**
     * An inteval for reseting the FPS
     */
    frameCountInteral: any;
    /**
     * The time in milliseconds at the begin of a loop.
     */
    startLoopTime: Date;
    /**
     * The frames per second
     */
    FPS: number;
    /**
     * The default canvas configuration.
     */
    defaultWindowOptions: IIsoConfigWindowOptions;
    /**
     * An inteval for the drawing and game loop
     */
    interval: Object;
    /**
     *
     */
    animationFrame: Object;
    /**
     * Creates a new instance of IsoMetric
     * @param windowOptions (optional) The canvas configuration.
     */
    constructor(windowOptions?: Object);
    /**
     * Reset and set the FPS
     */
    setFPS(): void;
    /**
     * Starts the game- and drawing-loop.
     */
    startLoop(): void;
    endLoop(): void;
    /**
     * The game- and drawing-loop.
     */
    update(): void;
    /**
     * [deprecated] Sets the global direction.
     */
    setDirection(direction: number): void;
}
/**
 * Collects all information about a tilemap. For example the scrolling, the used tileset and so on.
 */
declare class IsoTileMap {
    /**
     * The width of one tile
     */
    tileSizeX: number;
    /**
     * The height of one tile
     */
    tileSizeY: number;
    /**
     * The tileset for the tilemap
     */
    tileSet: IsoTileSet;
    /**
     * The map including the information which tiles is drawn on a specified position
     */
    map: IsoMap;
    /**
     * The height map
     */
    heightMap: IsoHeightMap;
    /**
     * Specifies which tile is drawn in case the the height of an tile is > 0
     */
    heightTile: number;
    /**
     * Scroll on the X-axis
     */
    scrollX: number;
    /**
     * Scroll on the Y-axis
     */
    scrollY: number;
    /**
     * The scrolling speed
     */
    scrollSpeed: number;
    /**
     * The height of the tilemap
     */
    height: number;
    /**
     * The width of the tilemap
     */
    width: number;
    /**
     * The offset on the X-axis
     */
    offsetX: number;
    /**
     * The offset on the Y-axis
     */
    offsetY: number;
    /**
     * An instance of IsoMetric
     */
    Engine: IsoMetric;
    /**
     * Initializes the new tilemap.
     * @param Engine A instance of IsoMetric
     * @param width (optional) The width of the new tilemap in pixel
     * @param height (optional) The height of the tilemap in pixel
     * @param tileSizeX (optional) The width of a single tile
     * @param tileSizeY (optional) The height of a single tile
     */
    constructor(Engine: IsoMetric, width?: number, height?: number, tileSizeX?: number, tileSizeY?: number);
    /**
     * Creates the new tilemap.
     * @param width The width of the new tilemap in pixel
     * @param height The height of the tilemap in pixel
     * @param tileSizeX The width of a single tile
     * @param tileSizeY The height of a single tile
     * @return The new tilemap
     */
    create(width: number, height: number, tileSizeX: number, tileSizeY: number): IsoTileMap;
    /**
     * Sets the tileset for the tilemap. A tileset is an image which includes all imagedata of a tilemap.
     * @param tileset A instance of the tileset
     * @return The tilemap
     * @see IsoTileSet
     */
    setTileSet(tileSet: IsoTileSet): IsoTileMap;
    /**
     * Returns the tileset of a tilemap
     * @return The instance of the tileset
     */
    getTileSet(): IsoTileSet;
    /**
     * Adds the value of x and y to the actual srollvalues
     * @param x Scroll on the X-axis in pixel
     * @param y Scroll on the Y-axis in pixel
     */
    setDeltaScroll(x: number, y: number): void;
    /**
     * Sets the scrolling speed
     * @param speed The speed
     * @return The tilemap
     */
    setScrollSpeed(speed: number): IsoTileMap;
    /**
     * Checks the tile which the mouse pointer is touching
     * return The tile.
     */
    mouseOver(): ITile;
    /**
     * Gets all tiles in specified area
     * @param x The position on the X-axis of the area
     * @param y The position on the Y-axis of the area
     * @param width The width of the area
     * @param height The height of the area
     * @retrurn An array with information of all tiles
     */
    getTilesInRadius(x: number, y: number, width: number, height: number): Array<ITile>;
}
