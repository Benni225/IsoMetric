///<reference path="IsoEvent.ts" />
/** This class helps to observe special values of a class. */
class IsoWatcher extends IsoEvent {
    __watch: Array<any> = new Array();

    watch(property: string, callback: EventListener) {
        var val = this[property];
        if (this.__watch[property] === undefined) {
            this.__watch[property] = {
                callback: new Array(callback),
                oldValue: val
            };
        } else {
            this.__watch[property].callback.push(callback);
        }
    }

    __propertyChanged(property: string, value: any) {
      if (this.__watch[property] !== undefined) {
            for (var i = 0; i < this.__watch[property].callback.length; i++) {
                this.__watch[property].callback[i].call(this, value, this.__watch[property].oldValue);
            }
            this.__watch[property].oldValue = value;
        }
    }
}