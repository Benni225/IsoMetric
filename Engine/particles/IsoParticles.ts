///<reference path="../entities/IsoBaseEntity.ts" />
class IsoParticle extends IsoBaseEntity {
    lifetime: number;
    scale: IsoScale = new IsoScale(1, 1);
    startLife: number;
    oldTime: number;
    currentTime: number;
    effectScale: boolean;
    effectAlpha: boolean;
    alpha: number;
    constructor(velocity: IsoVector2D = new IsoVector2D(0, 0), position: IsoVector2D = new IsoVector2D(0, 0), scale?: IsoScale, size?: IsoSize, alpha: number = 1, lifetime: number = 1000, effectScale: boolean = false, effectAlpha: boolean = false) {
        super("particle");
        this.position = position;
        this.velocity = velocity;

        this.lifetime = lifetime;
        this.size = size;
        this.startLife = new Date().getTime();
        this.effectAlpha = effectAlpha;
        this.effectScale = effectScale;
        if (effectScale === true) {
            this.animations.add("scaleX", {
                property: "scale.fx",
                startValue: 0.01,
                endValue: scale.fx,
                duration: lifetime
            }).play();
            this.animations.add("scaleY", {
                property: "scale.fy",
                startValue: 0.01,
                endValue: scale.fy,
                duration: lifetime
            }).play();
        } else {
            this.size = size;
        }

        if (effectAlpha === true) {
            this.alpha = 1;
            this.animations.add("alpha", {
                property: "alpha",
                startValue: 1,
                endValue: 0,
                duration: lifetime
            }).play();
        } else {
            this.alpha = alpha;
        }
    }

    updatePosition(): IsoParticle {
        this.position.add(this.velocity);
        return this;
    }

    update() {
        this.currentTime = new Date().getTime();
        this.updatePosition();
        this.currentTime = new Date().getTime();
        if (this.currentTime - this.startLife > this.lifetime) {
            this.free();
        }
        // After all.
        this.oldTime = this.currentTime;
    }

    getRenderData(): IRenderData {
        return {
            position: this.position,
            alpha: this.alpha,
            size: new IsoSize(this.size.width * this.scale.fx, this.size.height * this.scale.fy),
            rotation: 0,
            anchor: new IsoPoint(0, 0)
        }
    }
}