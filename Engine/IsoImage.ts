"use strict";
class IsoImage {
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

    constructor(name?: string, src?: string) {
        if (name !== undefined && src !== undefined) {
            this.create(name, src);
        }
    }
    /**
     * Creates a new image.
     * @param src Source to the imagefile.
     * @return Instance of IsoImage
     */
    create(name: string, src: string): IsoImage {
        this.name = name;
        this.src = src;
        return this;
    }
    /**
     * Loads the image for further work.
     * @return Instance of IsoImage
     */
    load() {
        this.image = new Image();
        this.image.src = this.src;
        this.image.onload = (event: Event) => this._onLoad(event);
    }
    /**
     * Called when the image file was loaded.
     * @param event The triggerd event
     */
    _onLoad(event: Event) {
        this.width = this.image.width;
        this.height = this.image.height;
        if (typeof this.onLoad === "function") {
            this.onLoad.call(this, event);
        }
    }
    /**
     * Returns the image.
     * @return The image.
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
} 