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
declare class IsoObject {
    static BOX_COLLISION: string;
    static PIXEL_COLLISION: string;
    position: IsoPoint;
    scrollPosition: IsoScroll;
    offset: IsoOffset;
    width: number;
    height: number;
    zoomLevel: number;
    zoomStrength: number;
    zoomPoint: IsoPoint;
    /**
     * Rotation in degrees
     */
    rotation: number;
    image: IsoRessource;
    collisionType: string;
    collisionResolution: number;
    speed: number;
    name: string;
    Engine: IsoMetric;
    anchor: IsoAnchor;
    blendingMode: string;
    alpha: number;
    hidden: boolean;
    properties: Object;
    mass: number;
    friction: number;
    velocity: IsoVelocity;
    rigidBody: IsoCoords;
    constructor(Engine: any, image: IsoRessource, name?: string);
    addAnimation(name: string, attribute: string, endValue: number, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoObject;
    collide(object: IsoObject): boolean;
    getCoords(): IsoCoords;
    getOffset(): IsoOffset;
    getOriginalDimension(): IsoDimension;
    getOriginalHeight(): number;
    getOriginalWidth(): number;
    getPosition(): IsoPoint;
    getProperty(name: string): any;
    getProperties(): Object;
    getRelativePosition(): IsoPoint;
    getRelativeDimension(): IsoDimension;
    getRenderDetails(): {
        position: IsoPoint;
        tileSize: IsoDimension;
        renderSize: {
            width: number;
            height: number;
        };
        anchor: {
            x: number;
            y: number;
        };
        image: HTMLImageElement;
        offset: IsoOffset;
        zoomLevel: number;
    };
    getRotation(): number;
    isBoxCollision(coordsSource: IsoCoords, coordsTarget: IsoCoords): boolean;
    isPixelBoxCollision(sourceObject: IsoObject, targetCoords: IsoCoords): boolean;
    isPixelCollision(sourceObject: IsoObject, targetObject: IsoObject): boolean;
    move(deltaX: number, deltaY: number): IsoObject;
    rotate(degrees: number): IsoObject;
    scroll(deltaX: number, deltaY: number): IsoObject;
    setAlpha(alpha: number): IsoObject;
    setAnchor(x: number, y: number): IsoObject;
    setBlendingMode(blendingMode: string): IsoObject;
    setHeight(height: number): IsoObject;
    setImage(image: IsoRessource): IsoObject;
    setFriction(friction: number): IsoObject;
    setName(name: string): IsoObject;
    setOffset(offsetX: number, offsetY: number): IsoObject;
    setPosition(position: IsoPoint): IsoObject;
    setProperty(name: string, value: any): IsoObject;
    setProperties(properties: Object): IsoObject;
    setRotation(degrees: number): IsoObject;
    setScroll(x: number, y: number): IsoObject;
    setSize(width: number, height: number): IsoObject;
    setSpeed(speed: number): IsoObject;
    setWidth(width: number): IsoObject;
    setZoomPoint(position: IsoPoint): IsoObject;
    setZoomLevel(zoomLevel: number): IsoObject;
    setZoomStrength(zoomStrength: number): IsoObject;
    zoom(zoom: number): IsoObject;
    play(name: string): IsoObject;
    stop(name: any): IsoObject;
    resume(name: string): IsoObject;
    pause(name: string): IsoObject;
    updatePosition(): void;
    getCollidingTiles(tilemap: IsoTileMap): Array<IsoTile>;
}
interface IsoTileSize {
    width: number;
    height: number;
}
interface IsoTileObjectInfo {
    tile: number;
    height: number;
    size: IsoTileSize;
}
declare class IsoTileObject extends IsoObject {
    tileOffset: IsoOffset;
    tileSize: IsoTileSize;
    tileHeight: number;
    tile: number;
    startTile: number;
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo?: IsoTileObjectInfo);
    setTileOffset(offset: IsoOffset): IsoTileObject;
    getTileOffset(): IsoOffset;
    getRelativePosition(): IsoPoint;
    getRelativeDimension(): IsoDimension;
    getRenderDetails(): {
        position: IsoPoint;
        tileSize: IsoTileSize;
        renderSize: {
            width: number;
            height: number;
        };
        anchor: {
            x: number;
            y: number;
        };
        image: HTMLImageElement;
        offset: IsoOffset;
        zoomLevel: number;
    };
    getTileImage(): IsoTileImage;
    setTile(tile: number): IsoTileObject;
    set(tile: IsoTileObjectInfo): IsoTileObject;
}
interface IsoTileImage {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
}
interface IsoTileInfo {
    tile: number;
    height: number;
    size: IsoTileSize;
    mapPosition: IsoMapPosition;
}
interface IsoMapPosition {
    row: number;
    column: number;
}
declare class IsoTile extends IsoTileObject {
    static AUTOMATIC: string;
    static MANUAL: string;
    static POSITION: string;
    static ZOOM: string;
    tileOffset: IsoOffset;
    tileSize: IsoTileSize;
    tileHeight: number;
    mapPosition: IsoMapPosition;
    tile: number;
    updateType: string;
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileInfo);
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
    addFrameAnimation(name: string, frames: Array<number>, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoTile;
    setUpdateType(type: string): IsoTile;
    set(tile: IsoTileInfo): IsoTile;
    getCoords(): IsoCoords;
    getMapPosition(): IsoMapPosition;
    getRelativePosition(): IsoPoint;
    getRenderDetails(): {
        position: IsoPoint;
        mapPosition: IsoMapPosition;
        tileSize: IsoTileSize;
        renderSize: {
            width: number;
            height: number;
        };
        anchor: {
            x: number;
            y: number;
        };
        image: HTMLImageElement;
        offset: IsoOffset;
        zoomLevel: number;
    };
    updatePosition(): void;
}
declare class IsoMap {
    name: string;
    map: Array<Array<Array<number>>>;
    properties: Array<number>;
    updated: boolean;
    constructor(map?: Array<Array<Array<number>>>, name?: string);
    set(map: Array<Array<Array<number>>>): IsoMap;
    setName(name: string): IsoMap;
    get(): Array<Array<Array<number>>>;
    getValue(row: number, column: number): Array<number>;
    getPropertiy(property: string, row: number, column: number): number;
    nameProperty(name: string, valueIndex: number): void;
    editProperty(name: string, valueIndex: number): void;
    edit(x: number, y: number, value: Array<number>): IsoMap;
}
/**
 * @interface IsoTilesInView
 */
