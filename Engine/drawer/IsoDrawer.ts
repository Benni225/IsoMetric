///<reference path="../core/IsoObject.ts" />
class IsoDrawer extends IsoObject {
    Engine: IsoMetric;
    constructor(Engine: IsoMetric) {
        super();
        this.Engine = Engine;
    }
    /** Updates the whole scene. */
    update(layers: IsoLayerManager) {
        try {
            layers.update();
            for (var i = 0; i < layers.layers.length; i++) {
                var layer = layers.layers[i];
                if (!layer.isHidden()) {
                    this.prepareEntities(layer.getAll());
                }
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Prepare a number of entities. */
    prepareEntities(entities: Array<IsoBaseEntity|IsoEntityGroup>) {
        try {
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                if (!entity.isHidden()) {
                    this.drawEntity(entity);
                }
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Draws a single entity. */
    drawEntity(entity: IsoBaseEntity|IsoEntityGroup) {
        try {
            var renderData = entity.getRenderData();
            if (renderData.maskData !== undefined) {
                var texture = new IsoTextureProcessor(entity.name);
                texture.addMask(new IsoImageTexture(entity.name, new IsoImageResource(entity.name, renderData.maskData.getTextureData().imageData.image)));
                for (var i = 0; i < renderData.textureData.length; i++) {
                    if (renderData.textureData[i].imageData !== undefined) {
                        var _i = new IsoImage(entity.name);
                        _i.setElement(renderData.textureData[i].imageData.image);
                        texture.addTexture(new IsoImageTexture(entity.name, new IsoImageResource(entity.name, _i)));
                    } else if (renderData.textureData[i].colorData !== undefined) {
                        var _c = new IsoColor(renderData.textureData[i].colorData);
                        texture.addTexture(new IsoColorTexture(entity.name, _c));
                    }
                }
                renderData.textureData = new Array(texture.getTextureData());
            }
            this.draw(renderData);
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }

    draw(renderData: IRenderData) {
        try {
            for (var i = 0; i < renderData.textureData.length; i++) {
                var t = renderData.textureData[i];
                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    this.Engine.canvas.context.globalCompositeOperation = t.blendingMode;
                }
                this.Engine.canvas.context.globalAlpha = t.alpha;
                if (t.imageData !== undefined) {
                    this.Engine.canvas.context.drawImage(t.imageData.image, t.imageData.x, t.imageData.y, t.imageData.width, t.imageData.height, renderData.position.x, renderData.position.y, renderData.size.width, renderData.size.height);
                } else if (t.colorData !== undefined) {
                    this.Engine.canvas.context.fillStyle = t.colorData.hex;
                    this.Engine.canvas.context.fillRect(renderData.position.x, renderData.position.y, renderData.size.width, renderData.size.height);
                }

                if (t.blendingMode !== IsoBlendingModes.NORMAL) {
                    this.Engine.canvas.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
                }
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    
}