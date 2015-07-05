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
    constructor(Engine: any, image: IsoRessource, name?: string);
    addAnimation(name: string, attribute: string, endValue: number, speed: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoObject;
    collide(object: IsoObject): boolean;
    getCoords(): IsoCoords;
    getOffset(): IsoOffset;
    getOriginalDimension(): IsoDimension;
    getOriginalHeight(): number;
    getOriginalWidth(): number;
    getPosition(): IsoPoint;
    getRelativPosition(): IsoPoint;
    getRotation(): number;
    isBoxCollision(coordsSource: IsoCoords, coordsTarget: IsoCoords): boolean;
    isPixelBoxCollision(sourceObject: IsoObject, targetCoords: IsoCoords): boolean;
    isPixelCollision(sourceObject: IsoObject, targetObject: IsoObject): boolean;
    move(deltaX: number, deltaY: number): IsoObject;
    rotate(degrees: number): IsoObject;
    scroll(deltaX: number, deltaY: number): IsoObject;
    setAnchor(x: number, y: number): IsoObject;
    setHeight(height: number): IsoObject;
    setImage(image: IsoRessource): IsoObject;
    setName(name: string): IsoObject;
    setOffset(offsetX: number, offsetY: number): IsoObject;
    setPosition(position: IsoPoint): IsoObject;
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
    resume(): IsoObject;
    pause(): IsoObject;
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
    getRelativPosition(): IsoPoint;
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
    setUpdateType(type: string): IsoTile;
    set(tile: IsoTileInfo): IsoTile;
    getMapPosition(): IsoMapPosition;
    getRenderDetails(): {
        position: IsoPoint;
        mapPosition: IsoMapPosition;
        tileSize: IsoTileSize;
        renderSize: {
            width: number;
            height: number;
        };
        image: HTMLImageElement;
        offset: IsoOffset;
        zoomLevel: number;
    };
}
declare class IsoMap {
    name: string;
    map: Array<Array<Array<number>>>;
    properties: Array<number>;
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
interface IsoTilesInView {
    rowStart: number;
    rowEnd: number;
    columnStart: number;
    columnEnd: number;
    tiles: Array<Array<IsoTile>>;
}
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
    constructor(Engine: IsoMetric, name?: string, tileWidth?: number, tileHeight?: number, image?: IsoRessource, map?: Array<Array<Array<number>>>);
    setMap(map: Array<Array<Array<number>>>): IsoTileMap;
    createMap(numTilesX: number, numTilesY: number, defaultValue?: Array<number>): IsoTileMap;
    createTiles(): IsoTileMap;
    getTile(name: string): IsoTile;
    /**
     * @todo
     * find a solution for columnStart, columnEnd, rowStart and rowEnd in connection with zooming.
     */
    getTilesInView(): IsoTilesInView;
    /**
     * Gets all tiles in specified area
     * @param x The position on the X-axis of the area
     * @param y The position on the Y-axis of the area
     * @param width The width of the area
     * @param height The height of the area
     * @retrurn An object with information of all tiles
     */
    getTilesInRadius(x: number, y: number, width: number, height: number): Array<IsoTile>;
    /**
     * Checks the tile which the mouse pointer is touching
     * return The tile.
     */
    getTileOnPosition(position: IsoPoint): IsoTile;
    setImage(image: IsoRessource): IsoTileMap;
    setMaxZoomLevel(zoomLevel: number): IsoTileMap;
    setMinZoomLevel(zoomLevel: number): IsoTileMap;
    setName(name: string): IsoTileMap;
    setOffset(o: IsoOffset): IsoTileMap;
    setScroll(x: number, y: number): IsoTileMap;
    setSpeed(speed: number): IsoTileMap;
    scroll(x: number, y: number): IsoTileMap;
    setTileSize(size: IsoTileSize): IsoTileMap;
    setZoomLevel(zoomLevel: number): IsoTileMap;
    setZoomPoint(point: IsoPoint): IsoTileMap;
    setZoomStrength(zoomStrength: number): IsoTileMap;
    update(): void;
    updateTile(tile: IsoTile): void;
    verify(): boolean;
    zoom(zoom: number): IsoTileMap;
}
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
    direction: number;
    collisionBody: IsoCollisionBody;
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string);
    getCollidingTiles(tilemap: IsoTileMap): Array<IsoTile>;
    getTileImage(): IsoTileImage;
    setFrame(frame: IsoFrame): IsoSprite;
    setDirection(direction: number): IsoSprite;
    setTile(tile: number): IsoSprite;
    set(tile: IsoTileObjectInfo): IsoTileObject;
    getRenderDetails(): {
        position: IsoPoint;
        tileSize: IsoTileSize;
        renderSize: {
            width: number;
            height: number;
        };
        image: HTMLImageElement;
        offset: IsoOffset;
        zoomLevel: number;
    };
}
declare class IsoAnimatedSprite extends IsoSprite {
    constructor(Engine: IsoMetric, image: IsoRessource, tileInfo: IsoTileObjectInfo, name?: string);
    addFrameAnimation(name: string, frames: Array<number>, speed: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimatedSprite;
    play(name: string): IsoAnimatedSprite;
    stop(name: any): IsoAnimatedSprite;
    resume(): IsoAnimatedSprite;
    pause(): IsoAnimatedSprite;
}
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
declare class IsoAnimation {
    static ONCE: string;
    static PINGPONG: string;
    static ENDLESS: string;
    static ANIMATION_TYPE_FRAME: string;
    static ANIMATION_TYPE_ATTRIBUTE: string;
    name: string;
    duration: number;
    frames: Array<number>;
    framesPerSecond: number;
    startValue: number;
    endValue: number;
    actualValue: number;
    attribute: string;
    change: number;
    type: string;
    easing: Function;
    isPlaying: boolean;
    callbacks: Array<IsoCallback>;
    object: Object;
    sprite: IsoAnimatedSprite;
    timerStart: Date;
    timerActual: Date;
    iterations: number;
    currentIteration: number;
    __debug: number;
    animationType: string;
    constructor();
    createFrameAnimation(name: string, object: IsoAnimatedSprite, frames: Array<number>, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimation;
    createAnimation(name: string, object: Object, attribute: string, endValue: number, duration: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimation;
    play(): IsoAnimation;
    __playAttribute(): void;
    __playFrame(): void;
    stop(): IsoAnimation;
    pause(): IsoAnimation;
    resume(): IsoAnimation;
}
declare class IsoAnimationManager {
    animations: Array<IsoAnimation>;
    addFrameAnimation(name: string, object: IsoAnimatedSprite, frames: Array<number>, speed: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimationManager;
    addAnimation(name: string, object: Object, attribute: string, endValue: number, speed: number, easing?: Function, type?: string, callbacks?: Array<IsoCallback>): IsoAnimationManager;
    play(name: string, object: Object): void;
    stop(name: string, object: Object): void;
    resume(name: string, object: Object): void;
    pause(name: string, object: Object): void;
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
     * The drawing lib.
     * @see IsoDrawer
     */
    drawer: IsoDrawer;
    animation: IsoAnimationManager;
    /**
     * The input library.
     * @see IsoInput
     */
    input: IsoInput;
    /**
     * Handles all ressources of a project.
     * @see IsoRessourceManager
     */
    ressources: IsoRessourceManager;
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
    on: IsoOn;
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
