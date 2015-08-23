/// <reference path="../core/IsoObject.ts" />
class IsoResourceManager extends IsoObject {
    private _resources: Array<IsoAudioResource|IsoImageResource|IsoVideoResource> = new Array();
    set resources(value: Array<IsoAudioResource|IsoImageResource|IsoVideoResource>) {
        this.__propertyChanged("resource", value);
        this._resources = value;
    }
    get resources() {
        return this._resources;
    }
    set type(value) { }
    get type() {
        return "IsoResourceManager";
    }
    loaded: number = 0;
    /** Adds a resource. */
    add(resource: IsoAudioResource|IsoImageResource|IsoVideoResource) {
        try {
            if (this.resources === undefined) {
                this.resources = new Array();
                this.log("Resources should not be undefined. I created a new array for you.", IsoLogger.WARN);
            }
            this.resources.push(resource);
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Removes a resource. */
    remove(resource): IsoResourceManager {
        try {
            for (var i = 0; i < this.resources.length; i++) {
                if (this.resources[i] === resource) {
                    for (var l = i; l < this.resources.length - 1; i++) {
                        this.resources[l] = this.resources[l + 1];
                    }
                    this.resources.pop();
                    return this;
                }
            }
            this.log(new Error("I can not find the requested resource. I am so sorry!"), IsoLogger.WARN);
            return this;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Returns a resource by its name. */
    get(name: string) {
        try {
            for (var i = 0; i < this.resources.length; i++) {
                if (this.resources[i].name === name) {
                    return this.resources[i];
                }
            }
            this.log(new Error("I can not find the requested resource '" + name + "'"), IsoLogger.WARN);
            return undefined;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Loads all resources. */
    load(): IsoResourceManager {
        this.log("Lets start loading the resources.", IsoLogger.INFO);
        if (this.resources === undefined || this.resources.length === 0) {
            this.log("Nothing to load, because there are no resources.", IsoLogger.WARN);
        } else {
            for (var i = 0; i < this.resources.length; i++) {
                if (this.resources[i].type === "IsoImageResource" || this.resources[i].type === "IsoVideoResource") {
                    this.resources[i].get().on("load", () => this.process());
                    this.resources[i].get().load();
                }
            }
        }
        return this;
    }
    /** Checks the process of loading. */
    process() {
        this.loaded++;
        this.log("Loaded resource - " + this.loaded + " of " + this.resources.length, IsoLogger.INFO);
        if (this.loaded === this.resources.length) {
            this.log("Finished loading of all resources.", IsoLogger.INFO);
            this.call("load");
        }
    }
    /** Get the percent of the loading process. */
    getPercent(): number {
        if (this.resources !== undefined && this.resources.length > 0) {
            return this.resources.length / 100 * this.loaded;
        } else {
            this.log(new Error("Sorry. I can not get you the percentage, because there is nothing to load."), IsoLogger.WARN);
        }
    }
}