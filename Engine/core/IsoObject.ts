///<reference path="IsoWatcher.ts" />
class IsoObject extends IsoWatcher {
    set type(value) { }
    get type() {
        return "IsoObject"
    };

    apply(object: Object, to?: Object) {
        for (var k in object) {
            if (to === undefined)
                this[k] = object[k];
            else
                to[k] = object[k];
        }
    }
}