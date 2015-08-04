"use strict";
/**
 * IsoMapVector2D represents a point on the map.
 */
class IsoMapVector2D extends IsoMapPoint {
    /** Creates a new vector */
    constructor(row?: number, column?: number) {
        super(row, column);
    }
    /** Gets the distance between two points */
    getDistance(vec: IsoMapVector2D): number {
        // c2 = a2 + b2 --> c = sqrt(a2 + b2) --> c = is distance
        return Math.sqrt(((this.column - vec.column) * (this.column - vec.column)) + ((this.row - vec.row) * (this.row - vec.row)))
    }
}