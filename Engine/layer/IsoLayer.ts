///<reference path="../core/IsoObject.ts" />
class IsoLayer extends IsoObject {
    private _name: string = "";
    set name(value: string) {
        this.__propertyChanged("name", value);
        this._name = value;
    }
    get name() {
        return this._name;
    }
    private _entities: Array<IsoEntityGroup|IsoBaseEntity> = new Array();
    set entities(value: Array<IsoEntityGroup|IsoBaseEntity>) {
        this.__propertyChanged("entities", value);
        this._entities = value;
    }
    get entities() {
        return this._entities;
    }
    /** Indicates if the layer drawn or not. */
    _hidden: boolean = false;
    set hidden(value: boolean) {
        this.__propertyChanged("hidden", value);
        this._hidden = value;
    }
    get hidden() {
        return this._hidden;
    }
    /** Indicates if the layer should deleted or not. */
    private _isFree: boolean = false;
    set isFree(value: boolean) {
        this.__propertyChanged("isFree", value);
        this._isFree = value;
    }
    get isFree() {
        return this._isFree;
    }
    /** The index of the layer. */
    private _index: number = 0;
    set index(value: number) {
        this.__propertyChanged("index", value);
        this._index = value;
    }
    get index() {
        return this._index;
    }
    /** Type of the object for identification. */
    get type() {
        return "IsoLayer";
    }
    set type(value) { }
    constructor(name: string) {
        super();
        this.setName(name);
        this.hidden = false;
        this.isFree = false;
        this.watch("entities", () => this.sort());
    }
    /** Adds a new entity to the layer. */
    add(entity: IsoBaseEntity|IsoEntityGroup): IsoLayer {
        try {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].isFree) {
                    this.entities[i] = null;
                    this.entities[i] = entity;
                    return this;
                }
            }
            this.entities.push(entity);
            return this;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Get an entity by its name. */
    get(name: string): IsoBaseEntity|IsoEntityGroup {
        try {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].name === name) {
                    return this.entities[i];
                }
            }
            return undefined;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Sets the name of the layer. */
    setName(name: string): IsoLayer {
        this.name = name;
        return this;
    }
    /** Updates the layer. */
    update(): IsoLayer {
        try {
            if (this.entities === undefined || this.entities.length === 0) {
                this.log("Nothing to do, because there are no entities.", IsoLogger.WARN);
            } else {
                for (var i = 0; i < this.entities.length; i++) {
                    this.entities[i].update();
                }
            }
            return this;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Get all entities of the layer. */
    getAll(): Array<IsoBaseEntity|IsoEntityGroup> {
        return this.entities;
    }
    /** Deletes the layer from the memory. */
    free() {
        this.hide();
        this.isFree = true;
    }
    /** Hides the layer. */
    hide() {
        this.hidden = true;
    }
    /** Shows the layer. */
    show() {
        this.hidden = false;
    }
    /** Indicates wether a layer is hidden or not. */
    isHidden() {
        return this.hidden;
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