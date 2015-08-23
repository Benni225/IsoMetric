///<reference path="../core/IsoWatcher.ts" />
class IsoPoint extends IsoWatcher {
    private _x;
    set x(value: number) {
        this.__propertyChanged("x", value);
        this._x = value;
    }
    get x() {
        return this._x;
    }
    private _y;
    set y(value: number) {
        this.__propertyChanged("y", value);
        this._y = value;
    }
    get y() {
        return this._y;
    }
    constructor(x?: number, y?: number) {
        super();
        if (x !== undefined) {
            this.x = x;
        }

        if (y !== undefined) {
          this.y = y; 
        }
    }
    /** Sets or resets the point */
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    /** Gets the point on the screen. */
    get(): IsoPoint {
        return this;
    }
}