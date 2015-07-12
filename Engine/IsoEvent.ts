"use strict";
interface __IsoDocument extends Document {
    createEventObject?: any;
    fireEvent?: any;
}

interface __IsoElement extends Element {
    fireEvent?: any;
}

class IsoEvent {
    type: string;
    data: any;
    constructor(type: string){
        this.type = type;
        return this;
    }

    addData(data: any) {
        this.data = data;
        return this;
    }
    /**
     * @todo Find a solid solution */
    trigger(target?: string|HTMLElement) {
        var d: __IsoDocument = document;
        if (d.createEventObject) {
            // dispatch for IE
            var evt = d.createEventObject();
            if (target !== undefined) {
                if (typeof target === "string") {
                    var e: __IsoElement = document.querySelector(target);
                    e.fireEvent(this.type, event);
                } else {
                    var e: __IsoElement = target;
                    e.fireEvent(this.type, event);
                }

            } else {
                d.fireEvent(event);
            }
        } else {
            // dispatch for firefox + others
            var evt2 = document.createEvent("HTMLEvents");
            evt2.initEvent(this.type, true, true); // event type,bubbling,cancelable
            if (target !== undefined) {
                if (typeof target === "string") {
                    document.querySelector(target).dispatchEvent(evt2);
                } else {
                    target.dispatchEvent(evt2);
                }

            } else {
                document.dispatchEvent(evt2);
            }
        }
    }

    private __c(target?: string|HTMLElement) {
        var event = new CustomEvent(this.type, { 'detail': this.data });
        event.initCustomEvent(this.type, false, false, this.data);
        if (target !== undefined) {
            if (typeof target === "string") {
                document.querySelector(target).dispatchEvent(event);
            } else {
                target.dispatchEvent(event);
            }

        } else {
            document.dispatchEvent(event);
        }
    }

    private __e(target?: string|HTMLElement) {
        var event = new Event(this.type, this.data);
        event.initEvent(this.type, false, false);
        if (target !== undefined) {
            if (typeof target === "string") {
                document.querySelector(target).dispatchEvent(event);
            } else {
                target.dispatchEvent(event);
            }

        } else {
            document.dispatchEvent(event);
        }
    }
} 