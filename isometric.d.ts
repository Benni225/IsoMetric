/// <reference path="C:/Users/camel/Documents/Visual Studio 2013/Projects/Isometroc/IsoMetric3/Engine/typings/matterJs.d.ts" />
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
    SOURCE_IN: string;
    SOURCE_OVER: string;
    SOURCE_OUT: string;
    SOURCE_ATOP: string;
    DESTINATION_OVER: string;
    DESTINATION_IN: string;
    DESTINATION_OUT: string;
    DESTINATION_ATOP: string;
    LIGHTER: string;
    COPY: string;
    XOR: string;
};
declare class IsoLogger {
    static ERROR: number;
    static WARN: number;
    static INFO: number;
    static DEBUG: boolean;
    lastError: string;
    log(error: Error | string, warnLevel: number): void;
    debug(o: any): void;
}
declare class IsoEvent extends IsoLogger {
    __onCallbacks: Array<EventListener>;
    fire(type: string, data?: any, element?: HTMLElement): void;
    bind(eventType: string, callback: EventListener): void;
    unbind(eventType: string, callback: any): void;
    on(eventType: string, callback: EventListener): IsoEvent;
    call(eventType: any, args?: Array<any>): void;
    __checkOn(eventType: string): boolean;
}
/** This class helps to observe special values of a class. */
declare class IsoWatcher extends IsoEvent {
    __watch: Array<any>;
    watch(property: string, callback: EventListener): void;
    __propertyChanged(property: string, value: any): void;
}
declare class IsoObject extends IsoWatcher {
    type: string;
    apply(object: Object, to?: Object): void;
}
declare class IsoColor extends IsoObject {
    /** red */
    private _r;
    r: number;
    /** green */
    private _g;
    g: number;
    /** blue */
    private _b;
    b: any;
    /** The object type for identification. */
    type: string;
    constructor(color: any);
    /** Sets the color with an hex value or an color object like {r: 255,g: 255,b: 255}. */
    set(color: any): void;
    /** Returns the color as a hex-value. */
    getHex(): string;
    /** Turns a number to a hex-value. */
    componentToHex(c: number): string;
    /** Turns 3 numbers to a hex-value. */
    rgbToHex(r: any, g: any, b: any): string;
    /** Turns a hex-value to 3 numbers. */
    hexToRgb(hex: string): {
        r: number;
        g: number;
        b: number;
    };
}
declare class IsoPoint extends IsoWatcher {
    private _x;
    x: number;
    private _y;
    y: number;
    constructor(x?: number, y?: number);
    /** Sets or resets the point */
    set(x: number, y: number): void;
    /** Gets the point on the screen. */
    get(): IsoPoint;
}
declare class IsoScale extends IsoWatcher {
    /** The scale factor on the x axis */
    private _fx;
    fx: number;
    /** The scale factor on the y axis */
    private _fy;
    fy: number;
    constructor(fx?: number, fy?: number);
    /** Sets or resets the scale */
    set(fx: number, fy: number): void;
    /** Gets the scale. */
    get(): IsoScale;
}
declare class IsoSize extends IsoWatcher {
    /** The width. */
    private _width;
    width: number;
    /** The height. */
    private _height;
    height: number;
    constructor(width: number, height: number);
    /** Sets or resets the size */
    set(width: number, height: number): void;
    /** Gets the size. */
    get(): IsoSize;
}
/**
 * IsoVector2D represents a point on the screen.
 */
