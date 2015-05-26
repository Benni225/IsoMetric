///<reference path="IsoImage.ts" />
///<reference path="IsoCollection.ts" />
"use strict";

class IsoBaseTileImage extends IsoImage {
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
        super(name, src);
        this.Engine = Engine;
        if (name !== undefined && src !== undefined) {
            this.create(name, src);
        }
    }
    /**
     * Creates a new Tileset.
     * @override IsoImage.create
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
     * @override IsoImage.load
     * @return Instance of IsoBaseTileImage
     */
    load(): IsoBaseTileImage {
        this.image = new Image;
        this.image.src = this.src;
        this.image.onload = (event: Event) => this._onLoad(event);
        return this;
    }
    /**
     * Called when the image file was loaded.
     * @override IsoImage._onLoad
     * @param event The triggerd event
     */
    _onLoad(event: Event) {
        this.onLoad.call(this.Engine, event);
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
        var column = tileNumber % (this.image.width / this.tileWidth),
            row = Math.floor(tileNumber / (this.image.width / this.tileWidth));

        var ox = column * this.tileWidth,
            oy = row * this.tileHeight;
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
        this.tileWidth = width;
        this.tileHeight = height;
        return this;
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

class IsoBaseTileImages extends IsoCollection {
    collection: Array<IsoBaseTileImage> = new Array();
    private loaded: number = 0;
    private onLoaded: Function;
    private onEvery: Function;
    Engine: IsoMetric;

    constructor(Engine: IsoMetric) {
        super(Engine);
    }

    add(name: string, src: string): IsoTileSets {
        this.collection.push(new IsoTileSet(this.Engine, name, src));
        return this;
    }

    load(): IsoTileSets {
        for (var i = 0; i < this.collection.length; i++) {
            this.collection[i].onLoad = (event: Event) => this.loadCounter(event, this.collection[i]);
            this.collection[i].load();
        }
        return this;
    }

    loadCounter(event: Event, tileSet: IsoTileSet) {
        this.loaded = this.loaded + 1;
        if (this.onEvery !== undefined) {
            this.onEvery(this.Engine, event, tileSet);
        }
        if (this.loaded === this.collection.length) {
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
}