///<reference path="../core/IsoObject.ts" />
class IsoImage extends IsoObject {
    /** Path to the image. */
    src: string;
    /** HTMLImageObject */
    element: HTMLImageElement;
    /** A callback when the image loaded. */
    __onLoad: Function;
    /** Indicates if the image was loaded. */
    isLoaded: boolean = false;
    /** The size of the image. */
    size: IsoSize = new IsoSize(0, 0);
    /** Type of the object for identification. */
    get type() {
        return "IsoImage";
    }
    set type(value) { }
    constructor(src?: string) {
        super();
        if (name !== undefined && src !== undefined) {
            this.create(src);
        }
    }
    /** Sets the element to an existing HTML element. */
    setElement(image: HTMLImageElement): IsoImage {
        this.element = image;
        this.setSize(new IsoSize(image.width, image.height));
        this.isLoaded = true;
        return this;
    }

    /** Creates a new image. */
    create(src: string): IsoImage {
        this.src = src;
        this.element = new Image();
        
        return this;
    }
    /** Loads the image for further work. */
    load() {
        this.element.addEventListener("load", (event: Event) => this._onLoad(event), true);
        this.element["src"] = this.src;
    }
    /** Called when the image file was loaded. */
    _onLoad(event: Event) {
        this.size = new IsoSize(this.element.width, this.element.height);
        this.isLoaded = true;
        this.call("load");
    }
    /**  Returns the image. */
    get(): HTMLImageElement {
        return this.element;
    }
    /** Gets the width of the image. */
    getWidth(): number {
        return this.element.width;
    }
    /** Gets the height of the image. */
    getHeight(): number {
        return this.element.height;
    }
    /** Returns the size. */
    getSize(): IsoSize {
        return this.size;
    }
    /** Sets the width of the image. */
    setWidth(width: number): IsoImage {
        this.size.width = width;
        return this;
    }
    /** Sets the height of the image. */
    setHeight(height: number): IsoImage {
        this.size.height = height;
        return this;
    }
    /** Sets the size of the image. */
    setSize(size: IsoSize): IsoImage {
        this.size = size;
        return this;
    }
    /** Resizes the video. */
    resize(): IsoImage {
        if (this.element !== undefined && this.size.width !== undefined && this.size.height !== undefined) {
            this.element.width = this.size.width;
            this.element.height = this.size.height;
        }
        return this;
    }
} 