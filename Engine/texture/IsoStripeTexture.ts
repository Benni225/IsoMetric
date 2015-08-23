///<reference path="IsoTexture.ts" />
class IsoStripeTexture extends IsoImageTexture {
    /** The current tile of the stripe. */
    private _tile: number;
    set tile(value: number) {
        this.__propertyChanged("tile", value);
        this._tile = value;
    }
    get tile() {
        return this._tile;
    }
    /** The tile to start with. */
    _tileOffset: number;
    set tileOffset(value: number) {
        this.__propertyChanged("tileOffset", value);
        this._tileOffset = value;
    }
    get tileOffset() {
        return this._tileOffset;
    }
    /** The tilesize. */
    _tileSize: IsoSize = new IsoSize(0, 0);
    set tileSize(value: IsoSize) {
        this.__propertyChanged("tileSize", value);
        this._tileSize = value;
    }
    get tileSize() {
        return this._tileSize;
    }
    /** Type of the object for identification. */
    get type() {
        return "IsoStripeTexture";
    }
    set type(value) { }
    constructor(name: string, src: IsoImageResource, tileSize: IsoSize) {
        super(name, src);
        this.tileSize = tileSize;
        this.tile = 1;
    }
    /** Sets the image of the texture. */
    set(src: IsoImageResource): IsoStripeTexture {
        this.src = src;
        return this;
    }
    /** Returns the current tile. */
    getTile(): number {
        return this.tile;
    }
    /** Returns the tile offset */
    getTileOffset(): number {
        return this.tileOffset;
    }
    /** Returns the absolute tile, which means the tile number plus the tile offset. */
    getAbsoluteTile(): number {
        return this.tileOffset + this.tile;
    }
    /** Resets the image of the texture. */
    reset(): IsoStripeTexture {
        this.src = undefined;
        return this;
    }
    /** Retruns the imagedata. */
    getImageData(): IImageData {
        var ox = (this.tile % (this.src.source.size.width / this.tileSize.width)) * this.tileSize.width;
        var oy = Math.floor(this.tile / this.src.source.size.width / this.tileSize.width) * this.tileSize.height;
        return {
            x: ox,
            y: oy,
            width: this.tileSize.width,
            height: this.tileSize.height,
            image: this.src.get().get()
        };
    }
    /** Returns the texture data. */
    getTextureData(): ITextureData {
        return {
            imageData: this.getImageData(),
            blendingMode: this.blendingMode,
            alpha: this.alpha
        }
    }
}