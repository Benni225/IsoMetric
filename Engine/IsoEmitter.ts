class IsoEmitter extends IsoMinimalObject {
    /** The maximum particle count. */
    particleCount: number = 100;
    /** The lifttime of a particle.*/
    lifetime: number = 1000;
    /** Sets how many particles will spreaded.*/
    spreadCount: number = 4;
    /** The ressource for the particles.*/
    ressource: IsoRessource;
    /** A simple seed number.*/
    variance: number = 100;
    /** Includes all the particles.*/
    particles: Array<IsoParticle>;
    /** The speed of the particles.*/
    particleSpeed: number = 1;
    /** Height of the emitter.*/
    height: number = 1;
    /** Width of the emitter.*/
    width: number = 1;
    /** Sets the typ of this object.*/
    type: string = "IsoEmitter";
    /** Creates a new particle emiter.*/
    constructor(Engine: IsoMetric, ressource: IsoRessource) {
        super(Engine);
        this.ressource = ressource;
    }

    update() {

    }

    emit() {
        var vector2d = new IsoVector2D();
        vector2d.createFromAngle(this.rotation, this.height);

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
}