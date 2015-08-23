///<reference path="IsoResource.ts" />
class IsoVideoResource extends IsoResource {
    /** Name of the resource. */
    name: string;
    /** Source of the resource. */
    source: IsoVideo;
    /** Type of the object for identification. */
    get type() {
        return "IsoVideoResource";
    }
    set type(value) { }
    constructor(name: string, source: IsoVideo) {
        super(name);
        this.setSource(source);
        return this;
    }
    /** Sets the source of a resource. */
    setSource(source: IsoVideo): IsoVideoResource {
        this.source = source;
        return this;
    }
    /** Gets the source. */
    get(): IsoVideo {
        return this.source;
    }
    /** Gets the HTMLElement. */
    getElement(): HTMLVideoElement {
        return this.source.get();
    }
}