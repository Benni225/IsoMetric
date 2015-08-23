///<reference path="IsoTexture.ts" />
class IsoVideoTexture extends IsoTexture {
    /** The video resource. */
    private _src: IsoVideoResource;
    set src(value: IsoVideoResource) {
        this.__propertyChanged("src", value);
        this._src = value;
    }
    get src() {
        return this._src;
    }
    constructor(name: string, src: IsoVideoResource) {
        super(name);
        this.set(src);
    }
    /** Sets the image of the texture. */
    set(src: IsoVideoResource): IsoVideoTexture {
        this.src = src;
        return this;
    }
    /** Type of the object for identification. */
    get type() {
        return "IsoVideoTexture";
    }
    set type(value) { }
    /** Resets the image of the texture. */
    reset(): IsoVideoTexture {
        this.src = null;
        return this;
    }
    /** Plays or resumes the video. */
    play(): IsoVideoTexture {
        try {
            this.src.getElement().play();
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
        return this;
    }
    /** Stops the video. */
    stop(): IsoVideoTexture {
        try {
            this.src.getElement().pause();
            this.src.getElement().currentTime = 0;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
        return this;
    }
    /** Pause the video. */
    pause(): IsoVideoTexture {
        try {
            this.src.getElement().pause();
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
        return this;
    }
    /** Sets the current time in seconds of the video. */
    setCurrentTime(time: number): IsoVideoTexture {
        try {
            if (this.src.getElement().duration > time) {
                this.src.getElement().currentTime = time;
            } else {
                this.log(new Error("Can not set the time of IsoVideoTexture '" + this.name + "'. The request time is bigger than the duration."), IsoLogger.WARN);
            }
        } catch (e) {
            this.log(e, IsoLogger.WARN);
        }
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