interface IsoTilesInView {
    rowStart: number;
    rowEnd: number;
    columnStart: number;
    columnEnd: number;
    tiles: Array<Array<IsoTile>>;
}
/**
 * IsoTileMap draws a tile-based map on the screen.
 */
declare class IsoTileMap {
    map: IsoMap;
    tiles: Array<Array<IsoTile>>;
    tilesInView: IsoTilesInView;
    tileSize: IsoTileSize;
    image: IsoRessource;
    offset: IsoOffset;
    scrollPosition: IsoScroll;
    speed: number;
    zoomLevel: number;
    zoomStrength: number;
    minZoomLevel: number;
    maxZoomLevel: number;
    zoomPoint: IsoPoint;
    name: string;
    Engine: IsoMetric;
    /**
     * @param {IsoMetric} Engine
     * @param {string} [name]
     * @param {number} [tileWidth]
     * @param {number} [tileHeight]
     * @param {IsoRessource} [image]
     * @param {Array<Array<Array<number>>>} [map]
     * @chainable
     */
    constructor(Engine: IsoMetric, name?: string, tileWidth?: number, tileHeight?: number, image?: IsoRessource, map?: Array<Array<Array<number>>>);
    /**
     * Sets the map of the tilemap
     * @param {Array<Array<Array<number>>>} map The new map
     * @chainable
     */
    setMap(map: Array<Array<Array<number>>>): IsoTileMap;
    /**
     * Create a new empty map
     * @param {number} numTilesX The number of tiles on the X-axis
     * @param {number} numTilesY The number of tiles on the Y-axis
     * @param {Array<number>} [defaultValue] The default value of each new tile.
     * @chainable
     */
    createMap(numTilesX: number, numTilesY: number, defaultValue?: Array<number>): IsoTileMap;
    /**
     * Creates all tile for the tilemap based on the map.
     * @chainable
     */
    createTiles(): IsoTileMap;
    /**
     * Get a tile given by its name.
     * @param {string} name Name of the tile.
     * @return {IsoTIle} The tile.
     */
    getTile(name: string): IsoTile;
    /**
     * Returns all tiles which are visible on the screen
     * @return {IsoTilesInView} All tiles wich are visible on the screen.
     */
    getTilesInView(): IsoTilesInView;
    /**
     * Gets all tiles in specified area.
     * @param x The position on the X-axis of the area
     * @param y The position on the Y-axis of the area
     * @param width The width of the area
     * @param height The height of the area
     * @return An object with information of all tiles
     */
    getTilesInRadius(x: number, y: number, width: number, height: number): Array<IsoTile>;
    /**
     * Return the tile placed on the given position.
     * @param {IsoPoint} position The position to check.
     * @return {IsoTile} The tile on the given position.
     */
    getTileOnPosition(position: IsoPoint): IsoTile;
    /**
     * Sets the image ressource for the tilemap.
     * @param {IsoRessource} image
     * @chainable
     */
    setImage(image: IsoRessource): IsoTileMap;
    /**
     * Sets the maximum value for zooming.
     * @param {number} zoomLevel
     * @chainable
     */
    setMaxZoomLevel(zoomLevel: number): IsoTileMap;
    /**
     * Sets the minimum value for zooming.
     * @param {number} zoomLevel
     * @chainable
     */
    setMinZoomLevel(zoomLevel: number): IsoTileMap;
    /**
     * Sets the name of the tilemap
     * @param {string} name
     * @chainable
     */
    setName(name: string): IsoTileMap;
    /**
     * Sets the offset of the tilemap
     * @param {IsoOffset} offset
     * @chainable
     */
    setOffset(o: IsoOffset): IsoTileMap;
    /**
     * Sets the scroll-position of the tilemap.
     * @param {number} x The x-position.
     * @param {number} y The y-position.
     * @chainable
     */
    setScroll(x: number, y: number): IsoTileMap;
    /**
     * Sets the speed  for scrolling and moving for the tilemap.
     * @param {number} speed
     * @chainable
     */
    setSpeed(speed: number): IsoTileMap;
    /**
     * Scrolls the tilemap relative to the actual position.
     * @param {number} x The relative position on the x-axis.
     * @param {number} y The relative position on the y-axis.
     * @chainable
     */
    scroll(x: number, y: number): IsoTileMap;
    /**
     * Sets the tilesize of the tilemap.
     * @param {IsoTileSize} size The new size.
     * @chainable
     */
    setTileSize(size: IsoTileSize): IsoTileMap;
    /**
     * Sets the zoomLevel of the tilemap.
     * @param {number} zoomLevel
     * @chainable
     */
    setZoomLevel(zoomLevel: number): IsoTileMap;
    /**
     * Sets the zooming point of the tilemap.
     * @param {IsoPoint} point
     * @chainable
     */
    setZoomPoint(point: IsoPoint): IsoTileMap;
    /**
     * Sets the strength of zooming.
     * @param {number} zoomStrength
     * @chainable
     */
    setZoomStrength(zoomStrength: number): IsoTileMap;
    /**
     * Update the tilemap and with this all the tiles of the tilemap.
     */
    update(): void;
    /**
     * Update all tiles of the tilemap.
     */
    updateTile(tile: IsoTile): void;
    /**
     * Verify the tilemap.
     * @private
     */
    private verify();
    /**
     * Set te zoom of the tilemap relative to the current zoom.
     * @param {number} zoom
     * @chainable
     */
    zoom(zoom: number): IsoTileMap;
}
/**
 * @interface IsoCollisionBody
 * @static
 */
