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

    offset: IsoOffset = {
        x: 0,
        y: 0
    };

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

        this.image.addEventListener("load", (e: Event) => this._onLoad(e));
    }
    /**
     * Called when the image file was loaded.
     * @param event The triggerd event
     */
    _onLoad(event: Event) {
        this.width = this.image.width;
        this.height = this.image.height;
        this.isLoaded = true;

        

        if (typeof this.__onLoad === "function") {
            this.__onLoad.call(this, event);
        }

        var e = new IsoEvent(IsoRessource.ISO_EVENT_RESSOURCE_LOADED);
        e.trigger();
    }

    onLoad(callback: Function) {
        this.__onLoad = callback;
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

    setOffset(offset: IsoOffset) {
        this.offset = offset;
    }
} 