///<reference path="IsoPoint.ts" />
/**
 * IsoVector2D represents a point on the screen.
 */
class IsoVector2D extends IsoPoint {
    /** Creates a new vector */
    constructor(x: number, y: number) {
        super(x, y);
    }
    /** Gets the distance between two points */
    getDistance(vec: IsoVector2D): number {
        // c2 = a2 + b2 --> c = sqrt(a2 + b2) --> c = is distance
        return Math.sqrt(((this.x - vec.x) * (this.x - vec.x)) + ((this.y - vec.y) * (this.y - vec.y)))
    }
    /** Gets the length of a vector. */
    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /** Gets the angle of a vector. */
    getAngle() {
        var ratio = 0;
        var offset = 0;
        if (this.x > 0) {
            if (this.y > 0) {
                offset = 0;
                ratio = this.y / this.x;
            } else {
                offset = (3 * Math.PI) / 2;
                ratio = this.x / this.y;
            }
        } else {
            if (this.y > 0) {
                offset = Math.PI / 2;
                ratio = this.x / this.y;
            } else {
                offset = Math.PI;
                ratio = this.y / this.x;
            }
        }
        var angle = Math.atan(Math.abs(ratio)) + offset;
        return angle;
    }
    getAngleDegrees() {
        return this.getAngle() * 180 / Math.PI;
    }
    /** Sets the vector from an angle and a length.*/
    createFromAngle(angle: number, length: number) {
        this.x = length * Math.cos(angle);
        this.y = length * Math.sin(angle);
    }
    /** Add a second vector to the vector. */
    add(vector: IsoVector2D) {
        this.x += vector.x;
        this.y += vector.y;
    }

}