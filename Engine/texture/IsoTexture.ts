///<reference path="../core/IsoObject.ts" />
class IsoTexture extends IsoObject {
    /** The animations of the texture. */
    private _animations: IsoAnimationManager;
    set animations(value: IsoAnimationManager) {
        this.__propertyChanged("animations", value);
        this._animations = value;
    }
    get animations() {
        return this._animations;
    }
    /** The alpha of the texture. */
    private _alpha: number = 1;
    set alpha(value: number) {
        this.__propertyChanged("alpha", value);
        this._alpha = value;
    }
    get alpha() {
        return this._alpha;
    }
    /** The blendingmode of the texture. */
    private _blendingMode: string;
    set blendingMode(value: string) {
        this.__propertyChanged("blendingMode", value);
        this._blendingMode = value;
    }
    get blendingMode() {
        return this._blendingMode;
    }
    /** The name of the texture. */
    private _name: string;
    set name(value: string) {
        this.__propertyChanged("name", value);
        this._name = value;
    }
    get name() {
        return this._name;
    }
    /** Type of the object for identification. */
    get type() {
        return "IsoTexture";
    }
    set type(value) { }
    __changed: boolean = false;
    constructor(name: string) {
        super();
        this.blendingMode = IsoBlendingModes.NORMAL;
        this.animations = new IsoAnimationManager(this);
        this.setName(name);
        return this;
    }
    /** Sets the name of the texture. */
    setName(name: string): IsoTexture {
        this.name = name;
        return this;
    }
    /** Retruns the texture data. */
    getTextureData(): ITextureData {
        return {
            blendingMode: this.blendingMode,
            alpha: this.alpha
        };
    }
    /** Sets if a texture needs a redraw. */
    changed() {
        this.__changed = true;
    }
    unchanged() {
        this.__changed = false;
    }
}