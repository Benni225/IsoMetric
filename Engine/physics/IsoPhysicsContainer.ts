/// <reference path="../core/IsoObject.ts" />
class IsoPhysicsContainer extends IsoObject {
    physicsObjects: Array<IsoPhysics> = new Array();

    add(o: IsoPhysics) {
        this.physicsObjects.push(o);
    }

    getAll(): Array<IsoPhysics> {
        return this.physicsObjects;
    }
}