declare class IsoVector2D extends IsoPoint {
    /** Creates a new vector */
    constructor(x: number, y: number);
    /** Gets the distance between two points */
    getDistance(vec: IsoVector2D): number;
    /** Gets the length of a vector. */
    getMagnitude(): number;
    /** Gets the angle of a vector. */
    getAngle(): number;
    getAngleDegrees(): number;
    /** Sets the vector from an angle and a length.*/
    createFromAngle(angle: number, length: number): void;
    /** Add a second vector to the vector. */
    add(vector: IsoVector2D): void;
}
declare class IsoAnimation extends IsoObject {
    /** The play types of an animation. */
    static PLAY_ONCE: string;
    static PLAY_LOOP: string;
    /** The play direction of the animation. */
    static TRACK_NORMAL: string;
    static TRACK_PINGPONG: string;
    /** Repetition type */
    static REPEAT_ENDLESS: string;
    /** The name of the animation. */
    private _name;
    name: string;
    /** The animated object. */
    private _object;
    object: Object;
    /** The value the animation starts with. */
    private _startValue;
    startValue: number;
    /** The value the animation ends with.*/
    private _endValue;
    endValue: number;
    /** The current value of the animation. */
    private _currentValue;
    currentValue: number;
    /** The duraion of the animation in milliseconds. */
    private _duration;
    duration: number;
    /** The time in milliseconds after the animations starts.*/
    private _time;
    time: number;
    /** Indecates wether the animation played once or loops.*/
    private _playType;
    playType: string;
    /** Indecates wether the animation played normal or as ping-pong.*/
    private _trackDirection;
    trackDirection: string;
    /** Indecates how often the animation is played.*/
    private _repetitions;
    repetitions: string | number;
    /** The property to animate.*/
    private _property;
    property: string;
    /** The easing effect of the animation.*/
    private _effect;
    effect: Function;
    /** A function for round a number.*/
    private _round;
    round: Function;
    private isPlaying;
    private pingPongFlag;
    private initStartValue;
    private currentIteration;
    private Engine;
    private FPS;
    private played;
    private startTime;
    private pauseTime;
    constructor(name: string, options: IAnimationOptions);
    /** Sets the name of the animation. */
    setName(name: string): IsoAnimation;
    /** Returns the name of the animation. */
    getName(): string;
    /** Updates the animation. */
    update(): void;
    /** Plays the animation. */
    play(): void;
    /** Stops the animation. */
    stop(): void;
    /** Pause the animation. */
    pause(): void;
    /** Resumes the animation.*/
    resume(): void;
    /** Sets a value to the object. */
    setValue(value: number): void;
    /** Parse the object and return the given attribute. */
    private getObjectValue();
}
declare class IsoAnimationManager extends IsoObject {
    Engine: IsoMetric;
    object: Object;
    animations: Array<IsoAnimation>;
    constructor(object: Object);
    add(name: string, animation: IAnimationOptions): IsoAnimation;
    remove(name: string): IsoAnimationManager;
    play(name: string): IsoAnimation;
    pause(name: string): IsoAnimation;
    resume(name: string): IsoAnimation;
    stop(name: string): IsoAnimation;
    get(name: any): IsoAnimation;
    update(): void;
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
declare class IsoBaseEntity extends IsoObject {
    /** The physics. */
    physics: IsoPhysics;
    /** Name of the entity. */
    private _name;
    name: string;
    /** The friction of the entity. */
    private _friction;
    friction: number;
    /** The mass of the entity. */
    private _mass;
    mass: number;
    /** The acceleration of the entity. */
    acceleration: IsoVector2D;
    /** The velocity of the entity. */
    velocity: IsoVector2D;
    /** The position of the entity. */
    position: IsoVector2D;
    /** The rotation in degrees of the entity. */
    private _rotation;
    rotation: number;
    /** The size of the entity. */
    size: IsoSize;
    /** The anchor of the entity. */
    anchor: IsoPoint;
    /** Includes all animations of the entity. */
    animations: IsoAnimationManager;
    /** Indicates if an entity could be deleted.*/
    private _isFree;
    isFree: boolean;
    /** Hide or show an entity. */
    private _hidden;
    hidden: boolean;
    /** The type of the object for identification. */
    type: string;
    /** The drawing index of the entity. */
    private _index;
    index: number;
    chache: IsoTextureCache;
    /** Creates a new entity by its name. */
    constructor(name: string);
    /** Sets the name of the entity. */
    setName(name: string): IsoBaseEntity;
    /** Gets the name of the entity. */
    getName(): string;
    /** Sets the rotation of the entity. */
    setRotation(rotation: number): void;
    /** Gets the rotation of the entity. */
    getRotation(): number;
    /** Sets the friction of the entity. */
    setFriction(friction: number): IsoBaseEntity;
    /** Gets the friction of the entity. */
    getFriction(): number;
    /** Updates the position of the entity. */
    updatePosition(): IsoBaseEntity;
    /** Updates the entity. */
    update(): void;
    /** Free the memory. */
    free(): void;
    /** Hides the entity. */
    hide(): IsoBaseEntity;
    /** Shows the entity. */
    show(): IsoBaseEntity;
    /** Checks if the entity is hidden. */
    isHidden(): boolean;
    /** Sets the index of the entity. */
    setIndex(index: number): IsoBaseEntity;
    /** returns the index of the entity. */
    getIndex(): number;
    /** Returns the render data. */
    getRenderData(): IRenderData;
    /** Checks if this entity intersects with another entity. */
    isBoxIntersection(entityB: IsoBaseEntity): boolean;
}
declare class IsoEntityGroup extends IsoBaseEntity {
    /** Includes all entities of a group. */
    private _entities;
    entities: Array<IsoBaseEntity>;
    /** The type of the object for identification. */
    type: string;
    constructor(name: string);
    /** Adds a new entity to the group. */
    add(entity: IsoBaseEntity): void;
    /** Removes a entity to the group. */
    remove(entity: any): boolean;
    /** Updates the entity group. */
    update(): void;
    /** Updates the position on the x-axis of all including entities, when the position changed. */
    updateEntitiesPositionX(value: any, oldValue: any): void;
    /** Updates the position on the y-axis of all including entities, when the position changed. */
    updateEntitiesPositionY(value: any, oldValue: any): void;
    /** Sorts the entities by there indizies. */
    sort(): void;
}
declare class IsoSprite extends IsoBaseEntity {
    /** The texture of the box. */
    private _texture;
    texture: Array<IsoVideoTexture | IsoColorTexture | IsoImageTexture | IsoStripeTexture>;
    /** The maks of the entity. */
    private _mask;
    mask: IsoImageTexture | IsoStripeTexture;
    /** The scale of the texture. */
    scale: IsoScale;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string);
    /** Gets the absolute width dimension. */
    getAbsoluteWidth(): number;
    /** Gets the absolute height dimension. */
    getAbsoluteHeight(): number;
    /** Add a texture to the box. */
    addTexture(texture: IsoImageTexture | IsoColorTexture | IsoVideoTexture | IsoStripeTexture): IsoSprite;
    /** Get a texture by its name. */
    getTexture(name: string): IsoImageTexture | IsoColorTexture | IsoVideoTexture | IsoStripeTexture;
    /** Sets the mask of the sprite. */
    setMask(mask: IsoImageTexture | IsoStripeTexture): IsoSprite;
    /** Gets the mask of the sprite. */
    getMask(): IsoImageTexture | IsoStripeTexture;
    /** Removes a texture by its name. */
    removeTexture(name: string): IsoSprite;
    /** Returns the render data. */
    getRenderData(): IRenderData;
}
declare class IsoImage extends IsoObject {
    /** Path to the image. */
    src: string;
    /** HTMLImageObject */
    element: HTMLImageElement;
    /** A callback when the image loaded. */
    __onLoad: Function;
    /** Indicates if the image was loaded. */
    isLoaded: boolean;
    /** The size of the image. */
    size: IsoSize;
    /** Type of the object for identification. */
    type: string;
    constructor(src?: string);
    /** Sets the element to an existing HTML element. */
    setElement(image: HTMLImageElement): IsoImage;
    /** Creates a new image. */
    create(src: string): IsoImage;
    /** Loads the image for further work. */
    load(): void;
    /** Called when the image file was loaded. */
    _onLoad(event: Event): void;
    /**  Returns the image. */
    get(): HTMLImageElement;
    /** Gets the width of the image. */
    getWidth(): number;
    /** Gets the height of the image. */
    getHeight(): number;
    /** Returns the size. */
    getSize(): IsoSize;
    /** Sets the width of the image. */
    setWidth(width: number): IsoImage;
    /** Sets the height of the image. */
    setHeight(height: number): IsoImage;
    /** Sets the size of the image. */
    setSize(size: IsoSize): IsoImage;
    /** Resizes the video. */
    resize(): IsoImage;
}
declare class IsoAudio extends IsoObject {
    /** Sets the loadType to "LOAD" the audio load completly. */
    static LOAD: string;
    /** Sets the loadType to "STREAM" the audio streamed. */
    static STREAM: string;
    /** Path to the audio. */
    src: Array<string>;
    /** HTMLAudioObject */
    element: HTMLAudioElement;
    /** A callback when the audio loaded. */
    __onLoad: Function;
    /** Indicates if the audio was loaded. */
    isLoaded: boolean;
    /** Type of the object for identification. */
    type: string;
    /** Sets if the audio load completly or stream it. */
    loadType: string;
    constructor(src?: Array<string>);
    /** Creates a new audio. */
    create(src: Array<string>): IsoAudio;
    /** Loads the audio for further work. */
    load(): void;
    /** Called when the audio file was loaded. */
    _onLoad(event: Event): void;
    /**  Returns the audio. */
    get(): HTMLAudioElement;
}
declare class IsoResource extends IsoObject {
    /** Name of the resource. */
    name: string;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string);
    /** Sets the name of a resource. */
    setName(name: string): IsoResource;
    /** Gets the name of the resource. */
    getName(): string;
    get(): any;
}
declare class IsoImageResource extends IsoResource {
    /** Name of the resource. */
    name: string;
    /** Source of the resource. */
    source: IsoImage | IsoCanvas;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string, source: IsoImage | IsoCanvas);
    /** Sets the source of a resource. */
    setSource(source: IsoImage | IsoCanvas): IsoImageResource;
    /** Gets the source. */
    get(): IsoImage | IsoCanvas;
}
declare class IsoTexture extends IsoObject {
    /** The animations of the texture. */
    private _animations;
    animations: IsoAnimationManager;
    /** The alpha of the texture. */
    private _alpha;
    alpha: number;
    /** The blendingmode of the texture. */
    private _blendingMode;
    blendingMode: string;
    /** The name of the texture. */
    private _name;
    name: string;
    /** Type of the object for identification. */
    type: string;
    __changed: boolean;
    constructor(name: string);
    /** Sets the name of the texture. */
    setName(name: string): IsoTexture;
    /** Retruns the texture data. */
    getTextureData(): ITextureData;
    /** Sets if a texture needs a redraw. */
    changed(): void;
    unchanged(): void;
}
declare class IsoColorTexture extends IsoTexture {
    /** The color resource. */
    private _color;
    color: IsoColor;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string, color: IsoColor);
    /** Sets the color of the texture. */
    set(color: IsoColor): IsoColorTexture;
    /** Resets the color of the texture. */
    resetColor(): IsoColorTexture;
    /** Returns the color data. */
    getColorData(): IColorData;
    /** Returns the texture data. */
    getTextureData(): ITextureData;
}
declare class IsoImageTexture extends IsoTexture {
    /** The image resource. */
    private _src;
    src: IsoImageResource;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string, src: IsoImageResource);
    /** Sets the image of the texture. */
    set(src: IsoImageResource): IsoImageTexture;
    /** Resets the image of the texture. */
    reset(): IsoImageTexture;
    /** Returns the imagedata. */
    getImageData(): IImageData;
    /** Returns the texture data. */
    getTextureData(): ITextureData;
}
interface IImageData {
    x: number;
    y: number;
    width: number;
    height: number;
    image: any;
}
interface IColorData {
    r: number;
    g: number;
    b: number;
    hex: string;
}
interface ITextureData {
    imageData?: IImageData;
    colorData?: IColorData;
    blendingMode: string;
    alpha: number;
}
interface IRenderData {
    maskData?: IsoTexture;
    textureData?: Array<ITextureData>;
    position: IsoVector2D;
    rotation: number;
    anchor: IsoPoint;
    size: IsoSize;
    alpha?: number;
    blendingMode?: string;
}
interface IAnimationOptions {
    endValue: number;
    startValue?: number;
    time?: number;
    duration?: number;
    effect?: Function;
    playType?: string;
    trackDirection?: string;
    repetitions?: string | number;
    property: string;
    round?: Function;
    object?: Object;
}
interface IBodyOptions {
    type: string;
    radius?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    maxSides?: number;
    vertices?: Array<Array<number>>;
    flagInternal?: boolean;
    removeCollinear?: number;
    minimumArea?: number;
    sides?: number;
    slope?: number;
    options?: Matter.IBodyDefinition;
}
/**
 * IsoMetric is the main class. It includes all needed references and libs.
 */
