///<reference path="../core/IsoWatcher.ts" />
class IsoSize extends IsoWatcher {
    /** The width. */
    private _width;
    set width(value: number) {
        this.__propertyChanged("width", value);
        this._width = value;
    }
    get width() {
        return this._width;
    }
    /** The height. */
    private _height;
    set height(value: number) {
        this.__propertyChanged("height", value);
        this._height = value;
    }
    get height(){
        return this._height;
    }

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }
    /** Sets or resets the size */
    set(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    /** Gets the size. */
    get(): IsoSize {
        return this;
    }
}