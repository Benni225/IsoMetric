"use strict";
interface IIsoConfigWindowOptions {
    width: number;
    height: number;
    fullscreen: boolean;
}

class IsoConfig {
    public c: Object;
    Engine: IsoMetric;
    constructor(Engine: IsoMetric, c?: JSON) {
        this.Engine = Engine;
        if (c !== undefined) {
            this.c = c;
        } else {
            this.c = {};
        }
    }

    setConfig(c:JSON): void {
        this.c = c;
    }

    set(name: string, value: any): void {
        this.c[name] = value;
    }

    get(name: string): any {
        if (this.c[name] !== undefined) {
            return this.c[name];
        } else {
            return undefined;
        }
    }
} 