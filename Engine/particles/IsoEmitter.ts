///<reference path="../entities/IsoSprite.ts" />
class IsoEmitter extends IsoSprite {
    speed: IsoVector2D = new IsoVector2D(1, 0);
    alpha: number;
    blendingMode: string = IsoBlendingModes.NORMAL;
    /** An array including all particles. */
    particles: Array<IsoParticle> = new Array();
    /** The possible angle where particles spreaded to. */
    spread: number = Math.PI / 50;
    /** The magnitude of the emitter's velocity. Updated automaticly. */
    magnitude: number;
    /** The maximal particle count. */
    maxParticles: number = 100;
    /** Indecates if the scale of the particles effected during the lifetime. */
    effectScale: boolean = true;
    /** Indecates if the alpha of the particles effected during the lifetime. */
    effectAlpha: boolean = true;
    /** The liftime of a particle. Notice, that the lifetime is also effected by the randomseed */
    lifetime: number = 1000;
    /** The emissionrate of the emitter. */
    emissionRate: number = 10;
    /** Indecates wether the emitter emits or not. */
    isEmitting: boolean = false;
    /** Creates a new particle emitter. */
    constructor(name: string, spread: number = Math.PI / 32 ) {
        super(name);
        this.spread = spread;
    }

    /** Adds a new particles to the emitter. */
    add(particle: IsoParticle): IsoEmitter {
        try {
            if (this.particles === undefined) {
                this.log("The property particles of IsoEmitter should not be undefined. I created a new Array for you.", IsoLogger.WARN);
                this.particles = new Array();
            }
            for (var i = 0; i < this.particles.length; i++) {
                
                if (this.particles[i].isFree === true) {
                    this.particles[i] = null;
                    this.particles[i] = particle;
                    return this;
                }
            }
            if (this.particles.length < this.maxParticles) {
                this.particles.push(particle);
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Sets the spread angle of the emitter. */
    setSpread(spread: number): IsoEmitter {
        this.spread = spread / Math.PI;
        return this;
    }
    /** Gets the spread angle of the emitter. */
    getSpread(): number {
        return this.spread;
    }
    /** Updates the emitter. */
    update() {
        this.updatePosition();
        this.emitParticles();
    }
    /** Emits a particle. */
    emitParticle() {
        var angle = this.speed.getAngle() + (Math.random() * (this.spread - (-2 * this.spread)) + (-2*this.spread));
        var magnitude = this.speed.getMagnitude();
        var render = this.getRenderData();
        var position = new IsoVector2D(this.position.x, this.position.y);
        var size = new IsoSize(render.size.width, render.size.height);
        var scale = new IsoScale(this.scale.fx, this.scale.fy);
        var v = new IsoVector2D(0, 0);
        var renderData = this.getRenderData();
        v.createFromAngle(angle, magnitude);
        this.add(new IsoParticle(v, position, scale, size, this.alpha, this.lifetime, this.effectScale, this.effectAlpha));
    }
    /** Sets the emission rate. */
    setEmissionRate(rate: number): IsoEmitter {
        this.emissionRate = rate;
        return this;
    }
    /** Returns the emission rate. */
    getEmissionRate(): number {
        return this.emissionRate;
    }
    /** Start emitting. */
    emit(): IsoEmitter {
        this.isEmitting = true;
        return this;
    }
    /** Stops emitting. */
    stopEmitting(): IsoEmitter {
        this.isEmitting = false;
        return this;
    }

    /** Emits particles */
    emitParticles() {
        if (this.isEmitting === true) {
            for (var i = 0; i < this.emissionRate; i++) {
                this.emitParticle();
            }
        }
    }

}
