"use strict";
class IsoCollection {
    collection: Array<any>;
    Engine: IsoMetric;

    constructor(Engine: IsoMetric) {
        this.Engine = Engine;
    }

    get(): Array<any> {
        return this.collection;
    }

    getByName(name: string): any {
        if (this.collection !== undefined) {
            for (var i = 0; i < this.collection.length; i++) {
                if (this.collection[i].name === name) {
                    return this.collection[i];
                }
            }
        }
        return undefined;
    }
} 