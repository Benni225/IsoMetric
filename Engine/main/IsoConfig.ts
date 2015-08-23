/// <reference path="../core/IsoObject.ts" />
class IsoConfig extends IsoObject {
    /** Including the whole configuration. */
    private _config: Object = new Object;
    set config(value: Object) {
        this.__propertyChanged("config", value);
        this._config = value;
    }

    get config() {
        return this._config;
    }

    constructor(config?: Object) {
        super();
        if (config !== undefined) {
            this.set(config);
        }
    }

    set(config: Object): IsoConfig {
        this.log("I set the configuration.", IsoLogger.INFO);
        this.config = config;
        return this;
    }

    get(name: string): any {
        try {
            if (this.config.hasOwnProperty(name)) {
                return this.config[name];
            } else {
                this.log("I could not find the configuration setting '" + name + "'. :(", IsoLogger.WARN);
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Checks the existing of a property. */
    has(name: string): boolean {
        if (this.config === undefined) {
            this.log("The configuration is undefined. I created a new for you.", IsoLogger.WARN);
            this.config = new Object;
        }
        return this.config.hasOwnProperty(name);
    }
    /** Sets a property to a specified value. */
    setProperty(name: string, value: any): IsoConfig {
        this.config[name] = value;
        return this;
    }

}