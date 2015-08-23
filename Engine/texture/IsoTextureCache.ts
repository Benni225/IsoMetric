/// <reference path="../core/IsoObject" />
class IsoTextureCache extends IsoObject {
    // The renderdata to cache
    _renderData: IRenderData;
    set renderData(value: IRenderData) {
        this.__propertyChanged("renderData", value);
        this._renderData = value;
    }
    get renderData() {
        return this._renderData;
    }
    set type(value) { }
    get type() {
        return "IsoTextureCache";
    }
    canvas: IsoCanvas;

    needRedraw(renderData: IRenderData): boolean {
        if (this.renderData === undefined) {
            this.renderData = renderData;
            return true;
        } else {
            var playVideo = false;
            for (var i = 0; i < renderData.textureData.length; i++) {
                if (renderData.textureData[i].imageData.image["paused"] !== undefined && renderData.textureData[i].imageData.image["paused"] === false) {
                    playVideo = true;
                }
            }
            if (JSON.stringify(renderData.maskData) != JSON.stringify(this.renderData.maskData) || JSON.stringify(renderData.textureData) != JSON.stringify(this.renderData.textureData) || playVideo === true) {
                return true;
            } else {
                return false;
            }
        }
    }

    cache(renderData: IRenderData): IsoCanvas {
        if (this.needRedraw(renderData)) {
            this.canvas = null;
            this.canvas = this.render(renderData);
            this.renderData = renderData;
        }
        return this.canvas;
    }

    render(renderData: IRenderData): IsoCanvas {
        try {
            var canvas = new IsoCanvas(renderData.size.width, renderData.size.height, false, false);
            canvas.load();
            canvas.clear();
            for (var i = 0; i < renderData.textureData.length; i++) {
                var t = renderData.textureData[i];
                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    canvas.context.globalCompositeOperation = t.blendingMode;
                }
                canvas.context.globalAlpha = t.alpha;
                if (t.imageData !== undefined) {
                    canvas.context.drawImage(t.imageData.image, t.imageData.x, t.imageData.y, t.imageData.width, t.imageData.height, 0, 0, renderData.size.width, renderData.size.height);
                } else if (t.colorData !== undefined) {
                    canvas.context.fillStyle = t.colorData.hex;
                    canvas.context.fillRect(0, 0, renderData.size.width, renderData.size.height);
                }

                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    canvas.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                }
            }
            return canvas;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }

    getImageData(): ImageData {
        try {
            return this.canvas.context.getImageData(0, 0, this.canvas.element.width, this.canvas.element.height);
        } catch (e) {
            this.log("Can not return the image data :(. Maybe the script runs locally?!", IsoLogger.WARN);
            return null;
        }
    }
}