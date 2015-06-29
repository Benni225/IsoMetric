///<reference path="IsoLayer.ts" />
"use strict";

class IsoLayers {
    layers: Array<IsoLayer> = new Array();
    Engine: IsoMetric;
    length: number;
    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
    }

    add(name: string, index?: number) {
        this.length++;
        if (index === undefined) {
            index = this.length - 1;
        }
        this.layers.push(new IsoLayer(this.Engine, index, name));
    }

    get(name: string): IsoLayer {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].name === name) {
                return this.layers[i];
            }
        }
    }

    sort() {
        //this.layers.sort(this._sort);
    }

    _sort(layerA: IsoLayer, layerB: IsoLayer) {
        if (layerA.index > layerB.index) {
            return 1;
        } else if (layerA.index < layerB.index) {
            return -1;
        } else {
            return 0;
        }
    }

    getByIndex(index: number): IsoLayer {
        return this.layers[index];
    }
}
