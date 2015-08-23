///<reference path="IsoTexture.ts" />
class IsoTextureProcessor extends IsoTexture {
    /** The mask of the texture. */
    private _mask: Array<IsoImageTexture>;
    set mask(value: Array<IsoImageTexture>) {
        this.__propertyChanged("mask", value);
        this._mask = value;
    }
    get mask() {
        return this._mask;
    }
    /** All textures of the texture. */
    private _textures: Array<IsoImageTexture|IsoColorTexture>;
    set textures(value: Array<IsoImageTexture|IsoColorTexture>) {
        this.__propertyChanged("textures", value);
        this._textures = value;
    }
    get textures() {
        return this._textures;
    }
    /** The final texture. */
    private _src: IsoImageResource;
    set src(value: IsoImageResource) {
        this.__propertyChanged("src", value);
        this._src = value;
    }
    get src() {
        return this._src;
    }
    /** Type of the object for identification. */
    get type() {
        return "IsoTextureProcessor";
    }
    set type(value) { }
    constructor(name: string) {
        super(name);
        this.mask = new Array();
        this.textures = new Array();
    }
    /** Adds a new mask to the texture. */
    addMask(mask: IsoImageTexture) {
        try {
            if (this.mask === undefined) {
                this.log(new Error("Mask was undefined but should not. I created a new array for you."), IsoLogger.WARN);
            }
            this.mask.push(mask);
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Adds a new textue to the texture. */
    addTexture(texture: IsoColorTexture|IsoImageTexture) {
        try {
            if (this.textures === undefined) {
                this.log(new Error("Textures was undefined but should not. I created a new array for you."), IsoLogger.WARN);
            }
            this.textures.push(texture);
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Removes a mask from the texture. */
    removeMask(mask: IsoImageTexture): IsoTextureProcessor {
        try {
            if (this.mask === undefined) {
                this.log(new Error("Mask was undefined but should not. I created a new array for you."), IsoLogger.WARN);
                this.mask = new Array();
            }
            for (var i = 0; i < this.mask.length; i++) {
                if (this.mask[i] === mask) {
                    this.mask[i] = null;
                    for (var l = 0; l < this.mask.length - 1; l++) {
                        this.mask[l] = this.mask[l + 1];
                    }
                    this.mask.pop();
                    return this;
                }
            }
            this.log(new Error("I could not find the mask, you wanted to remove."), IsoLogger.WARN);
            return this;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Removes a texture from the texture. */
    removeTexture(texture: IsoColorTexture|IsoImageTexture): IsoTextureProcessor {
        try {
            if (this.textures === undefined) {
                this.log(new Error("Textures was undefined but should not. I created a new array for you."), IsoLogger.WARN);
                this.textures = new Array();
            }
            for (var i = 0; i < this.textures.length; i++) {
                if (this.textures[i] === texture) {
                    this.textures[i] = null;
                    for (var l = 0; l < this.textures.length - 1; l++) {
                        this.textures[l] = this.textures[l + 1];
                    }
                    this.textures.pop();
                    return this;
                }
            }
            this.log(new Error("I could not find the texture, you wanted to remove."), IsoLogger.WARN);
            return this;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Proceed the new texture and save the result as the texture source.*/
    render() {
        var maskData: Array<IImageData> = new Array();
        var widthM = 0, heightM = 0, widthT = 0, heightT = 0, width = 0, height = 0;
        var textureData: Array<ITextureData> = new Array();

        for (var i = 0; i < this.mask.length; i++) {
            maskData[i] = this.mask[i].getImageData();
            if (maskData[i].width > widthM) {
                widthM = maskData[i].width;
            }
            if (maskData[i].height > heightM) {
                heightM = maskData[i].height;
            }
        }
        for (var i = 0; i < this.textures.length; i++) {
            textureData[i] = this.textures[i].getTextureData();
            if (textureData[i].imageData.width > widthT) {
                widthT = textureData[i].imageData.width;
            }
            if (textureData[i].imageData.height > heightT) {
                heightT = textureData[i].imageData.height;
            }
        }
        // Render the texture to a new canvas.
        // Render at first the mask, if a mask is given.
        var canvasMask = new IsoCanvas(widthM, heightM);
        canvasMask.load();
        if (maskData.length > 0) {
            for (var i = 0; i < maskData.length; i++) {
                var m = maskData[i];
                canvasMask.context.drawImage(m.image, 0, 0, m.width, m.height);
            }
        }
        // Render the texture if a texture is given.
        var canvasTex = new IsoCanvas(widthT, heightT);
        canvasTex.load();
        if (textureData.length > 0) {
            for (var i = 0; i < textureData.length; i++) {
                var t = textureData[i];
                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    canvasTex.context.globalCompositeOperation = t.blendingMode;
                }
                canvasTex.context.globalAlpha = t.alpha;
                if (t.imageData !== undefined) {
                    canvasTex.context.drawImage(t.imageData.image, 0, t.imageData.width, t.imageData.height);
                }
                if (t.colorData !== undefined) {
                    canvasTex.context.fillStyle = t.colorData.hex;
                    canvasTex.context.fillRect(0, 0, canvasTex.size.width, canvasTex.size.height);
                }
                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    canvasTex.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                }
            }
        }
        // And put it all together.
        if (widthM > 0) {
            width = widthM;
        } else {
            width = widthT;
        }
        if (heightM > 0) {
            height = heightM;
        } else {
            height = heightT;
        }
        var canvas = new IsoCanvas(width, height);
        canvas.load();
        if (maskData.length > 0) {
            canvas.context.drawImage(canvasMask.element, 0, 0, canvasMask.size.width, canvasMask.size.height);
        }
        if (textureData.length > 0) {
            if (maskData.length > 0) {
                canvas.context.globalCompositeOperation = IsoBlendingModes.SOURCE_IN;
            }
            canvas.context.drawImage(canvasTex.element, 0, 0, canvasTex.size.width, canvasTex.size.height);
        }
        this.src = new IsoImageResource(this.name, canvas);
    }
}