class IsoEmitter extends IsoMinimalObject {
    /** The maximum particle count. */
    particleCount: number = 100;
    /** The lifttime of a particle.*/
    lifetime: number = 1000;
    /** Sets how many particles will spreaded.*/
    spreadCount: number = 4;
    oldTime: number = 0;
    /** The ressource for the particles.*/
    ressource: IsoRessource;
    /** A simple seed number.*/
    variance: number = 100;
    /** Includes all the particles.*/
    particles: Array<IsoParticle> = new Array();
    /** The speed of the particles.*/
    particleSpeed: number = 1;
    /** Height of the emitter.*/
    height: number = 1;
    /** Width of the emitter.*/
    width: number = 1;
    /** Sets if the emitter is emitting */
    isEmitting: boolean = undefined;
    /** The random library. */
    rand: MersenneTwister = new MersenneTwister();
    /** Sets the typ of this object.*/
    type: string = "IsoEmitter";
    /** Creates a new particle emiter.*/
    constructor(Engine: IsoMetric, ressource: IsoRessource, config?: any) {
        super(Engine);
        this.ressource = ressource;
    }

    addParticle(particle: IsoParticle) {
        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i].life < 0) {
                this.particles[i] = null;
                this.particles[i] = particle;
                return;
            }
        }
        this.particles.push(particle);
    }

    update() {
        if (this.isEmitting) {
            this.emit();
        }
        this.updatePosition();
        var a = this.Engine.animation.getActive(this);
        for (var i = 0; i < this.addAnimation.length; i++) {
            if (a[i] !== undefined)
                a[i].update();
        }
    }

    emit() {
        if (this.isEmitting === undefined) {
            this.isEmitting = true;
        }
        if (this.particles.length - 1 < this.particleCount) {
            var count = this.spreadCount;
            if (this.particles.length - 1 + this.spreadCount > this.particleCount) {
                count = this.particleCount - this.particles.length - 1;
            }
            for (var i = 0; i < count; i++) {
                this.addParticle(new IsoParticle(this.Engine, this.ressource, new IsoPoint(this.position.x, this.position.y), this.lifetime, this.random((this.rotation - this.variance), (this.rotation + this.variance)), this.scale, this.particleSpeed));
            }
        }
    }

    getLifetime(): number {
        return this.lifetime;
    }

    getParticleCount(): number {
        return this.particleCount;
    }

    getParticleSpeed(): number {
        return this.particleSpeed;
    }

    getVariance(): number {
        return this.variance;
    }

    setLifetime(lifetime: number): IsoEmitter {
        this.lifetime = lifetime;
        return this;
    }

    setParticleCount(count: number): IsoEmitter {
        this.particleCount = count;
        return this;
    }

    setParticleSpeed(speed: number): IsoEmitter {
        this.particleSpeed = speed;
        return this;
    }

    setVariance(variance: number): IsoEmitter {
        this.variance = variance;
        return this;
    }

    setSpreadCount(count: number): IsoEmitter {
        this.spreadCount = count;
        return this;
    }

    freeParticle(particle: IsoParticle): boolean {
        var f = false;
        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i] === particle) {
                f = true;
            }
            if (f === true) {
                this.particles[i - 1] = this.particles[i];
            }
        }
        this.particles.pop();
        return f;
    }

    getRenderDetails() {
        var fx = this.anchor.x / this.ressource.ressource.width * this.scale.factorX,
            fy = this.anchor.y / this.ressource.ressource.height * this.scale.factorY;
        return {
            position: this.getAbsolutePosition(),
            tileSize: {
                width: this.ressource.ressource.width,
                height: this.ressource.ressource.height
            },
            renderSize: { width: 0, height: 0 },
            anchor: new IsoPoint((this.position.x + (this.ressource.ressource.image.width * this.zoomLevel * fx * this.scale.factorX)), (this.position.y + (this.ressource.ressource.image.height * this.zoomLevel * fy * this.scale.factorY))),
            image: this.ressource.get(),
            offset: new IsoPoint(0, 0),
            zoomLevel: this.zoomLevel,
            type: this.type
        };
    }

    random(min: number, max: number) {
        this.rand = new MersenneTwister();
        return this.rand.genrand_real1() * (max - min) + min;
    }
}