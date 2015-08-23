///<reference path="IsoTexture.ts" />
class IsoImageTexture extends IsoTexture {
    /** The image resource. */
    private _src: IsoImageResource;
    set src(value: IsoImageResource) {
        this.__propertyChanged("src", value);
        this._src = value;
    }
    get src() {
        return this._src;
    }
    /** Type of the object for identification. */
    get type() {
        return "IsoImageTexture";
    }
    set type(value) { }
    constructor(name: string, src: IsoImageResource) {
        super(name);
        this.set(src);
    }
    /** Sets the image of the texture. */
    set(src: IsoImageResource): IsoImageTexture {
        this.src = src;
        return this;
    }
    /** Resets the image of the texture. */
    reset(): IsoImageTexture {
        this.src = undefined;
        return this;
    }
    /** Returns the imagedata. */
    getImageData(): IImageData {
        return {
            x: 0,
            y: 0,
            width: this.src.get().size.width,
            height: this.src.get().size.height,
            image: this.src.get().get()
        }
    }
    /** Returns the texture data. */
    getTextureData(): ITextureData {
        return {
            imageData: this.getImageData(),
            blendingMode: this.blendingMode,
            alpha: this.alpha
        };
    }
}