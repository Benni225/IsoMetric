declare class IsoOn {
    onCallbacks: Array<Function>;
    fire(type: string, data?: any, element?: HTMLElement): void;
    onEvent(eventType: string, callback: EventListener): void;
    unbindEvent(eventType: string, callback: any): void;
    on(eventType: string, callback: Function): IsoOn;
    callOn(eventType: string): void;
    checkOn(eventType: string): boolean;
}
declare class IsoMinimalObject extends IsoOn {
    Engine: IsoMetric;
    /** The position of the object */
    position: IsoVector2D;
    /** The scroll-position of the object */
    scrollPosition: IsoVector2D;
    /** An offset relative to the position */
    offset: IsoPoint;
    /** The scale of an object given as a factor */
    scale: IsoScale;
    /** The zooming level of an object */
    zoomLevel: number;
    /** By using the method zoom, this factor controls the zooming level */
    zoomStrength: number;
    /** A point on the screen where zoomed to */
    zoomPoint: IsoVector2D;
    /** Rotation in degrees */
    rotation: number;
    /** When moving this factor controls the speed of moving */
    speed: number;
    /** Name of the object */
    name: string;
    /** The anchor of the object for rotation */
    anchor: IsoPoint;
    /** The blending mode. See IsoBlendingModes */
    blendingMode: string;
    /** The alpha of the object */
    alpha: number;
    /** If hidden is true, the object will not be drawn. */
    hidden: boolean;
    /** Optional additional properties */
    properties: Object;
    /** The friction of the object */
    friction: number;
    /** The velocity when moving an object. */
    velocity: IsoVector2D;
    /** Sets if a object could clear from the memory. */
    free: boolean;
    /** Type of the object. */
    type: string;
    constructor(Engine: IsoMetric);
    /** Adds an animation. The animation will animate a given attribute of the object. */
    addAnimation(name: string, attribute: string, endValue: number, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoMinimalObject;
    /** Gets an animation */
    getAnimation(name: string): IsoAnimation;
    /** Adds a new playlist. The playlist includes animations which animates the attributes of an object.*/
    addPlaylist(name: string, animations: Array<IsoAnimation>): IsoMinimalObject;
    /** Gets one of the additional properties. */
    getProperty(name: string): any;
    /** Gets all the additional properties. */
    getProperties(): Object;
    /** Gets the position on the screen. */
    getAbsolutePosition(): IsoVector2D;
    /** Gets the rotation of an object in dregrees. */
    getRotation(): number;
    /** Move an object relative to the current position. */
    move(deltaX: number, deltaY: number): IsoMinimalObject;
    /** Rotates an object relative to the current rotation. */
    rotate(degrees: number): IsoMinimalObject;
    /** Set the scrolling position relative to the current scroll position. */
    scroll(deltaX: number, deltaY: number): IsoMinimalObject;
    /** Sets the alpha of an object. */
    setAlpha(alpha: number): IsoMinimalObject;
    /** Sets the blending mode. See IsoBlending. */
    setBlendingMode(blendingMode: string): IsoMinimalObject;
    /** Sets the name of an object. */
    setName(name: string): IsoMinimalObject;
    /** Sets an additional property. */
    setProperty(name: string, value: any): IsoMinimalObject;
    /** Sets all properties. */
    setProperties(properties: Object): IsoMinimalObject;
    /** Sets the rotation of an object in degrees. */
    setRotation(degrees: number): IsoMinimalObject;
    /** Sets the scale of an object. */
    setScale(factorX: number, factorY: number): IsoMinimalObject;
    /** Sets the speed for moving of an object. */
    setSpeed(speed: number): IsoMinimalObject;
    /** Sets the absolute zooming-level. */
    setZoomLevel(zoomLevel: number): IsoMinimalObject;
    /** Sets the strength of zooming, when using the method IsoObject.zoom */
    setZoomStrength(zoomStrength: number): IsoMinimalObject;
    /** Calculate the zoom level */
    zoom(zoom: number): IsoMinimalObject;
    /** Plays an animation. */
    play(name: string): IsoMinimalObject;
    /** Stops an animation. */
    stop(name: any): IsoMinimalObject;
    /** Resumes an animation. */
    resume(name: string): IsoMinimalObject;
    /** Pause an animation. */
    pause(name: string): IsoMinimalObject;
    /** Checks whether an animation is playing or not. */
    isPlaying(name: string): boolean;
    /** Sets the addition type of an animation: */
    setAdditionType(name: string, type: string): void;
    /** Calculat the new position. */
    updatePosition(): void;
    /** Updates the object. */
    update(): void;
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
declare class IsoObject extends IsoMinimalObject {
    static BOX_COLLISION: string;
    static PIXEL_COLLISION: string;
    /** The original width */
    width: number;
    /** The original height */
    height: number;
    /** The image ressource of the object */
    ressource: IsoRessource;
    /** The collsion type of the object */
    collisionType: string;
    /** If the object has the collisiontype "pixel" this property controls the accuracy of the collision. */
    collisionResolution: number;
    /** The image data of the object in a lower resolution for collision detection. */
    collsionMask: Array<Array<Array<number>>>;
    /** Mass of the object for physics */
    mass: number;
    /** The rigidbody of the object */
    rigidBody: IsoCoords;
    /** Type of the object. */
    type: string;
    /** Creates a new object */
    constructor(Engine: any, image: IsoRessource, name?: string);
    createCollidingMask(): void;
    /** Checks if the object collides with an another given object. */
    collide(object: IsoObject): boolean;
    /** Get the position of the object on the screen. */
    getCoords(): IsoCoords;
    /** Gets the original dimension of the object. */
    getOriginalDimension(): IsoDimension;
    /** Gets the originall height of the object */
    getOriginalHeight(): number;
    /** Gets the original width of the obect */
    getOriginalWidth(): number;
    /** Gets the position on the screen. */
    getAbsolutePosition(): IsoVector2D;
    /** Gets the dimension of the object on the screen. */
    getAbsoluteDimension(): IsoDimension;
    /** Gets all important information for rendering an object. */
    getRenderDetails(): IIsoRenderDetails;
    /** Checks the collision of two object with collision type "box". */
    isBoxCollision(coordsSource: IsoCoords, coordsTarget: IsoCoords): boolean;
    /** @todo implement pixel-box-collision */
    isPixelBoxCollision(sourceObject: IsoObject, targetCoords: IsoCoords): boolean;
    /** @todo implement pixel-collision */
    isPixelCollision(sourceObject: IsoObject, targetObject: IsoObject): boolean;
    /** Move an object relative to the current position. */
    move(deltaX: number, deltaY: number): IsoObject;
    /** Sets the width. */
    private setHeight(height);
    /** sets the image-ressource */
    setImage(image: IsoRessource): IsoObject;
    /** Sets the width and height of an object. */
    private setSize(width, height);
    /** Sets the width of an object. */
    private setWidth(width);
    /** Calculat the new position. */
    updatePosition(): void;
    /** Gets all tiles of a given tilemap where the object collides with. */
    getCollidingTiles(tilemap: IsoTileMap): Array<IsoTile>;
}
interface IsoTileSize {
    width: number;
    height: number;
}
interface IsoTileObjectInfo {
    tile: number;
    height?: number;
    size: IsoTileSize;
}
declare class IsoTileObject extends IsoObject {
    tileOffset: IsoPoint;
    tileSize: IsoTileSize;
    tileHeight: number;
    tile: number;
    startTile: number;
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo?: IsoTileObjectInfo);
    setTileOffset(x: number, y: number): IsoTileObject;
    getTileOffset(): IsoPoint;
    getAbsolutePosition(): IsoVector2D;
    getRelativeDimension(): IsoDimension;
    getRenderDetails(): IIsoRenderDetails;
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
    mapPosition: IsoMapVector2D;
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
    tileOffset: IsoPoint;
    tileSize: IsoTileSize;
    tileHeight: number;
    mapPosition: IsoMapVector2D;
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
    getMapPosition(): IsoMapVector2D;
    getAbsolutePosition(): IsoVector2D;
    getRenderDetails(): IIsoRenderDetails;
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
    offset: IsoPoint;
    scrollPosition: IsoVector2D;
    speed: number;
    zoomLevel: number;
    zoomStrength: number;
    minZoomLevel: number;
    maxZoomLevel: number;
    zoomPoint: IsoPoint;
    name: string;
    Engine: IsoMetric;
    /**
     * Creates a new tiled map.
     */
    constructor(Engine: IsoMetric, name?: string, tileWidth?: number, tileHeight?: number, image?: IsoRessource, map?: Array<Array<Array<number>>>);
    /**
     * Sets the map of the tilemap
     */
    setMap(map: Array<Array<Array<number>>>): IsoTileMap;
    /**
     * Create a new empty map.
     */
    createMap(numTilesX: number, numTilesY: number, defaultValue?: Array<number>): IsoTileMap;
    /**
     * Creates all tile for the tilemap based on the map.
     */
    createTiles(): IsoTileMap;
    /**
     * Get a tile given by its name.
     */
    getTile(name: string): IsoTile;
    /**
     * Returns all tiles which are visible on the screen.
     */
    getTilesInView(): IsoTilesInView;
    /**
     * Gets all tiles in specified area.
     */
    getTilesInRadius(x: number, y: number, width: number, height: number): Array<IsoTile>;
    /**
     * Return the tile placed on the given position.
     */
    getTileOnPosition(position: IsoPoint): IsoTile;
    /**
     * Sets the image ressource for the tilemap.
     */
    setImage(image: IsoRessource): IsoTileMap;
    /**
     * Sets the maximum value for zooming.
     */
    setMaxZoomLevel(zoomLevel: number): IsoTileMap;
    /**
     * Sets the minimum value for zooming.
     */
    setMinZoomLevel(zoomLevel: number): IsoTileMap;
    /**
     * Sets the name of the tilemap
     */
    setName(name: string): IsoTileMap;
    /**
     * Sets the offset of the tilemap. Alias for offset.set.
     */
    setOffset(x: any, y: any): IsoTileMap;
    /**
     * Sets the scroll-position of the tilemap. Alias for scrollPosition.set.
     */
    setScroll(x: number, y: number): IsoTileMap;
    /**
     * Sets the speed  for scrolling and moving for the tilemap.
     */
    setSpeed(speed: number): IsoTileMap;
    /**
     * Scrolls the tilemap relative to the actual position.
     */
    scroll(x: number, y: number): IsoTileMap;
    /**
     * Sets the tilesize of the tilemap.
     */
    setTileSize(size: IsoTileSize): IsoTileMap;
    /**
     * Sets the zoomLevel of the tilemap.
     */
    setZoomLevel(zoomLevel: number): IsoTileMap;
    /**
     * Sets the zooming point of the tilemap.
     */
    setZoomPoint(point: IsoPoint): IsoTileMap;
    /**
     * Sets the strength of zooming.
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
    offset: IsoPoint;
    dimension: IsoDimension;
}
declare class IsoSprite extends IsoTileObject {
    /** Type of the object. */
    type: string;
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string);
    getTileImage(): IsoTileImage;
    setFrame(frame: IsoFrame): IsoSprite;
    set(tile: IsoTileObjectInfo): IsoSprite;
    /** Gets the dimension of the object on the screen. */
    getAbsoluteDimension(): IsoDimension;
    getRenderDetails(): {
        position: IsoVector2D;
        tileSize: IsoTileSize;
        renderSize: IsoDimension;
        anchor: IsoPoint;
        image: HTMLImageElement;
        offset: IsoPoint;
        zoomLevel: number;
        type: string;
    };
}
/**
 * This sprite type is an animated sprite, which uses frames of a tileset for animations.
 */
