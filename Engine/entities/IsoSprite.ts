///<reference path="IsoBaseEntity.ts" />
class IsoSprite extends IsoBaseEntity {
    /** The texture of the box. */
    private _texture: Array<IsoVideoTexture|IsoColorTexture|IsoImageTexture|IsoStripeTexture> = new Array();
    set texture(value: Array<IsoVideoTexture|IsoColorTexture|IsoImageTexture|IsoStripeTexture>) {
        this.__propertyChanged("texture", value);
        this._texture = value;
    }
    get texture() {
        return this._texture;
    }
    /** The maks of the entity. */
    private _mask: IsoImageTexture | IsoStripeTexture;
    set mask(value: IsoImageTexture | IsoStripeTexture) {
        this.__propertyChanged("texture", value);
        this._mask = value;
    }
    get mask() {
        return this._mask;
    }
    /** The scale of the texture. */
    scale: IsoScale = new IsoScale(1, 1);
    /** Type of the object for identification. */
    get type() {
        return "IsoSprite";
    }
    set type(value) { }
    constructor(name: string) {
        super(name);
        this.texture = new Array();
        this.animations = new IsoAnimationManager(this);
    }
    /** Gets the absolute width dimension. */
    getAbsoluteWidth(): number {
        return this.size.width * this.scale.fx;
    }
    /** Gets the absolute height dimension. */
    getAbsoluteHeight(): number {
        return this.size.height * this.scale.fy;
    }
    /** Add a texture to the box. */
    addTexture(texture: IsoImageTexture|IsoColorTexture|IsoVideoTexture|IsoStripeTexture): IsoSprite {
        try {
            this.texture.push(texture);
        } catch (e) {
            if (this.texture === undefined) {
                this.texture = new Array(texture);
                this.log("Can not add a texture to undefined. I created a new array for you.", IsoLogger.WARN);
            }
        }
        return this;
    }
    /** Get a texture by its name. */
    getTexture(name: string): IsoImageTexture|IsoColorTexture|IsoVideoTexture|IsoStripeTexture {
        try {
            if (this.texture === undefined) {
                this.log("The textures are undefined. I created a new array for you.", IsoLogger.WARN);
            }
            for (var i = 0; i < this.texture.length; i++) {
                if (this.texture[i].name === name) {
                    return this.texture[i];
                }
            }
            this.log("I am sorry. The texture '" + name + "' can not be found.", IsoLogger.WARN);
            return undefined;
        } catch (e) {
            this.texture = new Array();
            this.log(e, IsoLogger.WARN);
        }
    }
    /** Sets the mask of the sprite. */
    setMask(mask: IsoImageTexture|IsoStripeTexture): IsoSprite {
        this.mask = mask;
        return this;
    }
    /** Gets the mask of the sprite. */
    getMask(): IsoImageTexture|IsoStripeTexture {
        return this.mask;
    }
    /** Removes a texture by its name. */
    removeTexture(name: string): IsoSprite {
        try {
            if (this.texture === undefined) {
                this.log("The textures are undefined. I created a new array for you.", IsoLogger.WARN);
            }
            for (var i = 0; i < this.texture.length; i++) {
                if (this.texture[i].name === name) {
                    for (var l = i; l < this.texture.length; l++) {
                        this.texture[l] = this.texture[l + 1];
                    }
                    this.texture.pop();
                    return this;
                }
            }
        } catch (e) {
            this.texture = new Array();
            this.log(e, IsoLogger.WARN);
        }
    }

    /** Returns the render data. */
    getRenderData(): IRenderData {
        try {
            var maskData = null;
            if (this.texture === undefined || this.texture.length === 0) {
                this.log("Can not return render data, because nothing to return. Texture is undefined or null.", IsoLogger.WARN);
            } else {
                if (this.getMask() !== undefined) {
                    maskData = this.getMask().getTextureData();
                }
                var textureData = new Array();
                for (var i = 0; i < this.texture.length; i++) {
                    textureData.push(this.texture[i].getTextureData());
                }
                return {
                    maskData: maskData,
                    textureData: textureData,
                    position: this.position,
                    anchor: this.anchor,
                    rotation: this.rotation,
                    size: new IsoSize(this.size.width * this.scale.fx, this.size.height * this.scale.fy)
                };
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
}