"use strict";
/// <reference path="IsoMinimalObject.ts" />
class IsoGroup extends IsoMinimalObject {
    items: Array<IsoMinimalObject>;

    addItem(object: IsoMinimalObject) {
        this.items.push(object);
    }
}