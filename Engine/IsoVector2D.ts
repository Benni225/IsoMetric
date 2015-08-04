"use strict";
/**
 * IsoVector2D represents a point on the screen.
 */
class IsoVector2D extends IsoPoint {
    /** Creates a new vector */
    constructor(x?: number, y?: number) {
        super(x, y);
    }
    /** Gets the distance between two points */
    getDistance(vec: IsoVector2D): number {
        // c2 = a2 + b2 --> c = sqrt(a2 + b2) --> c = is distance
        return Math.sqrt(((this.x - vec.x) * (this.x - vec.x)) + ((this.y - vec.y) * (this.y - vec.y)))
    }
    /** Gets the length of a vector. */
    getMagnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    /** Gets the angle of a vector. */
    getAngle() {
        return Math.atan2(this.y, this.x);
    }
    /** Sets the vector from an angle and a length.*/
    createFromAngle(angle: number, length: number) {
        this.x = length * Math.cos(angle);
        this.y = length * Math.sin(angle);
    }

    add(vector: IsoVector2D) {
        this.x += vector.x;
        this.y += vector.y;
    }

}