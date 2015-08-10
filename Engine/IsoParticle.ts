"use strict";

class IsoParticle {
    position: IsoVector2D = new IsoVector2D();
    life: number = 0;
    originalLife: number = 0;
    velocity: IsoVector2D = new IsoVector2D();
    color: IsoColor = { red: 0, green: 0, blue: 0 };
    Engine: IsoMetric;
    alpha: number = 1;
    scale: IsoScale;
    originalScale: IsoScale;
    rotation: number;
    renderSize = { width: 0, height: 0 };
    blendingMode: string = IsoBlendingModes.NORMAL;
    ressource: IsoRessource;
    constructor(Engine: IsoMetric, ressource: IsoRessource, position: IsoPoint, life: number, angle: number, scale: IsoScale, speed: number) {
        this.Engine = Engine;
        this.position.set(position.x, position.y);
        this.originalLife = this.life = life;
        var angleRadians = angle * Math.PI / 180;
        this.velocity.set(speed * Math.cos(angleRadians), -speed * Math.sin(angleRadians));
        this.originalScale = this.scale = scale;
        this.alpha = 1;
        this.ressource = ressource;
    }

    update(dt: number) {
        this.life -= dt;
        if (this.life > 0) {
            var ageRatio = this.life / this.originalLife;
            this.renderSize.width = (this.ressource.ressource.width - (this.ressource.ressource.width * ageRatio)) * this.scale.factorY;
            this.renderSize.height = (this.ressource.ressource.height - (this.ressource.ressource.height * ageRatio)) * this.scale.factorY;
            this.alpha = ageRatio;
            this.position.x += this.velocity.x * dt;
            this.position.y += this.velocity.y * dt;
        }
    }

    getRenderDetails(): IIsoRenderDetails {
        return {
            position: new IsoVector2D(this.position.x, this.position.y),
            image: this.ressource.get(),
            tileSize: {
                width: this.ressource.ressource.getWidth(), height: this.ressource.ressource.getHeight()
            },
            alpha: this.alpha,
            renderSize: this.renderSize,
            offset: new IsoPoint(0, 0),
            type: "IsoParticle",
            zoomLevel: 0,
            anchor: new IsoPoint(0.5, 0.5)
        }
    }
}