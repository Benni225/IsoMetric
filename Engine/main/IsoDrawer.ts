///<reference path="../core/IsoObject.ts" />
class IsoDrawer extends IsoObject {
    Engine: IsoMetric;
    constructor() {
        super();
        this.Engine = IsoMetric.self;
        this.log("Initialized the drawer.", IsoLogger.INFO);
    }
    /** Updates the whole scene. */
    update(layers: IsoLayerManager) {
        this.Engine.canvas.clear();
        try {
            layers.update();
            for (var i = 0; i < layers.layers.length; i++) {
                var layer = layers.layers[i];
                if (!layer.isHidden()) {
                    this.prepareEntities(layer.getAll());
                }
            }
            this.Engine.endLoop();
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
            if (renderData.maskData !== null) {
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
            this.draw(entity, renderData);
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }

    draw(entity: IsoBaseEntity, renderData: IRenderData) {
        try {
            var image: IsoCanvas = entity.chache.cache(renderData);
            this.translate(
                new IsoPoint(
                    renderData.position.x,
                    renderData.position.y
                )
            );
            this.rotate(renderData.rotation);
            this.resetTranslation(
                new IsoPoint(
                    renderData.position.x,
                    renderData.position.y
                    )
                );
            if (entity instanceof IsoEmitter) {
                this.drawEmitter(image, entity);
            } else {
                this.drawImage(image, renderData);
            }
            this.Engine.canvas.context.setTransform(1, 0, 0, 1, 0, 0);
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }

    drawEmitter(image: IsoCanvas, entity: IsoEmitter) {
        var data = entity.getRenderData();
        if (entity.blendingMode !== IsoBlendingModes.NORMAL) {
            this.Engine.canvas.context.globalCompositeOperation = entity.blendingMode;
        }
        for (var i = 0; i < entity.particles.length; i++) {
            entity.particles[i].animations.update();
            entity.particles[i].update();
            var renderData = entity.particles[i].getRenderData();
            this.Engine.canvas.context.globalAlpha = renderData.alpha;
            this.Engine.canvas.context.drawImage(image.get(), 0, 0, Math.floor(data.size.width), Math.floor(data.size.height), renderData.position.x - (renderData.size.width * renderData.anchor.x), renderData.position.y - (renderData.size.height * renderData.anchor.y), renderData.size.width, renderData.size.height);
        }
        this.Engine.canvas.context.globalAlpha = 1;
        this.Engine.canvas.context.globalCompositeOperation = IsoBlendingModes.NORMAL;
    }

    drawImage(image: IsoCanvas, renderData: IRenderData) {
        this.Engine.canvas.context.drawImage(image.get(), 0, 0, Math.floor(renderData.size.width), Math.floor(renderData.size.height), renderData.position.x - (renderData.size.width * renderData.anchor.x), renderData.position.y - (renderData.size.height * renderData.anchor.y), renderData.size.width, renderData.size.height);
    }

    /** Sets the anchor of an object. */
    private translate(anchor: IsoPoint) {
        this.Engine.canvas.context.translate(anchor.x, anchor.y);
    }
    /** Reset the anchor of an object. */
    private resetTranslation(anchor: IsoPoint) {
        this.Engine.canvas.context.translate(-anchor.x, -anchor.y);
    }
    /** Rotates an object. */
    private rotate(rotation: number) {
        this.Engine.canvas.context.rotate(rotation * Math.PI / 180);
    }
    
}