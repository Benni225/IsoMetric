"use strict";
var IsoEvent = (function () {
    function IsoEvent(type) {
        this.type = type;
        return this;
    }
    IsoEvent.prototype.addData = function (data) {
        this.data = data;
        return this;
    };
    IsoEvent.prototype.trigger = function (target) {
        var d = document;
        if (d.createEventObject) {
            var evt = d.createEventObject();
            if (target !== undefined) {
                if (typeof target === "string") {
                    var e = document.querySelector(target);
                    e.fireEvent(this.type, event);
                }
                else {
                    var e = target;
                    e.fireEvent(this.type, event);
                }
            }
            else {
                d.fireEvent(event);
            }
        }
        else {
            var evt2 = document.createEvent("HTMLEvents");
            evt2.initEvent(this.type, true, true);
            if (target !== undefined) {
                if (typeof target === "string") {
                    document.querySelector(target).dispatchEvent(evt2);
                }
                else {
                    target.dispatchEvent(evt2);
                }
            }
            else {
                document.dispatchEvent(evt2);
            }
        }
    };
    IsoEvent.prototype.__c = function (target) {
        var event = new CustomEvent(this.type, { 'detail': this.data });
        event.initCustomEvent(this.type, false, false, this.data);
        if (target !== undefined) {
            if (typeof target === "string") {
                document.querySelector(target).dispatchEvent(event);
            }
            else {
                target.dispatchEvent(event);
            }
        }
        else {
            document.dispatchEvent(event);
        }
    };
    IsoEvent.prototype.__e = function (target) {
        var event = new Event(this.type, this.data);
        event.initEvent(this.type, false, false);
        if (target !== undefined) {
            if (typeof target === "string") {
                document.querySelector(target).dispatchEvent(event);
            }
            else {
                target.dispatchEvent(event);
            }
        }
        else {
            document.dispatchEvent(event);
        }
    };
    return IsoEvent;
})();
