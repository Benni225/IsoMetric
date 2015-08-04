var IsoOn = (function () {
    function IsoOn() {
        this.onCallbacks = new Array();
    }
    IsoOn.prototype.fire = function (type, data, element) {
        var e = new CustomEvent(type);
        e.initCustomEvent(type, true, true, data);
        if (element !== undefined) {
            element.dispatchEvent(e);
        }
        else {
            document.dispatchEvent(e);
        }
    };
    IsoOn.prototype.onEvent = function (eventType, callback) {
        document.addEventListener(eventType, callback);
    };
    IsoOn.prototype.unbindEvent = function (eventType, callback) {
        document.removeEventListener(eventType, callback);
    };
    IsoOn.prototype.on = function (eventType, callback) {
        this.onCallbacks[eventType] = callback;
        return this;
    };
    IsoOn.prototype.callOn = function (eventType) {
        if (this.checkOn(eventType))
            this.onCallbacks[eventType].call(this);
    };
    IsoOn.prototype.checkOn = function (eventType) {
        if (this.onCallbacks[eventType] !== undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    return IsoOn;
})();
