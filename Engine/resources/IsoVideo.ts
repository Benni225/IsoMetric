///<reference path="../core/IsoObject.ts" />
class IsoVideo extends IsoObject {
    /** Sets the loadType to "LOAD" the video load completly. */
    static LOAD: string = "LOAD";
    /** Sets the loadType to "STREAM" the video streamed. */
    static STREAM: string = "STREAM";
    /** Path to the video. */
    src: Array<string>;
    /** HTMLVideoObject */
    element: HTMLVideoElement;
    /** A callback when the video loaded. */
    __onLoad: Function;
    /** Indicates if the video was loaded. */
    isLoaded: boolean = false;
    /**  The size of the video. */
    size: IsoSize = new IsoSize(0, 0);
    /** Type of the object for identification. */
    get type() {
        return "IsoVideo";
    }
    /** Sets if the video load completly or stream it. */
    loadType: string = IsoVideo.LOAD;

    constructor(src?: Array<string>) {
        super();
        if (src !== undefined) {
            this.create(src);
        }
    }

    /** Creates a new video. */
    create(src: Array<string>): IsoVideo {
        this.src = src;
        this.element = document.createElement("video");
        return this;
    }
    /** Loads the video for further work. */
    load() {
        try {
            this.element.muted = true;
            if (this.loadType === IsoVideo.STREAM)
                this.element.oncanplay = (e: Event) => this._onLoad(e);
            else if (this.loadType === IsoVideo.LOAD)
                this.element.oncanplaythrough = (e: Event) => this._onLoad(e);
            else {
                this.log("An unknown loadType for the video " + this.src[0] + "!", IsoLogger.WARN);
                this.log("Set the loadType to default.", IsoLogger.INFO);
                this.element.oncanplaythrough = (e: Event) => this._onLoad(e);
            }
            if (this.size.width !== undefined && this.size.height !== undefined) {
                this.resize();
            }
            this.element.src = this.src[0];
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Called when the video file was loaded. */
    _onLoad(event: Event) {
        try {
            this.size.width = this.element.width;
            this.size.height = this.element.height;
            this.isLoaded = true;
            this.call("load");
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /**  Returns the video. */
    get(): HTMLVideoElement {
        return this.element;
    }
    /** Gets the width of the video. */
    getWidth(): number {
        return this.size.width;
    }
    /** Gets the height of the video. */
    getHeight(): number {
        return this.size.height;
    }
    /** Gets the size of the video. */
    getSize(): IsoSize {
        return this.size;
    }
    /** Sets the width of the video. */
    setWidth(width: number): IsoVideo {
        this.size.width = width;
        return this;
    }
    /** Sets the height of the video. */
    setHeight(height: number): IsoVideo {
        this.size.height = height;
        return this;
    }
    /** Sets the size of the video. */
    setSize(size: IsoSize): IsoVideo {
        this.size = size;
        return this;
    }
    /** Resizes the video. */
    resize(): IsoVideo {
        try {
            if (this.element !== undefined && this.size.width !== undefined && this.size.height !== undefined) {
                this.element.width = this.size.width;
                this.element.height = this.size.height;
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
        return this;
    }
} 