///<reference path="IsoBaseEntity.ts" />
class IsoEntityGroup extends IsoBaseEntity {
    /** Includes all entities of a group. */
    private _entities: Array<IsoBaseEntity> = new Array();
    set entities(value: Array<IsoBaseEntity>) {
        this.__propertyChanged("entities", value);
        this._entities = value;
    }
    get entities() {
        return this._entities;
    }
    /** The type of the object for identification. */
    get type() {
        return "IsoEntityGroup";
    }
    set type(value) { }
    constructor(name: string) {
        super(name);
        this.position.watch("x", () => this.updateEntitiesPositionX);
        this.position.watch("y", () => this.updateEntitiesPositionY);
    }
    /** Adds a new entity to the group. */
    add(entity: IsoBaseEntity) {
        try {
            this.entities.push(entity);
        } catch (e) {
            if (this.entities === undefined) {
                this.entities = new Array(entity);
                this.log(e, IsoLogger.WARN);
                this.log("Created a new array for you.", IsoLogger.INFO);
            } else {
                throw new Error("There is an big fat unknown error.");
            }
        } finally {
            this.log(new Error("There is an big fat unknown error."), IsoLogger.ERROR);
        }
    }
    /** Removes a entity to the group. */
    remove(entity): boolean {
        try {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i] === entity) {
                    this.entities[i] = null;
                    for (var l = i + 1; l < this.entities.length - 1; l++) {
                        this.entities[l - 1] = this.entities[l];
                    }
                    this.entities.pop();
                    return true;
                }
            }
        } catch (e) {
            if (this.entities === undefined) {
                this.entities = new Array();
            }
            this.log("Can not remove an entity, when entities is undefined. I created an new empty array.", IsoLogger.WARN);
        } finally {
            this.log(new Error("There is a real big fat unknown error."), IsoLogger.ERROR);
        }
        return false;
    }
    /** Updates the entity group. */
    update() {
        try {
            this.updatePosition();
            this.sort();
            this.animations.update();
            this.physics.updateEntity();
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Updates the position on the x-axis of all including entities, when the position changed. */
    updateEntitiesPositionX(value, oldValue) {
        try {
            var d = value - oldValue;
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].position.add(new IsoVector2D(d, 0));
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Updates the position on the y-axis of all including entities, when the position changed. */
    updateEntitiesPositionY(value, oldValue) {
        try {
            var d = value - oldValue;
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].position.add(new IsoVector2D(0, d));
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Sorts the entities by there indizies. */
    sort() {
        this.entities.sort(_sort);
        function _sort(entityA: IsoBaseEntity, entityB: IsoBaseEntity) {
            if (entityA.index > entityB.index) {
                return 1;
            } else if (entityA.index < entityB.index) {
                return -1;
            } else {
                return 0;
            }
        }
    }
}