declare class IsoMetric extends IsoObject {
    static self: IsoMetric;
    /** The main canvas element. */
    canvas: IsoCanvas;
    /** The drawing library. */
    drawer: IsoDrawer;
    /** The configuration. */
    config: IsoConfig;
    /** The input library. */
    input: IsoInput;
    /** Includes all layers */
    layers: IsoLayerManager;
    /** Includes all physics objects. */
    physics: IsoPhysicsManager;
    /** Handles all ressources of a project. */
    resources: IsoResourceManager;
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
    /** Optimal FPS. */
    optimalFPS: number;
    /** The default canvas configuration. */
    defaultWindowOptions: {
        fullscreen: boolean;
        width: number;
        height: number;
    };
    /**  An inteval for the drawing and game loop */
    interval: Object;
    animationFrame: Object;
    constructor(config: IsoConfig);
    /** Reset and set the FPS */
    setFPS(): void;
    /** Starts the game- and drawing-loop. */
    startLoop(): void;
    /** Sets the FPS after the drawing-loop completed. */
    endLoop(): void;
    /** The game- and drawing-loop. */
    update(): void;
}
declare class IsoLayer extends IsoObject {
    private _name;
    name: string;
    private _entities;
    entities: Array<IsoEntityGroup | IsoBaseEntity>;
    /** Indicates if the layer drawn or not. */
    _hidden: boolean;
    hidden: boolean;
    /** Indicates if the layer should deleted or not. */
    private _isFree;
    isFree: boolean;
    /** The index of the layer. */
    private _index;
    index: number;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string);
    /** Adds a new entity to the layer. */
    add(entity: IsoBaseEntity | IsoEntityGroup): IsoLayer;
    /** Get an entity by its name. */
    get(name: string): IsoBaseEntity | IsoEntityGroup;
    /** Sets the name of the layer. */
    setName(name: string): IsoLayer;
    /** Updates the layer. */
    update(): IsoLayer;
    /** Get all entities of the layer. */
    getAll(): Array<IsoBaseEntity | IsoEntityGroup>;
    /** Deletes the layer from the memory. */
    free(): void;
    /** Hides the layer. */
    hide(): void;
    /** Shows the layer. */
    show(): void;
    /** Indicates wether a layer is hidden or not. */
    isHidden(): boolean;
    /** Sorts the entities by there indizies. */
    sort(): void;
}
declare class IsoLayerManager extends IsoObject {
    _layers: Array<IsoLayer>;
    layers: Array<IsoLayer>;
    /** Type of the object for identification. */
    type: string;
    constructor();
    /** Adds a new layer to the layer manager. */
    add(layer: IsoLayer): IsoLayer;
    /** Removes a layer. */
    remove(layer: IsoLayer): void;
    /** Returns a layer by its name. */
    get(name: string): IsoLayer;
    /** Sorts the layers by there indizies. */
    sort(): void;
    /** Sort and updates all layers. */
    update(): void;
}
declare class IsoConfig extends IsoObject {
    /** Including the whole configuration. */
    private _config;
    config: Object;
    constructor(config?: Object);
    set(config: Object): IsoConfig;
    get(name: string): any;
    /** Checks the existing of a property. */
    has(name: string): boolean;
    /** Sets a property to a specified value. */
    setProperty(name: string, value: any): IsoConfig;
}
declare class IsoDrawer extends IsoObject {
    Engine: IsoMetric;
    constructor();
    /** Updates the whole scene. */
    update(layers: IsoLayerManager): void;
    /** Prepare a number of entities. */
    prepareEntities(entities: Array<IsoBaseEntity | IsoEntityGroup>): void;
    /** Draws a single entity. */
    drawEntity(entity: IsoBaseEntity | IsoEntityGroup): void;
    draw(entity: IsoBaseEntity, renderData: IRenderData): void;
    drawEmitter(image: IsoCanvas, entity: IsoEmitter): void;
    drawImage(image: IsoCanvas, renderData: IRenderData): void;
    /** Sets the anchor of an object. */
    private translate(anchor);
    /** Reset the anchor of an object. */
    private resetTranslation(anchor);
    /** Rotates an object. */
    private rotate(rotation);
}
interface IsoMouseEvent extends MouseEvent {
    wheelDelta?: number;
}
declare class IsoInput extends IsoObject {
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
    constructor();
    addEvents(): void;
    checkKeyboard(event: KeyboardEvent): void;
    checkMouse(event: IsoMouseEvent): void;
    checkTouch(event: TouchEvent): void;
    reset(): void;
}
declare class IsoEmitter extends IsoSprite {
    speed: IsoVector2D;
    alpha: number;
    blendingMode: string;
    /** An array including all particles. */
    particles: Array<IsoParticle>;
    /** The possible angle where particles spreaded to. */
    spread: number;
    /** The magnitude of the emitter's velocity. Updated automaticly. */
    magnitude: number;
    /** The maximal particle count. */
    maxParticles: number;
    /** Indecates if the scale of the particles effected during the lifetime. */
    effectScale: boolean;
    /** Indecates if the alpha of the particles effected during the lifetime. */
    effectAlpha: boolean;
    /** The liftime of a particle. Notice, that the lifetime is also effected by the randomseed */
    lifetime: number;
    /** The emissionrate of the emitter. */
    emissionRate: number;
    /** Indecates wether the emitter emits or not. */
    isEmitting: boolean;
    /** Creates a new particle emitter. */
    constructor(name: string, spread?: number);
    /** Adds a new particles to the emitter. */
    add(particle: IsoParticle): IsoEmitter;
    /** Sets the spread angle of the emitter. */
    setSpread(spread: number): IsoEmitter;
    /** Gets the spread angle of the emitter. */
    getSpread(): number;
    /** Updates the emitter. */
    update(): void;
    /** Emits a particle. */
    emitParticle(): void;
    /** Sets the emission rate. */
    setEmissionRate(rate: number): IsoEmitter;
    /** Returns the emission rate. */
    getEmissionRate(): number;
    /** Start emitting. */
    emit(): IsoEmitter;
    /** Stops emitting. */
    stopEmitting(): IsoEmitter;
    /** Emits particles */
    emitParticles(): void;
}
declare class IsoParticle extends IsoBaseEntity {
    lifetime: number;
    scale: IsoScale;
    startLife: number;
    oldTime: number;
    currentTime: number;
    effectScale: boolean;
    effectAlpha: boolean;
    alpha: number;
    constructor(velocity?: IsoVector2D, position?: IsoVector2D, scale?: IsoScale, size?: IsoSize, alpha?: number, lifetime?: number, effectScale?: boolean, effectAlpha?: boolean);
    updatePosition(): IsoParticle;
    update(): void;
    getRenderData(): IRenderData;
}
declare class IsoPhysics extends IsoObject {
    body: Matter.Body;
    entity: IsoBaseEntity;
    constructor();
    addBody(options: IBodyOptions): IsoPhysics;
    updateEntity(): void;
    hasBody(): boolean;
}
/**
 * This class is a bridge to the javascript physics engine 'MatterJs'.
 * Matter.js is licensed under The MIT License (MIT)
 * Copyright (c) 2014 Liam Brummitt
 * https://github.com/liabru/matter-js/
 */
