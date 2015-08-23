///<reference path="IsoResource.ts" />
class IsoAudioResource extends IsoResource {
    /** Name of the resource. */
    name: string;
    /** Source of the resource. */
    source: IsoAudio;
    /** Type of the object for identification. */
    get type() {
        return "IsoAudioResource";
    }
    set type(value) { }
    constructor(name: string, source: IsoAudio) {
        super(name);
        return this;
    }
    /** Sets the source of a resource. */
    setSource(source: IsoAudio): IsoAudioResource {
        this.source = source;
        return this;
    }
    /** Gets the source. */
    get(): IsoAudio {
        return this.source;
    }
}