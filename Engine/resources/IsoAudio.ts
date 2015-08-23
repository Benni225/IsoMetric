///<reference path="../core/IsoObject.ts" />
class IsoAudio extends IsoObject {
    /** Sets the loadType to "LOAD" the audio load completly. */
    static LOAD: string = "LOAD";
    /** Sets the loadType to "STREAM" the audio streamed. */
    static STREAM: string = "STREAM";
    /** Path to the audio. */
    src: Array<string>;
    /** HTMLAudioObject */
    element: HTMLAudioElement;
    /** A callback when the audio loaded. */
    __onLoad: Function;
    /** Indicates if the audio was loaded. */
    isLoaded: boolean = false;
    /** Type of the object for identification. */
    get type() {
        return "IsoAudio";
    }
    set type(value) { }
    /** Sets if the audio load completly or stream it. */
    loadType: string = IsoAudio.LOAD;

    constructor(src?: Array<string>) {
        super();
        if (name !== undefined && src !== undefined) {
            this.create(src);
        }
    }

    /** Creates a new audio. */
    create(src: Array<string>): IsoAudio {
        this.src = src;
        return this;
    }
    /** Loads the audio for further work. */
    load() {
        this.element = document.createElement("audio");
        if (this.loadType === IsoAudio.STREAM)
            this.element.addEventListener("canplay", (e: Event) => this._onLoad(e), false);
        else if (this.loadType === IsoAudio.LOAD)
            this.element.addEventListener("canplaythrough", (e: Event) => this._onLoad(e), false);
        else {
            this.log(new Error("An unknown loadType for the audio " + this.src[0] + "!"), IsoLogger.WARN);
            this.log("Set the loadType to default.", IsoLogger.INFO);
            this.element.addEventListener("canplaythrough", (e: Event) => this._onLoad(e), false);
        }
        for (var i = 0; i < this.src.length; i++) {
            var fileParts = this.src[i].split("."),
                source = document.createElement("source");
            source.src = this.src[i];
            source.type = "audio/" + fileParts[fileParts.length - 1];
            this.element.appendChild(source);
        }
    }
    /** Called when the audio file was loaded. */
    _onLoad(event: Event) {
        this.isLoaded = true;
        this.call("load");
    }
    /**  Returns the audio. */
    get(): HTMLAudioElement {
        return this.element;
    }
} 