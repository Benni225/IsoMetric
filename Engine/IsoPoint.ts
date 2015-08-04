"use strict";
interface IIsoPoint {
    x: number;
    y: number;
}

class IsoPoint {
    /** Position on the x axis */
    x: number;
    /** Position on the y axis */
    y: number;
    constructor(x?: number, y?: number) {
        if (x !== undefined) {
            this.x = x;
        }

        if (y !== undefined) {
            this.y = y;
        }
    }
    /** Sets or resets the point */
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    /** Gets the point on the screen. */
    get(): IsoPoint {
        return this;
    }
}