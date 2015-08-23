///<reference path="../core/IsoObject.ts" />
class IsoBaseEntity extends IsoObject {
    /** The physics. */
    physics: IsoPhysics;
    /** Name of the entity. */
    private _name: string = "";
    set name(value: string) {
        this.__propertyChanged("name", value);
        this._name = value;
    }
    get name() {
        return this._name;
    }
    /** The friction of the entity. */
    private _friction: number = 1;
    set friction(value: number) {
        this.__propertyChanged("friction", value);
        this._friction = value;
    }
    get friction() {
        return this._friction;
    }
    /** The mass of the entity. */
    private _mass: number = 0;
    set mass(value: number) {
        this.__propertyChanged("mass", value);
        this._mass = value;
    }
    get mass() {
        return this._mass;
    }
    /** The acceleration of the entity. */
    acceleration: IsoVector2D = new IsoVector2D(0, 0);
    /** The velocity of the entity. */
    velocity: IsoVector2D = new IsoVector2D(0, 0);
    /** The position of the entity. */
    position: IsoVector2D = new IsoVector2D(0, 0);
    /** The rotation in degrees of the entity. */
    private _rotation = 0;
    set rotation(value: number) {
        this.__propertyChanged("rotation", value);
        this._rotation = value;
    }
    get rotation() {
        return this._rotation;
    }
    /** The size of the entity. */
    size: IsoSize = new IsoSize(0, 0);
    /** The anchor of the entity. */
    anchor: IsoPoint = new IsoPoint(0, 0);
    /** Includes all animations of the entity. */
    animations: IsoAnimationManager = new IsoAnimationManager(this);
    /** Indicates if an entity could be deleted.*/
    private _isFree: boolean = false;
    set isFree(value: boolean) {
        this.__propertyChanged("isFree", value);
        this._isFree = value;
    }
    get isFree() {
        return this._isFree;
    }
    /** Hide or show an entity. */
    private _hidden: boolean = false;
    set hidden(value: boolean) {
        this.__propertyChanged("hidden", value);
        this._hidden = value;
    }
    get hidden() {
        return this._hidden;
    }
    /** The type of the object for identification. */
    get type() {
        return "IsoBaseEntity";
    }
    set type(value) { }    
    /** The drawing index of the entity. */
    private _index: number = 0;
    set index(value: number) {
        this.__propertyChanged("index", value);
    }
    get index() {
        return this._index;
    }

    chache: IsoTextureCache = new IsoTextureCache();
    /** Creates a new entity by its name. */
    constructor(name: string) {
        super();
        this.setName(name);
        this.physics = new IsoPhysics();
        this.setIndex(0);
        return this;
    }
    /** Sets the name of the entity. */
    setName(name: string): IsoBaseEntity {
        this.name = name;
        return this;
    }
    /** Gets the name of the entity. */
    getName(): string {
        return this.name;
    }
    /** Sets the rotation of the entity. */
    setRotation(rotation: number) {
        this.rotation = rotation;
    }
    /** Gets the rotation of the entity. */
    getRotation(): number {
        return this.rotation;
    }
    /** Sets the friction of the entity. */
    setFriction(friction: number): IsoBaseEntity {
        this.friction = friction;
        return this;
    }
    /** Gets the friction of the entity. */
    getFriction(): number {
        return this.friction;
    }
    /** Updates the position of the entity. */
    updatePosition(): IsoBaseEntity {
        this.acceleration.x *= this.friction;
        this.acceleration.y *= this.friction;
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        return this;
    }
    /** Updates the entity. */
    update() {
        this.updatePosition();
        this.animations.update();
        this.physics.updateEntity();
    }
    /** Free the memory. */
    free() {
        this.hide();
        this.isFree = true;
    }
    /** Hides the entity. */
    hide(): IsoBaseEntity {
        this.hidden = true;
        return this;
    }
    /** Shows the entity. */
    show(): IsoBaseEntity {
        this.hidden = false;
        return this;
    }
    /** Checks if the entity is hidden. */
    isHidden(): boolean {
        return this.hidden;
    }
    /** Sets the index of the entity. */
    setIndex(index: number): IsoBaseEntity {
        this.index = index;
        return this;
    }
    /** returns the index of the entity. */
    getIndex(): number {
        return this.index;
    }
    /** Returns the render data. */
    getRenderData(): IRenderData {
        try {
            return {
                position: this.position,
                anchor: this.anchor,
                rotation: this.rotation,
                size: this.size
            };
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Checks if this entity intersects with another entity. */
    isBoxIntersection(entityB: IsoBaseEntity): boolean {
        var dataA: IRenderData = this.getRenderData();
        var dataB: IRenderData = entityB.getRenderData();
        if (
            (
                dataA.position.x < dataB.position.x && dataA.position.x + dataA.size.width > dataB.position.x ||
                dataA.position.x < dataB.position.x + dataB.size.width && dataA.position.x + dataA.size.width > dataB.position.x) &&
                (dataA.position.y < dataB.position.y + dataB.size.height && dataA.position.y + dataA.size.height > dataB.position.y)
            ) {
            return true;
        } else {
            return false;
        }
    }
}