interface IsoCollisionBody {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface IsoFrame {
    offset: IsoOffset;
    dimension: IsoDimension;
}
declare class IsoSprite extends IsoTileObject {
    Engine: IsoMetric;
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string);
    getTileImage(): IsoTileImage;
    setFrame(frame: IsoFrame): IsoSprite;
    set(tile: IsoTileObjectInfo): IsoTileObject;
    getRenderDetails(): {
        position: IsoPoint;
        tileSize: IsoTileSize;
        renderSize: {
            width: number;
            height: number;
        };
        anchor: {
            x: number;
            y: number;
        };
        image: HTMLImageElement;
        offset: IsoOffset;
        zoomLevel: number;
    };
}
/**
 * This sprite type is an animated sprite, which uses frames of a tileset for animations.
 */
declare class IsoAnimatedSprite extends IsoSprite {
    /**
     * Creats a new frame-animated sprite
     * @param  {IsoMetric} Engine An instance of IsoMetric
     * @param  {IsoRessource} image  A Ressource file including an image
     * @param  {IsoTileObjectInfo} tileInfoObject Including all information about the tile. See IsoTileObjectInfo.
     * @param  {string} name Name of the new Sprite.
     * @return {IsoAnimatedSprite} The Sprite.
     */
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string);
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
    addFrameAnimation(name: string, frames: Array<number>, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimatedSprite;
    /**
     * Plays an animation given by its name.
     * @param  {string} name Name of th animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    play(name: string): IsoAnimatedSprite;
    /**
     * Stops an animation given by its name.
     * @param  {string} name Name of the animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    stop(name: string): IsoAnimatedSprite;
    /**
     * Resumes an animation given by its name.
     * @param  {string} name Name of the animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    resume(name: string): IsoAnimatedSprite;
    /**
     * Pause an animation given by its name.
     * @param  {string} name  Name of the animation.
     * @return {IsoAnimatedSprite} The sprite.
     */
    pause(name: string): IsoAnimatedSprite;
}
/**
 * A library including all easing-functions.
 */
