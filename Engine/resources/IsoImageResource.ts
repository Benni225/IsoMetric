///<reference path="IsoResource.ts" />
class IsoImageResource extends IsoResource {
    /** Name of the resource. */
    name: string;
    /** Source of the resource. */
    source: IsoImage|IsoCanvas;
    /** Type of the object for identification. */
    get type() {
        return "IsoImageResource";
    }
    set type(value) { }
    constructor(name: string, source: IsoImage|IsoCanvas) {
        super(name);
        this.setSource(source);
        return this;
    }
    /** Sets the source of a resource. */
    setSource(source: IsoImage|IsoCanvas): IsoImageResource {
        this.source = source;
        return this;
    }
    /** Gets the source. */
    get(): IsoImage|IsoCanvas {
        return this.source;
    }
}