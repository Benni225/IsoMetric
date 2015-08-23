///<reference path="IsoTexture.ts" />
class IsoColorTexture extends IsoTexture {
    /** The color resource. */
    private _color: IsoColor;
    set color(value: IsoColor) {
        this.__propertyChanged("color", value);
        this._color = value;
    }
    get color() {
        return this._color;
    }
    /** Type of the object for identification. */
    get type() {
        return "IsoColorTexture";
    }
    set type(value) { }
    constructor(name: string, color: IsoColor) {
        super(name);
        this.set(color);
    }
    /** Sets the color of the texture. */
    set(color: IsoColor): IsoColorTexture {
        this.color = color;
        return this;
    }
    /** Resets the color of the texture. */
    resetColor(): IsoColorTexture {
        this.color = undefined;
        return this;
    }
    /** Returns the color data. */
    getColorData(): IColorData {
        return {
            r: this.color.r,
            g: this.color.g,
            b: this.color.b,
            hex: this.color.getHex()
        };
    }
    /** Returns the texture data. */
    getTextureData(): ITextureData {
        return {
            colorData: this.getColorData(),
            blendingMode: this.blendingMode,
            alpha: this.alpha
        };
    }
}