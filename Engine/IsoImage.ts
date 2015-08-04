///<reference path="IsoOn.ts" />
"use strict";
class IsoImage extends IsoOn implements IIsoResource {
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

    isLoaded: boolean = false;
    /**
     * The width of the image
     */
    width: number;
    /**
     * The height of the image
     */
    height: number;

    offset: IsoPoint = new IsoPoint(0, 0);

    type: string = IsoRessource.IMAGE;

    constructor(src?: string, local = false) {
        super();
        if (name !== undefined && src !== undefined) {
            this.create(src);
        }
    }

    /**
     * Creates a new image.
     */
    create(src: string): IsoImage {
        this.src = src;
        return this;
    }
    /**
     * Loads the image for further work.
     */
    load() {
        this.image = new Image();
        this.image.addEventListener("load", (e: Event) => this._onLoad(e), false);
        this.image.src = this.src;
    }
    /**
     * Called when the image file was loaded.
     */
    _onLoad(event: Event) {
        this.width = this.image.width;
        this.height = this.image.height;
        this.isLoaded = true;
        this.callOn("load");
    }
    /**
     * Returns the image.
     */
    get() : HTMLImageElement {
        return this.image;
    }
    /**
     * Deletes the image.
     */
    free() {
        this.image = null;
        delete (this);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getOffset(): IsoPoint {
        return this.offset;
    }

    setOffset(x: number, y: number) {
        this.offset.set(x, y);
    }
} 