declare var IsoEasing: {
    Linear: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    QuadIn: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    QuadOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    QuadInOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    CubicIn: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    CubicOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    CubicInOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    QuartIn: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    QuartOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    QuartInOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    QuintIn: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    QuintOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    QuintInOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    SineIn: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    SineOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    SineInOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    ExpoIn: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    ExpoOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    ExpoInOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    CircIn: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    CircOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
    CircInOut: (currentIteration: number, startValue: number, endValue: number, iterationCount: number) => number;
};
/**
 * Controls an animations.
 * There are two types of animations:
 * 1. "attribute-animation" - animates the attribute of an object. Nearly every object can be animated. The type of the value has to be a number.
 * 2. "frame-animation" - animates the frames of a sprite or a tile. The type of the animated object has to be an IsoAnimatedSprite or IsoTile.W
 */
declare class IsoAnimation {
    static ONCE: string;
    static PINGPONG: string;
    static ENDLESS: string;
    static ANIMATION_TYPE_FRAME: string;
    static ANIMATION_TYPE_ATTRIBUTE: string;
    name: string;
    duration: number;
    frames: Array<number>;
    startValue: number;
    endValue: number;
    actualValue: number;
    attribute: string;
    type: string;
    easing: Function;
    isPlaying: boolean;
    callbacks: Array<IsoCallback>;
    object: Object;
    sprite: IsoAnimatedSprite | IsoTile;
    iterations: number;
    currentIteration: number;
    framesPerSecond: number;
    __debug: number;
    animationType: string;
    constructor();
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
    createFrameAnimation(name: string, object: IsoAnimatedSprite | IsoTile, frames: Array<number>, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimation;
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
    createAnimation(name: string, object: Object, attribute: string, endValue: number, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimation;
    /**
     * Starts the animation.
     * @return {IsoAnimation} The new animation.
     */
    play(): IsoAnimation;
    /**
     * Starts an animation of the type "attribute".
     * @private
     */
    private __playAttribute();
    /**
     * Starts an animation of the type "frame".
     * @private
     */
    private __playFrame();
    /**
     * Stop playing the animation.
     */
    stop(): IsoAnimation;
    /**
     * Pause the animation
     */
    pause(): IsoAnimation;
    /**
     * Resume the animation.
     */
    resume(): IsoAnimation;
    /**
     * Parse the object and return the given attribute.
     * @private
     */
    private getObjectValue();
    /**
     * Parse the object and set the given attribute.
     * @private
     */
    setObjectValue(value: number): void;
}
declare class IsoAnimationManager {
    animations: Array<IsoAnimation>;
    addFrameAnimation(name: string, object: IsoAnimatedSprite | IsoTile, frames: Array<number>, speed: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimationManager;
    addAnimation(name: string, object: Object, attribute: string, endValue: number, speed: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimationManager;
    play(name: string, object: Object): void;
    stop(name: string, object: Object): void;
    resume(name: string, object: Object): void;
    pause(name: string, object: Object): void;
}
declare var IsoBlendingModes: {
    NORMAL: string;
    MULTIPLY: string;
    SCREEN: string;
    OVERLAY: string;
    DARKEN: string;
    LIGHTEN: string;
    COLOR_DODGE: string;
    COLOR_BURN: string;
    HARD_LIGHT: string;
    SOFT_LIGHT: string;
    DIFFERENCE: string;
    EXCLUSION: string;
    HUE: string;
    SATURATION: string;
    COLOR: string;
    LUMINOSITY: string;
};
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
declare class IsoDrawer {
    Engine: IsoMetric;
    canvas: IsoCanvas;
    context: any;
    __DEBUG_SHOW: boolean;
    constructor(Engine: IsoMetric);
    update(): void;
    drawLayer(layer: IsoLayer): void;
    drawTileMap(tileMap: IsoTileMap): void;
    drawSprites(sprites: Array<IsoSprite>): void;
    translate(object: IsoObject, renderDetails: any): void;
    resetTranslation(object: IsoObject, renderDetails: any): void;
    rotate(object: IsoObject, renderDetails: any): void;
    rotateTile(object: IsoTile, renderDetails: any): void;
}
declare class IsoEvent {
    type: string;
    data: any;
    constructor(type: string);
    addData(data: any): IsoEvent;
    trigger(target?: string | HTMLElement): void;
}
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
    __onLoad: Function;
    isLoaded: boolean;
    /**
     * The width of the image
     */
    width: number;
    /**
     * The height of the image
     */
    height: number;
    offset: IsoOffset;
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
    onLoad(callback: Function): void;
    /**
     * Returns the image.
     * @return The image.
     */
    get(): HTMLImageElement;
    /**
     * Deletes the image.
     */
    free(): void;
    setOffset(offset: IsoOffset): void;
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
declare class IsoLayer {
    objects: Array<IsoObject>;
    tileMap: IsoTileMap;
    sprites: Array<IsoSprite>;
    billboards: any;
    name: string;
    index: number;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric, index: number, name?: string);
    addObject(name: string, image: IsoRessource): IsoObject;
    addSprite(name: string, image: IsoRessource, tileObjectInfo: IsoTileObjectInfo): IsoSprite;
    addAnimatedSprite(name: string, image: IsoRessource, tileObjectInfo: IsoTileObjectInfo): IsoAnimatedSprite;
    addTileMap(name: string, image: IsoRessource, tileWidth: number, tileHeight: number, map?: Array<Array<Array<number>>>): IsoTileMap;
    setName(name: string): IsoLayer;
    getObject(name: string): IsoObject;
    getSprite(name: string): IsoSprite;
    getTileMap(): IsoTileMap;
    zoom(zoom: number): void;
    scroll(deltaX: number, deltaY: number): void;
    rotate(degrees: number): void;
    setZoomPoint(point: IsoPoint): void;
    setSpeed(speed: number): void;
}
declare class IsoLayers {
    layers: Array<IsoLayer>;
    Engine: IsoMetric;
    length: number;
    constructor(Engine: IsoMetric);
    add(name: string, index?: number): IsoLayer;
    get(name: string): IsoLayer;
    sort(): void;
    _sort(layerA: IsoLayer, layerB: IsoLayer): number;
    getByIndex(index: number): IsoLayer;
}
declare class IsoOn {
    on(eventType: string, callback: EventListener): void;
}
declare class IsoRessource {
    static AUDIO: string;
    static IMAGE: string;
    static ISO_EVENT_RESSOURCE_LOADED: string;
    static ISO_EVENT_RESSOURCE_PROGRESS: string;
    static ISO_EVENT_RESSOURCE_PROGRESS_ALL: string;
    name: string;
    src: string;
    type: string;
    autoload: boolean;
    loaded: boolean;
    htmlAudio: HTMLAudioElement;
    image: IsoImage;
    _on: Array<IsoCallback>;
    __onLoad: Function;
    constructor(name: string, src: string, type: string, autoload?: boolean);
    create(name: string, src: string, type: string, autoload: boolean): IsoRessource;
    /**
     * @TO DO
     * Implement audio ressources
     */
    load(): void;
    _onLoad(event: Event): void;
    onLoad(callback: Function): void;
    get(): any;
}
declare class IsoRessourceManager {
    ressources: Array<IsoRessource>;
    Engine: IsoMetric;
    private numberAutoload;
    private autoloaded;
    __onProgress: Function;
    __onProgressAll: Function;
    __then: Function;
    __beforeLoad: Function;
    constructor(Engine: IsoMetric);
    add(name: string, src: string, type: string, autoload?: boolean): void;
    onBeforeLoad(callback: Function): void;
    _onBeforeLoad(): void;
    get(name: string): IsoRessource;
    load(): IsoRessourceManager;
    onProgress(callback: Function): void;
    _onProgress(event: Event): IsoRessourceManager;
    _then(): void;
    then(callback: Function): IsoRessourceManager;
    _onProgressAll(): void;
    onProgressAll(callback: Function): void;
}
interface IsoCallback {
    eventType: string;
    callback: EventListener;
}
/**
 * The mainclass of IsoMetric and the starting point for the gameloop.
 * @class IsoMetric
 * @constructor
 *
 */
declare class IsoMetric {
    /**
     * @property config
     * The configuration.
     * @type {IsoConfig}
     */
    config: IsoConfig;
    /**
     * @property canvas
     * @type {IsoCanvas}
     * The canvas object
     */
    canvas: IsoCanvas;
    /**
    * @property layers
     * @description All layers of the actual game
     * @type {IsoLayers}
     */
    layers: IsoLayers;
    /**
     * @property drawer
     * @type {IsoDrawer}
     * The drawing lib.
     */
    drawer: IsoDrawer;
    /**
     * @property physics
     * @type {IsoPhysicsManager}
     */
    physics: IsoPhysicsManager;
    /**
     * @property animation
     * @type {IsoAnimationManager}
     */
    animation: IsoAnimationManager;
    /**
     * @property input
     * @type {IsoInput}
     */
    input: IsoInput;
    /**
     * Handles all ressources of a project.
     * @property ressource
     * @type {IsoRessourceManager}
     * @see IsoRessourceManager
     */
    ressources: IsoRessourceManager;
    /**
     * The time one frames needs to draw.
     * @property frameTime
     * @type {number}
     */
    frameTime: number;
    /**
     * A counter for frames.
     * @property frameCount
     * @type {number}
     * @default 0
     */
    frameCount: number;
    /**
     * An inteval for reseting the FPS
     * @property frameCountInterval
     * @type {any}
     */
    frameCountInteral: any;
    /**
     * The time in milliseconds at the begin of a loop.
     * @property startLoopTime
     * @type {Date}
     */
    startLoopTime: Date;
    /**
     * The frames per second
     * @property FPS
     * @type {number}
     * @default 0
     */
    FPS: number;
    /**
     * @property on
     * @type {IsoOn}
     */
    on: IsoOn;
    /**
     * The default canvas configuration.
     * @property defaultWIndowOptions
     * @type {IIsoConfigWindowOptions}
     * @default {fullscreen: true, width: window.innerWidth, height: window.innerHeight}
     */
    defaultWindowOptions: IIsoConfigWindowOptions;
    /**
     * An inteval for the drawing and game loop
     * @property interval
     * @type {Object}
     */
    interval: Object;
    /**
     * @property animationFrame
     * @type {Object}
     */
    animationFrame: Object;
    /**
     * Creates a new instance of IsoMetric
     * @method constructor
     * @param {object} [windowOptions] The canvas configuration.
     */
    constructor(windowOptions?: Object);
    /**
     * Reset and set the FPS
     * @method setFPS
     */
    setFPS(): void;
    /**
     * Starts the game- and drawing-loop.
     * @method startLoop
     */
    startLoop(): void;
    /**
     * Sets the FPS after the drawing-loop completed.
     * @method endLoop
     */
    endLoop(): void;
    /**
     * The game- and drawing-loop.
     * @method update()
     */
    update(): void;
}
declare class IsoPhysicsManager {
    rigidBodies: Array<IsoObject>;
    massBodies: Array<IsoObject>;
    gravity: number;
    addMassBody(object: IsoObject): void;
    addRigidBody(object: IsoObject): void;
    removeRigidBody(object: IsoObject): void;
    removeMassBody(object: IsoObject): void;
    setGravity(g: number): void;
    update(): void;
}
