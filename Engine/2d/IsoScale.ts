///<reference path="../core/IsoWatcher.ts" />
class IsoScale extends IsoWatcher {
    /** The scale factor on the x axis */
    private _fx;
    set fx(value: number) {
        this.__propertyChanged("fx", value);
        this._fx = value;
    }
    get fx() {
        return this._fx;
    }
    /** The scale factor on the y axis */
    private _fy;
    set fy(value: number) {
        this.__propertyChanged("fy", value);
        this._fy = value;
    }
    get fy() {
        return this._fy;
    }

    constructor(fx?: number, fy?: number) {
        super();
        if (fx !== undefined) {
            this.fx = fx;
        }

        if (fy !== undefined) {
            this.fy = fy;
        }
    }
    /** Sets or resets the scale */
    set(fx: number, fy: number) {
        this.fx = fx;
        this.fy = fy;
    }
    /** Gets the scale. */
    get(): IsoScale {
        return this;
    }
}