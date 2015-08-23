///<reference path="../core/IsoObject.ts" />
class IsoLayerManager extends IsoObject {
    _layers: Array<IsoLayer> = new Array();
    set layers(value: Array<IsoLayer>) {
        this.__propertyChanged("layers", value);
        this._layers = value;
    }
    get layers() {
        return this._layers;
    }
    /** Type of the object for identification. */
    get type() {
        return "IsoLayerManager";
    }
    set type(value) { }
    constructor() {
        super();
    }
    /** Adds a new layer to the layer manager. */
    add(layer: IsoLayer): IsoLayer {
        try {
            for (var i = 0; i < this.layers.length; i++) {
                if (this.layers[i].isFree === true) {
                    this.layers[i] = null;
                    this.layers[i] = layer;
                    return layer;
                }
            }
            this.layers.push(layer);
            return layer;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Removes a layer. */
    remove(layer: IsoLayer) {
        try {
            for (var i = 0; i < this.layers.length; i++) {
                if (this.layers[i] === layer) {
                    for (var l = i; l < this.layers.length - 1; l++) {
                        this.layers[l] = this.layers[l + 1];
                    }
                    this.layers.pop();
                }
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Returns a layer by its name. */
    get(name: string): IsoLayer {
        try {
            for (var i = 0; i < this.layers.length; i++) {
                if (this.layers[i].name === name) {
                    return this.layers[i];
                }
            }
            this.log("Sorry, I can not find the layer with name: " + name, IsoLogger.WARN);
            return undefined;
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
    /** Sorts the layers by there indizies. */
    sort() {
        this.layers.sort(_sort);
        function _sort(layerA: IsoLayer, layerB: IsoLayer) {
            if (layerA.index > layerB.index) {
                return 1;
            } else if (layerA.index < layerB.index) {
                return -1;
            } else {
                return 0;
            }
        }
    }
    /** Sort and updates all layers. */
    update() {
        try {
            if (this.layers === undefined || this.layers.length === 0) {
                this.log("There is nothing to update, because there are no layers.", IsoLogger.WARN);
            } else {
                this.sort();
                for (var i = 0; i < this.layers.length; i++) {
                    this.layers[i].update();
                }
            }
        } catch (e) {
            this.log(e, IsoLogger.ERROR);
        }
    }
}