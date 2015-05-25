"use strict";

class IsoBaseTileImage {
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
    loadCallback: Function;
    /**
     * Width of the image
     */
    width: number;
    /**
     * Height of the image
     */
    height: number;
    /**
     * ToDo:
     * maybe deprecated
     */
    prefix: string = "TILEIMAGE";
    /**
     * The the direction. Possible values are:
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.Left
     * - IsoMetric.RIGHT
     */
    direction: number = IsoMetric.FRONT;
    /**
     * An object of IsoMetric
     */
    Engine: IsoMetric;
    /**
     * Creates a new instance of IsoBaseTileImage
     * @param Engine A object of IsoMetric
     * @param name Name of the new tileset
     * @param src Path to the image file
     */
    constructor(Engine: IsoMetric, name?: string, src?: string) {
        this.Engine = Engine;
        if (name !== undefined && src !== undefined) {
            this.create(name, src);
        }
    }
    /**
     * Creates a new Tileset.
     * @param Engine A object of IsoMetric
     * @param name Name of the new tileset
     * @param src Path to the image file
     * @return Instance of IsoBaseTileImage
     */
    create(name: string, src: string): IsoBaseTileImage {
        this.src = src;
        this.name = name;
        return this;
    }
    /**
     * Loads the image for further work.
     * @return Instance of IsoBaseTileImage
     */
    load(): IsoBaseTileImage {
        this.image = new Image;
        this.image.src = this.src;
        this.image.id = this.prefix + this.name;
        this.image.onload = (event: Event) => this._onLoad(event);
        return this;
    }
    /**
     * Called when the image file was loaded.
     * @param event The triggerd event
     */
    _onLoad(event: Event) {
        this.loadCallback.call(this.Engine, event);
    }
    /**
     * Returns the image.
     * @return The image.
     */
    get(): HTMLImageElement {
        return this.image;
    }
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
    getTileOffset(tileNumber: number) {
        var column = tileNumber % (this.image.width / this.width),
            row = Math.floor(tileNumber / (this.image.width / this.width));

        var ox = column * this.width,
            oy = row * this.height;
        return {
            offsetX: ox,
            offsetY: oy
        };
    }
    /**
     * Sets the size of a tile
     * @param width The width in px
     * @param height The height in px
     */
    setTileSize(width: number, height: number): IsoBaseTileImage {
        this.width = width;
        this.height = height;
        return this;
    }
    /**
     * Deletes the instance
     */
    free() {
        delete (this);
    }
    /**
     * Sets the direction of the tileset.
     * @param direction The direction of the tileset. Possible values are: 
     * - IsoMetric.FRONT
     * - IsoMetric.BACK
     * - IsoMetric.RIGHT
     * - IsoMetric.LEFT
     * @return The tileset.
     */
    setDirection(direction: number): IsoBaseTileImage {
        this.direction = direction;
        return this;
    }
}

class IsoBaseTileImages {
    tileImages: Array<IsoBaseTileImage> = new Array();
    private loaded: number = 0;
    private onLoaded: Function;
    private onEvery: Function;
    Engine: IsoMetric;

    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
    }

    add(name: string, src: string): IsoTileSets {
        this.tileImages.push(new IsoTileSet(this.Engine, name, src));
        return this;
    }

    load(): IsoTileSets {
        for (var i = 0; i < this.tileImages.length; i++) {
            this.tileImages[i].loadCallback = (event) => this.loadCounter(event, this.tileImages[i]);
            this.tileImages[i].load();
        }
        return this;
    }

    loadCounter(event: Event, tileSet: IsoTileSet) {
        this.loaded = this.loaded + 1;
        if (this.onEvery !== undefined) {
            this.onEvery(this.Engine, event, tileSet);
        }
        if (this.loaded === this.tileImages.length) {
            new IsoEvent("tilesetsLoaded").trigger();
            this.callThen();
        }
    }

    every(callback: Function): IsoBaseTileImages {
        this.onEvery = callback;
        return this;
    }

    then(callback: Function): IsoBaseTileImages  {
        this.onLoaded = callback;
        return this;
    }

    callThen() {
        if (this.onLoaded !== undefined) {
            this.onLoaded.call(this.Engine);
        }
    }

    getByName(name: string): IsoBaseTileImage {
        for (var i = 0; i < this.tileImages.length; i++) {
            if (this.tileImages[i].name === name) {
                return this.tileImages[i];
            }
        }
        return undefined;
    }
}