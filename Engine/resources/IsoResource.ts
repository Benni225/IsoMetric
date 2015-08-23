///<reference path="../core/IsoObject.ts" />
class IsoResource extends IsoObject {
    /** Name of the resource. */
    name: string;
    /** Type of the object for identification. */
    get type() {
        return "IsoResource";
    }
    set type(value) { }
    constructor(name: string) {
        super();
        this.setName(name);
    }
    /** Sets the name of a resource. */
    setName(name: string): IsoResource {
        this.name = name;
        return this;
    }
    /** Gets the name of the resource. */
    getName(): string {
        return this.name;
    }

    get() {
        return undefined;
    }
}