declare class IsoAnimatedSprite extends IsoSprite {
    /** Type of the object. */
    type: string;
    /**
     * Creats a new frame-animated sprite
     */
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string);
    /**
     * Create a new frame-based animation.
     */
    addFrameAnimation(name: string, frames: Array<number>, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimatedSprite;
    /** Adds a new playlist. The playlist includes animations which animates both: the attributes and/or the frames of an object.*/
    addPlaylist(name: string, animations: Array<IsoAnimation>): IsoMinimalObject;
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
declare class IsoAnimation extends IsoOn {
    static ADDITION_ABSOLUTE: string;
    static ADDTION_RELATIVE: string;
    static ONCE: string;
    static PINGPONG: string;
    static ENDLESS: string;
    static IMPULSE: string;
    static ANIMATION_TYPE_FRAME: string;
    static ANIMATION_TYPE_ATTRIBUTE: string;
    static PLAYED: string;
    static EVERYPLAYED: string;
    static STOPPED: string;
    static RESUME: string;
    static PAUSE: string;
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
    additionType: string;
    private impulsePlaying;
    constructor();
    /**
     * Creates a new frame-based animation.
     */
    createFrameAnimation(name: string, object: IsoAnimatedSprite | IsoTile, frames: Array<number>, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimation;
    /**
     * Creates a new frame-based animation.
     */
    createAnimation(name: string, object: Object, attribute: string, endValue: number, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimation;
    /**
     * Starts the animation.
     */
    play(): IsoAnimation;
    /** Update the animation. */
    update(): void;
    /**
     * Starts an animation of the type "attribute".
     */
    private __playAttribute();
    /**
     * Starts an animation of the type "frame".
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
     */
    private getObjectValue();
    /**
     * Parse the object and set the given attribute in a relative way.
     */
    setObjectValue(value: number): void;
    /**
     * Parse the object and set the given attribute in a absolute way.
     */
    setObjectValueAbsolute(value: number): void;
    setAdditionType(type: string): void;
}
declare class IsoAnimationManager {
    /** Includes all object animations. */
    animations: Array<IsoAnimation>;
    /** Includes all playlists. */
    playLists: Array<IsoAnimationPlaylist>;
    /** Adds a new frame-based animation. */
    addFrameAnimation(name: string, object: IsoAnimatedSprite | IsoTile, frames: Array<number>, speed: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimationManager;
    /** Adds a new attribute-based animation. */
    addAnimation(name: string, object: Object, attribute: string, endValue: number, speed: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimationManager;
    /** Adds a new playlist. */
    addPlaylist(name: string, object: IsoMinimalObject | IsoText | IsoSprite, animations: Array<IsoAnimation>): IsoAnimationManager;
    /** Plays an animation given by its name and the animated object.*/
    play(name: string, object: Object): void;
    /** Stops an animation given by its name and the animated object.*/
    stop(name: string, object: Object): void;
    /** Resumes an animation given by its name and the animated object.*/
    resume(name: string, object: Object): void;
    /** Pauses an animation given by its name and the animated object.*/
    pause(name: string, object: Object): void;
    /** Checks if an animation is playing given by its name and the animated object.*/
    isPlaying(name: string, object: Object): boolean;
    /** Sets the addiion type of the animation. */
    setAdditionType(name: string, object: Object, type: string): void;
    /** Plays a playlist given by its name and the animated object.*/
    playPlaylist(name: string, object: IsoMinimalObject | IsoSprite | IsoText): void;
    /** Stops a playlist given by its name and the animated object.*/
    stopPlaylist(name: string, object: IsoMinimalObject | IsoSprite | IsoText): void;
    /** Pauses a playlist given by its name and the animated object.*/
    pausePlaylist(name: string, object: IsoMinimalObject | IsoSprite | IsoText): void;
    /** Resumes a playlist given by its name and the animated object.*/
    resumePlaylist(name: string, object: IsoMinimalObject | IsoSprite | IsoText): void;
    /** Checks if a playlist is playing given by its name and the animated object.*/
    isPlayingPlaylist(name: string, object: IsoMinimalObject | IsoSprite | IsoText): boolean;
    /** Returns a specified animation given by its name and the animated object.*/
    get(name: string, object: Object): IsoAnimation;
    /** Returns all active animations of an object as an array. */
    getActive(object: Object): Array<IsoAnimation>;
    /** Returns a specified playlist given by its name and the animated object.*/
    getPlaylist(name: string, object: Object): IsoAnimationPlaylist;
}
declare class IsoAnimationPlaylist extends IsoOn {
    /** Name of the playlist. */
    name: string;
    /** The referencing object of the animation. */
    object: IsoMinimalObject | IsoText | IsoSprite;
    /** True, if the playlist is playing, else if not.*/
    isPlaying: boolean;
    /** All the animations of the playlist.*/
    animations: Array<IsoAnimation>;
    /** The current playing animation.*/
    current: string;
    /** The name of paused animation */
    pausedAnimation: string;
    /** Creates a new playlist.*/
    constructor(name: string, object: IsoMinimalObject | IsoText | IsoSprite, animations: Array<IsoAnimation>);
    private checkPlaylist(event);
    /** Stops the playlist. */
    stop(): void;
    /** Pause the playlist and saves the current animation.*/
    pause(): void;
    /** Resumes the playlist. */
    resume(): void;
    /** Plays the next animation. */
    next(animation: IsoAnimation): void;
    /** Plays the playlist from the beginning. */
    play(): void;
}
declare class IsoAudio extends IsoOn implements IIsoResource {
    type: string;
    audio: HTMLAudioElement;
    src: string;
    isLoaded: boolean;
    constructor(src: string);
    create(src: string): void;
    load(): void;
    /**
     * Called when the image file was loaded.
     */
    _onLoad(event: Event): void;
    get(): HTMLAudioElement;
}
declare class IsoBillboard extends IsoObject {
    static REPEATX: string;
    static REPEATY: string;
    static REPEAT: string;
    static NOREPEAT: string;
    /** Type of the object. */
    type: string;
    repeat: string;
    /** Sets if the billboard will repeated. */
    setRepeat(repeat: string): IsoBillboard;
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
interface IIsoRenderDetails {
    image?: HTMLImageElement;
    shape?: Function;
    offset: IsoPoint;
    tileSize?: IsoDimension;
    position: IsoVector2D;
    mapPosition?: IsoMapVector2D;
    renderSize: IsoDimension;
    text?: string;
    align?: string;
    direction?: string;
    filled?: boolean;
    color?: string;
    backgroundColor?: string;
    baseline?: string;
    size?: number;
    font?: string;
    strokeColor?: string;
    strokeWidth?: number;
    zoomLevel: number;
    type: string;
    anchor: IsoPoint;
}
declare class IsoDrawer {
    /** An instance of IsoMetric */
    Engine: IsoMetric;
    /** An instance of IsoCanvas */
    canvas: IsoCanvas;
    /** The context of the canvas-element */
    context: any;
    private __DEBUG_SHOW;
    constructor(Engine: IsoMetric);
    /** Redraw all elements on the screen */
    update(): void;
    /** Draws a single layer. */
    drawLayer(layer: IsoLayer): void;
    /** Draws a tilemap of a layer. */
    drawTileMap(tileMap: IsoTileMap): void;
    /** Draws all given objects. */
    drawBillboards(objects: Array<IsoBillboard>): void;
    /** Draws all given objects. */
    drawObjects(objects: Array<IsoObject | IsoEmitter>): void;
    /** Draws the particles of an emitter. */
    drawParticles(renderDetails: IIsoRenderDetails, emitter: IsoEmitter): void;
    /** Draws all given texts. */
    drawTexts(objects: Array<IsoText>): void;
    private drawImage(renderDetails);
    private drawText(renderDetails);
    /** Sets the anchor of an object. */
    private translate(object, renderDetails);
    /** Reset the anchor of an object. */
    private resetTranslation(object, renderDetails);
    /** Rotates an object. */
    private rotate(object, renderDetails);
}
declare class IsoEmitter extends IsoMinimalObject {
    /** The maximum particle count. */
    particleCount: number;
    /** The lifttime of a particle.*/
    lifetime: number;
    /** Sets how many particles will spreaded.*/
    spreadCount: number;
    oldTime: number;
    /** The ressource for the particles.*/
    ressource: IsoRessource;
    /** A simple seed number.*/
    variance: number;
    /** Includes all the particles.*/
    particles: Array<IsoParticle>;
    /** The speed of the particles.*/
    particleSpeed: number;
    /** Height of the emitter.*/
    height: number;
    /** Width of the emitter.*/
    width: number;
    /** Sets if the emitter is emitting */
    isEmitting: boolean;
    /** The random library. */
    rand: MersenneTwister;
    /** Sets the typ of this object.*/
    type: string;
    /** Creates a new particle emiter.*/
    constructor(Engine: IsoMetric, ressource: IsoRessource, config?: any);
    addParticle(particle: IsoParticle): void;
    update(): void;
    emit(): void;
    getLifetime(): number;
    getParticleCount(): number;
    getParticleSpeed(): number;
    getVariance(): number;
    setLifetime(lifetime: number): IsoEmitter;
    setParticleCount(count: number): IsoEmitter;
    setParticleSpeed(speed: number): IsoEmitter;
    setVariance(variance: number): IsoEmitter;
    setSpreadCount(count: number): IsoEmitter;
    freeParticle(particle: IsoParticle): boolean;
    getRenderDetails(): {
        position: IsoVector2D;
        tileSize: {
            width: number;
            height: number;
        };
        renderSize: {
            width: number;
            height: number;
        };
        anchor: IsoPoint;
        image: HTMLImageElement;
        offset: IsoPoint;
        zoomLevel: number;
        type: string;
    };
    random(min: number, max: number): number;
}
interface __IsoDocument extends Document {
    createEventObject?: any;
    fireEvent?: any;
}
interface __IsoElement extends Element {
    fireEvent?: any;
}
declare class IsoEvent {
    type: string;
    data: any;
    constructor(type: string);
    addData(data: any): IsoEvent;
    /**
     * @todo Find a solid solution */
    trigger(target?: string | HTMLElement): void;
    private __c(target?);
    private __e(target?);
}
declare class IsoGroup extends IsoMinimalObject {
    items: Array<IsoMinimalObject>;
    addItem(object: IsoMinimalObject): void;
}
/**
 * This class helps you to building up a graphic user interface. Every Gui will drawn on top of all layers.
 */
interface IsoGuiItem {
    sprite?: IsoAnimatedSprite;
    html?: HTMLElement;
    text?: string;
    fillStyle?: string;
    fontStyle?: string;
    name: string;
    tooltip?: string;
    hover?: EventListener;
    mouseup?: EventListener;
    mousedown?: EventListener;
    click?: EventListener;
}
interface IsoGuiGroup {
    name: string;
    items?: string;
}
declare class IsoGui {
    Engine: IsoMetric;
    groups: IsoGuiGroup;
    constructor(Engine: IsoMetric);
}
declare class IsoImage extends IsoOn implements IIsoResource {
    /**
     * Path to the image
     */
    src: string;
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
    offset: IsoPoint;
    type: string;
    constructor(src?: string, local?: boolean);
    /**
     * Creates a new image.
     */
    create(src: string): IsoImage;
    /**
     * Loads the image for further work.
     */
    load(): void;
    /**
     * Called when the image file was loaded.
     */
    _onLoad(event: Event): void;
    /**
     * Returns the image.
     */
    get(): HTMLImageElement;
    /**
     * Deletes the image.
     */
    free(): void;
    getWidth(): number;
    getHeight(): number;
    getOffset(): IsoPoint;
    setOffset(x: number, y: number): void;
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
    touches: TouchList;
    isTouchEvent: boolean;
    touchEvent: TouchEvent;
    touchEventType: string;
    touchStartTime: number;
    touchEndTime: number;
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
    /** Includes all objects like IsoObject, IsoText, IsoSprite, IsoAnimatedSprite. */
    objects: Array<any>;
    texts: Array<IsoText>;
    /** Include the tiled map of a layer. */
    tileMap: IsoTileMap;
    /** Includes all billboards of  a layer. */
    billboards: Array<IsoBillboard>;
    /** Name of the layer. */
    name: string;
    /** The index of the layer. */
    index: number;
    /** An instance of IsoMetric. */
    Engine: IsoMetric;
    /** Controls if the layer is hidden or not. */
    hidden: boolean;
    /** Creates a new layer. */
    constructor(Engine: IsoMetric, index: number, name?: string);
    /** Adds a new object to the layer */
    addObject(name: string, image: IsoRessource): IsoObject;
    /** Adds a new sprite to the layer. */
    addSprite(name: string, image: IsoRessource, tileObjectInfo: IsoTileObjectInfo): IsoSprite;
    /** Adds a new text to the layer. */
    addText(name: string, text: string): IsoText;
    /** Adds a new billboard to the layer. */
    addBillboard(name: string, image: IsoRessource): IsoBillboard;
    /** Adds a new particle emitter. */
    addEmitter(name: string, ressource: IsoRessource): IsoEmitter;
    /** Adds a new animated sprite to the layer. */
    addAnimatedSprite(name: string, image: IsoRessource, tileObjectInfo: IsoTileObjectInfo): IsoAnimatedSprite;
    /** Adds a new tilemap to the layer. */
    addTileMap(name: string, image: IsoRessource, tileWidth: number, tileHeight: number, map?: Array<Array<Array<number>>>): IsoTileMap;
    /** Sets the name of the layer. */
    setName(name: string): IsoLayer;
    /** Gets a billboard by its name. */
    getBillboard(name: string): IsoBillboard;
    /** Gets a object by its name. */
    getObject(name: string): IsoObject | IsoSprite | IsoAnimatedSprite | IsoText;
    /** Equal to IsoLayer.getObject. */
    getSprite(name: string): IsoObject | IsoSprite | IsoAnimatedSprite | IsoText;
    /** Equal to IsoLayer.getObject. */
    getAnimatedSprite(name: string): IsoObject | IsoSprite | IsoAnimatedSprite | IsoText;
    /** Equal to IsoLayer.getObject. */
    getText(name: string): IsoText;
    /** Gets the tilemap of the layer. */
    getTileMap(): IsoTileMap;
    /** Zoom all objects, tilemap and billboards of the layer. */
    zoom(zoom: number): void;
    /** Scrolls all objects, tilemap and billboards of the layer. */
    scroll(deltaX: number, deltaY: number): void;
    /** Rotates all objects, tilemap and billboards of the layer. */
    rotate(degrees: number): void;
    /** Sets the zooming point of all objects, tilemap and billboards of the layer. */
    setZoomPoint(point: IsoPoint): void;
    /** Sets the speed of all objects, tilemap and billboards of the layer. */
    setSpeed(speed: number): void;
    /** Hides the layer. */
    hide(): IsoLayer;
    /** Show the layer. */
    show(): IsoLayer;
    /** Return true if the layer is hidden. Else false. */
    isHidden(): boolean;
    /** Removes an object or sprite from the layer. */
    freeObject(object: IsoMinimalObject): void;
    /** Removes an object from the layer. */
    freeText(text: IsoText): void;
    /** Removes a billboard from the layer. */
    freeBillboard(billboard: IsoBillboard): void;
    /** Removes the tilemap form the layer.*/
    freeTileMap(): void;
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
interface IIsoMapPoint {
    row: number;
    column: number;
}
declare class IsoMapPoint {
    row: number;
    column: number;
    constructor(row?: number, column?: number);
    set(row: number, column: number): void;
    get(): IIsoMapPoint;
}
/**
 * IsoMapVector2D represents a point on the map.
 */
declare class IsoMapVector2D extends IsoMapPoint {
    /** Creates a new vector */
    constructor(row?: number, column?: number);
    /** Gets the distance between two points */
    getDistance(vec: IsoMapVector2D): number;
}
interface IIsoResource {
    type: string;
    load(): any;
    get(): any;
}
declare class IsoRessource extends IsoOn {
    static ISO_EVENT_RESSOURCE_LOADED: string;
    static ISO_EVENT_RESSOURCE_PROGRESS: string;
    static ISO_EVENT_RESSOURCE_PROGRESS_ALL: string;
    static IMAGE: string;
    static AUDIO: string;
    static SHAPE: string;
    ressource: IsoImage;
    name: string;
    type: string;
    loaded: boolean;
    constructor(name: string, ressource: IsoImage | any);
    load(): void;
    onload(): void;
    get(): HTMLImageElement;
}
declare class IsoRessourceManager extends IsoOn {
    ressources: Array<IsoRessource>;
    Engine: IsoMetric;
    private numberAutoload;
    private autoloaded;
    __onProgress: Function;
    __onProgressAll: Function;
    __then: Function;
    __beforeLoad: Function;
    constructor(Engine: IsoMetric);
    add(name: string, ressource: IsoImage): void;
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
declare class IsoMetric extends IsoOn {
    /**
     * The configuration.
     */
    config: IsoConfig;
    /**
     * The canvas object
     */
    canvas: IsoCanvas;
    /** Includes all layers */
    layers: IsoLayers;
    /** The drawing lib. */
    drawer: IsoDrawer;
    /** The physics library */
    physics: IsoPhysicsManager;
    /** The animation library */
    animation: IsoAnimationManager;
    /** The input library */
    input: IsoInput;
    /** Handles all ressources of a project. */
    ressources: IsoRessourceManager;
    /** The time one frames needs to drawn. */
    frameTime: number;
    /** A counter for frames */
    frameCount: number;
    /** An inteval for reseting the FPS */
    frameCountInteral: any;
    /** The time in milliseconds at the begin of a loop. */
    startLoopTime: Date;
    /** The frames per second */
    FPS: number;
    /** The default canvas configuration. */
    defaultWindowOptions: IIsoConfigWindowOptions;
    /**  An inteval for the drawing and game loop */
    interval: Object;
    animationFrame: Object;
    /** Creates a new instance of IsoMetric */
    constructor(windowOptions?: Object);
    /** Reset and set the FPS */
    setFPS(): void;
    /** Starts the game- and drawing-loop. */
    startLoop(): void;
    /** Sets the FPS after the drawing-loop completed. */
    endLoop(): void;
    /** The game- and drawing-loop. */
    update(): void;
}
declare class IsoParticle {
    position: IsoVector2D;
    life: number;
    originalLife: number;
    velocity: IsoVector2D;
    color: IsoColor;
    Engine: IsoMetric;
    alpha: number;
    scale: IsoScale;
    originalScale: IsoScale;
    rotation: number;
    renderSize: {
        width: number;
        height: number;
    };
    blendingMode: string;
    ressource: IsoRessource;
    constructor(Engine: IsoMetric, ressource: IsoRessource, position: IsoPoint, life: number, angle: number, scale: IsoScale, speed: number);
    update(dt: number): void;
    getRenderDetails(): IIsoRenderDetails;
}
interface IIsoPoint {
    x: number;
    y: number;
}
declare class IsoPoint {
    /** Position on the x axis */
    x: number;
    /** Position on the y axis */
    y: number;
    constructor(x?: number, y?: number);
    /** Sets or resets the point */
    set(x: number, y: number): void;
    /** Gets the point on the screen. */
    get(): IsoPoint;
}
/**
 * An implementation of the MersenneTwister for TypeScript.
 * This library produces much better random numbers than Math.random().
 */
/**
 * Written for JavaScript by Sean McCullough (banksean@gmail.com).
 * Written for TypeScript by Benjamin Werner
 */
declare class MersenneTwister {
    N: number;
    M: number;
    /** constant vector a */
    MATRIX_A: number;
    /** most significant w-r bits */
    UPPER_MASK: number;
    /** least significant r bits */
    LOWER_MASK: number;
    /** the array for the state vector */
    mt: Array<number>;
    /** mti==N+1 means mt[N] is not initialized */
    mti: number;
    constructor(seed?: number);
    init_genrand(s: number): void;
    init_by_array(init_key: any, key_length: any): void;
    genrand_int32(): number;
    genrand_int31(): number;
    /** Generates an number between 0 and 1. */
    genrand_real1(): number;
    random(): number;
    genrand_real3(): number;
    genrand_res53(): number;
}
interface IsoColor {
    red: number;
    green: number;
    blue: number;
}
declare class IsoText extends IsoMinimalObject {
    static INHERIT: string;
    static LEFTTORIGHT: string;
    static RIGHTTOLEFT: string;
    static TOP: string;
    static HANGING: string;
    static MIDDLE: string;
    static ALPHABETIC: string;
    static IDEOGRAPHIC: string;
    static BOTTOM: string;
    static LEFT: string;
    static RIGHT: string;
    static START: string;
    static END: string;
    static CENTER: string;
    /** Font of the text */
    font: string;
    /** Color of the text as string or as RGB */
    color: string | IsoColor;
    /** The background color of the text as string or as RGB */
    backgroundColor: string | IsoColor;
    /** The strokecolor of the text. */
    strokeColor: string;
    /** The stroke width. */
    strokeWidth: number;
    /** The font size of the text in pixel. Default is 10. */
    size: number;
    /** Color of the text as RGB calculated from IsoText.color */
    colorRGB: IsoColor;
    /** Background color of the text as RGB calculated from IsoText.backgroundColor */
    backgroundColorRGB: IsoColor;
    /** Stroke color of the text as RGB calculated from IsoText.strokeColor. */
    strokeColorRGB: IsoColor;
    /** Text of this object. */
    text: string;
    /** The fill style. If true the text is filled, else its stroked. */
    filled: boolean;
    /** The direction of the text. Possible values are IsoText.INHERIT, IsoText.LEFTTORIGHT or IsoText.RIGHTTOLEFT. Default is IsoText.INHERIT. */
    direction: string;
    /** The baseline of the text. Possible values are IsoText.TOP, IsoText.HANGING, IsoText.MIDDLE, IsoText.ALPHABETIC, IsoText.IDEOGRAPHIC and IsoText.BOTTOM. The default is IsoText.ALPHABETIC. */
    baseline: string;
    /** The allignment of the text. Possible values are IsoText.START, IsoText.END, IsoText.LEFT, IsoText.RIGHT or IsoText.CENTER. Default is IsoText.START. */
    align: string;
    /** Type of the object. */
    type: string;
    /** Creates a new text object. */
    constructor(Engine: IsoMetric, name: string, text?: string);
    /** Sets the text. */
    setText(text: string): IsoText;
    /** Sets the font-size of the text. size can be a number in pixel or a string. */
    setSize(size: number): IsoText;
    /** Sets the value of the color red of the text. red is a value between 0 and 255. */
    setColorRed(red: number): IsoText;
    /** Sets the value of the color green of the text. green is a value between 0 and 255. */
    setColorGreen(green: number): IsoText;
    /** Sets the value of the color blue of the text. blue is a value between 0 and 255. */
    setColorBlue(blue: number): IsoText;
    /** Sets the value of the background color red of the text. red is a value between 0 and 255. */
    setBackgroundColorRed(red: number): IsoText;
    /** Sets the value of the background color green of the text. green is a value between 0 and 255. */
    setBackgroundColorGreen(green: number): IsoText;
    /** Sets the value of the background color blue of the text. blue is a value between 0 and 255. */
    setBackgroundColorBlue(blue: number): IsoText;
    /** Sets the value of the stroke color red of the text. red is a value between 0 and 255. */
    setStrokeColorRed(red: number): IsoText;
    /** Sets the value of the stroke color green of the text. green is a value between 0 and 255. */
    setStrokeColorGreen(green: number): IsoText;
    /** Sets the value of the stroke color blue of the text. blue is a value between 0 and 255. */
    setStrokeColorBlue(blue: number): IsoText;
    /** Sets the color of a text. color can be a hex value or an object of IsoColor. */
    setColor(color: string | IsoColor): IsoText;
    /** Sets te background color of the text. color can be a hex value or an object of IsoColor. */
    setBackgroundColor(color: string | IsoColor): IsoText;
    /** Sets the stroke color of a text. color can be a hex value or an object of IsoColor. */
    setStrokeColor(color: string | IsoColor): IsoText;
    /** Sets the stroke width of the text. */
    setStrokeWidth(width: number): IsoText;
    /** Sets the font of the text.*/
    setFont(font: string): IsoText;
    /** Sets if the text is filled or not. */
    setFilled(fill: boolean): IsoText;
    /** Sets the direction of the text. */
    setDirection(direction: string): IsoText;
    /** Sets the baseline of the text. */
    setBaseline(baseline: string): IsoText;
    /** Sets the allignment of the text. */
    setAlign(align: string): IsoText;
    /** Gets the allignment of the text. */
    getAlign(): string;
    /** Gets the baseline of the text. */
    getBaseline(): string;
    /** Gets the direction of the text. */
    getDirection(): string;
    /** Gets if the text is filled or not. */
    getFilled(): boolean;
    /** Returns the text.*/
    getText(): string;
    /** Returns the size of the text. The returnd value can be a number or a string.*/
    getSize(): number | string;
    /** Returns the color of the text as an IsoColor object.*/
    getColorRGB(): IsoColor;
    /** Returns the background color of the text as an IsoColor object.*/
    getBackgroundColorRGB(): IsoColor;
    /** Returns the stroke color of the text as an IsoColor object.*/
    getStrokeColorRGB(): IsoColor;
    /** Retruns the font.*/
    getFont(): string;
    /** Gets the stroke width of the text. */
    getStrokeWidth(): number | string;
    /**
     * Converts a hex value to a RGB-color and return it.
     * Code by Time Down @ stackoverflow.com
     * @see http://www.stackoverflow.com/user/96100/tim-down
     */
    private hexToRGB(hex);
    /**
     * Converts a RGB-color to a hex value and return it.
     * Code by Time Down @ stackoverflow.com
     * @see http://www.stackoverflow.com/user/96100/tim-down
     */
    private rgbToHex(r, g, b);
    private ptToPx(size);
    /** Gets the position on the screen. */
    getAbsolutePosition(): IsoVector2D;
    /** Gets the original dimension of a text in pixel. @todo convert %, pt, em to px */
    getOriginalDimension(): IsoDimension;
    /** Gets the dimension of the object on the screen. */
    getAbsoluteDimension(): IsoDimension;
    /** Gets all important information for rendering an object. */
    getRenderDetails(): IIsoRenderDetails;
}
declare class IsoPhysicsManager {
    /** Includes all registered rigid bodies */
    rigidBodies: Array<IsoObject>;
    /** Includes all registred mass bodies */
    massBodies: Array<IsoObject>;
    /** The global gravity */
    gravity: number;
    /** Registers a new mass body */
    addMassBody(object: IsoObject): void;
    /** Registers a new rigid body */
    addRigidBody(object: IsoObject): void;
    /** Removes a rigid body */
    removeRigidBody(object: IsoObject): void;
    /** Removes a mass body */
    removeMassBody(object: IsoObject): void;
    /** Sets the global gravity */
    setGravity(g: number): void;
    /**
    * Updates the physics.
    * @todo find a much better solution
    * @todo implement more physics
    */
    update(): void;
}
/**
 * IsoVector2D represents a point on the screen.
 */
declare class IsoVector2D extends IsoPoint {
    /** Creates a new vector */
    constructor(x?: number, y?: number);
    /** Gets the distance between two points */
    getDistance(vec: IsoVector2D): number;
    /** Gets the length of a vector. */
    getMagnitude(): number;
    /** Gets the angle of a vector. */
    getAngle(): number;
    /** Sets the vector from an angle and a length.*/
    createFromAngle(angle: number, length: number): void;
    add(vector: IsoVector2D): void;
}