declare class IsoPhysicsManager extends IsoObject {
    physicsEngine: Matter.Engine;
    turnedOn: boolean;
    constructor();
    create(): void;
    turnOn(): void;
    turnOff(): void;
    isTurnedOn(): boolean;
}
declare class IsoAudioResource extends IsoResource {
    /** Name of the resource. */
    name: string;
    /** Source of the resource. */
    source: IsoAudio;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string, source: IsoAudio);
    /** Sets the source of a resource. */
    setSource(source: IsoAudio): IsoAudioResource;
    /** Gets the source. */
    get(): IsoAudio;
}
declare class IsoCanvas extends IsoObject {
    /** The canvas HTML element. */
    private _element;
    element: HTMLCanvasElement;
    src: string;
    /** The context for drawing. */
    private _context;
    context: CanvasRenderingContext2D;
    /** The size of the canvas. */
    size: IsoSize;
    private _autoResize;
    autoResize: boolean;
    _fullscreen: boolean;
    fullscreen: boolean;
    type: string;
    constructor(width: number, height: number, fullscreen?: boolean, autoResize?: boolean);
    /** Creates a new canvas element. */
    load(): void;
    /** Appends the canvas element to a given HTML element. */
    append(element: Element): IsoCanvas;
    /** Remove the canvas element from a given HTML element. */
    remove(element: HTMLElement): IsoCanvas;
    /** Resize the canvas in case of fullscreen and autoResize is true. */
    resize(): void;
    /** Refreshes the canvas size. */
    refresh(): void;
    /** Clears the canvas. */
    clear(): void;
    /**  Returns the image. */
    get(): HTMLCanvasElement;
    /** Gets the width of the image. */
    getWidth(): number;
    /** Gets the height of the image. */
    getHeight(): number;
    /** Returns the size. */
    getSize(): IsoSize;
    /** Sets the width of the image. */
    setWidth(width: number): IsoCanvas;
    /** Sets the height of the image. */
    setHeight(height: number): IsoCanvas;
    /** Sets the size of the image. */
    setSize(size: IsoSize): IsoCanvas;
}
declare class IsoResourceManager extends IsoObject {
    private _resources;
    resources: Array<IsoAudioResource | IsoImageResource | IsoVideoResource>;
    type: string;
    loaded: number;
    /** Adds a resource. */
    add(resource: IsoAudioResource | IsoImageResource | IsoVideoResource): void;
    /** Removes a resource. */
    remove(resource: any): IsoResourceManager;
    /** Returns a resource by its name. */
    get(name: string): IsoImageResource | IsoAudioResource | IsoVideoResource;
    /** Loads all resources. */
    load(): IsoResourceManager;
    /** Checks the process of loading. */
    process(): void;
    /** Get the percent of the loading process. */
    getPercent(): number;
}
declare class IsoVideo extends IsoObject {
    /** Sets the loadType to "LOAD" the video load completly. */
    static LOAD: string;
    /** Sets the loadType to "STREAM" the video streamed. */
    static STREAM: string;
    /** Path to the video. */
    src: Array<string>;
    /** HTMLVideoObject */
    element: HTMLVideoElement;
    /** A callback when the video loaded. */
    __onLoad: Function;
    /** Indicates if the video was loaded. */
    isLoaded: boolean;
    /**  The size of the video. */
    size: IsoSize;
    /** Type of the object for identification. */
    type: string;
    /** Sets if the video load completly or stream it. */
    loadType: string;
    constructor(src?: Array<string>);
    /** Creates a new video. */
    create(src: Array<string>): IsoVideo;
    /** Loads the video for further work. */
    load(): void;
    /** Called when the video file was loaded. */
    _onLoad(event: Event): void;
    /**  Returns the video. */
    get(): HTMLVideoElement;
    /** Gets the width of the video. */
    getWidth(): number;
    /** Gets the height of the video. */
    getHeight(): number;
    /** Gets the size of the video. */
    getSize(): IsoSize;
    /** Sets the width of the video. */
    setWidth(width: number): IsoVideo;
    /** Sets the height of the video. */
    setHeight(height: number): IsoVideo;
    /** Sets the size of the video. */
    setSize(size: IsoSize): IsoVideo;
    /** Resizes the video. */
    resize(): IsoVideo;
}
declare class IsoVideoResource extends IsoResource {
    /** Name of the resource. */
    name: string;
    /** Source of the resource. */
    source: IsoVideo;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string, source: IsoVideo);
    /** Sets the source of a resource. */
    setSource(source: IsoVideo): IsoVideoResource;
    /** Gets the source. */
    get(): IsoVideo;
    /** Gets the HTMLElement. */
    getElement(): HTMLVideoElement;
}
declare class IsoStripeTexture extends IsoImageTexture {
    /** The current tile of the stripe. */
    private _tile;
    tile: number;
    /** The tile to start with. */
    _tileOffset: number;
    tileOffset: number;
    /** The tilesize. */
    _tileSize: IsoSize;
    tileSize: IsoSize;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string, src: IsoImageResource, tileSize: IsoSize);
    /** Sets the image of the texture. */
    set(src: IsoImageResource): IsoStripeTexture;
    /** Returns the current tile. */
    getTile(): number;
    /** Returns the tile offset */
    getTileOffset(): number;
    /** Returns the absolute tile, which means the tile number plus the tile offset. */
    getAbsoluteTile(): number;
    /** Resets the image of the texture. */
    reset(): IsoStripeTexture;
    /** Retruns the imagedata. */
    getImageData(): IImageData;
    /** Returns the texture data. */
    getTextureData(): ITextureData;
}
declare class IsoTextureCache extends IsoObject {
    _renderData: IRenderData;
    renderData: IRenderData;
    type: string;
    canvas: IsoCanvas;
    needRedraw(renderData: IRenderData): boolean;
    cache(renderData: IRenderData): IsoCanvas;
    render(renderData: IRenderData): IsoCanvas;
    getImageData(): ImageData;
}
declare class IsoTextureProcessor extends IsoTexture {
    /** The mask of the texture. */
    private _mask;
    mask: Array<IsoImageTexture>;
    /** All textures of the texture. */
    private _textures;
    textures: Array<IsoImageTexture | IsoColorTexture>;
    /** The final texture. */
    private _src;
    src: IsoImageResource;
    /** Type of the object for identification. */
    type: string;
    constructor(name: string);
    /** Adds a new mask to the texture. */
    addMask(mask: IsoImageTexture): void;
    /** Adds a new textue to the texture. */
    addTexture(texture: IsoColorTexture | IsoImageTexture): void;
    /** Removes a mask from the texture. */
    removeMask(mask: IsoImageTexture): IsoTextureProcessor;
    /** Removes a texture from the texture. */
    removeTexture(texture: IsoColorTexture | IsoImageTexture): IsoTextureProcessor;
    /** Proceed the new texture and save the result as the texture source.*/
    render(): void;
}
declare class IsoVideoTexture extends IsoTexture {
    /** The video resource. */
    private _src;
    src: IsoVideoResource;
    constructor(name: string, src: IsoVideoResource);
    /** Sets the image of the texture. */
    set(src: IsoVideoResource): IsoVideoTexture;
    /** Type of the object for identification. */
    type: string;
    /** Resets the image of the texture. */
    reset(): IsoVideoTexture;
    /** Plays or resumes the video. */
    play(): IsoVideoTexture;
    /** Stops the video. */
    stop(): IsoVideoTexture;
    /** Pause the video. */
    pause(): IsoVideoTexture;
    /** Sets the current time in seconds of the video. */
    setCurrentTime(time: number): IsoVideoTexture;
    /** Returns the imagedata. */
    getImageData(): IImageData;
    /** Returns the texture data. */
    getTextureData(): ITextureData;
}
