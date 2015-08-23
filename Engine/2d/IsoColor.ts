///<reference path="../core/IsoObject.ts" />
class IsoColor extends IsoObject {
    /** red */
    private _r;
    set r(value: number) {
        this.__propertyChanged("r", value);
        this._r = value;
    }
    get r() {
        return this._r;
    }
    /** green */
    private _g;
    set g(value: number) {
        this.__propertyChanged("g", value);
    }
    get g() {
        return this._g;
    }
    /** blue */
    private _b;
    set b(value) {
        this.__propertyChanged("b", value);
    }
    get b() {
        return this._b;
    }
    /** The object type for identification. */
    get type() {
        return "IsoColor";
    }

    constructor(color: any) {
        super();
        this.set(color);
    }
    /** Sets the color with an hex value or an color object like {r: 255,g: 255,b: 255}. */
    set(color: any) {
        if (typeof color === "Object") {
            this.apply(color);
        } else if (typeof color === "string") {
            var rgb = this.hexToRgb(color);
            if (rgb) {
                this.apply(rgb);
            }
        }
    }
    /** Returns the color as a hex-value. */
    getHex(): string {
        return this.rgbToHex(this.r, this.g, this.b);
    }
    /** Turns a number to a hex-value. */
    componentToHex(c: number) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    /** Turns 3 numbers to a hex-value. */
    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
    /** Turns a hex-value to 3 numbers. */
    hexToRgb(hex: string) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}