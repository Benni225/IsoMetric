class IsoParticle extends IsoMinimalObject {
    /** number in milliseconds */
    lifetimeStart: number = 0;
    lifetimeEnd: number = 0;
    /** The acceleration. */
    ressource: IsoRessource;
    /** The velocity as an vector. */
    velocity: IsoVector2D = new IsoVector2D(0, 0);
    /** The position of the particle. */
    position: IsoVector2D = new IsoVector2D(0, 0);
    anchor: IsoPoint = new IsoPoint(0, 0);
    /** Create a new particle. */
    constructor(Engine: IsoMetric, ressource: IsoRessource, position: IsoVector2D, velocity: IsoVector2D) {
        super(Engine);
        this.ressource = ressource;
        this.velocity = velocity;
        this.position = position;
    }
    /** Moves the particle. */
    move(): IsoParticle {
        this.position.add(this.velocity);
        return this;
    }

    getRenderDetails(){

    }

    updatePosition() {
    }
}